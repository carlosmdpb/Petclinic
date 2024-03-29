import { useState, useEffect } from 'react';
import TokenService from '../../../services/token.service'
const useBookingData = () => {
    const user = TokenService.getUser();
    const token = TokenService.getLocalAccessToken();
    const [pet, setPets] = useState([]);
    const [rooms, setRoom] = useState([]);

    //Pets
    useEffect(() => {
        fetch(`/api/v1/pets?userId=${user.id}`, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setPets(data);
        })
        .catch(error => console.error('Error fetching pets:', error));
    }, []);
  



    //Hotel
    
    useEffect(() => {
        fetch('/api/v1/booking/rooms/dto', {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            setRoom(data);
        })
        .catch(error => console.error('Error fetching hotel:', error));
    }, []);
    


   return { pet, rooms };
 };

export default useBookingData;