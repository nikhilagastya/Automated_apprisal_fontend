import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Navbar_main = () => {
  let info = localStorage.getItem("Details");
  info = JSON.parse(info);
  const navigate = useNavigate();
  return (

   
    <Navbar bg="white" variant="light" expand="lg">
      <img src='anurag_logo.png' style={{ width: "100px" }} alt="Logo" />
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
       <button onClick={()=>{navigate("/home")}}> <Nav.Link style={{ color: "black", fontWeight: "bold" }} >
            Profile
          </Nav.Link>
          </button>
          <button onClick={()=>{navigate("/home")}}>
          <Nav.Link style={{ color: "black", fontWeight: "bold" }} href="/api_form">
            API Form
          </Nav.Link>
          </button>
          <button onClick={()=>{navigate("/home")}}>
          <Nav.Link style={{ color: "black", fontWeight: "bold" }} href="/status">
            Status
          </Nav.Link>
          </button>
          {info.designation === "HOD" ? (
             <button onClick={()=>{navigate("/home")}}>
            <Nav.Link style={{ color: "black", fontWeight: "bold" }} href="/approvals">
              Approvals
            </Nav.Link>
            </button>
          ) : (
            ""
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    
  );
  
};

export default Navbar_main;
