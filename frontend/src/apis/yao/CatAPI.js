import { useState, useEffect } from "react";
import "./CatAPI.css"; // Estilo CSS para centrar la imagen

export default function CatAPI() {
    const [catImageUrl, setCatImageUrl] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchImage = async () => {
        const apiUrl = `https://api.thecatapi.com/v1/images/search`;
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data && data.length > 0 && data[0].url && /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(data[0].url)) {
                setCatImageUrl(data[0].url);
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
        return <div>Error fetching cat image: {error.message}</div>;
    }

    return (
        <div className="cat-api-container" style={{ backgroundColor: "#61dafb" }}>
            <h1>Cat API</h1>
            <div className="cat-image-container">
                <img src={catImageUrl} alt="Cat" />
            </div>
            <div className="reload-button-container">
                <button className="reload-button" onClick={reloadPage}>Reload</button>
            </div>
        </div>
    );
}
