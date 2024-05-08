import React, { useState, useEffect } from 'react';

export default function CatFacts() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    const apiUrl = 'https://api.adviceslip.com/advice';
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.slip && data.slip.advice) {
          setFact(data.slip.advice);
        } else {
          throw new Error('No advice received');
        }
      })
      .catch(error => console.error('Error fetching advice:', error));
  }, []); 

  const reloadPage = () => {
    window.location.reload();
  };
  
  return (
    <div className="advice-container" style={{ backgroundColor: "#61dafb", padding: "20px" }}>
      <div className="advice-box" style={{ textAlign: "center" }}>
        <h2>Random Advice</h2>
        <p>{fact}</p>
      </div>
      <div className="button-container">
        <button className="reload-button" onClick={reloadPage}>Reload</button>
      </div>
    </div>
  );
}
