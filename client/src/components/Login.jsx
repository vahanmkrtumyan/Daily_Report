import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Header, Segment } from "semantic-ui-react";
import axios from "axios";
const Joi = require("@hapi/joi");

const Login = props => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [valid, setValid] = useState(false);

  useEffect(() => {
    if (schema.validate(data).error && valid) {
      setValid(false);
    } else if (!schema.validate(data).error && !valid) {
      setValid(true);
    }
  }, [username, password]);

  let data = {
    username: username.trim(),
    password: password.trim()
  };

  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });

  let handeleLogin = () => {
    axios({
      method: "put",
      url: "http://localhost:5000/api/login",
      data: data,

      crossDomain: true
    })
      .then(function(response) {
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data.role);
        if (response.data) {
          props.history.push("/Reports");
        }
      })
      .catch(function(error) {
        document.getElementById("login").innerHTML +=
          "Username or password is incorect";
        console.log(error);
      });
  };

  return (
    <div>
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
                disabled={!valid}
              >
                Login
              </Button>
              <p id="login" />
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
