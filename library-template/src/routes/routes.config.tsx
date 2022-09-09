import { lazy } from "react";
const PageIndex = lazy(() => import("../pages/index"));
import { Route } from "../types/route";

const routes: Route[] = [
  {
    path: ["/"],
    Component: PageIndex,
    exact: true,
    permissions: [],
    restrictions: [],
    additionalProps: {},
  },
];

export default routes;
