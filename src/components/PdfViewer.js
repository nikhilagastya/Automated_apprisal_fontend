import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import pdfjs from "pdfjs-dist/build/pdf";

export default function PdfViewer({ fileId, onClose, onApprove }) {
  const [pdfData, setPdfData] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchPdfData = async () => {
      try {
        console.log(fileId);
        const response = await fetch(
          `http://localhost:5000/get_pdf_data/${fileId}`
        );
        if (response.ok) {
          const data = await response.blob();
          setPdfData(data);
          console.log(data, "DD");
        } else {
          console.error("Error fetching PDF data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching PDF data:", error);
      }
    };

    fetchPdfData();
  }, [fileId]);

  const handleApprove = () => {
    onApprove();
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>PDF Viewer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {pdfData && (
          <Worker
            workerUrl={`https://unpkg.com/pdfjs-dist@${3}/build/pdf.worker.min.js`}
          >
            <Viewer fileUrl={window.URL.createObjectURL(pdfData)} />
          </Worker>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleApprove}>
          Approve
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
