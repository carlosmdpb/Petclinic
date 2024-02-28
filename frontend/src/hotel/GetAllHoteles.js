import React, { useState, useEffect } from "react";
import { Button, Container, Table, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from "reactstrap";
import './utiles/hotel.css';

export function GetAllHoteles() {
    const [hoteles, setHoteles] = useState([]);
    const [modal, setModal] = useState(false);
    const [editedHotel, setEditedHotel] = useState(null);
    const [roomName, setRoomName] = useState("");
    const [size, setSize] = useState("");
    const jwt = JSON.parse(window.localStorage.getItem("jwt"));

    useEffect(() => {
        fetchData();
    }, [jwt]);

    const toggleModal = () => {
        setModal(!modal);
    };

    const fetchData = async () => {
        try {
            const response = await fetch("/api/v1/hotel", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch hotel data.");
            }
            const data = await response.json();
            setHoteles(data);    
        } catch (error) {
            console.error("Error fetching hotel data:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`/api/v1/hotel/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            if (!response.ok) {
                throw new Error(`Failed to delete hotel room with ID: ${id}`);
            }
            setHoteles(prevHoteles => prevHoteles.filter(hotel => hotel.id !== id));
            console.log(`Hotel room with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting hotel room:', error);
        }
    };

    const handleEdit = (hotel) => {
        setEditedHotel(hotel);
        setRoomName(hotel.roomName);
        setSize(hotel.size);
        toggleModal();
    };

    const handleSave = async () => {
        try {
            const updatedHotel = { ...editedHotel, roomName, size };
            const response = await fetch(`/api/v1/hotel/${editedHotel.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                },
                body: JSON.stringify(updatedHotel),
            });
            if (!response.ok) {
                throw new Error('Failed to update hotel room.');
            }
            toggleModal();
            fetchData();
            console.log('Hotel room updated successfully.');
        } catch (error) {
            console.error('Error updating hotel room:', error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === "roomName") {
            setRoomName(value);
        } else if (name === "size") {
            setSize(value);
        }
    };

    return (
        <div>
            <Container style={{ marginTop: "15px" }} fluid>

                <h1 className="text-center">Hotel Rooms</h1>
                <Button color="success" href="/createhotel">Create Hotel</Button>
                <Table className="mt-4">
                    <thead>
                        <tr>
                            <th style={{ fontSize: '25px' }}>Room Name</th>
                            <th style={{ fontSize: '25px' }}>Clinic</th>
                            <th style={{ fontSize: '25px' }}>Size (square meters)</th>
                            <th style={{ fontSize: '25px' }}>Not Allowed Pet Types</th>
                            <th style={{ fontSize: '25px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hoteles.length > 0 ? (
                            hoteles.map((h) => (
                                <tr key={h.id}>
                                    <td>{h.roomName}</td>
                                    <td>{h.clinic.name}</td>
                                    <td>{h.size}</td>
                                    <td>{h.allowedPetType.map((p) => p.name).join(', ')}</td>
                                    <td>
                                        <Button color="danger" onClick={() => handleDelete(h.id)}>Delete</Button>
                                        <Button color="primary" onClick={() => handleEdit(h)}>Edit</Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">There are no hotels available.</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Container>
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>Edit Hotel Room</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="roomName">Room Name</Label>
                            <Input type="text" name="roomName" value={roomName} onChange={handleInputChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="size">Size (square meters)</Label>
                            <Input type="text" name="size" value={size} onChange={handleInputChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>Save</Button>
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}
                                                                                                                     