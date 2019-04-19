import React from "react";
import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "./components/Provider";
import { ItemList } from "./components/ItemList";
import { InputButton } from "./components/InputButton";
import { Routes } from "./components/Routes";
import { Navs } from "./components/Navs";
import { TopBar } from "./components/TopBar";
const App = () => {
  return (
    <Router>
      <Provider>
        <TopBar />
        <div className="container">
          <Routes />
        </div>
        <InputButton />
        <Navs />
      </Provider>
    </Router>
  );
};

export default App;
