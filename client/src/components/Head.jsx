import React from "react";
import { Container, Header, Image, Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./layout.css";

const Head = () => (
  <div>
    <Menu fixed="top" inverted className="layout">
      <Container>
        <Menu.Item as="a" header>
          {/* <Image
            size="mini"
            src="../../logo.svg"
            style={{ marginRight: "1.5em" }}
          /> */}
          Daily Report
        </Menu.Item>
        <Menu.Item as="a">
          <Link to="/notifications">Notifications</Link>{" "}
        </Menu.Item>
        <Menu.Item as="a">
          <Link to="/users">Users</Link>
        </Menu.Item>
        <Menu.Item as="a">
          <Link to="/reports">Reports</Link>
        </Menu.Item>

        {/* <Dropdown item simple text="Dropdown">
          <Dropdown.Menu>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Header>Header Item</Dropdown.Header>
            <Dropdown.Item>
              <i className="dropdown icon" />
              <span className="text">Submenu</span>
              <Dropdown.Menu>
                <Dropdown.Item>List Item</Dropdown.Item>
                <Dropdown.Item>List Item</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Item>
            <Dropdown.Item>List Item</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </Container>
    </Menu>
  </div>
);

export default Head;
