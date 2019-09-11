import React, { useState, useEffect } from "react";
import {
  Icon,
  Button,
  Table,
  Input,
  Container,
  Menu,
  Card
} from "semantic-ui-react";
import ReportInput from "./Modals/ReportInput";

const Notifications = () => {
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);
  const [filter, setFilter] = useState("");
  const [activeItem, setActiveitem] = useState("Not confirmed");
  const [reports, SetReports] = useState([
    {
      id: 1,
      //   First_Name: "Vahan",
      //   Last_Name: "Mkrtumyan",
      name: "Bug fix",
      description: "ddddddddddd",
      estimation: "1 hour 40 min",
      spent: "1 hour 30 min",
      confirmed: "no"
    },
    {
      id: 2,
      //   First_Name: "Vahan",
      //   Last_Name: "Mkrtumyan",
      name: "gasdasdasd",
      description: "ssssssssss",
      estimation: "1 hour 40 min",
      spent: "2 hour 30 min",
      confirmed: "yes"
    }
  ]);

  let handleActiveTab = tab => {
    setActiveitem(tab);
  };

  let filtered =
    reports.filter(function(report) {
      if (activeItem === "Not confirmed") return report.confirmed === "no";
      else {
        return report.confirmed === "yes";
      }
    }) || [];

  let asd = "asd";

  return (
    <div style={{ position: "static", marginTop: "80px" }}>
      <h3>Notifications</h3>
      <div tyle={{ textAlign: "right" }}>
        <Button>Clear notifications</Button>
      </div>
      <div style={{ textAlign: "left" }}>
        <Container>
          <Card
            fluid
            header="Elliot Baker"
            meta="Friend"
            description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
          />
        </Container>
        <Container>
          <Card
            fluid
            header="Elliot Baker"
            meta="Friend"
            description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
          />
        </Container>
      </div>
    </div>
  );
};

export default Notifications;
