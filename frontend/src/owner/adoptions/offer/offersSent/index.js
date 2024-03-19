import "../../../../static/css/owner/adoptionList.css";
import "../../../../static/css/auth/authButton.css";
import { Link } from "react-router-dom";
import tokenService from "../../../../services/token.service";
import { useState, useEffect } from "react";

export default function OffersSent() {
  let [offers, setOffers] = useState([]);

  const user = tokenService.getUser();
  const jwt = tokenService.getLocalAccessToken();

  async function setUp() {
    let offers = await (
      await fetch(`/api/v1/offer/sent/${user.id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
    ).json();
    setOffers(offers);
  }


  useEffect(() => {
    setUp();
  }, []);

  return (
    <div>
      {/* <AppNavbar /> */}
      <div className="adoption-list-page-container">
        <div className="title-and-add">
          <h1 className="adoption-list-title">Offers Sent</h1>
          <Link
            to="/offer"
            className="auth-button brown-1"
            style={{ textDecoration: "none", marginBottom: "2rem" }}
          >
            New Offer
          </Link>
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
                    <strong>Description:</strong> {offer.description}
                  </span>
                  <span>
                    <strong>Status: </strong>
                    {offer.status === "PENDING" ? (
                      <span style={{ color: "orange" }}>Pending</span>
                    ) : offer.status === "ACCEPTED" ? (
                      <span style={{ color: "green" }}>Accepted</span>
                    ) : (
                      <span style={{ color: "red" }}>Rejected</span>
                    )}{" "}
                  </span>
                </div>
                <div className="pet-options"></div>
              </div>
            );
          })
        ) : (
          <p>No adoptions offers sent</p>
        )}
      </div>
    </div>
  );
}
