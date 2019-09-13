import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Head from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Users from "./components/Users";
import Reports from "./components/Reports";
import Notifications from './components/Notifications';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Head /> */}
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/Users" component={Users} exact />
          <Route path="/Reports" component={Reports} exact />
          <Route path="/Notifications" component={Notifications} exact />
          {/* <Login /> */}
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
