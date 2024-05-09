import React, { useState, useEffect } from 'react';

export default function DogFacts() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    const apiUrl = 'https://dogapi.dog/api/v2/facts?limit=1';
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.data && data.data.length > 0 && data.data[0].attributes && data.data[0].attributes.body) {
          setFact(data.data[0].attributes.body);
        } else {
          throw new Error('No dog facts received');
        }
      })
      .catch(error => console.error('Error fetching dog facts:', error));
  }, []); 

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="dog-facts-container" style={{ backgroundColor: "#61dafb" }}>
      <div className="fact-box">
        <h2>Random Dog Fact</h2>
        <p>{fact}</p>
      </div>
      <div className="button-container">
        <button className="reload-button" onClick={reloadPage}>Reload</button>
      </div>
    </div>
  );
}
