const handlePetChange = (petOptions, setBooking) => (event) => {
  const selectedPetValue = event.target.value;
  const selectedPet = petOptions.find(pet => pet.name === selectedPetValue);
  if (selectedPet) {
      setBooking(prevBooking => ({ ...prevBooking, pet: selectedPet }));
  } else {
      console.error('Selected pet is undefined');
  }
};

const handleInputChange = (setBooking, booking) => (event) => {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
};

const handleRoomChange = (roomOption, setBooking, booking) => (event) => {
    const selectedRoomValue = parseInt(event.target.value);
    const selectedRoom = roomOption.find(r => r.id === selectedRoomValue);
    if (selectedRoom) {
        setBooking(prevBooking => ({ ...prevBooking, room: selectedRoom }));
    } else {
        console.error('Selected room is undefined');
    }
};

const handleRemovePet = (petToRemove,setBooking) => {
    setBooking(prevBooking => ({
        ...prevBooking,
        pet: prevBooking.pet.filter(pet => pet.name !== petToRemove.name)
    }));
};
export { handlePetChange, handleInputChange ,handleRemovePet,handleRoomChange};