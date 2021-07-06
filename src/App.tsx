import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ItemList from "./pages/items/ItemList";
import ListBills from "./pages/bills/ListBills";
import Cookie from "./pages/cookie/Cookie";
import { useCookies } from "react-cookie";
import Register from "./pages/user/Register";
import Login from "./pages/login/Login";

function App() {
  const [cookies, setCookie] = useCookies(["name"]);
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/login" component={Register} /> */}
        <Route path="/item" component={ItemList} />
        <Route path="/cookie" component={Cookie} />
        <Route path="/bills" component={ListBills} />
        <Route path="/login" component={Login} />
        <Redirect from="/" to="/item" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
