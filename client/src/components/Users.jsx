import React, { useState, useEffect } from "react";
import { Icon, Button, Table, Input, Container } from "semantic-ui-react";
import _ from "lodash";
import UserInput from "./UserInput";

const Users = () => {
  const [companies, SetCompanies] = useState([]);
  const [company, setCompany] = useState("");
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);
  const [filter, setFilter] = useState("");

  let handleSort = clickedColumn => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      SetCompanies(_.sortBy(companies, [clickedColumn]));
      setDirection("descending");
      return;
    }
    SetCompanies(companies.reverse());
    setDirection(direction === "ascending" ? "descending" : "ascending");
  };

  let filtered =
    companies.filter(function(expense) {
      return expense.name.toLowerCase().indexOf(company.toLowerCase()) !== -1;
    }) || [];

  return (
    <div style={{ position: "static", marginTop: "80px" }}>
      {" "}
      <div>
        <Container>
          <div style={{ margin: "20px", right: "10px" }}>
            <UserInput />
          </div>
          <Table sortable style={{ margin: "auto 0" }}>
            <Table.Header className="mobile hidden">
              <Table.Row>
                <Table.HeaderCell
                  sorted={column === "First name" ? direction : null}
                  onClick={handleSort("First name")}
                  textAlign="center"
                >
                  First Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "Last name" ? direction : null}
                  onClick={handleSort("Last name")}
                  textAlign="center"
                >
                  Last Name
                </Table.HeaderCell>
                <Table.HeaderCell
                  onClick={handleSort("login")}
                  textAlign="center"
                  sorted={column === "login" ? direction : null}
                >
                  <h3>Login</h3>
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <h3>Password</h3>
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  <h3>Role</h3>
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
              {filtered.map(expense => (
                <Table.Row key={expense.name} textAlign="right">
                  <Table.Cell textAlign="center">{expense.name}</Table.Cell>
                  <Table.Cell textAlign="center" className="mobile only">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      {expense.login}{" "}
                    </div>
                  </Table.Cell>
                  <Table.Cell textAlign="center" className="mobile only">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      {expense.password}{" "}
                    </div>
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

export default Users;
