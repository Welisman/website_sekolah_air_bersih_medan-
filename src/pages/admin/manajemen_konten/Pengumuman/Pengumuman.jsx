import React, { useState } from "react";
import { Container, Nav, Navbar, Button, Card } from "react-bootstrap";
import "../../../../style/admin/manajemenKonten/Pengumuman.css";

const Pengumuman = () => {
  const [pengumumanList, setPengumumanList] = useState([
    "Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video that best fits your document.",
    "Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video that best fits your document.",
  ]);

  const handleDelete = (index) => {
    const newList = pengumumanList.filter((_, i) => i !== index);
    setPengumumanList(newList);
  };

  const handleTambah = () => {
    setPengumumanList([
      ...pengumumanList,
      "Video provides a powerful way to help you prove your point. When you click Online Video, you can paste in the embed code for the video you want to add. You can also type a keyword to search online for the video that best fits your document.",
    ]);
  };

  return (
    <Container>
      <Navbar bg="light" variant="light" className="mb-3">
        <Container>
          <Navbar.Brand>Manajemen Konten</Navbar.Brand>
        </Container>
      </Navbar>

      <Nav variant="tabs" defaultActiveKey="Pengumuman">
                <Nav.Item>
                    <Nav.Link eventKey="dashboard">Dashboard Utama</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                   <Nav.Link eventKey="profil-smp">Profil SMP</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="pengumuman"active>Pengumuman</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="acara-smp">Acara SMP </Nav.Link>
                </Nav.Item>
            </Nav>

      <div className="pengumuman-container">
        {pengumumanList.map((text, index) => (
          <div key={index} className="pengumuman-card">
            <div>
              <p className="pengumuman-text">{text}</p>
            <Button
                variant="danger"
                className="delete-button"
                onClick={() => handleDelete(index)}
              >
                Delete
              </Button> 
            </div>
          </div>
        ))}
      </div>

      <Button variant="secondary" className="tambah-button" onClick={handleTambah}>
        Tambah Pengumuman
      </Button>
    </Container>
  );
};

export default Pengumuman;
