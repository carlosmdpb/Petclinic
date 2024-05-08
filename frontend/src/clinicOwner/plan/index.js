import React, { useEffect, useState } from "react";
import { FaCheck, FaPaperPlane, FaTimes, FaCarrot } from "react-icons/fa";
import { GiOrangeSlice } from "react-icons/gi";
import { BsFillRocketTakeoffFill, BsDot } from "react-icons/bs";
import tokenService from "../../services/token.service";
import useFetchState from "../../util/useFetchState";
import "../../static/css/pricing/pricingPage.css";
import { CiApple } from "react-icons/ci";

const user = tokenService.getUser();

export default function PricingPlan() {
  const [plan, setPlan] = useState(null);
  const [clinicOwner, setClinicOwner] = useState({});
  const [message, setMessage] = useState(null);
  const jwt = JSON.parse(window.localStorage.getItem("jwt"));
  const [visible, setVisible] = useState(false);
  const [clinics, setClinics] = useFetchState(
    [],
    `/api/v1/clinics?userId=${user.id}`,
    jwt,
    setMessage,
    setVisible
  );
  const [selectedClinic, setSelectedClinic] = useState(null);

  useEffect(() => {
    setUp();
  }, []);

  async function setUp() {
    const myClinicOwner = await (
      await fetch(`/api/v3/plan`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })
    ).json();
    if (myClinicOwner.message) setMessage(myClinicOwner.message);
  }

  async function changePlan(event, plan) {
    event.preventDefault();
    await fetch("/api/v3/plan", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    });
    window.location.href = "/plan";
  }

  function handleClinicChange(event) {
    const selectedClinicId = event.target.value;
    setSelectedClinic(selectedClinicId);
    // Aquí puedes hacer algo con el ID de la clínica seleccionada, como cargar su plan
  }

  if (message) {
    return <h2 className="text-center">{message}</h2>;
  }

  return (
    <div className="pricing-page-container">
      <div>
        <h1 className="pricing-title">My Plan {selectedClinic.PricingPlan}</h1>
      </div>
      <div>
        <label>Select Clinic:</label>
        <select onChange={handleClinicChange}>
          <option value="">Select Clinic</option>
          {clinics.map((clinic) => (
            <option key={clinic.id} value={clinic.id}>
              {clinic.name}
            </option>
          ))}
        </select>
      </div>
      <div className="section-pricing">
        <div className="pricing-container">
          <div className="pricing-card text-center">
            <div className="title">
              <div className="icon">
                <FaCarrot color="white" />
              </div>
              <h2>BASIC</h2>
            </div>
            <div className="plan-price">
              <h4>10.00</h4>
              <h5>€</h5>
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
          </div>
          {/* END Col one */}
          <div className="pricing-card text-center">
            <div className="title">
              <div className="icon">
                <GiOrangeSlice color="white" />
              </div>
              <h2>GOLD</h2>
            </div>
            <div className="plan-price">
              <h4>30.00</h4>
              <h5>€</h5>
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
          </div>
          {/* END Col two */}
          <div className="pricing-card text-center">
            <div
              className="title"
              style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
            >
              <div className="icon">
                <CiApple color="white" />
              </div>
              <h2>PLATINUM</h2>
            </div>
            <div className="plan-price">
              <h4>50.00</h4>
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
          </div>
          {/* END Col three */}
        </div>
      </div>
    </div>
  );
}
