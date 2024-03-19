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
        const data = await (
          await fetch("/api/v1/booking", {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          })
        ).json();
        setBooking(data);    
      }
        setUp();
    }, []);
    
    return (
        <div >
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
                                    <td>{b.pet.name}</td>
                                    <td>{b.hotel.roomName}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <p>No hay bookings disponibles.</p>)
                    }
                    </tbody>
                </Table>

            </Container>

        </div>
    );
}
