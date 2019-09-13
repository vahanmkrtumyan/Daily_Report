import React, { useState, useEffect } from "react";
import { Button, Modal, Icon, Form } from "semantic-ui-react";
import axios from "axios";
import io from "socket.io-client";
const Joi = require("@hapi/joi");

const ReportInput = ({ report, update, add }) => {
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [estimation, setEstimation] = useState("");
  let [spent, setSpent] = useState("");
  let [modalOpen, setModalOpen] = useState(false);

  const options = [
    { key: "m", text: "PM", value: "PM" },
    { key: "f", text: "Developer", value: "Developer" }
  ];

  useEffect(() => {
    if (report) {
      setName(report.name);
      setDescription(report.description);
      setEstimation(report.estimation);
      setSpent(report.spent);
    }
  }, [report]);

  let handleOpen = () => setModalOpen(true);

  let handleClose = () => setModalOpen(false);

  let data = {
    name,
    description,
    estimation,
    spent,
    user: localStorage.getItem("user"),
    confirmed: false
  };

  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required(),
    description: Joi.string()
      .min(3)
      .required(),
    estimation: Joi.string()
      .min(3)
      .required(),
    spent: Joi.string()
      .min(3)
      .required(),
    user: Joi.string()
      .min(3)
      .required(),
    confirmed: Joi.boolean().required()
  });

  const result = schema.validate(data);

  let onSubmit = () => {
    if (report) {
      data._id = report._id;
      axios({
        method: "put",
        url: "http://localhost:5000/api/reports",
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
          url: "http://localhost:5000/api/reports",
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
        report ? (
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
            {" "}
            Add a report <Icon name="add user" style={{ margin: "auto" }} />
          </Button>
        )
      }
      centered={false}
      open={modalOpen}
      onClose={handleClose}
    >
      <Modal.Header>{report ? "Edit a report" : "Add a report"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Name"
                placeholder="Name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Form.Input
                fluid
                label="Estimation"
                placeholder="Estimation"
                value={estimation}
                onChange={e => setEstimation(e.target.value)}
              />
              <Form.Input
                fluid
                label="Spent"
                placeholder="Spent"
                value={spent}
                onChange={e => setSpent(e.target.value)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.TextArea
                label="Description"
                placeholder="Description"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Button onClick={onSubmit}>Submit</Form.Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ReportInput;
