import React, { useState, useEffect } from "react";
import { Icon, Table, Container, Menu } from "semantic-ui-react";
import { ClipLoader } from "react-spinners";
import { css } from "@emotion/core";
import axios from "axios";
import ReportInput from "./Modals/ReportInput";
import Head from "./Header";


const Reports = props => {
  const [activeItem, setActiveitem] = useState("Not confirmed");
  const [reports, setReports] = useState();
  const [loading, setLoading] = useState(true);
  const [display, setDisplay] = useState("none");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/reports",
      crossDomain: true,
      params: { user: localStorage.getItem("user") }
    })
      .then(function(response) {
        setReports(response.data);
        setLoading(false);
        setDisplay("");
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  let user = JSON.parse(localStorage.getItem("user"));

  let handleAdd = report => {
    let newReport = { ...report };
    newReport._id = Math.random();
    let reportsNew = [...reports];
    reportsNew.push(newReport);
    setReports(reportsNew);
  };

  let handleUpdate = report => {
    let reportsNew = [...reports];
    let index = reportsNew.findIndex(k => k._id === report._id);
    reportsNew[index] = report;
    setReports(reportsNew);
  };

  let handleDelete = report => {
    report.user = JSON.parse(localStorage.getItem("user"));

    axios.delete("http://localhost:5000/api/reports", {
      data: { data: report, user }
    });
    let newArray = reports.filter(function(rep) {
      return rep._id !== report._id;
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
      data: { data: newReport, user },
      crossDomain: true
    })
      .then(function(response) {
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    handleUpdate(newReport);
  };

  let handleRequest = report => {
    let newReport = { ...report };
    newReport.requested = true;
    axios({
      method: "put",
      url: "http://localhost:5000/api/reports",
      data: { data: newReport, user },
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

  let override = css`
    display: block;
    margin: 0 auto;
  `;


  

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
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={150}
              color={"#123abc"}
              loading={loading}
            />
            <div style={{ margin: "20px", right: 0, display: display }}>
              {user.role === "Developer" ? (
                <ReportInput add={handleAdd} />
              ) : null}
            </div>
            <Table sortable style={{ display: display }}>
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
                  <Table.Row className={report.requested ? 'requested': '' } key={String(report._id)}>
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
                          onClick={() => handleDelete(report)}
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
