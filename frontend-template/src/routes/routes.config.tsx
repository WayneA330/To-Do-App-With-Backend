import { lazy } from "react";
const To_Do = lazy(() => import("../pages/To_Do"));

const routes = [
  {
    path: ["/"],
    Component: To_Do,
    exact: true,
    isMenu: true,
    isShell: true,
  },
];

export default routes;
