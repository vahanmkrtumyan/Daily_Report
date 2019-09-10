import React, { useState } from "react";
import { Button, Header, Image, Modal, Icon, Form } from "semantic-ui-react";

const UserInput = () => {
  let [firstName, setFirstname] = useState("");
  let [lastName, setLastname] = useState("");
  let [role, setRole] = useState("Developer");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  const options = [
    { key: "m", text: "PM", value: "PM" },
    { key: "f", text: "Developer", value: "Developer" }
  ];

  return (
    <Modal
      trigger={
        <Button>
          {" "}
          Add user <Icon name="add user" style={{ margin: "auto" }} />
        </Button>
      }
      centered={false}
    >
      <Modal.Header>Add an user</Modal.Header>
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
                // value={role}
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
                value={username}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default UserInput;
