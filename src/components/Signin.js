import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      // Check if passwords match
      if (password !== confirmPassword) {
        console.error("Passwords don't match");
        return;
      }
      console.log("daerg", department);
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          dateOfBirth,
          designation,
          department,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("User registration successful:", data);
        navigate("/login");
        console.log(department);
        // Perform actions for successful registration (redirect, set user state, etc.)
      } else {
        const errorData = await response.json();
        console.error("User registration failed:", errorData.error);
        // Handle registration failure (show error message, etc.)
      }
    } catch (error) {
      console.error("Error during user registration:", error);
      // Handle other errors (network issues, etc.)
    }
  };

  return (
    <div style={{ height: "50%", width: "60%" }}>
      <h2>User Sign Up</h2>
      <form style={{ marginLeft: "70%" }}>
        <label>First Name:</label>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <br />

        <label>Last Name:</label>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <br />

        <label>Date of Birth:</label>
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <br />

        <label>Designation:</label>
        <select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option value="Lecturer">Lecturer</option>
          <option value="Asst Professor">Asst Professor </option>
          <option value="Associate Professor">Associate Professor</option>
          <option value="Professor"> Professor</option>
          <option value="HOD"> HOD</option>
        </select>
        <br />

        <label>Department:</label>
        <select
          value={department}
          onChange={(e) => {
            setDepartment(e.target.value);
            console.log(department);
          }}
        >
          <option value="">Choose Department</option>
          <option value="CSE">CSE</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
          <option value="AI">AI</option>
          <option value="EEE">EEE</option>
          <option value="Chemical">Chemical</option>
          <option value="Civil">Civil</option>
          {/* Add more options as needed */}
        </select>
        <br />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <label>Confirm Password:</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />

        <button type="button" onClick={handleSignIn}>
          Sign Up
        </button>
        <br></br>
        <button
          onClick={() => {
            navigator("/login");
          }}
        >
          Already Registered ? Click to login
        </button>
        <a href="/login">Already Registered ? Click to login</a>
      </form>
    </div>
  );
}
