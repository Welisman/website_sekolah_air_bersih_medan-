import React from 'react';
import { Container, Form, Button, Row, Col, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import "../../../style/admin/manajemenKonten/ManajemenKonten.css";
import Foto from "../../../assets/home/image2.png";
import ManajemenNav from "./ManajemenNav";

const ManajemenKonten = () => {
    return (
        <Container>
            <Navbar bg="primary" variant="dark" className="mb-3">
                <Container>
                    <Navbar.Brand>Manajemen Konten</Navbar.Brand>
                </Container>
            </Navbar>

            <ManajemenNav />

            <div className="p-4 shadow-sm">
                <Form>
                    <div>
                        <h3 className="text-center mb-4">Kepala Sekolah</h3>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama :</Form.Label>
                            <Form.Control type="text" defaultValue="H. Sumarno, M.Pd." />
                            <Col>
                                <Button variant="primary">Update</Button>
                            </Col>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Foto :</Form.Label>
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <img src={Foto} alt="Foto Kepala Sekolah" className="img-fluid" />
                                </Col>
                                <Col>
                                    <Button variant="primary">Update</Button>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Kata Sambutan :</Form.Label>
                            <Form.Control as="textarea" rows={5} defaultValue="Teks sambutan di sini..." />
                            <Button className="mt-2" variant="success">Update Kata Sambutan</Button>
                        </Form.Group>
                    </div>

                    <h2 className="mb-3 text-center">Visi Misi</h2>
                    <Form.Group className="mb-3">
                        <Form.Label>Visi :</Form.Label>
                        <Form.Control as="textarea" rows={3} defaultValue="Teks visi di sini..." />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Misi :</Form.Label>
                        <Form.Control as="textarea" rows={5} defaultValue="Teks misi di sini..." />
                    </Form.Group>
                    <Button variant="success">Update Visi Misi</Button>
                </Form>
            </div>
        </Container>
    );
};

export default ManajemenKonten;
