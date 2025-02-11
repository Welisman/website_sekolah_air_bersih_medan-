import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Dashboard from "../home/Dashboard";

const Event = () => {
  // Contoh data event (bisa diganti dengan API atau data dinamis)
  const events = [
    {
      id: 1,
      title: "Ibadah Bersama",
      description: "Ibadah ini terbuka untuk siswa SD, SMP, SMA, dan SMK.",
      date: "00-000-0000",
      time: "18:00 WIB",
      image: "https://source.unsplash.com/400x250/?church", // Contoh gambar
    },
    {
      id: 2,
      title: "Ibadah Bersama",
      description: "Ibadah ini terbuka untuk siswa SD, SMP, SMA, dan SMK.",
      date: "00-000-0000",
      time: "18:00 WIB",
      image: "https://source.unsplash.com/400x250/?church",
    },
    {
      id: 3,
      title: "Ibadah Bersama",
      description: "Ibadah ini terbuka untuk siswa SD, SMP, SMA, dan SMK.",
      date: "00-000-0000",
      time: "18:00 WIB",
      image: "https://source.unsplash.com/400x250/?church",
    },
    {
      id: 4,
      title: "Ibadah Bersama",
      description: "Ibadah ini terbuka untuk siswa SD, SMP, SMA, dan SMK.",
      date: "00-000-0000",
      time: "18:00 WIB",
      image: "https://source.unsplash.com/400x250/?church",
    },
    {
      id: 5,
      title: "Ibadah Bersama",
      description: "Ibadah ini terbuka untuk siswa SD, SMP, SMA, dan SMK.",
      date: "00-000-0000",
      time: "18:00 WIB",
      image: "https://source.unsplash.com/400x250/?church",
    },
  ];

  return (
    <Container className="mt-4">
      {/* Judul Event */}
      <h2 className="text-center mb-4">📅 Event Sekolah</h2>

      {/* List Event */}
      <Row className="justify-content-center">
        {events.map((event) => (
          <Col key={event.id} md={4} sm={6} xs={12} className="mb-4">
            <Card className="shadow border-0">
              <Card.Img variant="top" src={event.image} alt={event.title} />
              <Card.Body className="text-center" style={{ backgroundColor: "#E6D5F7" }}>
                <Card.Title className="fw-bold">{event.title}</Card.Title>
                <Card.Text>{event.description}</Card.Text>
                <p className="fw-bold">Tanggal: {event.date}</p>
                <p className="fw-bold">Jam: {event.time}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Event;
