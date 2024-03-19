import React, { useState, useEffect } from 'react';
import './utils/bookingForm.css';
import useBookingData from './utils/UseBookingData';
import { handlePetChange, handleInputChange, handleRemovePet, handleRoomChange } from './utils/BookingHandlers';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export function CreateBooking() {
  const [booking, setBooking] = useState({
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    pet: {},
    room: {}
  });

  const [showPetError, setShowPetError] = useState(false);
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const jwt = JSON.parse(window.localStorage.getItem('jwt'));
  const navigate = useNavigate();
  const { pet, room } = useBookingData();

  const onRemovePet = (petToRemove) => handleRemovePet(petToRemove, setBooking, booking, setShowPetError);
  const onPetChange = handlePetChange(pet, setBooking, booking, setShowPetError);
  const onRoomChange = handleRoomChange(room, setBooking, booking);
  const onInputChange = handleInputChange(setBooking, booking);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (booking.pet == null) {
      setShowPetError(true);
      return;
    }
    let selectedRoom = room.find(r => r.id === booking.room.id);
    let allowedPetTypes = selectedRoom.allowedPetTypes.map(petType => petType.name);
    let selectedPetType = booking.pet.petType.name;
    let intersect = allowedPetTypes.includes(selectedPetType);
    if (!intersect) {
      window.alert("Selected room does not allow this pet type");
      return;
    }

    try {
      const response = await fetch('/api/v1/booking', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
      });
      if (!response.ok) {
        throw new Error('Error creating booking');
      }
      navigate('/bookings');
    } catch (error) {
      window.alert('The hotel is full for the selected period or your pet already has a booking for the selected period');
      console.error('There was an error creating the booking', error);
    }
  }

  const handleHotelInfo = () => {
    setShowRoomInfo(!showRoomInfo);
  }

  return (
    <div className="containerStyle">
      <h1 className="text-center">Booking Rooms</h1>
      <div className="formContainerStyle">
        <form onSubmit={handleSubmit}>
          <div className="formItemStyle">
            <label className="labelStyle">
              <div>Start Date:</div>
              <input type="date" name="startDate" defaultValue={moment().format('YYYY-MM-DD')} required className="inputStyle" onChange={onInputChange} />
            </label>
          </div>
          <div className="formItemStyle">
            <label className="labelStyle">
              <div>End Date:</div>
              <input type="date" name="endDate" defaultValue={moment().format('YYYY-MM-DD')} required className="inputStyle" onChange={onInputChange} />
            </label>
          </div>
          <div className="formItemStyle">
            <label className="labelStyle">
              <div>My Pet:</div>
              {pet && (
                <select name="pet" className="inputStyle" required onChange={onPetChange}>
                  <option value="">Select a pet</option>
                  {pet.map((option, index) => (
                    <option key={index} value={option.value}>{option.name}</option>
                  ))}
                </select>
              )}
            </label>
            {showPetError && <p className="error">Debe seleccionar al menos una mascota.</p>}
            {booking.pet && (
              <button className="formPets" onClick={() => onRemovePet(booking.pet)}>
                {booking.pet.name}
              </button>
            )}
          </div>
          <div className="formItemStyle">
            <label className="labelStyle">
              <div>Room Hotel:</div>
              <div className="inputWithButton">
                {room && (
                  <select name="hotel" className="inputStyle" onChange={onRoomChange}>
                    <option value="">Select a room hotel</option>
                    {room.map((h, index) => (
                      <option key={index} value={h.value}>{h.roomName}</option>
                    ))}
                  </select>
                )}
                <button type="button" className="info-button" onClick={handleHotelInfo}>ℹ️</button>
              </div>
              {showRoomInfo && (
                <div>
                  <h2>Not Allowed Pets</h2>
                  {room.map((hotel, index) => (
                    <div key={index}>
                      <h3>{hotel.roomName}</h3>
                      {hotel.allowedPetType.length > 0 ? (
                        <ul>
                          {hotel.allowedPetType.map((petType, index) => (
                            <li key={index}>{petType.name}</li>
                          ))}
                        </ul>
                      ) : (
                        <p>All pet types are allowed</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </label>
          </div>
          <div className='centrarBoton'>
            <button className="auth-button" type="submit">Create Hotel</button>
          </div>
        </form>
      </div>
    </div>
  );

}
