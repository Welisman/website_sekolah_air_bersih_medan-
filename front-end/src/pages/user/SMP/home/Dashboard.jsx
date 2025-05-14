import React from "react";
import '../../../../style/user/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavDropdown } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import LoginButton from "../../../../components/LoginButton";



const Dashboard = () => {
    const location = useLocation();
    return (
        <header className="header">
            <Navbar expand="lg" className="costum-navbar" >
                <Container >
                    <Navbar.Brand href="/"><img
                        src="https://i.pinimg.com/236x/b3/52/da/b352da2be82b09a11c0936a497cb65b2.jpg"
                        width="50"
                        height="50"
                        className="d-inline-block align-top"
                        alt="logo"
                    /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" className="toogle" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link href="/" className={location.pathname === "/" ? "active" : ""}>Home</Nav.Link>
                            <Nav.Link href="/profil" className={location.pathname === "/profil" ? "active" : ""}>Profil</Nav.Link>
                            <Nav.Link href="/fasilitas" className={location.pathname === "/fasilitas" ? "active" : ""}>Fasilitas</Nav.Link>
                                <NavDropdown title="Acara" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/pengumuman" className={location.pathname === "/pengumuman" ? "active" : ""}>pengumuman</NavDropdown.Item>
                                <NavDropdown.Item href="/event" >Event</NavDropdown.Item>
                                <NavDropdown.Item href="/Kegiatan" >Kegiatan</NavDropdown.Item>
                            </NavDropdown>
                                <NavDropdown title="Database" id="basic-nav-dropdown" >
                                <NavDropdown.Item href="/data-siswa" className={location.pathname === "/data-siswa" ? "active" : ""}>Data Siswa</NavDropdown.Item>
                                <NavDropdown.Item href="/data-alumni" >Data Alumni</NavDropdown.Item>
                                <NavDropdown.Item href="/data-guru-tendik" >Data Guru dan Tendik</NavDropdown.Item>
                            </NavDropdown>
                            <Nav.Link href="/informasi-pendaftaran" className="item">Informasi Pendaftaran</Nav.Link>

                        </Nav>
                        <LoginButton className="button" />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Dashboard;