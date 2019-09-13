import React, {useState} from "react";
import {Container, Header, Image, Menu, Segment, Sidebar, Dropdown, Icon} from "semantic-ui-react";
import { Link } from "react-router-dom";



const Head = () => {
    const [visible, setVisible] = useState(false);

    return (
    <div>
        <Menu fixed="top" inverted className="layout">
            <Container className="d-flex align-center justify-between">
                <div className="d-flex">
                    <Link className="item" to="">
                        Daily Report
                    </Link>
                    <Link className="item" to="/notifications">
                        Notifications
                    </Link>{" "}
                    <Link className="item" to="/users">Users</Link>
                    <Link className="item" to="/reports">Reports</Link>
                </div>


            </Container>
            <button onClick={()=> setVisible(!visible)} className="no-style-btn mr-15">
                <Icon
                    name="bell"
                    size='large'
                    className="no-style-btn icon-white active icon-notification"
                />
            </button>


        </Menu>
        <Sidebar
            as={Menu}
            animation='overlay'
            direction='right'
            inverted
            vertical
            visible={visible}
        >
            <Menu.Item as='a' header>
                File Permissions
            </Menu.Item>
            <Menu.Item as='a'>Share on Social</Menu.Item>
            <Menu.Item as='a'>Share by E-mail</Menu.Item>
            <Menu.Item as='a'>Edit Permissions</Menu.Item>
            <Menu.Item as='a'>Delete Permanently</Menu.Item>
        </Sidebar>

    </div>)
};

export default Head;
