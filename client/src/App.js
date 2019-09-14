import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Users from "./components/Users";
import Reports from "./components/Reports";
import Notifications from "./components/Notifications";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/Users" component={Users}  />
          <Route path="/Reports" component={Reports}  />
          <Route path="/Notifications" component={Notifications}  />
          {/* <Login /> */}
        </Switch>
        {/* <Footer /> */}
      </div>
    );
  }
}

export default App;
