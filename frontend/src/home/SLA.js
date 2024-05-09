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
        <p>Los precios de los planes de facturación y sus respectivos límites de uso del producto de la empresa G5-54-Petclinic son los siguientes:</p>
          <table>
            <tr>
              <th>Basic</th>
              <th>Gold</th>
              <th>Platinum</th>
            </tr>
            <tr>
              <td>10€</td>
              <td>30€</td>
              <td>50€</td>
            </tr>
          </table>
        <p>El plan Basic permite 2 mascotas, 1 visita mensual, 2 veterinarios y acceso a servicio de visitas</p>
        <p>El plan Gold permite 4 mascotas, 3 visitas mensuales, 4 veterinarios, acceso a servicio de visitas,
          acceso al servicio de adopciones con 210 adopciones/mes, SLA garantizado, selección de veterinarios y
          calendario de visitas
        </p>
        <p>El plan Platinum permite 7 mascotas, 6 visitas mensuales, 8 veterinarios, acceso a servicio de visitas,
          acceso al servicio de adopciones con 420 adopciones/mes, acceso al servicio de Pet Hotel, realización de
          peticiones de cambio, 450 reservas/mes, soporte prioritario telefónico y por correo, SLA garantizado,
          selección de veterinarios y calendario de visitas, panel de control de mascotas y consultas en línea</p>


        <br></br>
        <h2>3. Duración y terminación</h2>
        <p>El acuerdo será vigente durante todo el curso académico, es decir, hasta el 15/07/2024 - 23:59. </p>
        <p>La renovación del acuerdo se hará de manera anual, teniendo un margen de dos semanas desde la finalización del anterior periodo de vigencia del acuerdo del cliente.</p>

        <br></br>
        <h2>4. SLA: Acuerdo a nivel de servicio</h2>
        <p>En esta sección se detalla el Acuerdo de Nivel de Servicio del usuario de la empresa G5-54-Petclinic, el cliente deberá aceptarlo cuando dicho usuario use nuestro producto software.</p>
        <h3>Métricas de servicio</h3>
        <p><strong>TTO (Tiempo de respuesta objetivo):</strong> Medirá el momento de la asignación o, más descriptivamente, el momento de ser asignado. Esto mide el lapso de tiempo entre la creación del ticket y la asignación a un agente que se encargará de ello. 
        Esta métrica tiene peso en escenarios de servicio al cliente o soporte técnico, donde indica el tiempo desde que un cliente presenta una inquietud o consulta hasta que un agente interactúa activamente con ella.</p>
        <p><strong>TTR (Tiempo de resolución objetivo):</strong> "Tiempo para resolver" término que medirá el tramo entre el inicio y la culminación de un billete; este último denota la obtención del estatus de "resuelto".     
        Esta métrica es una medida esencial en el entorno de servicio al cliente o soporte técnico, significa la brecha temporal necesaria para extinguir una solicitud o abordar un problema después de su articulación por parte del cliente.</p>

        <p>Nivel de satisfacción del cliente (NSC): Se pretende que al menos el 80% de los usuarios estén satisfechos con los servicios recibidos, según lo reflejado en las respuestas de las encuestas.</p>
        <p>Porcentaje de tickets resueltos en primera instancia (FTFR): El FTFR mide la capacidad del proveedor para resolver los problemas del cliente en la primera vez que se presentan. Este indicador se calculará en base a los tickets cerrados y se dividirá por el total de tickets presentados.</p>

        <h3>Mecanismo de seguimiento</h3>
        <p>Se colocará una solicitud de soporte en un sistema que rastrea los tickets y luego lo asigna a un técnico que tiene la capacidad y es gratuito. Cuando se registre su solicitud, se le enviará una notificación por correo electrónico y se le comunicará periódicamente más información sobre las actualizaciones de estado del proceso de resolución.</p>
        
        <h3>Periodo de soporte al usuairo</h3>
        <p>El soporte técnico estará disponible 24 Horas al día los 7 días de la semana para solicitudes de alta y crítica prioridad. Para solicitudes de baja y media prioridad, el soporte estará disponible de lunes a viernes de 6:00 a 15:00 horas.</p>        
        
        <h3>SLA con 4 niveles de prioridad</h3>
        <p>Critical, High, Medium, Low</p>

        <h3>Compensaciones por incumplimiento</h3>
        <p>Si el tiempo de respuesta o de resolución no alcanza los objetivos establecidos, se ofrecerán compensaciones en forma de créditos de servicio al cliente. Estos créditos se determinarán considerando la prioridad de la solicitud y el tiempo que exceda los límites establecidos. Los créditos de servicio podrán ser utilizados para solicitar servicios 
          adicionales de la empresa, o bien, para extender el período de servicio existente sin incurrir en costos adicionales.</p>
        
        <p>-Prioridad Critica: Si el TTO y TTR no se cumplen en las  horas acordadas, se llegaran a ofrecer créditos de servicio equivalentes a una hora adicional de soporte técnico o una extensión del período de servicio sin costo adicional durante un período determinado.</p>
        <p>-Prioridad alta: Si el TTO y TTR no se cumplen en las  horas acordadas, se llegaran a ofrecer créditos de servicio equivalentes a 45 minutos de soporte técnico o una extensión del período de servicio sin costo adicional durante un período determinado.</p>
        <p>-Prioridad media: Si el TTO y TTR no se cumplen en las  horas acordadas, se pueden ofrecer créditos de servicio equivalentes a 30 minutos adicional de soporte técnico o una extensión del período de servicio sin costo adicional durante un período determinado.</p>
        <p>-Prioridad baja: Si el TTO y TTR no se cumplen en las  horas acordadas, se pueden ofrecer créditos de servicio equivalentes a 15 minutos adicionales de soporte técnico o una extensión del período de servicio sin costo adicional durante un período determinado.</p>
        
        
        
        <br></br>
        <h2>5. Otros términos generales</h2>
        <p>El versionado de este documento seguirá la misma política de versionado, que el resto de artefactos del proyecto, por lo que seguiremos utilizando un versionado x.y.z.</p>
        <p>La primera versión generada del documento será la 1.0.0.</p>
        <p>x: indica una versión con cambios mayores en el documento, como implementación de nuevas features que afecten al precio de algunos de los planes de pago, cambios en el precio de alguno de los planes o cambios en las métricas de servicio o niveles de prioridad del SLA.</p>
        <p>y: indica una versión con cambios menores, como cambios pequeños en algunas de las features ya existentes en algunos de los planes de pago, o en los tiempos de respuesta y resolución del SLA.</p>
        <p>z: indica una versión de un parche o corrección menor, como por ejemplo errores en el texto o en el estilo del mismo.</p>


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