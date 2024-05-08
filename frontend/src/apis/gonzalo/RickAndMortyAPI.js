import { Suspense } from "react";
import "../../../../frontend/src/App.css";
import "../../static/css/home/home.css";
import { fetchData } from "../../../../frontend/src/apis/fetchData.js";

const apiUrl = `https://rickandmortyapi.com/api/character/${Math.floor(Math.random() * 825) + 1}`;
const apiData = fetchData(apiUrl);

function RickAndMortyAPI() {
  const data = apiData.read();

  const tryAnother = () => {
    window.location.reload();
  };

  return (
    <div className="hero-div">
      <h1>Rick and Morty API</h1>
      <div style={{ textAlign: 'center' }}></div>
      <h3>Hoy te sientes un poco:  </h3>
      <Suspense fallback={<div>Loading...</div>} />
      <ul>
        <h2 style={{ textAlign: "center", color: '#12a14b' }} key={data.id}>
          {data.name}
        </h2>
        <div style={{ textAlign: 'center' }}></div>
        <h3>Estado: {data.status}</h3>
        <div style={{ textAlign: 'center' }}></div>
        <img src={data.image} />
        <div style={{ textAlign: 'right' }}>
        <button onClick={tryAnother}>Prueba otra vez</button>
        </div>
      
      </ul>
    </div>
  );
}

export default RickAndMortyAPI;