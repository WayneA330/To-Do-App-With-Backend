import * as React from "react";
import * as ReactDOM from "react-dom";
import PrivateRoutes from "./routes/routes";
// @ts-ignore
import { QueryClient, QueryClientProvider } from "react-query";
import "wieldy/css";
import "wieldy/styles";
import "./styles/customStyles.css";
const wrapper = document.getElementById("container");
const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <PrivateRoutes />
  </QueryClientProvider>,
  wrapper
);
