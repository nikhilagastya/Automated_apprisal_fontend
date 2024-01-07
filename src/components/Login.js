import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


export default function Loginin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:5000/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userEmail",email);
        navigate("/home");
        console.log('Authentication successful:', data);
        // Perform actions for successful login (redirect, set user state, etc.)
      } else {
        const errorData = await response.json();
        console.error('Authentication failed:', errorData.error);
        window.alert("Wrong Password")
        // Handle authentication failure (show error message, etc.)
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
      // Handle other errors (network issues, etc.)
    }
  };

  return (
    <div>
      
      <form style={{marginLeft:"40%", marginTop:"15%"}}>
      <h2>Sign In</h2>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="button" onClick={handleSignIn}>
          Sign In
        </button>
        <br></br>
      <button onClick={()=>{
        navigate("/signup")
      }}> Click here to signup</button>
      </form>
    </div>
  );
}
