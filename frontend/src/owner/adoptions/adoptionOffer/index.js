import React, { useState, useEffect } from "react";
import tokenService from "../../../services/token.service";
import "../../../static/css/owner/adoptionList.css";

export default function AdoptionOffer() {
  let pathArray = window.location.pathname.split("/");
  const [adoptionId, setAdoptionId] = useState(pathArray[2]);
  const [adoption, setAdoption] = useState(null);
  const user = tokenService.getUser();
  const jwt = tokenService.getLocalAccessToken();

  const getAdoption = async () => {
    try {
      const response = await fetch(`/api/v1/adoption/${adoptionId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      const adoption = await response.json();
      setAdoption(adoption);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAdoption();
  }, []);

  const [description, setDescription] = useState("");

  const handleDescriptionChange = (event) => {
    
      setDescription(event.target.value);
    
  };

  const handleAddButtonClick = async () => {
    try {
      if (description == ''){
      alert('Description cannot be empty');
    } else{
       await fetch(`/api/v1/offer`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: description,
          offeringOwnerUserId: user.id,
          adoptationId: adoptionId,
        }),
      }).then(() => {
        window.location.href = "/offer/sent";
      });
    }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="adoption-list-page-container">
      {adoption != null ? (
        <div key={adoption.id} className="adoption-row">
          <h4>
            Do you want to adopt{" "}
            <span style={{ color: "red", fontSize: "30px" }}>
              {adoption.pet.name}
            </span>
            ?
          </h4>
          <div className="adoption-row">
            <span>
              <strong>Type:</strong> {adoption.pet.type.name}
            </span>
            <span>
              <strong>Owner:</strong> {adoption.owner.user.username}
            </span>
          </div>
          <div className="adoption-row">
            <input
              type="text"
              className="custom-input"
              value={description}
              onChange={handleDescriptionChange}
              placeholder="Enter description"
            />
            <button
              className="auth-button brown-3 mt-4"
              onClick={handleAddButtonClick}
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
