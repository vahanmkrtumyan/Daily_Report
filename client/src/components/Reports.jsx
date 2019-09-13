import React, { useState, useEffect } from "react";
import { Icon, Button, Table, Input, Container, Menu } from "semantic-ui-react";
import ReportInput from "./Modals/ReportInput";
import axios from "axios";
import Head from "./Header";

const Reports = () => {
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);
  const [filter, setFilter] = useState("");
  const [activeItem, setActiveitem] = useState("Not confirmed");
  const [reports, setReports] = useState();

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/reports",
      crossDomain: true,
      params: { user: localStorage.getItem("user") }
    })
      .then(function(response) {
        setReports(response.data);
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  let user = JSON.parse(localStorage.getItem("user"));

  let handleAdd = report => {
    let reportsNew = [...reports];
    reportsNew.push(report);
    setReports(reportsNew);
  };

  let handleUpdate = report => {
    let reportsNew = [...reports];
    let index = reportsNew.findIndex(k => k._id === report._id);
    reportsNew[index] = report;
    setReports(reportsNew);
  };

  let handleDelete = id => {
    console.log(id);
    axios.delete("http://localhost:5000/api/reports", {
      data: { id: id }
    });
    let newArray = reports.filter(function(report) {
      return report._id !== id;
    });
    setReports(newArray);
  };

  let handleConfirm = report => {
    let newReport = { ...report };
    newReport.confirmed = true;
    newReport.requested = false;
    axios({
      method: "put",
      url: "http://localhost:5000/api/reports",
      data: newReport,
      crossDomain: true
    })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  let handleRequest = report => {
    let newReport = { ...report };
    newReport.requested = true;
    axios({
      method: "put",
      url: "http://localhost:5000/api/reports",
      data: newReport,
      crossDomain: true
    })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  let handleActiveTab = tab => {
    setActiveitem(tab);
  };

  let filtered = reports
    ? reports.filter(function(report) {
        if (activeItem === "Not confirmed") return report.confirmed === false;
        else {
          return report.confirmed === true;
        }
      })
    : [];

  return (
    <div>
      <Head />
      <div style={{ paddingTop: "75px" }}>
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
              {user.role === "Developer" ? (
                <ReportInput add={handleAdd} />
              ) : null}
            </div>
            <Table sortable>
              <Table.Header className="mobile hidden">
                <Table.Row>
                  {user.role === "PM" ? (
                    <Table.HeaderCell textAlign="center">
                      Developer
                    </Table.HeaderCell>
                  ) : null}
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
                    Spent
                  </Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">
                    Description
                  </Table.HeaderCell>
                  {activeItem === "Not confirmed" ? (
                    user.role === "Developer" ? (
                      <Table.HeaderCell textAlign="center">
                        Edit
                      </Table.HeaderCell>
                    ) : (
                      <Table.HeaderCell textAlign="center">
                        Confirm
                      </Table.HeaderCell>
                    )
                  ) : null}
                  {activeItem === "Not confirmed" ? (
                    user.role === "Developer" ? (
                      <Table.HeaderCell textAlign="center">
                        Delete
                      </Table.HeaderCell>
                    ) : (
                      <Table.HeaderCell textAlign="center">
                        Request change
                      </Table.HeaderCell>
                    )
                  ) : null}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {filtered.map(report => (
                  <Table.Row key={report._id} textAlign="right">
                    {user.role === "PM" ? (
                      <Table.Cell textAlign="center">
                        {report.usersname}
                      </Table.Cell>
                    ) : null}
                    <Table.Cell textAlign="center">{report.name}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {report.estimation}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{report.spent}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {report.description}
                    </Table.Cell>
                    {activeItem === "Not confirmed" ? (
                      user.role === "Developer" ? (
                        <Table.Cell textAlign="center">
                          <ReportInput report={report} update={handleUpdate} />
                        </Table.Cell>
                      ) : (
                        <Table.Cell
                          textAlign="center"
                          onClick={() => handleConfirm(report)}
                        >
                          <Icon
                            name="check"
                            color="blue"
                            className="no-style-btn bell"
                          />
                        </Table.Cell>
                      )
                    ) : null}
                    {activeItem === "Not confirmed" ? (
                      user.role === "Developer" ? (
                        <Table.Cell
                          textAlign="center"
                          onClick={() => handleDelete(report._id)}
                        >
                          <Icon
                            name="trash"
                            color="red"
                            className="no-style-btn bell"
                          />
                        </Table.Cell>
                      ) : (
                        <Table.Cell
                          textAlign="center"
                          onClick={() => handleRequest(report)}
                        >
                          <Icon
                            name="redo"
                            color="red"
                            className="no-style-btn bell"
                          />
                        </Table.Cell>
                      )
                    ) : null}
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Reports;
