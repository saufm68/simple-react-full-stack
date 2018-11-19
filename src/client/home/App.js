import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Test from "../components/test/Test.js";
import Login from "../components/user/Login.js";
import Register from "../components/user/Register.js";
import "./app.css";

export default class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>EyeCare</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/test">Test</Link>
        <Switch>
          <Route path="/test" component={Test} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </div>
    );
  }
}
