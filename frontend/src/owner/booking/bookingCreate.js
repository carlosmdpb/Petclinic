import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import tokenService from '../../services/token.service';
import useFetchState from '../../util/useFetchState';
import getErrorModal from '../../util/getErrorModal';
import { useNavigate } from 'react-router-dom';

const user = tokenService.getUser();
const jwt = tokenService.getLocalAccessToken();

export default function BookingCreate() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [petId, setPetId] = useState('');
  const [roomId, setRoomId] = useState('');
  const [message, setMessage] = useState('');
  const [clinics, setClinics] = useState([]);
  const navigator = useNavigate();

  useEffect(() => {
    fetch(`/api/v1/clinics?userId=${user.id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setClinics(data.map((clinic) => clinic.name));
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSubmit = () => {
    // Aquí puedes realizar la lógica para validar los datos y enviar la reserva al backend
    const bookingData = { startDate, endDate, petId, roomId };
    fetch('/api/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(bookingData),
    })
      .then((response) => {
        if (response.ok) {
          setMessage('Booking created successfully');
          // Aquí puedes redirigir a la página de lista de reservas o a donde desees
          navigator('/bookingList');
        } else {
          setMessage('Error creating booking');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setMessage('Error creating booking');
      });
  };

  return (
    <div>
      <h2>Create Booking</h2>
      {message && <Alert color="info">{message}</Alert>}
      <Form>
        <FormGroup>
          <Label for="startDate">Start Date</Label>
          <Input
            type="date"
            name="startDate"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="endDate">End Date</Label>
          <Input
            type="date"
            name="endDate"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="petId">Pet</Label>
          <Input
            type="select"
            name="petId"
            id="petId"
            value={petId}
            onChange={(e) => setPetId(e.target.value)}
          >
            {/* Aquí puedes mostrar opciones para seleccionar la mascota */}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="roomId">Room</Label>
          <Input
            type="select"
            name="roomId"
            id="roomId"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          >
            {/* Aquí puedes mostrar opciones para seleccionar la habitación de hotel */}
          </Input>
        </FormGroup>
        <Button onClick={handleSubmit}>Create Booking</Button>
      </Form>
    </div>
  );
}
