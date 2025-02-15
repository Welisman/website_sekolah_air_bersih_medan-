import React, { useState } from "react";
import { Container, Nav, Navbar, Button, Card, Row, Col } from "react-bootstrap";
import "../../../../style/admin/manajemenKonten/AcaraSMP.css";

const AcaraSMP= () => {
  const [acaraList, setAcaraList] = useState([
    {
      title: "Ibadah Bersama",
      description: "Ibadah ini terbuka untuk siswa sd-smp-sma-smk.",
      date: "00-000-0000",
      time: "18:00 WIB",
      image: "https://via.placeholder.com/300x200", // Ganti dengan URL gambar asli
    },
    {
      title: "Ibadah Bersama",
      description: "Ibadah ini terbuka untuk siswa sd-smp-sma-smk.",
      date: "00-000-0000",
      time: "18:00 WIB",
      image: "https://via.placeholder.com/300x200", // Ganti dengan URL gambar asli
    },
    {
      title: "Ibadah Bersama",
      description: "Ibadah ini terbuka untuk siswa sd-smp-sma-smk.",
      date: "00-000-0000",
      time: "18:00 WIB",
      image: "https://via.placeholder.com/300x200", // Ganti dengan URL gambar asli
    },
  ]);

  const handleDelete = (index) => {
    const newList = acaraList.filter((_, i) => i !== index);
    setAcaraList(newList);
  };

  return (
    <Container>
      <Navbar bg="light" variant="light" className="mb-3">
        <Container>
          <Navbar.Brand>Manajemen Konten</Navbar.Brand>
        </Container>
      </Navbar>

     <Nav variant="tabs" defaultActiveKey="Acara SMP">
                     <Nav.Item>
                         <Nav.Link eventKey="dashboard">Dashboard Utama</Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                        <Nav.Link eventKey="profil-smp">Profil SMP</Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                         <Nav.Link eventKey="pengumuman">Pengumuman</Nav.Link>
                     </Nav.Item>
                     <Nav.Item>
                         <Nav.Link eventKey="acara-smp"active>Acara SMP</Nav.Link>
                     </Nav.Item>
                 </Nav>

      <Row className="mt-4">
        {acaraList.map((acara, index) => (
          <Col key={index} md={4}>
            <Card className="acara-card">
              <Card.Img variant="top" src={acara.image} className="acara-img" />
              <Card.Body>
                <h5 className="acara-title">{acara.title}</h5>
                <p className="acara-description">{acara.description}</p>
                <p>
                  <strong>Tanggal :</strong> {acara.date} <br />
                  <strong>Jam :</strong> {acara.time}
                </p>
                <div className="button-group">
                  <Button variant="success" className="edit-button">
                    Edit
                  </Button>
                  <Button variant="danger" className="delete-button" onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AcaraSMP;
