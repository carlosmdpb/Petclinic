# Petclinic

Aplicación web de gestión de clínicas veterinarias. Reúne la información de propietarios, mascotas, veterinarios y visitas, y amplía ese flujo con adopciones, reservas de hotel para mascotas y consultas mediante tickets.

Proyecto académico desarrollado en equipo para Procesos de Software y Gestión 2 (PSG2), Universidad de Sevilla, curso 2023/24. Utiliza la base docente React Petclinic, derivada de Spring Petclinic.

## Funcionalidades

- Registro, inicio de sesión y acceso según roles: administrador, propietario de mascota, veterinario y propietario de clínica.
- Gestión de clínicas, propietarios, mascotas, veterinarios, especialidades y visitas.
- Publicación de ofertas de adopción y gestión de adopciones.
- Habitaciones de hotel para mascotas y reservas con fechas de entrada y salida.
- Consultas y tickets para el seguimiento de solicitudes.
- Pantallas de planes de servicio y documentación de acuerdos de servicio.
- Ejemplos de consumo de APIs externas desde React, separados del flujo veterinario principal.

La carpeta `frontend/src/paymentAPI/` contiene una simulación de pago; no constituye una integración de cobros reales.

## Tecnologías y arquitectura

| Capa | Tecnologías |
| --- | --- |
| Interfaz | React 18, React Router, Bootstrap y Reactstrap |
| Backend | Java 17 y Spring Boot 3.1.1 |
| Seguridad | Spring Security y JWT |
| Persistencia | Spring Data JPA y H2 en memoria por defecto |
| Documentación de API | Springdoc / Swagger UI |
| Pruebas | Spring Boot Test, Spring Security Test, Jest y Testing Library |
| Construcción y cobertura | Maven Wrapper, npm y JaCoCo |

React consume una API REST. Los controladores delegan la lógica en servicios y el acceso a datos en repositorios. Las entidades representan las relaciones entre clínicas, usuarios, mascotas, reservas y consultas.

## Ejecutar en local

Requisitos: JDK 17, Node.js y npm. El entorno original toma Node 18.12.1 como referencia en `pom.xml`. Se incluye Maven Wrapper.

```sh
git clone https://github.com/carlosmdpb/Petclinic.git
cd Petclinic
```

Iniciar el backend desde la raíz:

```powershell
# Windows / PowerShell
.\mvnw.cmd spring-boot:run
```

```sh
# Linux / macOS
./mvnw spring-boot:run
```

En otra terminal, desde la raíz:

```sh
cd frontend
npm install
npm start
```

- Interfaz: [http://localhost:3000](http://localhost:3000).
- API: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html).

El proxy de React dirige las llamadas al backend del puerto 8080. La configuración local utiliza H2, inicialización SQL y `create-drop`; los datos no se conservan entre reinicios.

### Recorrido de prueba

Consultar las mascotas y visitas con los datos iniciales, recorrer las ofertas de adopción y las reservas de hotel, y explorar los endpoints en Swagger. Las pantallas disponibles dependen del rol de la cuenta.

## Estructura y documentación

```text
frontend/src/        Pantallas por rol, componentes y acceso a la API
src/main/java/       Dominio, servicios, repositorios y seguridad
src/main/resources/  Configuración y datos iniciales
src/test/            Pruebas Java y plan JMeter
docs/                Documentación académica por hitos
info.yml             Identificación del proyecto y equipo
```

- [Rutas y pantallas](frontend/src/App.js).
- [Reservas de hotel](src/main/java/org/springframework/samples/petclinic/booking/Booking.java).
- [Consultas](src/main/java/org/springframework/samples/petclinic/consultation/Consultation.java).
- [Documentación del proceso y entregas](docs/).

## Pruebas y construcción

Desde la raíz:

```sh
./mvnw test
./mvnw package
```

En Windows, sustituir `./mvnw` por `.\mvnw.cmd`. Desde `frontend/`:

```sh
npm test -- --watchAll=false
npm run build
```

Las ejecuciones de Maven que instalan y construyen React están comentadas. Ejecutar primero `npm run build` en `frontend/` si se quiere incluir la interfaz al empaquetar. Consultar `pom.xml` para las tareas de cobertura. La existencia de pruebas y configuración de cobertura no acredita su resultado: hay que ejecutarlas en el entorno de desarrollo.

## Contexto y alcance

Esta versión es una evolución académica de React Petclinic, con trabajo de desarrollo y gestión en equipo. Los miembros están recogidos en [info.yml](info.yml). Conserva configuración de desarrollo y no incluye un proveedor de pagos real conectado.

Se mantiene la atribución a [Spring Petclinic](https://github.com/spring-projects/spring-petclinic) y a su adaptación docente para la Universidad de Sevilla. El `pom.xml` conserva la referencia a Apache License 2.0 de la base.
