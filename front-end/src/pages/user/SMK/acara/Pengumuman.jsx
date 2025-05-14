import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import Dashboard from "../../home/Dashboard";
import Footer from "../../../../components/user/Footer";

const Pengumuman = () => {
    const [pengumuman, setPengumuman] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/api/pengumuman")
            .then(response => setPengumuman(response.data))
            .catch(error => console.error("Gagal mengambil data pengumuman:", error));
    }, []);

    const formatTanggalJam = (tanggal) => {
        const optionsTanggal = { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" };
        const optionsJam = { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" };
        return {
            tanggal: new Date(tanggal).toLocaleDateString("id-ID", optionsTanggal),
            jam: new Date(tanggal).toLocaleTimeString("id-ID", optionsJam) + " WIB"
        };
    };

    return (
        <>
            <Container className="mt-4">
                <h2 className="text-center my-4">📢 Pengumuman Terbaru</h2>
                <Row className="justify-content-center">
                    {pengumuman.length > 0 ? (
                        pengumuman.map((item) => {
                            const { tanggal, jam } = formatTanggalJam(item.tanggal);
                            return (
                                <Col md={4} sm={6} xs={12} key={item.id} className="mb-4">
                                    <Card className="shadow border-0 p-3">
                                        <Card.Body>
                                            <Card.Title className="text-center fw-bold">{item.judul}</Card.Title>
                                            <Card.Text className="">
                                                {item.isi.length > 100 ? item.isi.substring(0, 100) + "..." : item.isi}
                                            </Card.Text>
                                            <small className="text-muted d-block text-center">
                                                📅 {tanggal} 🕒 {jam}
                                            </small>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            );
                        })
                    ) : (
                        <p className="text-center">Tidak ada pengumuman tersedia.</p>
                    )}
                </Row>
            </Container>
        </>
    );
};

export default Pengumuman;
