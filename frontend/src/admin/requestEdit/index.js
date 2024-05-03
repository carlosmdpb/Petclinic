import React from "react";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import FormGenerator from "../../../components/formGenerator/formGenerator";
import "../../../static/css/owner/editPet.css";
import "../../../static/css/auth/authButton.css"
import useFetchState from "../../../util/useFetchState";
import { formValidators } from "../../../validators/formValidators";

export default function AdminRequestEdit(){
  let pathArray = window.location.pathname.split("/");
  const jwt = JSON.parse(window.localStorage.getItem("jwt"));
  const [message,setMessage] = useState(null);
  const [modalShow,setModalShow] = useState(false);
  const [statuss, setStatuss] = useState([])
  const [request,setRequest] = useState([]);  
  const [requestId,setRequestId] = useState(pathArray[3]);
  const editRequestFormRef=useRef();
  
  useEffect( () => setUp(),[]);  
  
  function setUp(){
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

    const statuss = fetch(`/api/v1/requests/status`, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      ).then(data => data.json()).then((data) => {
        if(!data.message)
          setStatuss(data);
        else{
          setMessage(data.message);
          setModalShow(true);
        }
      }).catch(error => {setMessage(error);setModalShow(true);});
  }

  const requestEditFormInputs = [
    {
      tag: "Status",
      name: "status",
      type: "select",
      values: ["None"],
      defaultValue: "",
      isRequired: true,
      validators: [formValidators.notEmptyValidator, formValidators.notNoneTypeValidator],
    }
  ];

  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    let newRequest = { ...request };
    setRequest(newRequest);
  }  

  console.log(request);
  console.log(requestId);

  async function handleSubmit({ values }) {

    if (!editRequestFormRef.current.validate()) return;

    const myrequest = {
      id: request.id,
      title: request.title,
      description: request.description,
      type: request.type,
      status: statuss.filter((status) => status === values["status"])[0]
    };

    const submit = await (await fetch("/api/v1/requests/status/" + requestId, 
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${jwt}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myrequest.status),
      }
    )).json();

    if (submit.message){
      setMessage(submit.message);
      setModalShow(true);
    }
    else window.location.href = `/requests`;
  }
  
    const title = (
      <div>
        <h2 className="text-center">Edit Request</h2>
        <p className="text-center">{request.title}</p>
      </div>
    );

    requestEditFormInputs.forEach(i => i.handleChange=handleChange);
    

    if (requestEditFormInputs[0].values.length < 2) {
      requestEditFormInputs[0].values = [
        ...requestEditFormInputs[0].values,
        ...statuss.map((status) => status),
      ];
    }

    if (request && requestEditFormInputs[0].values.length >= 2) {
      requestEditFormInputs[0].defaultValue = request.status || "None";
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
            buttonText="Update"
            buttonClassName="auth-button"
          />
        </div>
        {modal}
      </div>
    );
  }