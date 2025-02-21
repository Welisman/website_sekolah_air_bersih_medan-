import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Dashboard from "../home/Dashboard";

const Kegiatan = () => {
  // Contoh data kegiatan (bisa diganti dengan API atau data dinamis)
  const kegiatanList = [
    {
      id: 1,
      title: "Lomba Cerdas Cermat",
      description: "Kompetisi akademik antar siswa untuk meningkatkan wawasan.",
      date: "12 Maret 2025",
      time: "09:00 WIB",
      image: "https://source.unsplash.com/400x250/?education",
    },
    {
      id: 2,
      title: "Pentas Seni",
      description: "Ajang unjuk bakat siswa dalam bidang seni musik dan tari.",
      date: "20 April 2025",
      time: "18:00 WIB",
      image: "https://source.unsplash.com/400x250/?performance",
    },
    {
      id: 3,
      title: "Kegiatan Bakti Sosial",
      description: "Aksi sosial berbagi kebahagiaan kepada masyarakat sekitar.",
      date: "5 Mei 2025",
      time: "08:00 WIB",
      image: "https://source.unsplash.com/400x250/?charity",
    },
  ];

  return (
    <Container className="mt-4">
      {/* Judul Kegiatan */}
      <section className="text-center mb-4">
        <h2 className="fw-bold">🎉 Kegiatan Sekolah</h2>
        <p className="text-muted">Berikut adalah daftar kegiatan yang akan berlangsung di sekolah.</p>
      </section>

      {/* List Kegiatan */}
      <Row className="justify-content-center">
        {kegiatanList.map((kegiatan) => (
          <Col key={kegiatan.id} lg={4} md={6} sm={12} className="mb-4">
            <Card className="shadow-sm border-0 h-100">
              <Card.Img variant="top" src={kegiatan.image} alt={kegiatan.title} />
              <Card.Body className="text-center" style={{ backgroundColor: "#F9F9F9" }}>
                <Card.Title className="fw-bold">{kegiatan.title}</Card.Title>
                <Card.Text>{kegiatan.description}</Card.Text>
                <p className="text-primary fw-bold">📅 {kegiatan.date}</p>
                <p className="text-success fw-bold">⏰ {kegiatan.time}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Kegiatan;
