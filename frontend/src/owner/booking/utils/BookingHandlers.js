const handlePetChange = (petOptions, setBooking) => (event) => {
  const selectedPetValue = event.target.value;
  const selectedPet = petOptions.find(pet => pet.name === selectedPetValue);
      setBooking(prevBooking => ({ ...prevBooking, pet: selectedPet }));

};

const handleInputChange = (setBooking, booking) => (event) => {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
};

const handleRoomChange = (roomOption, setBooking, booking) => (event) => {
    const selectedRoomValue = event.target.value;
    const selectedRoom = roomOption.find(r => r.name === selectedRoomValue);
    if (selectedRoom) {
        setBooking(prevBooking => ({ ...prevBooking, room: selectedRoom }));
    } else {
        console.error('Selected room is undefined');
    }
};

export { handlePetChange, handleInputChange ,handleRoomChange};