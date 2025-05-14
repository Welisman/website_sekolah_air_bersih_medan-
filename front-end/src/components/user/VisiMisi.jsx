import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import axios from "axios";
import "../../style/components/VisiMisi.css";

const VisiMisi = () => {
  const [data, setData] = useState({ visi: "", misi: [], tujuan: "" });

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/visi-misi")
      .then((response) => {
          setData(response.data);
      })
      .catch((error) => {
          console.error("❌ Gagal memuat data visi-misi:", error);
      });
}, []);



  return (
    <Container className="mt-5">
      <h2 className="judul  text-center">Visi, Misi dan Tujuan</h2>
      <Row className="mt-4 d-flex justify-content-center align-items-stretch">
        {/* Kartu Visi */}
        <Col md={4} sm={12} className="mb-3">
          <Card className="visi-misi-card d-flex flex-column h-100">
            <Card.Header className="card-header-custom">Visi</Card.Header>
            <Card.Body className="d-flex flex-column">
              <p className="flex-grow-1">{data.visi || "Memuat visi..."}</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Kartu Misi */}
        <Col md={4} sm={12} className="mb-3">
          <Card className="visi-misi-card d-flex flex-column h-100">
            <Card.Header className="card-header-custom">Misi</Card.Header>
            <Card.Body className="d-flex flex-column">
              {data.misi.length > 0 ? (
                <ul className="text-start flex-grow-1">
                  {data.misi.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p className="flex-grow-1">Memuat Misi...</p>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Kartu Tujuan */}
        <Col md={4} sm={12} className="mb-3">
          <Card className="visi-misi-card d-flex flex-column h-100">
            <Card.Header className="card-header-custom">Tujuan</Card.Header>
            <Card.Body className="d-flex flex-column">
              <p className="flex-grow-1">{data.tujuan || "Memuat Tujuan..."}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default VisiMisi;
