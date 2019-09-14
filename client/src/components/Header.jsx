import React, { useState } from "react";
import { Container, Menu, Sidebar, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Notifications from "./Notifications";

const Head = () => {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState("");

  let user = JSON.parse(localStorage.getItem("user"));

  let handleCount = rows => {
    if (rows.length > 0) {
      setActive("active");
    } else setActive("");
  };

  return (
    <div>
      <Menu fixed="top" inverted className="layout">
        <Container className="d-flex align-center justify-between">
          <div className="d-flex">
            <Link className="item" to="/reports">
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
            className={`no-style-btn icon-white ${active} icon-notification`}
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
        <div style={{ maxWidth: "90%", margin: "auto", paddingTop: "5px" }}>
          
          <Notifications count={handleCount} />
        </div>
      </Sidebar>
    </div>
  );
};

export default Head;
