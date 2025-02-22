import React, { useEffect, useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import axios from "axios";

const VisiMisi = () => {
    const [data, setData] = useState({ visi: "", misi: [], tujuan: "" });

    useEffect(() => {
        axios.get("http://localhost:3001/api/visi-misi")
            .then(response => setData(response.data))
            .catch(error => console.error("Gagal memuat data visi-misi:", error));
    }, []);

    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h3 className="text-center text-primary">Visi, Misi, dan Tujuan</h3>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={12}>
                    <h4 className="text-success">Visi</h4>
                    <p>{data.visi || "Memuat visi..."}</p>
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={12}>
                    <h4 className="text-success">Misi</h4>
                    {data.misi.length > 0 ? (
                        <ListGroup variant="flush">
                            {data.misi.map((item, index) => (
                                <ListGroup.Item key={index}>✅ {item}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    ) : (
                        <p>Memuat misi...</p>
                    )}
                </Col>
            </Row>

            <Row className="mt-3">
                <Col md={12}>
                    <h4 className="text-success">Tujuan</h4>
                    <p>{data.tujuan || "Memuat tujuan..."}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default VisiMisi;
