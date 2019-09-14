import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";
import axios from "axios";

const Notifications = () => {
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
        // setLoading(false);
        // setDisplay("");
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {notifications.map(notif => (
        <Card
          key={String(notif._id)}
          className="notification"
          fluid
          header={notif.usersname}
          meta="Friend"
          description={notif.type + " " + notif.reportname}
        />
      ))}
    </div>
  );
};

export default Notifications;
