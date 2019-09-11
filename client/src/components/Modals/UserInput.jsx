import React, { useState, useEffect } from "react";
import { Button, Modal, Icon, Form } from "semantic-ui-react";
import axios from "axios";

const UserInput = ({ user }) => {
  let [firstName, setFirstname] = useState("");
  let [lastName, setLastname] = useState("");
  let [role, setRole] = useState("Developer");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      setFirstname(user.First_Name);
      setLastname(user.Last_Name);
      setRole(user.role);
      setUsername(user.username);
      setPassword(user.password);
    }
  }, [user]);

  console.log(user);

  const options = [
    { key: "m", text: "PM", value: "PM" },
    { key: "f", text: "Developer", value: "Developer" }
  ];

  let onsubmit = () => {
    let data = {
      First_Name: firstName,
      Last_Name: lastName,
      username: username,
      role: role
    };
    console.log("dfdsf", JSON.stringify(data));
    // let dat = JSON.stringify(data);
    // var body = {
    //   userName: "Fred",
    //   userEmail: "Flintstone@gmail.com"
    // };

    axios({
      method: "post",
      url: "http://localhost:5000/api/items/users",
      data: data
    })
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
    // axios
    //   .post("http://localhost:5000/api/items/users", dat, {
    //     crossDomain: true,
    //     "Content-Type": "application/json"
    //   })
    //   .then(function(response) {
    //     // handle success
    //     console.log(response);
    //   });
  };

  return (
    <Modal
      trigger={
        user ? (
          <Button
            style={{
              backgroundColor: "Transparent",
              border: "none",
              color: "#2ca5ee",
              padding: "15px 32px",
              textAlign: "center",
              textDecoration: "none",
              cursor: "pointer"
            }}
          >
            <Icon name="edit" style={{ margin: "auto" }} />
          </Button>
        ) : (
          <Button>
            Add user <Icon name="add user" style={{ margin: "auto" }} />
          </Button>
        )
      }
      centered={false}
    >
      <Modal.Header>{user ? "Edit an user" : "Add an user"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="First name"
                placeholder="First name"
                value={firstName}
                onChange={e => setFirstname(e.target.value)}
              />
              <Form.Input
                fluid
                label="Last name"
                placeholder="Last name"
                value={lastName}
                onChange={e => setLastname(e.target.value)}
              />
              <Form.Select
                fluid
                label="role"
                options={options}
                placeholder="role"
                value={role}
                onChange={e => setRole(e.target.value)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Username"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <Form.Input
                fluid
                label="Password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Button onClick={() => onsubmit()}>Submit</Form.Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default UserInput;
