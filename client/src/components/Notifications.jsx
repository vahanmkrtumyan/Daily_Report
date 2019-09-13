import React, { useState, useEffect } from "react";
import {
    Icon,
    Button,
    Table,
    Input,
    Container,
    Menu,
    Card, Search
} from "semantic-ui-react";
import ReportInput from "./Modals/ReportInput";
import UserInput from "./Modals/UserInput";

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
    <div className="pt-70">

        <Container>
            <div className="pb-20 pt-30 d-flex justify-between align-center">
                <h3 className="m-0">Notifications</h3>
                <Button>Clear notifications</Button>
            </div>
            <div>
                <Card
                    fluid
                    header="Elliot Baker"
                    meta="Friend"
                    description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
                />
                <Card
                    fluid
                    header="Elliot Baker"
                    meta="Friend"
                    description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
                />
            </div>

        </Container>
    </div>
  );
};

export default Notifications;
