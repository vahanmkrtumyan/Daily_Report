import React, { useState, useEffect } from "react";
import { Card, Button } from "semantic-ui-react";
import axios from "axios";

const Notifications = props => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "http://localhost:5000/api/notifications",
      crossDomain: true,
      params: { user: localStorage.getItem("user") }
    })
      .then(function(response) {
        setNotifications(response.data);
        props.count(response.data);

        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  let handleDelete = id => {

    //let newArray = id === "all" ? Array.from(notifications, x => x._id) : [id];

    axios.delete("http://localhost:5000/api/notifications", {
      data: { id, user: localStorage.getItem("user") }
    });

    if (id !== "all") {
      let newArray = notifications.filter(function(not) {
        return not._id !== id;
      });
      setNotifications(newArray);
      props.count(newArray);
    } else {
      setNotifications([]);
      props.count([]);
    }
  };

  return (
    <div>
      <div className="notifcont">
        <Button negative onClick={() => handleDelete("all")}>
          Clear
        </Button>
      </div>
      {notifications.map(notif => (
        <Card
          key={String(notif._id)}
          className="notification"
          fluid
          header={notif.usersname}
          //  meta="Friend"
          description={notif.type + " " + notif.reportname}
          onClick={() => handleDelete(notif._id)}
        />
      ))}
    </div>
  );
};

export default Notifications;
