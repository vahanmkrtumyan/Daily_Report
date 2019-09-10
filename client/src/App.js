import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Head from "./components/Head";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Users from "./components/Users";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Head />
        {/* <Login /> */}
        <Users />
        <Footer />
      </div>
    );
  }
}

export default App;
