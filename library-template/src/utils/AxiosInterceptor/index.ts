import axios from "axios";
import Cookies from "js-cookie";
import Api from "../../api/api";
import { encrypt } from "../BodyEncryption";

const axiosIntercept = axios.create();

axiosIntercept.interceptors.request.use(
  (config) => {
    const token = Cookies.get("access_token");

    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor
axiosIntercept.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const refreshToken = Cookies.get("refresh_token");
    const originalRequest = error.config;

    if (!refreshToken) {
      // logout;
      // Notification({
      // 	message: 'Error',
      // 	description: 'Your session has expired',
      // })
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      originalRequest.url === Api.GenerateAccessToken
    ) {
      // Notification({
      // 	message: 'Error',
      // 	description: 'Your session has expired',
      // })
      // logout;

      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken: any = Cookies.get("refresh_token");

      return axios
        .post(Api.GenerateAccessToken, {
          refreshToken: encrypt(refreshToken),
        })
        .then((res) => {
          if (res.status === 200) {
            Cookies.set("access_token", res.data.payload.token, {
              expires: new Date(res.data.payload.expiry),
            });
            const token = Cookies.get("access_token");
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            return axios(originalRequest);
          }
        });
    }

    // return Error object with Promise
    return Promise.reject(error);
  }
);

export { axiosIntercept };
