import * as React from "react";
import { useEffect, Suspense } from "react";
import PrivateRoutes from "./routes/routes";
// @ts-ignore
import { LoadingPage } from "saasLibraries/LoadingPage";
// @ts-ignore
import { useAppState, useActions } from "saasLibraries/Overmind";
// @ts-ignore
import { PublicLayoutRoutes } from "saasLibraries/PublicLayoutRoutes";
// @ts-ignore
import { PrivateLayout } from "saasLibraries/PrivateLayout";
import { stateProp, actionProp } from "./types/import";
import { HashRouter, Switch, Route } from "react-router-dom";

import "./style/customStyle.css"; // or 'antd/dist/antd.less'

const App = () => {
  const { isLoggedIn, isShell }: stateProp = useAppState();
  const { checkLoggin }: actionProp = useActions();
  useEffect(() => {
    checkLoggin({ isShell: true });
    // eslint-disable-next-line
  }, [isLoggedIn]);

  return (
    <HashRouter>
      <Switch>
        <Suspense fallback={<LoadingPage />}>
          <PrivateRoutes />
        </Suspense>
      </Switch>
    </HashRouter>
  );
};

export default App;
