import Cookies from "js-cookie";
import { Context } from "./index";
import { dynamicObject } from "../types/newDefinition";
import { getNewAccessToken } from "../api/method";
import { encrypt } from "../utils/BodyEncryption";

export const setLogginState = ({ state }: Context, value: dynamicObject) => {
  const {
    accessToken,
    refreshToken,
    user,
    isLoggedIn,
    isShell,
  }: dynamicObject | any = value;
  state.isLoggedIn = isLoggedIn;
  state.refreshToken = refreshToken;
  state.token = accessToken;
  state.user = user;
  state.isShell = isShell || false;
};

export const logIn = ({ actions }: Context, value: dynamicObject) => {
  const { user, accessToken, refreshToken }: dynamicObject | any = value;

  console.log({ user, accessToken, refreshToken });

  actions.setLogginState({
    accessToken: accessToken?.token,
    refreshToken: refreshToken?.token,
    user: user,
    isLoggedIn: true,
  });

  Cookies.set("access_token", accessToken?.token, {
    expires: new Date(accessToken?.expiry),
  });
  Cookies.set("refresh_token", refreshToken?.token, {
    expires: new Date(refreshToken?.expiry),
  });
  Cookies.set("user_info", JSON.stringify(user));
};

export const logout = ({ actions }: Context) => {
  Cookies.remove("access_token");
  Cookies.remove("refresh_token");
  Cookies.remove("user_info");

  actions.setLogginState({
    accessToken: "",
    refreshToken: "",
    user: {},
    isLoggedIn: false,
    isShell: false,
  });
};

export const checkLoggin = async (
  { actions }: Context,
  value: dynamicObject
) => {
  const { isShell }: dynamicObject | any = value;

  const accessToken = Cookies.get("access_token");
  const refreshToken = Cookies.get("refresh_token");
  const userjSON: any = Cookies.get("user_info");
  const user = userjSON ? JSON.parse(userjSON) : {};
  if (user) {
    if (
      accessToken &&
      refreshToken &&
      Object.getOwnPropertyNames(user).length > 0
    ) {
      actions.setLogginState({
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user,
        isLoggedIn: true,
        isShell: isShell || false,
      });
    }

    if (
      !accessToken &&
      refreshToken &&
      Object.getOwnPropertyNames(user).length > 0
    ) {
      await getNewAccessToken({
        refreshToken: encrypt(refreshToken),
      })
        .then((response: any) => {
          actions.setLogginState({
            accessToken: response.data.payload.token,
            refreshToken: refreshToken,
            user: user,
            isLoggedIn: true,
            isShell: isShell || false,
          });
          Cookies.set("access_token", response.data.payload.token, {
            expires: new Date(response.data.payload.expiry),
          });
        })
        .catch(() => actions.logout());
    }

    if (
      (!accessToken &&
        !refreshToken &&
        Object.getOwnPropertyNames(user).length === 0) ||
      (accessToken &&
        !refreshToken &&
        Object.getOwnPropertyNames(user).length === 0)
    ) {
      actions.logout();
    }
  }

  if (Object.getOwnPropertyNames(user).length === 0) {
    actions.logout();
  }
};
