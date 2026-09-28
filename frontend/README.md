# Frontend de Petclinic

Interfaz React para la gestión veterinaria, con pantallas de propietarios, veterinarios, clínicas y administración. Incluye adopciones, reservas de hotel y consultas.

La descripción completa y los requisitos están en el [README principal](../README.md).

## Desarrollo

Con el backend iniciado en el puerto 8080, ejecutar desde esta carpeta:

```sh
npm install
npm start
```

Interfaz en [http://localhost:3000](http://localhost:3000). El proxy de `package.json` redirige las llamadas al backend.

```sh
npm test -- --watchAll=false
npm run build
```

`src/App.js` define las rutas según el rol. `src/apis/` contiene ejemplos de consumo de servicios externos. `src/paymentAPI/` contiene una simulación de pago sin proveedor real conectado.
