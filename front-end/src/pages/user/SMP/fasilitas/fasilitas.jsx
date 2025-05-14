import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Form, Spinner, Alert } from "react-bootstrap";

const Fasilitas = () => {
    const [fasilitas, setFasilitas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/api/fasilitas")
            .then((res) => {
                setFasilitas(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Gagal mengambil data fasilitas:", err);
                setError("Gagal mengambil data fasilitas. Coba lagi nanti!");
                setLoading(false);
            });
    }, []);

    // Filter fasilitas berdasarkan pencarian
    const filteredFasilitas = fasilitas.filter((item) =>
        item.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">🏢 Fasilitas Sekolah</h2>

            <Form.Group className="mb-4">
                <Form.Control
                    type="text"
                    placeholder="Cari fasilitas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>

            {/* Loading Spinner */}
            {loading && (
                <div className="text-center">
                    <Spinner animation="border" role="status" />
                    <div className="mt-2">Memuat data fasilitas...</div>
                </div>
            )}

            {/* Error Message */}
            {error && <Alert variant="danger">{error}</Alert>}

            {/* Card List */}
            {!loading && !error && (
                <>
                    {filteredFasilitas.length === 0 ? (
                        <p className="text-center">😕 Fasilitas tidak ditemukan.</p>
                    ) : (
                        <Row>
                            {filteredFasilitas.map((item) => (
                                <Col xs={12} sm={6} md={4} key={item.id} className="mb-4">
                                    <Card className="shadow-sm h-100">
                                        {item.image && (
                                            <Card.Img
                                                variant="top"
                                                src={item.image}
                                                alt={item.nama}
                                                style={{ height: "200px", objectFit: "cover" }}
                                            />
                                        )}
                                        <Card.Body>
                                            <Card.Title>{item.nama}</Card.Title>
                                            <Card.Text>{item.deskripsi}</Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </>
            )}
        </Container>
    );
};

export default Fasilitas;
