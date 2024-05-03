import React from "react";
import "../static/css/owner/editPet.css";
import "../static/css/auth/authButton.css"
import { Link } from "react-router-dom";

export default function SLA(){

  return (
    <div className="pet-list-page-container">
        <h1 className="pet-list-title">Acuerdo para la prestación del servicio</h1>
        <br></br>
        <h2>Índice</h2>
        <ol>
            <li>Descripción del servicio</li>
            <li>Precios</li>
            <li>Duración y tertminación</li>
            <li>SLA: Acuerdo a nivel de servicio</li>
            <li>Otros términos generales</li>
        </ol>
        <br></br>
        <h2>1. Descripción del servicio</h2>
            <p>PetClinic es un software de gestión de clínicas veterinarias que ofrece una variedad de servicios para facilitar la administración y el cuidado de las mascotas. En general, PetClinic ofrece los siguientes servicios: </p>

            <p>1. Gestión de citas: Permite programar citas para consultas, vacunaciones, cirugías u otros servicios veterinarios, ayudando a organizar la agenda del personal y optimizar el tiempo de atención.</p>

            <p>2. Gestión de las adopciones: permite a los usuarios ofrecer a sus mascotas en adopción y facilitar la comunicación entre los dueños y los adoptantes.</p>

            <p>3. Servicio de hospedaje de mascotas: Permite al personal de la clínica recibir y atender las solicitudes de hospedaje de mascotas, así como realizar el seguimiento de las mismas. </p>

            <p>4. Gestión de consultas: Permite al personal de la clínica recibir y atender las solicitudes de consultas, así como realizar el seguimiento de las mismas.</p>

            <p>Por otro lado, para asistir a los dueños de las clínicas, la web ofrece usa serie de servicios de asistencia técnica para ayudar a los dueños de las clínicas a gestionar mejor su negocio online:</p>
            <p>1. Gestión de incidencias: permite a los dueños de clínicas veterinarias reportar problemas y errores encontrados durante el uso de la aplicación.</p>
            <p>2. Gestión de solicitud de cambios y de usuarios: permite realizar peticiones a los administradores de la web acerca de la gestión de nuevos clientes o proponer cambios y mejoras para la web de PetClinc.</p>
            <p>Toda esta asistencia técnica está cubierta tres disntos planes de precios y con garantías a nivel de usuario que se desarrollarán en los siguientes puntos de este documento.</p>

        <br></br>
        <h2>2. Precios</h2>


        <br></br>
        <h2>3. Duración y terminación</h2>


        <br></br>
        <h2>4. SLA: Acuerdo a nivel de servicio</h2>


        <br></br>
        <h2>5. Otros términos generales</h2>


        <br></br>
        <br></br>

        <div align="center">
            <Link
              to={"/"}
              className="auth-button brown-2"
              style={{ textDecoration: "none" }}
              >
              Back
            </Link>
        </div>    
        <br></br>
    </div>
  );

}
