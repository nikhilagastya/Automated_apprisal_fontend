import React, { useEffect, useState } from "react";

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState(null);

  useEffect(() => {
    // Get email from local storage
    const userEmail = localStorage.getItem("userEmail");

    if (userEmail) {
      // Fetch profile details using the /get_details route as a POST request
      fetch("http://localhost:5000/get_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      })
        .then((response) => response.json())
        .then((data) => {
          setProfileDetails(data.data);
          localStorage.setItem("Details", JSON.stringify(data.data));
        })
        .catch((error) =>
          console.error("Error fetching profile details:", error)
        );
    }
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {profileDetails ? (
        <div className="profile-card">
          <div className="card-header">User Details</div>
          <div className="card-body">
            <p>
              <strong>First Name:</strong> {profileDetails.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {profileDetails.lastName}
            </p>
            <p>
              <strong>Email:</strong> {profileDetails.email}
            </p>
            <p>
              <strong>Password:</strong> {profileDetails.password}
            </p>
            <p>
              <strong>Date of Birth:</strong> {profileDetails.dateOfBirth}
            </p>
            <p>
              <strong>Designation:</strong> {profileDetails.designation}
            </p>
            <p>
              <strong>Department:</strong> {profileDetails.department}
            </p>
            {/* Add more profile details as needed */}
          </div>
        </div>
      ) : (
        <p>Loading profile details...</p>
      )}
    </div>
  );
};

export default Profile;
