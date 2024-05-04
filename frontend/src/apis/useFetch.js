//Esta función es generica para consumir varias API devolviendo un objeto data más facil de manipualr

import { useState, useEffect } from "react";

export function useFetch(url){
    const [data, setData] = useState(null);
    const [loading,setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [controller, setController] = useState(null);

useEffect (()=>{
    const abortController = new AbortController();
    setController[abortController];
    
    setLoading(true);
    fetch(url,{signal: abortController.signal})
    .then((response) => response.json())
    .then((data) => setData(data))
    .catch ((error) => {
        if(error.name=== "AbortError"){
            console.log("Request cancelled");
        }else{
            setError(error)}})
    .finally(() => setLoading(false));
    

    return () => abortController.abort();  //componente desmontado cuando no es visible, al cambiar de ruta o cerrar ventana/pestaña

},[]);

    const handleCancelRequest = () => {
        if(controller)
        controller.abort();
        setError("Request cancelled");

    }

return {data, loading, error, handleCancelRequest};
}