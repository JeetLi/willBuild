import "./index.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import GlobalRoute from "@router/global-route";
import { store } from "@redux/configure-store";

import "normalize.css";
import "antd/dist/antd.css";

const domNode = document.getElementById("root") as HTMLDivElement;
const root = createRoot(domNode);

root.render(
  <Provider store={store}>
    <>{<GlobalRoute />}</>
  </Provider>
);
