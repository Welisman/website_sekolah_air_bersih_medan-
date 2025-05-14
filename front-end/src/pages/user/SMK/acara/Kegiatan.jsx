import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Card, Row, Col, Form } from "react-bootstrap";

const Kegiatan = () => {
    const [kegiatan, setKegiatan] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/api/kegiatan")
            .then((res) => setKegiatan(res.data))
            .catch((err) => console.error("Gagal mengambil data kegiatan:", err));
    }, []);

    // Filter kegiatan berdasarkan pencarian
    const filteredKegiatan = kegiatan.filter((item) =>
        item.judul.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">📅 Kegiatan Terbaru</h2>

            {/* Input pencarian */}
            <Form.Group className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Cari kegiatan..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form.Group>

            <Row>
                {filteredKegiatan.map((item) => (
                    <Col md={4} key={item.id} className="mb-3">
                        <Card>
                            {item.image && (
                                <Card.Img
                                    variant="top"
                                    src={item.image ? item.image : "https://via.placeholder.com/150"}
                                    alt={item.judul}
                                />

                            )}
                            <Card.Body>
                                <Card.Title>{item.judul}</Card.Title>
                                <small className="text-muted">
                                    {new Date(item.tanggal).toLocaleDateString("id-ID", {
                                        weekday: "long",
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}{" "}
                                    {item.waktu}
                                </small>

                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Kegiatan;
