import React, { useState, useEffect } from "react";
import { Icon, Table, Input, Container, Search } from "semantic-ui-react";
import axios from "axios";
import _ from "lodash";
import UserInput from "./Modals/UserInput";
import io from "socket.io-client";
import Head from "./Header";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const [column, setColumn] = useState(null);
  const [direction, setDirection] = useState(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/items/users",
      crossDomain: true,
      params: { user: localStorage.getItem("user") }
    })
      .then(function(response) {
        setUsers(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  let user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  let socket = io.connect("http://localhost:5000");

  socket.on("users", function(data) {
    console.log(data);
  });

  let handleSort = clickedColumn => () => {
    if (column !== clickedColumn) {
      setColumn(clickedColumn);
      setUsers(_.sortBy(users, [clickedColumn]));
      setDirection("descending");
      return;
    }
    setUsers(users.reverse());
    setDirection(direction === "ascending" ? "descending" : "ascending");
  };

  // let filtered = users
  //   ? users.filter(function(user) {
  //       return (
  //         user.firstname.toLowerCase().indexOf(searchUser.toLowerCase()) !== -1
  //       );
  //     })
  //   : [];

  let handleDelete = id => {
     axios.delete("http://localhost:5000/api/items/users", {
      data: { id: id }
    });
    let newArray = users.filter(function(user) {
      return user._id !== id;
    });
    setUsers(newArray);
  };

  let handleAdd = user => {
    let usersNew = [...users];
    usersNew.push(user);
    setUsers(usersNew);
  };

  let handleUpdate = user => {
    let usersNew = [...users];
    let index = usersNew.findIndex(k => k._id === user._id);
    usersNew[index] = user;
    setUsers(usersNew);
  };

  return (
    <div>
    <Head/>
    <div className="pt-70">
      <Container>
        <div className="pb-20 pt-30 d-flex justify-between">
          <div>
            <Input icon="search" placeholder="Search..." />
          </div>
          <div>
            <UserInput add={handleAdd} />
          </div>
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
                Username
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Password</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Role</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Edit</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">Delete</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {users.map(user => (
              <Table.Row key={user.username} textAlign="right">
                <Table.Cell textAlign="center">{user.firstname}</Table.Cell>
                <Table.Cell textAlign="center">{user.lastname}</Table.Cell>
                <Table.Cell textAlign="center">{user.username}</Table.Cell>
                <Table.Cell textAlign="center">{user.password}</Table.Cell>
                <Table.Cell textAlign="center">{user.role}</Table.Cell>
                <Table.Cell textAlign="center">
                  <UserInput user={user} update={handleUpdate} />
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => handleDelete(user._id)}
                >
                  <Icon
                    name="trash"
                    color="red"
                    className="no-style-btn bell"
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
