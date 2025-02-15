import React from 'react';
import { Container, Row, Col, Form, Button, Nav, Navbar, Card } from 'react-bootstrap';
import "../../../../style/admin/manajemenKonten/ProfilSMP.css"

const ProfilSMP = () => {
    return (
        <Container >
            <div>   
                <Navbar bg="primary" variant="dark" className="mb-3">
                    <Container>
                        <Navbar.Brand>Manajemen Konten</Navbar.Brand>
                    </Container>
                </Navbar>

                <Nav variant="tabs" defaultActiveKey="profil-smp">
                    <Nav.Item>
                        <Nav.Link eventKey="dashboard">Dashboard Utama</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="profil-smp" active>Profil SMP</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="pengumuman">Pengumuman</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="acara-sma">Acara SMP</Nav.Link>
                    </Nav.Item>
                </Nav>

                <div>
                    <div>
                        <p><strong>Nama Sekolah :</strong></p>
                        <p><strong>Status Kepemilikan :</strong></p>
                        <p><strong>Bentuk Pendidikan :</strong></p>
                        <p><strong>Alamat Sekolah :</strong></p>
                        <p><strong>Email Sekolah :</strong></p>
                        <p><strong>Tanggal Pendirian :</strong></p>

                    </div>
                </div>

                <div>
                    <div>
                        <Form>
                            <Form.Group className="mb-2">
                                <Form.Label>Nama Sekolah Baru :</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Status Kepemilikan Baru :</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Bentuk Pendidikan Baru :</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Alamat Sekolah Baru :</Form.Label>
                                <Form.Control type="text" />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Email Sekolah Baru :</Form.Label>
                                <Form.Control type="email" />
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Tanggal Pendirian Baru :</Form.Label>
                                <Form.Control type="date" />
                            </Form.Group>
                            <Button variant="primary" className="mt-3">Update</Button>
                        </Form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default ProfilSMP;
