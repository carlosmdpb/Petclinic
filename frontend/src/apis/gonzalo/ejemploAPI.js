import '../App.css';
import { useFetch } from '../useFetch';

//Consumición de Ejemplo para API con la función genérica generada

function _api_ejemplo(){
    const { data, loading , error} = useFetch('https://rickandmortyapi.com/api/character');

    return(
        <div className="home-page-container">
            <div className="hero-div">
                <h1>Fotos de Rick y Morty</h1> 
                <button onClick={handleCancelRequest}>Cancelar solicitud</button>         
            </div>
                <ul>
                    {error && <li>Error: {error} </li>}
                    {loading && <li> Cargando... </li>}
                    {data?.map((datos)=> (<li key={datos.id}>{datos.name}</li>))}
                </ul>
        </div>
    );
}
