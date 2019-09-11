import React, { useState, useEffect } from "react";
import { Icon, Button, Table, Input, Container } from "semantic-ui-react";
import _ from "lodash";
import UserInput from "./Modals/UserInput";

const Users = () => {
  const [users, SetUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);
  const [filter, setFilter] = useState("");

  const userList = [
    {
      id: 1,
      First_Name: "Vahan",
      Last_Name: "Mkrtumyan",
      role: "admin",
      password: "123456",
      username: "vahan"
    }
  ];

  let handleSort = clickedColumn => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      SetUsers(_.sortBy(users, [clickedColumn]));
      setDirection("descending");
      return;
    }
    SetUsers(users.reverse());
    setDirection(direction === "ascending" ? "descending" : "ascending");
  };

  let filtered =
    userList.filter(function(user) {
      return (
        user.First_Name.toLowerCase().indexOf(searchUser.toLowerCase()) !== -1
      );
    }) || [];

  return (
    <div style={{ position: "static", marginTop: "80px" }}>
      {" "}
      <div style={{ textAlign: "right" }}>
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
                  <h3>Username</h3>
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
              {filtered.map(user => (
                <Table.Row key={user.id} textAlign="right">
                  <Table.Cell textAlign="center">{user.First_Name}</Table.Cell>
                  <Table.Cell textAlign="center">{user.Last_Name}</Table.Cell>
                  <Table.Cell textAlign="center">{user.username}</Table.Cell>
                  <Table.Cell textAlign="center">{user.password}</Table.Cell>
                  <Table.Cell textAlign="center">{user.role}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <UserInput user={user} />
                  </Table.Cell>
                  <Table.Cell
                    textAlign="center"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Icon
                      name="trash"
                      color="red"
                      style={{
                        backgroundColor: "Transparent",
                        border: "none",
                        color: "#2ca5ee",
                        padding: "15px 32px",
                        textAlign: "center",
                        textDecoration: "none",
                        cursor: "pointer"
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

export default Users;
