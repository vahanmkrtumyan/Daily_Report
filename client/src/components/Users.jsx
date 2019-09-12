import React, { useState, useEffect } from "react";
import { Icon, Button, Table, Input, Container } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import UserInput from "./Modals/UserInput";
import io from 'socket.io-client';

const Users = () => {
  const [users, SetUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);
  const [filter, setFilter] = useState("");
 
  
  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/items/users",
      crossDomain: true
    })
      .then(function(response) {
        SetUsers(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);


let socket = io.connect('http://localhost:5000');

socket.on('users', function(data) {
  console.log(data)
})






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

  let filtered = users
    ? users.filter(function(user) {
        return (
          user.firstname.toLowerCase().indexOf(searchUser.toLowerCase()) !== -1
        );
      })
    : [];

  let handleDelete = id => {
    console.log(id)
    axios.delete("http://localhost:5000/api/items/users", {
      data: { id: id }
    });
  };

  

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
                  <Table.Cell textAlign="center">{user.firstname}</Table.Cell>
                  <Table.Cell textAlign="center">{user.lastname}</Table.Cell>
                  <Table.Cell textAlign="center">{user.username}</Table.Cell>
                  <Table.Cell textAlign="center">{user.password}</Table.Cell>
                  <Table.Cell textAlign="center">{user.role}</Table.Cell>
                  <Table.Cell textAlign="center">
                    <UserInput user={user}/>
                  </Table.Cell>
                  <Table.Cell
                    textAlign="center"
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={() => handleDelete(user._id)}
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
