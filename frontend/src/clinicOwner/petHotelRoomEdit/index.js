import "../../static/css/auth/authButton.css";
import "../../static/css/auth/authPage.css";
import tokenService from "../../services/token.service";
import getIdFromUrl from "../../util/getIdFromUrl";
import getErrorModal from "../../util/getErrorModal";
import useFetchState from "../../util/useFetchState";
import { petHotelRoomEditInputs } from "./form/petHotelRoomEditInputs";
import FormGenerator from "../../components/formGenerator/formGenerator";
import { useState, useEffect, useRef } from "react";
import {useNavigate} from "react-router-dom";



const user = tokenService.getUser();
const jwt = tokenService.getLocalAccessToken();


export default function EditPetHotelRoom() {
  const id = getIdFromUrl(2);
  const navigator = useNavigate();


  const [clinics, setClinics] = useState([]);
  const [petHotelRoomEditnewInputs, setPetHotelRoomEditnewInputs] = useState(petHotelRoomEditInputs);

  useEffect(() => {
    
    fetch(`/api/v1/clinics?userId=${user.id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClinics(data.map(clinic => clinic.name))
  }).then(
    setPetHotelRoomEditnewInputs(prevInputs => {
      return prevInputs.map(input => {
          if (input.name === "clinic") {
              return {
                  ...input,
                  values: clinics
              };
          }
          return input;
      });
    }))
    .catch((error) => console.error(error));
  }, [clinics]);




  const emptyItem = {
    id: "",
    name: "",
    type: "",
    clinic: "",
    size: 0,
  };
  const [message, setMessage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [room, setRoom] = useFetchState(
    emptyItem,
    `/api/v1/petHotelRooms/${id}`,
    jwt,
    setMessage,
    setVisible,
    id
  );
  const [dataLoaded, setDataLoaded] = useState(false);

  const editHotelPetRoomFormRef = useRef(null);

  function handleSubmit({ values }) {
    if (!editHotelPetRoomFormRef.current.validate()) return;

    if (id !== "new") {
      fetch(`/api/v1/petHotelRooms/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(values),
      })
      .then((res) => {
        if (res.status === 200) {
          navigator("/petHotelRoom");
        }
      })
      .catch((err) => {
        setMessage(err.message);
      });;
    } else {
      fetch(`/api/v1/petHotelRooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(values),
      })
      .then((res) => {
        if (res.status === 201) {
          navigator("/petHotelRoom");
        }
      })
      .catch((err) => {
        setMessage(err.message);
      });
    }
  }

  useEffect(() => {
    if (room.id !== "") {
        petHotelRoomEditInputs.forEach((input) => {
        input.defaultValue = room[input.name];
        if(input.name === "clinic") {
          input.defaultValue = room.clinic.name;
        }else if(input.name === "type") {
          input.defaultValue = room.allowedPetType.name;
        }
        setDataLoaded(true);
      });
    } else {
        petHotelRoomEditInputs.forEach((input) => {
        input.defaultValue = "";
      });
    }
  }, [room]);

  const modal = getErrorModal(setVisible, visible, message);

  return (
    <div className="auth-page-container">
      {<h2>{id !== "new" ? "Edit Room" : "Add Room"}</h2>}
      {modal}
      <div className="auth-form-container">
        {dataLoaded ? (
          <FormGenerator
            ref={editHotelPetRoomFormRef}
            inputs={petHotelRoomEditnewInputs}
            onSubmit={handleSubmit}
            buttonText="Edit"
            buttonClassName="auth-button"
          />
        ) : (
          <FormGenerator
            ref={editHotelPetRoomFormRef}
            inputs={petHotelRoomEditnewInputs}
            onSubmit={handleSubmit}
            buttonText="Add"
            buttonClassName="auth-button"
          />
        )}
      </div>
    </div>
  );
}
