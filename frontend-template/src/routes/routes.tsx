import * as React from "react";
import { Route } from "react-router-dom";
import routesConfig from "./routes.config";
import {
  useActions,
  useAppState,
  // @ts-ignore
} from "saasLibraries/Overmind";

const PrivateRoutes: React.FunctionComponent<any> = () => {
  const user = useAppState();
  const actions = useActions();

  //need to spred to get access
  const userSpread = { ...user };
  const getUserSpread = { ...userSpread.user };

  const props: any = {
    actions: actions,
    state: {
      ...userSpread,
      user: getUserSpread,
    },
  };

  return (
    <>
      {routesConfig.map(({ path, exact, Component, isShell }, index) => {
        const isShellPath = !isShell
          ? path.filter((item: any) => item !== "/")
          : path;
        return (
          <Route key={index} path={isShellPath} exact={exact}>
            <Component {...props} />
          </Route>
        );
      })}
    </>
  );
};

export default PrivateRoutes;
