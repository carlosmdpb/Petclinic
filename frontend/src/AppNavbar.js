import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Nav,Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, NavLink, NavbarText } from 'reactstrap';
import { Link } from 'react-router-dom';
import tokenService from './services/token.service';
import jwt_decode from "jwt-decode";

function AppNavbar() {
    const [roles, setRoles] = useState([]);
    const [username, setUsername] = useState("");
    const jwt = tokenService.getLocalAccessToken();
    const [collapsed, setCollapsed] = useState(true);
    const [pricingPlan, setPricingPlan] = useState(null);

    const toggleNavbar = () => setCollapsed(!collapsed);

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

    let adminLinks = <></>;
    let ownerLinks = <></>;
    let userLinks = <></>;
    let userLogout = <></>;
    let publicLinks = <></>;

    roles.forEach((role) => {
        if (role === "ADMIN") {
            adminLinks = (
                <>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/owners">Owners</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/pets">Pets</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/vets">Vets</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/consultations">Consultations</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/clinicOwners">Clinic Owners</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/clinics">Clinics</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/users">Users</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/requests">Requests</NavLink>
                    </NavItem>
                </>
            )
        }
        if (role === "OWNER") {
            ownerLinks = (
                <>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/myPets">
                            My Pets
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            style={{ color: "white" }} tag={Link} to="/consultations">
                            Consultations
                        </NavLink>
                    </NavItem>
                    <>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/bookings">
                    Bookings
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/offer">
                    Adoptions
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/offer/sent">
                    Offer Sent
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/offer/received">
                    Offer Received
                        </NavLink>
                    </NavItem>
                </>

                </>
            );
        }
        if (role === "VET") {
            ownerLinks = (
                <>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/consultations">Consultations</NavLink>
                    </NavItem>
                </>
            )
        }

        if (role === "CLINIC_OWNER") {
            ownerLinks = (
                <>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/clinics">Clinics</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/owners">Owners</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/consultations">Consultations</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/vets">Vets</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/petHotelRoom">PetHotel Rooms</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{ color: "white" }} tag={Link} to="/requests">Help</NavLink>
                    </NavItem>
                </>
            )
        }
    })
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);
    if (!jwt) {
        publicLinks = (
            <>
                <NavItem>
                    <NavLink style={{ color: "white" }} id="docs" tag={Link} to="/docs">Docs</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{ color: "white" }} id="plans" tag={Link} to="/plans">Pricing Plans</NavLink>
                </NavItem>
                <NavItem>
            <Dropdown isOpen={dropdownOpen} toggle={toggle}>
              <DropdownToggle caret style={{ color: "white" }}>
                lidia
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem tag={Link} to="/lidia/DogFacts">DogFacts</DropdownItem>
                <DropdownItem tag={Link} to="/lidia/DogAPI">DogAPI</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <NavItem>
                    <NavLink style={{ color: "white" }} tag={Link} to="/catDailyFacts">catDailyFacts</NavLink>
                </NavItem> 
          </NavItem>
                <NavItem>
                    <NavLink style={{ color: "white" }} id="register" tag={Link} to="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{ color: "white" }} id="login" tag={Link} to="/login">Login</NavLink>
                </NavItem>

            </>
        )
    } else {
        userLinks = (
            <>
                <NavItem>
                    <NavLink style={{ color: "white" }} tag={Link} to="/dashboard">Dashboard</NavLink>
                </NavItem>

            </>
        )
        userLogout = (
            <>
                <NavItem>
                    <NavLink style={{ color: "white" }} id="docs" tag={Link} to="/docs">Docs</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink style={{ color: "white" }} id="plans" tag={Link} to="/plans">Pricing Plans</NavLink>
                </NavItem>
                <NavbarText style={{ color: "white" }} className="justify-content-end">{username}</NavbarText>
                <span style={{ margin: '0 5px' }}></span> {/* Espacio */}
                <NavbarText style={{ color: "white" }} className="justify-content-end">{pricingPlan}</NavbarText>
                <NavItem className="d-flex">
                    <NavLink style={{ color: "white" }} id="logout" tag={Link} to="/logout">Logout</NavLink>
                </NavItem>
            </>
        )

    }

    return (
        <div>
            <Navbar expand="md" dark color="dark">
                <NavbarBrand href="/">
                    <img alt="logo" src="/logo1-recortado.png" style={{ height: 40, width: 40 }} />
                    PetClinic
                </NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="ms-2" />
                <Collapse isOpen={!collapsed} navbar>
                    <Nav className="me-auto mb-2 mb-lg-0" navbar>
                        {userLinks}
                        {adminLinks}
                        {ownerLinks}
                    </Nav>
                    <Nav className="ms-auto mb-2 mb-lg-0" navbar>
                        {publicLinks}
                        {userLogout}
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default AppNavbar;
