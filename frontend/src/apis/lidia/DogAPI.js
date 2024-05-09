import { useState, useEffect } from "react";
import "./DogAPI.css"; // Estilo CSS para centrar la imagen

export default function DogAPI() {
    const [dogImageUrl, setDogImageUrl] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchImage = async () => {
        const apiUrl = `https://random.dog/woof.json`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data.url && /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(data.url)) {
                setDogImageUrl(data.url);
            } else {
                fetchImage(); 
            }
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchImage(); 
    }, []); 

    const reloadPage = () => {
        window.location.reload();
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching dog image: {error.message}</div>;
    }

    return (
        <div className="dog-api-container" style={{ backgroundColor: "#61dafb" }}>
            <h1>Dog API</h1>
            <div className="dog-image-container">
                <img src={dogImageUrl} alt="Dog" />
            </div>
            <div className="reload-button-container">
                <button className="reload-button" onClick={reloadPage}>Reload</button>
            </div>
        </div>
    );
}