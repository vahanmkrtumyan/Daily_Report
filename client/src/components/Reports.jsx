import React, { useState, useEffect } from "react";
import { Icon, Button, Table, Input, Container, Menu } from "semantic-ui-react";
import ReportInput from "./Modals/ReportInput";
import axios from "axios";

const Reports = () => {
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

  useEffect(() => {
    // fetch("http://localhost:5000/api/items", {
    //   crossDomain: true,
    //   method: "GET",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     username: user,
    //     password: pass,
    //   })
    // }).then(response => console.log(response));

    axios.get("api/items").then(function(response) {
      // handle success
      console.log(response.data);
    });
  }, []);

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

  return (
    <div style={{ position: "static", marginTop: "80px" }}>
      <div style={{ textAlign: "right" }}>
        <Container>
          <Menu tabular>
            <Menu.Item
              name="Not confirmed"
              active={activeItem === "Not confirmed"}
              onClick={() => handleActiveTab("Not confirmed")}
            />
            <Menu.Item
              name="Confirmed"
              active={activeItem === "Confirmed"}
              onClick={() => handleActiveTab("Confirmed")}
            />
          </Menu>{" "}
          <div style={{ margin: "20px", right: 0 }}>
            <ReportInput />
          </div>
          <Table sortable style={{ margin: "auto 0" }}>
            <Table.Header className="mobile hidden">
              <Table.Row>
                <Table.HeaderCell
                  //      sorted={column === "First name" ? direction : null}
                  //  onClick={handleSort("First name")}
                  textAlign="center"
                >
                  Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  //    sorted={column === "Last name" ? direction : null}
                  //  onClick={handleSort("Last name")}
                  textAlign="center"
                >
                  Estimation
                </Table.HeaderCell>
                <Table.HeaderCell
                  //    onClick={handleSort("login")}
                  textAlign="center"
                  //     sorted={column === "login" ? direction : null}
                >
                  <h3>Spent</h3>
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <h3>Description</h3>
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <h3>Edit</h3>
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <h3>Delete</h3>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {filtered.map(report => (
                <Table.Row key={report.id} textAlign="right">
                  <Table.Cell textAlign="center">{report.name}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {report.estimation}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{report.spent}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {report.description}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <ReportInput report={report} />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Icon
                      name="trash"
                      color="red"
                      style={{
                        backgroundColor: "Transparent",
                        border: "none",
                        color: "#2ca5ee",
                        padding: "20px 32px",
                        // textAlign: "center",
                        textDecoration: "none",
                        cursor: "pointer",
                        margin: "auto"
                      }}
                    />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Container>
      </div>
    </div>
  );
};

export default Reports;
