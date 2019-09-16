import React, { useState, useEffect } from "react";
import { Button, Modal, Icon, Form } from "semantic-ui-react";
import axios from "axios";
import io from "socket.io-client";
const Joi = require("@hapi/joi");

const UserInput = ({ user, add, update }) => {
  let [firstname, setFirstname] = useState("");
  let [lastname, setLastname] = useState("");
  let [role, setRole] = useState("Developer");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname);
      setLastname(user.lastname);
      setRole(user.role);
      setUsername(user.username);
      setPassword(user.password);
    }
  }, [user]);

  let handleOpen = () => setModalOpen(true);

  let handleClose = () => setModalOpen(false);

  const options = [
    { key: "m", text: "PM", value: "PM" },
    { key: "f", text: "Developer", value: "Developer" },
    { key: "n", text: "Admin", value: "Admin" }
  ];

  let onChange = (e, data) => {
    console.log(data.value);
    setRole(data.value);
  };

  let data = {
    firstname: firstname.trim(),
    lastname: lastname.trim(),
    username: username.trim(),
    password: password.trim(),
    role
  };

  const schema = Joi.object({
    firstname: Joi.string()
      .min(3)
      .required(),
    lastname: Joi.string()
      .min(3)
      .required(),
    username: Joi.string()
      .min(3)
      .required(),
    password: Joi.string()
      .min(3)
      .required(),
    role: Joi.string().required()
  });

  const result = schema.validate(data);

  let onSubmit = () => {
    if (user) {
      data._id = user._id;
      axios({
        method: "put",
        url: "http://localhost:5000/api/users",
        data: data,
        crossDomain: true
      })
        .then(function(response) {
          console.log(response.data);
          update(data);
          handleClose();
        })
        .catch(function(error) {
          console.log(error);
        });
    } else {
      if (result.error) {
        alert(result.error);
      } else {
        add(data);
        axios({
          method: "post",
          url: "http://localhost:5000/api/users",
          data: data,
          crossDomain: true
        })
          .then(function(response) {
            console.log(response.data);

            handleClose();
          })
          .catch(function(error) {
            console.log(error);
          });
      }
      // axios
      //   .post("http://localhost:5000/api/items/users", dat, {
      //     crossDomain: true,
      //     "Content-Type": "application/json"
      //   })
      //   .then(function(response) {
      //     // handle success
      //     console.log(response);
      //   });
    }

    handleEmit();
  };

  let socket = io.connect("http://localhost:5000");

  let handleEmit = () => {
    socket.emit("users", {
      user: data
    });
  };

  return (
    <Modal
      trigger={
        user ? (
          <button
            onClick={handleOpen}
            className="no-style-btn"
            style={{
              color: "#2ca5ee",
              textAlign: "center"
            }}
          >
            <Icon name="edit" style={{ margin: "auto" }} />
          </button>
        ) : (
          <Button onClick={handleOpen}>
            Add user <Icon name="add user" style={{ margin: "auto" }} />
          </Button>
        )
      }
      centered={false}
      open={modalOpen}
      onClose={handleClose}
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
                value={firstname}
                onChange={e => setFirstname(e.target.value)}
              />
              <Form.Input
                fluid
                label="Last name"
                placeholder="Last name"
                value={lastname}
                onChange={e => setLastname(e.target.value)}
              />
              <Form.Select
                fluid
                label="role"
                options={options}
                placeholder="role"
                value={role}
                onChange={onChange}
                //   onChange={e => setRole(e.target.value)}
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
            <Form.Button onClick={() => onSubmit()}>Submit</Form.Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default UserInput;
