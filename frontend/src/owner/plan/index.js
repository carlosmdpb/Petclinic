import React, { useEffect, useState } from "react";
import { BsDot, BsFillRocketTakeoffFill } from "react-icons/bs";
import { FaCheck, FaPaperPlane, FaTimes } from "react-icons/fa";
import { ImAirplane } from "react-icons/im";
import jwt_decode from "jwt-decode";
import "../../static/css/pricing/pricingPage.css";

export default function PricingPlan () {
  const [roles, setRoles] = useState([]);
  const [username, setUsername] = useState("");
  const [pricingPlan, setPricingPlan] = useState(null);

  const [message, setMessage] = useState(null);  
  const jwt = JSON.parse(window.localStorage.getItem("jwt"));


  useEffect(() => {
    if (jwt) {
        const userRoles = jwt_decode(jwt).authorities;
        setRoles(userRoles);
        setUsername(jwt_decode(jwt).sub);
        
        if (userRoles.includes("OWNER")) {
            fetchPlanOwner();
        } else if (userRoles.includes("VET")){
            fetchPlanVet();
        }   
    }
}, [jwt]);

  const fetchPlanOwner = () => {
      const requestOptions = {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      };

      fetch('/api/v1/plan', requestOptions)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch pricing plan');
              }
              return response.json();
          })
          .then(data => {
              console.log('Response data:', data);
              if (data && data.plan) {
                  setPricingPlan(data.plan);
              } else {
                  throw new Error('Unexpected response format');
              }
          })
          .catch(error => {
              console.error('Error fetching pricing plan:', error);
          });
  };

  const fetchPlanVet = () => {
      const requestOptions = {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${jwt}`
          }
      };

      fetch('/api/v2/plan', requestOptions)
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to fetch pricing plan');
              }
              return response.json();
          })
          .then(data => {
              console.log('Response data:', data);
              if (data && data.plan) {
                  setPricingPlan(data.plan);
              } else {
                  throw new Error('Unexpected response format');
              }
          })
          .catch(error => {
              console.error('Error fetching pricing plan:', error);
          });
  };



  async function changePlan(event, pricingPlan) {
    event.preventDefault();

    await fetch("/api/v1/plan", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pricingPlan),
    });
    window.location.href = "/plans";
  }

  
    
    if (message) {
      return <h2 className="text-center">{message}</h2>;
    }

    return (
      <div className="pricing-page-container">
        <div>
          <h1 className="pricing-title">My Plan - {pricingPlan}</h1>
        </div>
        <div className="section-pricing">
          <div className="pricing-container">
            <div className="pricing-card text-center">
              <div className="title">
                <div className="icon">
                  <FaPaperPlane color="white" />
                </div>
                <h2>BASIC</h2>
              </div>
              <div className="plan-price">
                <h4>18€</h4>
              </div>
              <div className="option">
                <ul>
                  <li>
                    <BsDot color="white" /> 2 pets
                  </li>
                  <li>
                    <BsDot color="white" /> 1 visit per month and pet
                  </li>
                  <li>
                    <BsDot color="white" /> Low support priority
                  </li>
                  <li>
                    <FaCheck color="green"/> Visit service access
                  </li>
                  <li>
                    <FaTimes color="red"/> Adoptions service
                  </li>
                  <li>
                    <FaTimes color="red"/> Pet Hotel service
                  </li>
                  <li>
                    <FaTimes color="red"/> Making change requests
                  </li>
                  <li>
                    <FaTimes color="red"/> Priority phone and mail support
                  </li>
                  <li>
                    <FaTimes color="red"/> SLA guaranteed
                  </li>
                  <li>
                    <FaTimes color="red" /> Vet Selection for Visits
                  </li>
                  <li>
                    <FaTimes color="red" /> Calendar with Upcoming Visits
                  </li>
                  <li>
                    <FaTimes color="red" /> Dashboard of your Pets
                  </li>
                  <li>
                    <FaTimes color="red" /> Online Consultation
                  </li>
                </ul>
              </div>
              {pricingPlan === "BASIC" ? (
                <button disabled> ACTIVE </button>
                ) : (
                <button onClick={(e) => changePlan(e, "BASIC")}> CHANGE </button>
                )}
            </div>
            {/* END Col one */}
            <div className="pricing-card text-center">
              <div className="title">
                <div className="icon">
                  <ImAirplane color="white" />
                </div>
                <h2>GOLD</h2>
              </div>
              <div className="plan-price">
                <h4>47€</h4>
              </div>
              <div className="option">
                <ul>
                  <li>
                    <BsDot color="white" /> 4 pets
                  </li>
                  <li>
                    <BsDot color="white" /> 3 visit per month and pet
                  </li>
                  <li>
                    <BsDot color="white" /> Medium support priority
                  </li>
                  <li>
                    <FaCheck color="green"/> Visit service access
                  </li>
                  <li>
                    <FaCheck color="green"/> Adoptions service
                  </li>
                  <li>
                    <BsDot color="white" /> 210 adoptions
                  </li>
                  <li>
                    <FaTimes color="red"/> Pet Hotel service
                  </li>
                  <li>
                    <FaTimes color="red"/> Making change requests
                  </li>
                  <li>
                    <FaTimes color="red"/> Priority phone and mail support
                  </li>
                  <li>
                    <FaCheck color="green"/> SLA guaranteed
                  </li>
                  <li>
                    <FaCheck color="green" /> Vet Selection for Visits
                  </li>
                  <li>
                    <FaCheck color="green" /> Calendar with Upcoming Visits
                  </li>
                  <li>
                    <FaTimes color="red" /> Dashboard of your Pets
                  </li>
                  <li>
                    <FaTimes color="red" /> Online Consultation
                  </li>
                </ul>
              </div>
              {pricingPlan === "GOLD" ? (
                <button disabled> ACTIVE </button>
                ) : (
                <button onClick={(e) => changePlan(e, "GOLD")}> CHANGE </button>
                )}
            
            </div>
            {/* END Col two */}
            <div className="pricing-card text-center">
              <div
                className="title"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="icon">
                  <BsFillRocketTakeoffFill color="white" />
                </div>
                <h2>PLATINUM</h2>
              </div>
              <div className="plan-price">
                <h4>94</h4>

                <h5>€</h5>
              </div>
              <div className="option">
                <ul>
                  <li>
                    <BsDot color="white" /> 7 pets
                  </li>
                  <li>
                    <BsDot color="white" /> 6 visit per month and pet
                  </li>
                  <li>
                    <BsDot color="white" /> High support priority
                  </li>
                  <li>
                    <FaCheck color="green"/> Visit service access
                  </li>
                  <li>
                    <FaCheck color="green"/> Adoptions service
                  </li>
                  <li>
                    <BsDot color="white" /> 420 adoptions
                  </li>
                  <li>
                    <FaCheck color="green"/> Pet Hotel service
                  </li>
                  <li>
                    <FaCheck color="green"/> Making change requests
                  </li>
                  <li>
                    <BsDot color="white" /> 450 bookings
                  </li>
                  <li>
                    <FaCheck color="green"/> Priority phone and mail support
                  </li>
                  <li>
                    <FaCheck color="green"/> SLA guaranteed
                  </li>
                  <li>
                    <FaCheck color="green" /> Vet Selection for Visits
                  </li>
                  <li>
                    <FaCheck color="green" /> Calendar with Upcoming Visits
                  </li>
                  <li>
                    <FaCheck color="green" /> Dashboard of your Pets
                  </li>
                  <li>
                    <FaCheck color="green" /> Online Consultation
                  </li>
                </ul>
              </div>
            {pricingPlan === "PLATINUM" ? (
                <button disabled> ACTIVE </button>
                ) : (
                <button onClick={(e) => changePlan(e, "PLATINUM")}> CHANGE </button>
                )}
            </div>
            {/* END Col three */}
          </div>
        </div>
      </div>
    );
}