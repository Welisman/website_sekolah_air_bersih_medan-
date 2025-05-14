import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Alert, Image, Card, Row, Col, Spinner, Navbar, Container } from "react-bootstrap";

import axios from "axios";
import ManajemenNav from "../ManajemenNav";

const EventsSMP = () => {
  const [eventList, setEventList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    date: "",
    time: "",
    image: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/events");
      setEventList(response.data);
    } catch (error) {
      console.error("Gagal ambil data events:", error);
      setAlertMessage("Gagal mengambil daftar events.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
    setPreviewImage(file ? URL.createObjectURL(file) : null);
  };

  const handleShowModal = () => {
    setShowModal(true);
    setIsEditing(false);
    resetForm();
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: null,
      title: "",
      description: "",
      date: "",
      time: "",
      image: null,
    });
    setPreviewImage(null);
    setIsEditing(false);
  };

  const handleEdit = (event) => {
    setIsEditing(true);
    setFormData({
      id: event.id,
      title: event.title,
      description: event.description,
      date: event.date ? event.date.split("T")[0] : "",
      time: event.time,
      image: null,
    });
    setPreviewImage(event.image);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin mau hapus event ini?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3001/api/events/${id}`);
      setAlertMessage("Event berhasil dihapus.");
      fetchEvents();
    } catch (error) {
      console.error("Gagal hapus event:", error);
      setAlertMessage("Gagal menghapus event.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("date", formData.date);
    form.append("time", formData.time);
    if (formData.image) {
      form.append("image", formData.image);
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:3001/api/events/${formData.id}`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setAlertMessage("Event berhasil diperbarui.");
      } else {
        await axios.post("http://localhost:3001/api/events", form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setAlertMessage("Event berhasil ditambahkan.");
      }

      fetchEvents();
      handleClose();
    } catch (error) {
      console.error("Gagal simpan event:", error);
      setAlertMessage("Gagal menyimpan event.");
    }
  };

  return (
    <Container>
    <Navbar bg="light" variant="light" className="mb-3">
                <Container>
                    <Navbar.Brand>Manajemen Konten</Navbar.Brand>
                </Container>
            </Navbar>
            
            <ManajemenNav />

    <div className="container mt-4">
      <h2>📅 Daftar Event SMP</h2>

      {alertMessage && (
        <Alert variant="info" onClose={() => setAlertMessage("")} dismissible>
          {alertMessage}
        </Alert>
      )}

      <Button variant="primary" onClick={handleShowModal} className="mb-3">
        ➕ Tambah Event
      </Button>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Memuat daftar events...</p>
        </div>
      ) : eventList.length === 0 ? (
        <p>Belum ada event tersedia.</p>
      ) : (
        <Row>
          {eventList.map((event) => (
            <Col md={4} key={event.id} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={event.image || "https://via.placeholder.com/300x200"}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title>{event.title}</Card.Title>
                  <Card.Text>
                    <strong>Tanggal:</strong>{" "}
                    {new Date(event.date).toLocaleDateString()} <br />
                    <strong>Waktu:</strong> {event.time} <br />
                    <strong>Deskripsi:</strong> {event.description}
                  </Card.Text>
                  <div className="d-flex justify-content-between">
                    <Button variant="success" size="sm" onClick={() => handleEdit(event)}>
                      ✏️ Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)}>
                      🗑️ Hapus
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Modal Tambah / Edit */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "✏️ Edit Event" : "➕ Tambah Event"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Judul</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tanggal</Form.Label>
              <Form.Control
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Waktu</Form.Label>
              <Form.Control
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Gambar</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
              {previewImage && (
                <Image src={previewImage} alt="Preview" width={100} className="mt-2" thumbnail />
              )}
            </Form.Group>

            <Button type="submit" variant="primary">
              {isEditing ? "💾 Simpan Perubahan" : "➕ Tambah Event"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
    </Container>
  );
};

export default EventsSMP;
