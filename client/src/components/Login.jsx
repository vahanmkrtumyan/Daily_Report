import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import axios from "axios";
const Joi = require("@hapi/joi");

const Login = props => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  let handeleLogin = () => {
    let data = {
      username,
      password
    };
    axios({
      method: "put",
      url: "http://localhost:5000/api/login",
      data: data,

      crossDomain: true
    })
      .then(function(response) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data.role);
        if (response) {
          props.history.push("/Reports");
        }
      })
      .catch(function(error) {
        document.getElementById("login").innerHTML +=
          "username or password are incorect";
        console.log(error);
      });
  };

  let data = {
    username,
    password
  };

  const schema = Joi.object({
    username: Joi.string()
      .min(3)
      .required(),
    password: Joi.string()
      .min(3)
      .required()
  });

  const result = schema.validate(data);

  console.log(result);

  return (
    <div id="login">
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <p>Passowrd is not allowed to be empty</p>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Button
                color="teal"
                fluid
                size="large"
                onClick={() => handeleLogin()}
              >
                Login
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
