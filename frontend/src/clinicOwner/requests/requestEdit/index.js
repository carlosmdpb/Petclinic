import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import FormGenerator from "../../../components/formGenerator/formGenerator";
import { requestEditFormInputs as requestEditFormInputs } from "./form/requestEditFormInputs";
import "../../../static/css/owner/editPet.css";
import "../../../static/css/auth/authButton.css"
import useFetchState from "../../../util/useFetchState";

export default function ClinicOwnerRequestEdit(){
  let pathArray = window.location.pathname.split("/");
  const emptyItem = {
    title: "",
    description: "",
    type: {},
    status: "PENDING"
  };  
  const jwt = JSON.parse(window.localStorage.getItem("jwt"));
  const [message,setMessage] = useState(null);
  const [modalShow,setModalShow] = useState(false);
  const [types, setTypes] = useState([])
  const [request,setRequest] = useState(emptyItem);  
  const [requestId,setRequestId] = useState(pathArray[2]);
  const editRequestFormRef=useRef();
  
  useEffect( () => setUp(),[]);  
  
  function setUp(){
      if (requestId !== "new" && request.id==null) { 
        const request = fetch(
            `/api/v1/requests/${requestId}`, 
            {
              headers: {
              Authorization: `Bearer ${jwt}`,
            },
          })
          .then((p) => p.json())
          .then((p) => {
            if(p.message){ 
              setMessage(request.message);
              setModalShow( true );
            }else {
              setRequest(p);
              setRequestId(p.id);                
            }
          }).catch(m =>{
            setMessage(m);
            setModalShow( true );
          });          
    }    
    if(types.length===0){
      fetch(`/api/v1/requests/types`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      ).then(data => data.json()).then((data) => {
        if(!data.message)
          setTypes(data);
        else{
          setMessage(data.message);
          setModalShow(true);
        }
      }).catch(error => {setMessage(error);setModalShow(true);});
      }
  }

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    let newRequest = { ...request };
    setRequest(newRequest);
  }  

  async function handleSubmit({ values }) {

    if (!editRequestFormRef.current.validate()) return;

    const myrequest = {
      id: request.id,
      title: values["title"],
      description: values["description"],
      type: types.filter((type) => type === values["type"])[0],
      status: request.status
    };

    const submit = await (await fetch("/api/v1/requests" + (request.id ? "/" + requestId : ""), 
      {
        method: myrequest.id ? "PUT" : "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myrequest),
      }
    )).json();

    if (submit.message){
      setMessage(submit.message);
      setModalShow(true);
    }
    else window.location.href = `/requests`;
  }
  
    const title = (
      <h2 className="text-center">{request.id ? "Edit Request" : "Add Request"}</h2>
    );

    requestEditFormInputs.forEach(i => i.handleChange=handleChange);
    

    if (requestEditFormInputs[2].values.length < 2) {
      requestEditFormInputs[2].values = [
        ...requestEditFormInputs[2].values,
        ...types.map((type) => type),
      ];
    }

    if (request && requestEditFormInputs[2].values.length >= 2) {
      requestEditFormInputs[0].defaultValue = request.title || "";
      requestEditFormInputs[1].defaultValue = request.description || "";
      requestEditFormInputs[2].defaultValue = request.type || "None";
    }

    function handleShow() {
      setModalShow(false);
      setMessage(null);
    }

    let modal = <></>;
    if (message) {
      const show = modalShow;
      const closeBtn = (
        <button className="close" onClick={handleShow} type="button">
          &times;
        </button>
      );
      const cond = message.includes("limit");
      modal = (
        <div>
          <Modal isOpen={show} toggle={handleShow} keyboard={false}>
            {cond ? (
              <ModalHeader>Warning!</ModalHeader>
            ) : (
              <ModalHeader toggle={handleShow} close={closeBtn}>
                Error!
              </ModalHeader>
            )}
            <ModalBody>{message || ""}</ModalBody>
            <ModalFooter>
              <Button color="primary" tag={Link} to={`/requests`}>
                Back
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      );
    }

    return (
      <div className="edit-pet-page-container">
        <div className="edit-pet-form-container">
          {title}
          <FormGenerator
            ref={editRequestFormRef}
            inputs={requestEditFormInputs}
            onSubmit={handleSubmit}
            buttonText="Save"
            buttonClassName="auth-button"
          />
        </div>
        {modal}
      </div>
    );
  }