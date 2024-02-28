import React, { useState } from 'react';
import useHotelData from './utiles/UseHotelData';
import { useNavigate } from 'react-router-dom';
import { handleTypeChange, handleClinicChange, handleInputChange, handleRemovePetType } from './utiles/HotelHandlers';
import './utiles/hotelForm.css';


export function CreateHotel() {
    const [hotel, setHotel] = useState({
        roomName: "",
        clinic: {},
        size: "",
        allowedPetType: []
    });
    const jwt = JSON.parse(window.localStorage.getItem("jwt"));
    const navigate = useNavigate();
    const { types, clinics } = useHotelData();
    const onRemovePetType = (typeToRemove) => handleRemovePetType(typeToRemove, setHotel, hotel);
    const onTypeChange = handleTypeChange(types, setHotel, hotel);
    const onClinicChange = handleClinicChange(clinics, setHotel, hotel);
    const onInputChange = handleInputChange(setHotel, hotel);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/v1/hotel', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(hotel)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            navigate('/hotel');
            console.log('Hotel created');
        } catch (error) {
            console.error('Error creating the hotel:', error);
        }
    };


    return (
        <div className="containerStyle"> {/* Apply containerStyle class */}
            <h1>Create a Room Hotel</h1>
            <div className="formContainerStyle"> {/* Apply formContainerStyle class */}
                <form onSubmit={handleSubmit}>
                    <div className="formItemStyle"> {/* Apply formItemStyle class */}
                        <label className="labelStyle"> {/* Apply labelStyle class */}
                            <div>Room Name:</div>
                            <input type="text" name="roomName" className="inputStyle" onChange={onInputChange} /> {/* Apply inputStyle class */}
                        </label>
                    </div>
                    <div className="formItemStyle"> {/* Apply formItemStyle class */}
                        <label className="labelStyle"> {/* Apply labelStyle class */}
                            <div>Size:</div>
                            <input type="text" name="size" className="inputStyle" onChange={onInputChange} /> {/* Apply inputStyle class */}
                        </label>
                    </div>
                    <div className="formItemStyle"> {/* Apply formItemStyle class */}
                        <label className="labelStyle"> {/* Apply labelStyle class */}
                            <div>Pet Types:</div>
                            <select name="type" className="inputStyle" onChange={onTypeChange}> {/* Apply inputStyle class */}
                                <option value="">Select Pet Types</option>
                                {types.map((type, index) => (
                                    <option key={index} value={type.name}>{type.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="formItemStyle"> {/* Apply formItemStyle class */}
                        <label className="labelStyle"> {/* Apply labelStyle class */}
                            <div>Clinic:</div>
                            <select name="clinic" className="inputStyle" onChange={onClinicChange}> {/* Apply inputStyle class */}
                                <option value="">Select Clinic</option>
                                {clinics.map((clinic, index) => (
                                    <option key={index} value={clinic.name}>{clinic.name}</option>
                                ))}
                            </select>
                        </label>
                    </div>
                    <div className="buttonStyle"> {/* Apply buttonStyle class */}
                        <button type="submit">Create Hotel</button>
                    </div>
                    <h3>Pet Types Not Allowed</h3>
                    <ul>
                        {hotel.allowedPetType && hotel.allowedPetType.map((type, index) => (
                            <button key={index} className="formPets" onClick={() => onRemovePetType(type)}> {/* Apply formPets class */}
                                {type.name}
                            </button>
                        ))}
                    </ul>
                </form>
            </div>
        </div>
    );
}
