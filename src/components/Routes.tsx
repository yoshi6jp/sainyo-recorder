import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { ItemList } from "./ItemList";
import { Chart } from "./Chart";
import { Heatmap } from "./Heatmap";
export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={ItemList} />
      <Route path="/chart" component={Chart} />
      <Route path="/heatmap" component={Heatmap} />
    </Switch>
  );
};
