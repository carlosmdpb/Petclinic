// Esta función crea un objeto que encapsula una promesa para su uso con Suspense
function createResource(promise) {
    let status = "pending";
    let response;

    const suspender = promise.then(
        (res) => {
            status = "success";
            response = res;
        },
        (err) => {
            status = "error";
            response = err;
        }
     );

    const read = () => {
        switch(status){
            case "pending":
                throw suspender;
            case "error":
                throw response;
            default:
                return response;
        }
    };

    return { read };
}

// Función para realizar una llamada a la API y devolver un recurso para su uso con Suspense
export function fetchData(url){
    const promise = fetch(url).then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    });

    return createResource(promise);
}
