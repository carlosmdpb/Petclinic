import {Button, Container, Table} from "reactstrap";
import { useState, useEffect } from "react";
import './utils/booking.css';

export function GetAllBooking() {
    let [booking, setBooking] = useState([]);
    const jwt = JSON.parse(window.localStorage.getItem("jwt"));
    function formatDate(date) {
        var options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(date).toLocaleDateString('en-EN', options);
    }
    useEffect(() => {
    async function setUp() {
        try {
            const response = await fetch("/api/v1/booking", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error('Error al obtener los datos de la reserva');
            }
            const data = await response.json();
            setBooking(data);
        } catch (error) {
            console.error('Error al obtener los datos de la reserva:', error);
            // Manejar el error adecuadamente, por ejemplo, establecer un estado de error para mostrar un mensaje al usuario.
        }
    }
    setUp();
}, []);

    
    return (
        <div>
            <Container style={{ marginTop: "15px" }} fluid>

                <h1 className="text-center">Booking Rooms</h1>
                <Button color="success" href="/post/booking">Create booking</Button>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th style={{ fontSize: '25px' }}>Start Date</th>
                            <th style={{ fontSize: '25px' }}>End Date</th>
                            <th style={{ fontSize: '25px' }}>Pet</th>
                            <th style={{ fontSize: '25px' }}>Hotel Room</th>
                        </tr>
                    </thead>
                    <tbody>
                        {booking.length > 0 ? (
                            booking.map((b) => {
                                return (
                                    <tr key={b.id}>
                                    <td>{formatDate(b.startDate)}</td>
                                    <td>{formatDate(b.endDate)}</td>   
                                    <td>{b.pet}</td>
                                    <td>{b.hotel}</td>
                                    </tr>
                                );
                            })
                        ) : (
        <tr>
            <td colSpan="4">No hay bookings disponibles.</td>
        </tr>
    )}
</tbody>

                </Table>

            </Container>

        </div>
    );
}
