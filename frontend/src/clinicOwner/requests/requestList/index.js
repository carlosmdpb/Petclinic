import React from "react";
import "../../../static/css/owner/editPet.css";
import "../../../static/css/auth/authButton.css"
import { Link } from "react-router-dom";

export default function ClinicOwnerRequestEdit(){

  return (
    <div className="pet-list-page-container">
      <h1 className="pet-list-title">How to Make Requests</h1>
      <ol>
          <li>Log in to your iTop account.</li>
          <li>Navigate to the "Requests" section.</li>
          <li>Click on the "New Request" button.</li>
          <li>Fill out the request form with all the necessary details.</li>
          <li>Submit the request.</li>
      </ol>
      <div className="pet-options mt-2" align="center">
          <Link
            to={"https://oitilo.us.es/itop/pages/UI.php"}
            className="auth-button brown-2"
            style={{ textDecoration: "none" }}
            >
            Make a request
          </Link>
      </div>      
    </div>
  );

}