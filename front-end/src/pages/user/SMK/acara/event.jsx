import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner, Alert, Form } from "react-bootstrap";
import axios from "axios";

const Event = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Ambil data dari backend pas komponen dimount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/events");
      setEvents(response.data);
      setFilteredEvents(response.data);
    } catch (err) {
      console.error("Gagal mengambil data event:", err);
      setError("Gagal mengambil data event. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const formatTanggal = (tanggal) => {
    if (!tanggal) return "-";
    const dateObj = new Date(tanggal);
    return dateObj.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatJam = (jam) => {
    return jam ? jam.slice(0, 5) : "-";
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">📅 Event Sekolah</h2>

      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="🔍 Cari event berdasarkan judul atau deskripsi..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
      </Row>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Memuat event...</p>
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : events.length === 0 ? (
        <p className="text-center">Belum ada event tersedia.</p>
      ) : (
        <Row className="justify-content-center">
          {events.map((event) => (
            <Col key={event.id} md={4} sm={6} xs={12} className="mb-4">
              <Card className="shadow border-0 h-100">
                <Card.Img
                  variant="top"
                  src={
                    event.image
                      ? event.image // base64 format dari backend
                      : `http://localhost:3001/api/events/${event.id}/image`
                  }
                  alt={event.title}
                  style={{ height: "250px", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/300x250?text=No+Image";
                  }}
                />
                <Card.Body
                  className="text-center d-flex flex-column justify-content-between"
                  style={{ backgroundColor: "#E6D5F7" }}
                >
                  <div>
                    <Card.Title className="fw-bold mb-2">{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                  </div>
                  <div className="mt-3">
                    <p className="fw-bold mb-1">📅 {formatTanggal(event.date)}</p>
                    <p className="fw-bold">⏰ {formatJam(event.time)}</p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Event;
