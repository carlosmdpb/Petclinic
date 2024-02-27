import { useState, useEffect } from 'react';
import TokenService from '../../services/token.service';

const useHotelData = () => {
    const token = TokenService.getLocalAccessToken();
    const [types, setTypes] = useState([]);
    const [clinics, setClinics] = useState([]);

    //Pet Types
    useEffect(() => {
        fetch('api/v1/pets/types', {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(response => response.json())
        .then(data => {
            setTypes(data);
        })
        .catch(error => console.error('Error fetching types:', error));
    }, []);

    //Clinics
    useEffect(() => {
        fetch('/api/v1/clinics')
        .then(response => response.json())
        .then(data => {
            setClinics(data);
        })
        .catch(error => console.error('Error fetching clinics:', error));
    }, []);

    return { types, clinics };
};

export default useHotelData;