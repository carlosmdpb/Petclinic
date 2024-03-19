const handlePetChange = (petOptions, setBooking, booking) => (event) => {
    const selectedPetValue = event.target.value;
    const selectedPet = petOptions.find(pet => pet.value === selectedPetValue);
  
    if (selectedPet) {
      if (booking.pet && booking.pet.value === selectedPetValue) {
        window.alert('Esta mascota ya ha sido seleccionada.');
      } else {
        setBooking(prevBooking => ({ ...prevBooking, pet: selectedPet }));
      }
    }
  };

const handleInputChange = (setBooking, booking) => (event) => {
    const { name, value } = event.target;
    setBooking({ ...booking, [name]: value });
};

const handleRoomChange = (hotels, setBooking, booking) => (event) => {
    const hotel = hotels.find(r => r.roomName === event.target.value);
    setBooking({ ...booking, hotel });
};
const handleRemovePet = (petToRemove,setBooking) => {
    setBooking(prevBooking => ({
        ...prevBooking,
        pet: prevBooking.pet.filter(pet => pet.name !== petToRemove.name)
    }));
};
export { handlePetChange, handleInputChange ,handleRemovePet,handleRoomChange};