import React, { useState, useEffect } from 'react';

export default function JokerAPI() {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Any';
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        return response.json();
      })
      .then(data => {
        if (data && data.joke) {
          // Check if the joke is a single joke or a two-part joke
          if (data.type === 'single') {
            setJoke(data.joke);
          } else if (data.type === 'twopart') {
            setJoke(`${data.setup} ${data.delivery}`);
          } else {
            throw new Error('Unknown joke format');
          }
        } else {
          throw new Error('No joke received');
        }
      })
      .catch(error => console.error('Error fetching joke:', error));
  }, []); 

  const reloadPage = () => {
    window.location.reload();
  };

  return (
    <div className="joke-container" style={{ backgroundColor: "#61dafb" }}>
      <div className="joke-box">
        <h2>Random Joke</h2>
        <p>{joke}</p>
      </div>
      <div className="button-container">
        <button className="reload-button" onClick={reloadPage}>Reload</button>
      </div>
    </div>
  );
}
