import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Status = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  let info = localStorage.getItem("Details");
  info = JSON.parse(info);

  useEffect(() => {
    const handleCheckStatus = async () => {
      try {
        const response = await fetch("http://localhost:5000/status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: info.email }),
        });

        if (response.ok) {
          const data = await response.json();
          setStatus(data.status || data.message);
        } else {
          console.error("Error checking status:", response.statusText);
        }
      } catch (error) {
        console.error("Error checking status:", error);
      }
    };

    handleCheckStatus();
  });

  return (
    <div>
      <h1>Status</h1>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Status Check</Card.Title>
          <Card.Text>
            <Card.Text>{info.firstName}</Card.Text>
            <Card.Text>{info.email}</Card.Text>
          </Card.Text>

          <Card.Text className="mt-3">
            <strong>Status:</strong> {status}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Status;
