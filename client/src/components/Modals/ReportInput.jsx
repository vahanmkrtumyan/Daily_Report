import React, { useState, useEffect } from "react";
import { Button, Modal, Icon, Form } from "semantic-ui-react";

const ReportInput = ({ report }) => {
  let [name, setName] = useState("");
  let [description, setDescription] = useState("");
  let [estimation, setEstimation] = useState("");
  let [spent, setSpent] = useState("");

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

  return (
    <Modal
      trigger={
        report ? (
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
            {" "}
            Add a report <Icon name="add user" style={{ margin: "auto" }} />
          </Button>
        )
      }
      centered={false}
    >
      <Modal.Header>{report ? "Edit a report" : "Add a report"}</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Form>
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="First name"
                placeholder="First name"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <Form.Input
                fluid
                label="Last name"
                placeholder="Last name"
                value={estimation}
                onChange={e => setEstimation(e.target.value)}
              />
              <Form.Input
                fluid
                label="Last name"
                placeholder="Last name"
                value={spent}
                onChange={e => setSpent(e.target.value)}
              />
            </Form.Group>
            <Form.Group widths="equal">
              <Form.TextArea
                label="Username"
                placeholder="Username"
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Button>Submit</Form.Button>
          </Form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  );
};

export default ReportInput;
