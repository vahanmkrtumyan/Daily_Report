import React, { useState, useEffect } from "react";
import { Card } from "semantic-ui-react";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);


  return (
    <div>
      <Card
        className="notification"
        fluid
        header="Elliot Baker"
        meta="Friend"
        description="Elliot is a sound engineer living in Nashville who enjoys playing guitar and hanging with his cat."
      />
    </div>
  );
};

export default Notifications;
