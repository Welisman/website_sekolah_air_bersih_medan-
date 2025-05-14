import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Form, Button, Container, Navbar } from "react-bootstrap";
import ManajemenDataNav from "./ManajemenDataNav";
const ManajemenDataAlumni = () => {
    return (
        <Container>
        <Navbar bg="light" variant="light" className="mb-3">
            <Container>
                <Navbar.Brand>Manajemen Data Sekolah</Navbar.Brand>
            </Container>
        </Navbar>

        <ManajemenDataNav />

            <h1>masih Kosong</h1>
        </Container>
    );
};

export default ManajemenDataAlumni;
