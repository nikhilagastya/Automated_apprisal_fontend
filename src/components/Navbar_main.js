import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav } from 'react-bootstrap';

const Navbar_main = () => {
  let info = localStorage.getItem("Details");
  info = JSON.parse(info);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Your Logo</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/home">Profile</Nav.Link>
          <Nav.Link href="/api_form">API Form</Nav.Link>
          <Nav.Link href="/status">Status</Nav.Link>
          {info.designation=="HOD" ? <Nav.Link href="/approvals">Approvals</Nav.Link> :""}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navbar_main;
