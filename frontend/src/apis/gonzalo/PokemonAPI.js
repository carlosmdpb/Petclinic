import { Suspense } from "react";
import "../../../../frontend/src/App.css";
import "../../static/css/home/home.css";
import { fetchData } from "../../../../frontend/src/apis/fetchData.js";

const randomNumber = Math.floor(Math.random() * 1025) + 1;
const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
const apiData = fetchData(apiUrl);

export default function PokemonAPI() {
  const data = apiData.read();
 
  const tryAnother = () => {
    window.location.reload();
  };


  return (
      <div className="hero-div">
        <h1>PokemonApi</h1>
        <h3>Tu estado de ánimo se representa con el siguiente bicho:</h3>
        <Suspense fallback={<div>Loading...</div>} />
        <ul>
          <h2 style={{ textAlign: "center", color: '#12a14b' }} key={data.id}>
            {data.name}
          </h2>
          <div style={{ textAlign: 'center' }}></div>
          <img src={data.sprites.other["official-artwork"].front_default} />
          <div style={{ textAlign: 'right' }}>
        <button onClick={tryAnother}>Prueba otra vez</button>
        </div>
        </ul>
      </div>
  );
}
