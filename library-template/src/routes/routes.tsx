import * as React from "react";
import { Suspense } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import routesConfig from "./routes.config";

const PrivateRoutes: React.FunctionComponent<any> = (oldProps) => {
  return (
    <HashRouter>
      <Switch>
        <Suspense fallback={<p>Loading</p>}>
          {routesConfig.map(({ path, exact, Component }, index) => (
            <Route key={index} path={path} exact={exact}>
              <Component />
            </Route>
          ))}
        </Suspense>
      </Switch>
    </HashRouter>
  );
};

export default PrivateRoutes;
