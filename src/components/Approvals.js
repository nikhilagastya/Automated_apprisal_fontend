import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import PdfViewer from "./PdfViewer";

export default function Approvals() {
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [selectedPdfData, setSelectedPdfData] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  let info = localStorage.getItem("Details");
  info = JSON.parse(info);
  useEffect(() => {
    // Fetch pending approvals from your API
    // Update the state with the fetched data

    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/get_pending_approvals",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: info.email, // Replace with the actual email
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          setPendingApprovals(data.data);
        } else {
          console.error(
            "Error fetching pending approvals:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching pending approvals:", error);
      }
    };

    fetchData();
  });

  const handleViewDetails = (fileId) => {
    setSelectedFileId(fileId);
    setShowPdfViewer(true);
  };

  const handleApprove = async () => {
    try {
      // Send an approval request to your server
      const response = await fetch(`http://localhost:5000/approve`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // Additional data if needed
          id: selectedFileId,
        }),
      });

      if (response.ok) {
        console.log("File approved successfully");
        // You can update the UI or fetch the updated list of pending approvals
      } else {
        console.error("Error approving file:", response.statusText);
      }
    } catch (error) {
      console.error("Error approving file:", error);
    }
  };

  const handleClosePdfViewer = () => {
    setShowPdfViewer(false);
    setSelectedPdfData(null);
    setSelectedFileId(null);
  };

  return (
    <Container>
      <h1 className="mt-4 mb-4">Pending Approvals</h1>
      <Row>
        {pendingApprovals.map((approval) => (
          <Col key={approval._id} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{approval.filename}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Uploaded by: {approval.email}
                </Card.Subtitle>
                <Card.Text>{/* Additional details or description */}</Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleViewDetails(approval._id)}
                >
                  {" "}
                  View{" "}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {showPdfViewer && (
        <PdfViewer
          fileId={selectedFileId}
          onClose={handleClosePdfViewer}
          onApprove={handleApprove}
        />
      )}
    </Container>
  );
}
