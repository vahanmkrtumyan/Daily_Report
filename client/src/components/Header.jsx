import React, { useState } from "react";
import {
  Container,
  Card,
  Image,
  Menu,
  Segment,
  Sidebar,
  Dropdown,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";

const Head = () => {
  const [visible, setVisible] = useState(false);

  let user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Menu fixed="top" inverted className="layout">
        <Container className="d-flex align-center justify-between">
          <div className="d-flex">
            <Link className="item" to="">
              Daily Report
            </Link>
            {user && user.role === "Admin" ? (
              <Link className="item" to="/users">
                Users
              </Link>
            ) : null}
            {user ? (
              <Link className="item" to="/reports">
                Reports
              </Link>
            ) : null}
            <Link
              className="item"
              to="/"
              onClick={() => localStorage.removeItem("user")}
            >
              Logout
            </Link>
          </div>
        </Container>
        <button
          onClick={() => setVisible(!visible)}
          className="no-style-btn mr-15"
        >
          <Icon
            name="bell"
            size="large"
            className="no-style-btn icon-white active icon-notification"
          />
        </button>
      </Menu>
      <Sidebar
        as={Menu}
        animation="overlay"
        direction="right"
        inverted
        vertical
        visible={visible}
      >
        <Notifications />
      </Sidebar>
    </div>
  );
};

export default Head;