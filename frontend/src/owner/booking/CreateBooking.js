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
    pet: '',
    room: ''
  });

  const [showPetError, setShowPetError] = useState(false);
  const [showRoomInfo, setShowRoomInfo] = useState(false);
  const jwt = JSON.parse(window.localStorage.getItem('jwt'));
  const navigate = useNavigate();
  const { pet, rooms } = useBookingData();

  const onRemovePet = (petToRemove) => handleRemovePet(petToRemove, setBooking, booking, setShowPetError);
  const onPetChange = handlePetChange(pet, setBooking, booking, setShowPetError);
  const onRoomChange = handleRoomChange(rooms, setBooking, booking);
  const onInputChange = handleInputChange(setBooking, booking);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Booking room:", booking.room);
    console.log("Rooms:", rooms);
    
    
    if (!booking.room || Object.keys(booking.room).length === 0) {
      window.alert('Please select a room before creating the booking.');
      return;
    }
    let selectedRoom = rooms.find(r => r.id === booking.room.id);
    console.log("Selected create:", selectedRoom);
    if (!selectedRoom) {
      window.alert("Selected room does not exist");
      return;
    }
    let allowedPetTypes = selectedRoom.allowedPetType.name;
    let selectedPetType = booking.pet.type.name;
    console.log("Allowed pet types:", allowedPetTypes);
    console.log("Selected pet type:", selectedPetType);
    let intersect = allowedPetTypes === selectedPetType;
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

          </div>
          <div className="formItemStyle">
            <label className="labelStyle">
              <div>Hotel Room:</div>
              {rooms && (
                <select name="room" className="inputStyle" required onChange={onRoomChange}>
                  <option value="">Select a room</option>
                  {rooms.map((option, index) => (
                    <option key={index} value={option.id}>{option.name}</option>
                  ))}
                </select>
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
