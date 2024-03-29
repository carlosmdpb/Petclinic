import "../../../static/css/owner/adoptionList.css";
import "../../../static/css/auth/authButton.css";
import { Link } from "react-router-dom";
import tokenService from "../../../services/token.service";
import { useState, useEffect } from "react";

export default function AdoptionList() {
  let [adoptions, setAdoptions] = useState([]);

  const user = tokenService.getUser();
  const jwt = tokenService.getLocalAccessToken();

  async function setUp() {
    let adoptions = await (
      await fetch(`/api/v1/offer/notOffered/${user.id}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      })
    ).json();
    setAdoptions(adoptions);
  }

  useEffect(() => {
    setUp();
  }, []);

  return (
    <div>
      {/* <AppNavbar /> */}
      <div className="adoption-list-page-container">
        <div className="title-and-add">
          <h1 className="adoption-list-title">Make an offer to adopt</h1>
        </div>
        {adoptions.length > 0 ? (
          adoptions.map((adoption) => {
            return (
              <div key={adoption.id} className="adoption-row">
                <h4 className="adoption-name">{adoption.pet.name}</h4>
                <div className="adoption-row">
                  <span>
                    <strong>Type:</strong> {adoption.pet.type.name}
                  </span>
                  <span>
                    <strong>Owner:</strong> {adoption.owner.user.username}
                  </span>
                  <Link
                    to={"/offer/" + adoption.id}
                    className="auth-button brown-2"
                    style={{ textDecoration: "none", marginTop: "1rem" }}
                  >
                    Adopt
                  </Link>
                </div>
                <div className="pet-options"></div>
              </div>
            );
          })
        ) : (
          <p>No adoptions available</p>
        )}
      </div>
    </div>
  );
}
