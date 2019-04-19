import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import "antd-mobile/dist/antd-mobile.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "material-design-icons/iconfont/material-icons.css";
import "@material/fab/dist/mdc.fab.css";
import "@rmwc/data-table/data-table.css";
import "@material/top-app-bar/dist/mdc.top-app-bar.css";
import "@material/icon-button/dist/mdc.icon-button.css";
import "react-calendar-heatmap/dist/styles.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
