import "../../../../static/css/owner/adoptionList.css";
import "../../../../static/css/auth/authButton.css";
import { Link } from "react-router-dom";
import tokenService from "../../../../services/token.service";
import { useState, useEffect } from "react";

export default function ReceivedOffers() {
  let [offers, setOffers] = useState([]);

  const user = tokenService.getUser();
  const jwt = tokenService.getLocalAccessToken();

  async function setUp() {
    let offers = await (
      await fetch(`/api/v1/offer/received/${user.id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
    ).json();
    setOffers(offers);
  }

  async function updateOffer(offerId, status) {

    try {
      await fetch(`/api/v1/offer/update/${offerId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: status,
        
      }).then(() => {
        setUp();
      });
    } catch (error) {
      console.error(error);
    }
  }
    

  useEffect(() => {
    setUp();
  }, []);

  return (
    <div>
      {/* <AppNavbar /> */}
      <div className="adoption-list-page-container">
        <div className="title-and-add">
          <h1 className="adoption-list-title">Received offers</h1>
        </div>
        {offers.length > 0 ? (
          offers.map((offer) => {
            return (
              <div key={offer.id} className="adoption-row">
                <h4 className="adoption-name">{offer.adoptation.pet.name}</h4>
                <div className="adoption-row">
                  <span>
                    <strong>Type:</strong> {offer.adoptation.pet.type.name}
                  </span>
                  <span>
                    <strong>Offered by:</strong>{" "}
                    {offer.offeringOwner.user.username}
                  </span>
                  <span>
                    <strong>Description:</strong> {offer.description}
                  </span>
                </div>
                <div className="pet-options">
                  <button
                    className="auth-button green-3"
                    onClick={() => updateOffer(offer.id, "ACCEPTED")}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateOffer(offer.id, "REJECTED")}
                    className="auth-button-red red-3"
                  >
                    Decline
                  </button>
                </div>
              </div>
            );
            })
          ) : (
            <p>You have not received any new offers.</p>
          )}
          </div>
        </div>
        );
}
