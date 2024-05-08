import React, { useState, useEffect } from "react";
import "./FrankfurterApi.css"; // Estilo CSS para el componente

export default function FrankfurterApi() {
    const [exchangeRates, setExchangeRates] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchExchangeRates();
    }, []);

    const fetchExchangeRates = async () => {
        const apiUrl = "https://api.frankfurter.app/latest";
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setExchangeRates(data);
            setError(null);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error fetching exchange rates: {error.message}</div>;
    }

    return (
        <div className="frankfurter-container">
            <h1>Exchange Rates</h1>
            <div className="exchange-rates">
                <ul>
                    {Object.entries(exchangeRates.rates).map(([currency, rate]) => (
                        <li key={currency}>
                            {currency}: {rate}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
