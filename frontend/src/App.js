import React from "react";
import { Route, Routes } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { ErrorBoundary } from "react-error-boundary";
import AppNavbar from "./AppNavbar";
import Home from "./home";
import PrivateRoute from "./privateRoute";
import PricingPlan from "./owner/plan";
import Register from "./auth/register";
import Login from "./auth/login";
import Logout from "./auth/logout";
import OwnerPetList from "./owner/pets/petList";
import OwnerPetEdit from "./owner/pets/petEdit";
import OwnerVisitEdit from "./owner/visits/visitEdit";
import PlanList from "./public/plan";
import tokenService from "./services/token.service";
import OwnerDashboard from "./owner/dashboard";
import OwnerConsultationList from "./owner/consultations/consultationList";
import OwnerConsultationEdit from "./owner/consultations/consultationEdit";
import OwnerConsultationTickets from "./owner/consultations/tickets/ticketList";
import VetConsultationList from "./vet/consultations/consultationList";
import VetConsultationTickets from "./vet/consultations/tickets/ticketList";
import PetEditAdmin from "./admin/pets/PetEditAdmin";
import PetListAdmin from "./admin/pets/PetListAdmin";
import UserListAdmin from "./admin/users/UserListAdmin";
import UserEditAdmin from "./admin/users/UserEditAdmin";
import OwnerListAdmin from "./admin/owners/OwnerListAdmin";
import OwnerEditAdmin from "./admin/owners/OwnerEditAdmin";
import SpecialtyListAdmin from "./admin/vets/SpecialtyListAdmin";
import SpecialtyEditAdmin from "./admin/vets/SpecialtyEditAdmin";
import VetListAdmin from "./admin/vets/VetListAdmin";
import VetEditAdmin from "./admin/vets/VetEditAdmin";
import VisitListAdmin from "./admin/visits/VisitListAdmin";
import VisitEditAdmin from "./admin/visits/VisitEditAdmin";
import ConsultationListAdmin from "./admin/consultations/ConsultationListAdmin";
import TicketListAdmin from "./admin/consultations/TicketListAdmin";
import ConsultationEditAdmin from "./admin/consultations/ConsultationEditAdmin";
import SwaggerDocs from "./public/swagger";
import ClinicsList from "./clinicOwner/clinicsList";
import EditClinic from "./clinicOwner/clinicEdit";
import OwnerListClinicOwner from "./clinicOwner/ownersList";
import ClinicOwnerListAdmin from "./admin/clinicOwners/ClinicOwnerListAdmin";
import ClinicOwnerEditAdmin from "./admin/clinicOwners/ClinicOwnerEditAdmin";
import ClinicListAdmin from "./admin/clinics/ClinicListAdmin";
import ClinicEditAdmin from "./admin/clinics/ClinicEditAdmin";
import ConsultationListClinicOwner from "./clinicOwner/consultations/ConsultationListClinicOwner";
import ConsultationEditClinicOwner from "./clinicOwner/consultations/ConsultationEditClinicOwner";
import VetListClinicOwner from "./clinicOwner/vets/VetListClinicOwner";
import VetEditClinicOwner from "./clinicOwner/vets/VetEditClinicOwner";
import PetHotelRoomsList from "./clinicOwner/petHotelRoomList";
import EditPetHotelRoom from "./clinicOwner/petHotelRoomEdit";
import { CreateBooking } from "./owner/booking/CreateBooking";
import { GetAllBooking } from "./owner/booking/GetAllBooking";
import AdoptionList from "./owner/adoptions/adoptionList";
import AdoptionOffer from "./owner/adoptions/adoptionOffer";
import ReceivedOffers from "./owner/adoptions/offer/receivedOffers";
import OffersSent from "./owner/adoptions/offer/offersSent";
import SLA from "./home/SLA.js";
import RequestListClinicOwner from "./clinicOwner/requests/requestList";
import RequestEditClinicOwner from "./clinicOwner/requests/requestEdit";
import RequestListAdmin from "./admin/requests/requestList";
import  DogAPI  from "./apis/lidia/DogAPI.js";
import DogFacts from "./apis/lidia/DogFacts.js"; 
import CatAPI from "./apis/yao/CatAPI.js";
import CatFacts from "./apis/yao/CatFacts.js";
import AdviceAPI from "./apis/juan/AdviceAPI.js";
import JokerAPI from "./apis/david/JokerAPI.js";
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {
  const jwt = tokenService.getLocalAccessToken();
  let roles = [];
  if (jwt) {
    roles = getRolesFromJWT(jwt);
  }

  function getRolesFromJWT(jwt) {
    return jwt_decode(jwt).authorities;
  }

  let adminRoutes = <></>;
  let ownerRoutes = <></>;
  let userRoutes = <></>;
  let vetRoutes = <></>;
  let publicRoutes = <></>;

  roles.forEach((role) => {
    if (role === "ADMIN") {
      adminRoutes = (
        <>
          <Route
            path="/users"
            exact={true}
            element={
              <PrivateRoute>
                <UserListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/users/:username"
            exact={true}
            element={
              <PrivateRoute>
                <UserEditAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/owners"
            exact={true}
            element={
              <PrivateRoute>
                <OwnerListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/owners/:id"
            exact={true}
            element={
              <PrivateRoute>
                <OwnerEditAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/clinics"
            exact={true}
            element={
              <PrivateRoute>
                <ClinicListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/clinics/:id"
            exact={true}
            element={
              <PrivateRoute>
                <ClinicEditAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/clinicOwners"
            exact={true}
            element={
              <PrivateRoute>
                <ClinicOwnerListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/clinicOwners/:id"
            exact={true}
            element={
              <PrivateRoute>
                <ClinicOwnerEditAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/pets"
            exact={true}
            element={
              <PrivateRoute>
                <PetListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/pets/:id"
            exact={true}
            element={
              <PrivateRoute>
                <PetEditAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/pets/:petId/visits"
            exact={true}
            element={
              <PrivateRoute>
                <VisitListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/pets/:petId/visits/:visitId"
            exact={true}
            element={
              <PrivateRoute>
                <VisitEditAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/vets"
            exact={true}
            element={
              <PrivateRoute>
                <VetListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/vets/:id"
            exact={true}
            element={
              <PrivateRoute>
                <VetEditAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/vets/specialties"
            exact={true}
            element={
              <PrivateRoute>
                <SpecialtyListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/vets/specialties/:specialtyId"
            exact={true}
            element={
              <PrivateRoute>
                <SpecialtyEditAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/consultations"
            exact={true}
            element={
              <PrivateRoute>
                <ConsultationListAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/consultations/:consultationId"
            exact={true}
            element={
              <PrivateRoute>
                <ConsultationEditAdmin />
              </PrivateRoute>
            }
          />
          <Route
            path="/consultations/:consultationId/tickets"
            exact={true}
            element={
              <PrivateRoute>
                <TicketListAdmin />
              </PrivateRoute>
            }
          />
          <Route path="/sla" exact={true} element={<PrivateRoute><SLA/></PrivateRoute>} />
          <Route path="/requests" exact={true} element={<PrivateRoute><RequestListAdmin/></PrivateRoute>} />
        </>
      );
    }
    if (role === "OWNER") {
      ownerRoutes = (
        <>
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <OwnerDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/myPets"
            exact={true}
            element={
              <PrivateRoute>
                <OwnerPetList />
              </PrivateRoute>
            }
          />
          <Route
            path="/myPets/:id"
            exact={true}
            element={
              <PrivateRoute>
                <OwnerPetEdit />
              </PrivateRoute>
            }
          />
          <Route
            path="/myPets/:id/visits/:id"
            exact={true}
            element={
              <PrivateRoute>
                <OwnerVisitEdit />
              </PrivateRoute>
            }

          />
          <Route
            path="/consultations"
            exact={true}
            element={
              <PrivateRoute>
                <OwnerConsultationList />
              </PrivateRoute>
            }
          />
          <Route
            path="/consultations/:consultationId"
            exact={true}
            element={
              <PrivateRoute>
                <OwnerConsultationEdit />
              </PrivateRoute>
            }
          />
          <Route path="/offer" exact={true} element={ <PrivateRoute> <AdoptionList /> </PrivateRoute>} />
          <Route path="/offer/:id" exact={true} element={ <PrivateRoute> <AdoptionOffer /> </PrivateRoute>} />
          <Route path="/offer/received" exact={true} element={ <PrivateRoute> <ReceivedOffers /> </PrivateRoute> } />
          <Route path="/offer/sent" exact={true} element={ <PrivateRoute> <OffersSent /> </PrivateRoute> } />
          <Route
            path="/consultations/:consultationId/tickets"
            exact={true}
            element={
              <PrivateRoute>
                <OwnerConsultationTickets />
              </PrivateRoute>
            }
          />
          <Route path="/post/booking" exact={true} element={<PrivateRoute><CreateBooking /></PrivateRoute>} />
          <Route path="/bookings" exact={true} element={<PrivateRoute><GetAllBooking /></PrivateRoute>} />
          <Route path="/sla" exact={true} element={<PrivateRoute><SLA/></PrivateRoute>} />
          <Route path="/requests" exact={true} element={<PrivateRoute><RequestListClinicOwner/></PrivateRoute>} />
          <Route path="/requests/:id" exact={true} element={<PrivateRoute><RequestEditClinicOwner/></PrivateRoute>} />
        </>

      );
    }
    if (role === "VET") {
      vetRoutes = (
        <>
          {/* <Route path="/dashboard" element={<PrivateRoute><OwnerDashboard /></PrivateRoute>} /> */}
          <Route
            path="/myPets"
            exact={true}
            element={
              <PrivateRoute>
                <OwnerPetList />
              </PrivateRoute>
            }
          />
          <Route
            path="/consultations"
            exact={true}
            element={
              <PrivateRoute>
                <VetConsultationList />
              </PrivateRoute>
            }
          />
          <Route
            path="/consultations/:consultationId/tickets"
            exact={true}
            element={
              <PrivateRoute>
                <VetConsultationTickets />
              </PrivateRoute>
            }
          />
          <Route path="/sla" exact={true} element={<PrivateRoute><SLA/></PrivateRoute>} />
        </>
      );
    }
    if (role === "CLINIC_OWNER") {
      vetRoutes = (
        <>
          <Route
            path="/owners"
            exact={true}
            element={
              <PrivateRoute>
                <OwnerListClinicOwner />
              </PrivateRoute>
            }
          />
          <Route
            path="/clinics"
            exact={true}
            element={
              <PrivateRoute>
                <ClinicsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/clinics/:id"
            exact={true}
            element={
              <PrivateRoute>
                <EditClinic />
              </PrivateRoute>
            }
          />
          <Route
            path="/petHotelRoom"
            exact={true}
            element={
              <PrivateRoute>
                <PetHotelRoomsList />
              </PrivateRoute>
            }
          />
          <Route
            path="/petHotelRoom/:id"
            exact={true}
            element={
              <PrivateRoute>
                <EditPetHotelRoom />
              </PrivateRoute>
            }
          />
          <Route
            path="/consultations"
            exact={true}
            element={
              <PrivateRoute>
                <ConsultationListClinicOwner />
              </PrivateRoute>
            }
          />
          <Route
            path="/consultations/:id"
            exact={true}
            element={
              <PrivateRoute>
                <ConsultationEditClinicOwner />
              </PrivateRoute>
            }
          />
          <Route
            path="/consultations/:id/tickets"
            exact={true}
            element={
              <PrivateRoute>
                <VetConsultationTickets />
              </PrivateRoute>
            }
          />
          <Route
            path="/vets"
            exact={true}
            element={
              <PrivateRoute>
                <VetListClinicOwner />
              </PrivateRoute>
            }
          />
          <Route
            path="/vets/:id"
            exact={true}
            element={
              <PrivateRoute>
                <VetEditClinicOwner />
              </PrivateRoute>
            }
          />
          <Route path="/sla" exact={true} element={<PrivateRoute><SLA/></PrivateRoute>} />
        </>
      );
    }
  });
  if (!jwt) {
    publicRoutes = (
      <>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/lidia/DogAPI" element={<DogAPI />} />
        <Route path="/lidia/DogFacts" element={<DogFacts />} />
        <Route path="/yao/CatAPI" element={<CatAPI />} />
        <Route path="/yao/CatFacts" element={<CatFacts />} />
        <Route path="/juan/AdviceAPI" element={<AdviceAPI />} />
        <Route path="/david/JokerAPI" element={<JokerAPI />} />


      </>
    );
  } else {
    userRoutes = (
      <>
        {/* <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} /> */}
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
      </>
    );
  }

  return (
    <div>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppNavbar />
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/plans" element={<PlanList />} />
          <Route path="/docs" element={<SwaggerDocs />} />
          {publicRoutes}
          {userRoutes}
          {adminRoutes}
          {ownerRoutes}
          {vetRoutes}
        </Routes>
      </ErrorBoundary>
    </div>
  );
}

export default App;
