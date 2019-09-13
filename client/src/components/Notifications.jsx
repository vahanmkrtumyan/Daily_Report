import React, { useState, useEffect } from "react";
import { Icon, Input, Card } from "semantic-ui-react";
import ReportInput from "./Modals/ReportInput";
import UserInput from "./Modals/UserInput";

const Notifications = () => {
  const [reports, SetReports] = useState([]);

  let asd = "asd";

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
