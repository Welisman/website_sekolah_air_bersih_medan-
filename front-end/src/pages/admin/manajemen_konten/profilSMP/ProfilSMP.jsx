// src/pages/admin/manajemen_konten/AcaraSMP.js
import React, { useState } from "react";
import { Container, Navbar, Button, Card, Row, Col } from "react-bootstrap";
import ManajemenNav from "../ManajemenNav";

const AcaraSMP = () => {
  const [acaraList, setAcaraList] = useState([
    {
      title: "Ibadah Bersama",
      description: "Ibadah ini terbuka untuk semua siswa.",
      date: "10-05-2025",
      time: "18:00 WIB",
      image: "https://via.placeholder.com/300x200",
    },
  ]);

  const handleDelete = (index) => {
    setAcaraList(acaraList.filter((_, i) => i !== index));
  };

  return (
    <Container>
      <Navbar bg="light" variant="light" className="mb-3">
        <Container>
          <Navbar.Brand>Manajemen Konten</Navbar.Brand>
        </Container>
      </Navbar>

      <ManajemenNav />

      <Row className="mt-4">
        {acaraList.map((acara, index) => (
          <Col key={index} md={4}>
            <Card>
              <Card.Img variant="top" src={acara.image} />
              <Card.Body>
                <h5>{acara.title}</h5>
                <p>{acara.description}</p>
                <p>
                  <strong>Tanggal:</strong> {acara.date} <br />
                  <strong>Jam:</strong> {acara.time}
                </p>
                <Button variant="danger" onClick={() => handleDelete(index)}>
                  Hapus
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AcaraSMP;
