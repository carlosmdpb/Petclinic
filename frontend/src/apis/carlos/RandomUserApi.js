import { useState, useEffect } from "react";
import "./RandomUserApi.css"; // Estilo CSS para centrar la imagen

export default function RandomUserAPI() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        const apiUrl = `https://randomuser.me/api/`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserData(data.results[0]);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData(); 
    }, []); 

    const reloadPage = () => {
        window.location.reload();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching user data: {error.message}</div>;
    }

    return (
        <div className="randomUser-api-container" style={{ backgroundColor: "#61dafb" }}>
            <h1>Random User API</h1>
            <div className="user-details">
                <p>Name: {`${userData.name.first} ${userData.name.last}`}</p>
                <p>Email: {userData.email}</p>
                <img src={userData.picture.large} alt="User" />
            </div>
            <div className="reload-button-container">
                <button className="reload-button" onClick={reloadPage}>Reload</button>
            </div>
        </div>
    );
}
