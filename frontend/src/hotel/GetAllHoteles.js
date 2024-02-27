import {Button, Container, Table} from "reactstrap";
import { useState, useEffect } from "react";
import './utiles/hotel.css';

export function GetAllHoteles() {
    let [hoteles, setHoteles] = useState([]);
    const jwt = JSON.parse(window.localStorage.getItem("jwt"));

    useEffect(() => {
        async function setUp() {
        const data = await (
          await fetch("/api/v1/hotel", {
            headers: {
              Authorization: `Bearer ${jwt}`,
              "Content-Type": "application/json",
            },
          })
        ).json();
        setHoteles(data);    
      }
        setUp();
    }, []);
    
    return (
        <div >
            <Container style={{ marginTop: "15px" }} fluid>

                <h1 className="text-center table-header2">Hotel Rooms</h1>
                <Button color="success" href="/createhotel">Create Hotel</Button>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th style={{ fontSize: '25px' }}>Room Name</th>
                            <th style={{ fontSize: '25px' }}>Clinic</th>
                            <th style={{ fontSize: '25px' }}>Size (square meters)</th>
                            <th style={{ fontSize: '25px' }}>Not Allowed Pet Types</th>
                        </tr>
                    </thead>
                    <tbody>
                    {hoteles.length > 0 ? (
                            hoteles.map((h) => {
                                return (
                                    <tr key={h.id}>
                                        <td>{h.roomName}</td>
                                        <td>{h.clinic.name}</td>
                                        <td>{h.size}</td>
                                        <td>{h.allowedPetType.map((p) => p.name).join(', ')}</td>
                                    </tr>
                                );
                            })
                        ) : (
                            <p>There are no hotels available.</p>)
                    }
                    </tbody>
                </Table>

            </Container>

        </div>
    );
}


