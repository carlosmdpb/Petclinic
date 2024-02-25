const handleTypeChange = (types, setHotel, hotel) => (event) => {
    const selectedTypeNames = Array.from(event.target.selectedOptions, option => option.value);
    const selectedTypes = types.filter(type => selectedTypeNames.includes(type.name));
    const alreadySelected = hotel.allowedPetType.some(petType => selectedTypeNames.includes(petType.name));

    if (alreadySelected) {
        window.alert('Este tipo de mascota ya ha sido seleccionado.');
    } else {
        setHotel(prevHotel => ({ ...prevHotel, allowedPetType: [...prevHotel.allowedPetType, ...selectedTypes] }));
    }
};

const handleRemovePetType = (typeToRemove,setHotel) => {
    setHotel(prevHotel => ({
        ...prevHotel,
        allowedPetType: prevHotel.allowedPetType.filter(type => type.name !== typeToRemove.name)
    }));
};
const handleClinicChange = (clinics, setHotel, hotel) => (event) => {
    const clinic = clinics.find(clinic => clinic.name === event.target.value);
    setHotel({ ...hotel, clinic });
};
    
const handleInputChange = (setHotel, hotel) => (event) => {
    const { name, value } = event.target;
    setHotel({ ...hotel, [name]: value });
};



export { handleTypeChange, handleClinicChange, handleInputChange,handleRemovePetType };
