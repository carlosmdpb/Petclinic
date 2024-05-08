import React, { useState, useEffect } from 'react';

export default function CatFacts() {
  const [fact, setFact] = useState('');

  useEffect(() => {
    const apiUrl = 'https://meowfacts.herokuapp.com/';
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.data) {
          setFact(data.data[0]);
        } else {
          throw new Error('No cat facts received');
        }
      })
      .catch(error => console.error('Error fetching cat facts:', error));
  }, []); 

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="cat-facts-container" style={{ backgroundColor: "#61dafb" }}>
      <div className="fact-box">
        <h2>Random Cat Fact</h2>
        <p>{fact}</p>
      </div>
      <div className="button-container">
        <button className="reload-button" onClick={reloadPage}>Reload</button>
      </div>
    </div>
  );
}
