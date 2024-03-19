const handlePetChange = (petOptions, setBooking, booking) => (event) => {
  const selectedPetValue = event.target.value;
  const selectedPet = petOptions.find(pet => pet.value === selectedPetValue);
  console.log("Selected pet:", selectedPet);
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

const handleRoomChange = (rooms, setBooking, booking) => (event) => {
    const room = rooms.find(r => r.name === event.target.value);
    console.log("Selected room:", room);
    setBooking({ ...booking, room });
};

const handleRemovePet = (petToRemove,setBooking) => {
    setBooking(prevBooking => ({
        ...prevBooking,
        pet: prevBooking.pet.filter(pet => pet.name !== petToRemove.name)
    }));
};
export { handlePetChange, handleInputChange ,handleRemovePet,handleRoomChange};