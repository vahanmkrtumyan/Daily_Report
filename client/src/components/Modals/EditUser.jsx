import React, { useState, useEffect } from "react";
import { Button, Modal, Icon, Form } from "semantic-ui-react";

const EditUser = ({ user }) => {
  let [firstName, setFirstname] = useState("");
  let [lastName, setLastname] = useState("");
  let [role, setRole] = useState("Developer");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  useEffect(() => {
    setFirstname(user.First_Name);
    setRole(user.Last_Name);
    setLastname(user.role);
    setUsername(user.username);
    setPassword(user.password);
  }, [user]);

  console.log(user);

  const options = [
    { key: "m", text: "PM", value: "PM" },
    { key: "f", text: "Developer", value: "Developer" }
  ];

  return (
    <Modal
      trigger={
        <Button>
          <Icon name="edit" style={{ margin: "auto" }} />
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
            <Form.Button>Submit</Form.Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default EditUser;
