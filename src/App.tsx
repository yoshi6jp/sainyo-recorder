import React from "react";
import "./App.css";
import { Provider } from "./components/Provider";
import { ItemList } from "./components/ItemList";
import { InputButton } from "./components/InputButton";
const App = () => {
  return (
    <Provider>
      <div className="container">
        <header>採尿量レコーダー</header>
        <ItemList />
      </div>
      <InputButton />
    </Provider>
  );
};

export default App;
