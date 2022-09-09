import * as React from "react";
import * as ReactDOM from "react-dom";
// @ts-ignore
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { createOvermind } from "overmind";
import { Provider } from "overmind-react";
// @ts-ignore
import { config } from "saasLibraries/Overmind";
import App from "./App";
import "wieldy/css";
import "wieldy/styles";
import "./style/customStyle.css";

const wrapper = document.getElementById("container");
const queryClient = new QueryClient();
const overmind = createOvermind(config, { devtools: false });

ReactDOM.render(
  <Provider value={overmind}>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  </Provider>,
  wrapper
);
