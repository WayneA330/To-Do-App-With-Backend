import * as React from "react";
import { Suspense } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { SignIn } from "../pages/signIn";
import { Otp } from "../pages/SignIn/otp";
import { FirstTime } from "../pages/SignIn/FirstTime";
import { ResetPassword } from "../pages/SignIn/ResetPassword";
import { ConfirmResetPassword } from "../pages/SignIn/ConfirmResetPassword";
import PublicLayout from "../layout/publicLayout";
import { LoadingPage } from "../pages/loadingPage";

const PublicRoutes = () => {
  return (
    <HashRouter>
      <Switch>
        <Suspense fallback={<LoadingPage />}>
          <Route path={["/"]} exact={true} component={SignIn}></Route>
          <Route path={["/otp"]} exact={true} component={Otp}></Route>
          <Route path={["/first-time-login"]} component={FirstTime}></Route>
          <Route
            path={["/confirm-reset-password"]}
            component={ConfirmResetPassword}
          ></Route>
          <Route path={["/reset-password"]} component={ResetPassword}></Route>
          <Route path={["/input-reset-password"]}>
            <FirstTime reset />
          </Route>
        </Suspense>
      </Switch>
    </HashRouter>
  );
};

const PublicLayoutRoutes: React.FunctionComponent = () => (
  <PublicLayout children={<PublicRoutes />} />
);

export { PublicLayoutRoutes };
