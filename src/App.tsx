import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ItemList from "./pages/items/ItemList";
import ListBills from "./pages/bills/ListBills";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/item" component={ItemList} />
        <Route path="/bills" component={ListBills} />
        <Redirect from="/" to="/item" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
