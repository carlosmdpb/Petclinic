import { Suspense } from "react";
import "../App.css";
import "../static/css/home/home.css";
import { fetchData } from "../apis/fetchData.js";

const randomNumber = Math.floor(Math.random() * 1025) + 1;
const apiUrl = `https://pokeapi.co/api/v2/pokemon/${randomNumber}`;
const apiData = fetchData(apiUrl);

export function PokemonAPI() {
  const data = apiData.read();
  console.log(data);
  return (
    <div className="home-page-container">
      <div className="hero-div">
        <h1>PokemonApi</h1>
        <h3>Cada vez que entras aqui hay un Pokemon diferente : </h3>
        <Suspense fallback={<div>Loading...</div>} />
        <ul>
          <h2 style={{ textAlign: "center" }} key={data.id}>
            {data.name}
          </h2>
          <img src={data.sprites.other["official-artwork"].front_default} />
        </ul>
      </div>

      <div id="bubble">
        <a href="/sla">Acuerdo del servicio</a>
      </div>
    </div>
  );
}
