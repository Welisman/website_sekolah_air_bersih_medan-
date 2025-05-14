import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

const WaliKelasDetail = () => {
  const { id } = useParams();
  const [wali, setWali] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/wali-kelas/id/${id}`)
      .then((response) => setWali(response.data))
      .catch((error) => console.error("Gagal mengambil data wali kelas:", error));
  }, [id]);

  if (!wali) return <p className="text-center mt-4">Loading...</p>;

  const imageSrc = wali.image
    ? `data:image/jpeg;base64,${btoa(
        new Uint8Array(wali.image.data).reduce((data, byte) => data + String.fromCharCode(byte), "")
      )}`
    : "https://via.placeholder.com/300"; // Gambar default lebih besar

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">📚 Profil Wali Kelas {wali.kelas}</h2>
      <div className="shadow-lg p-4">
        <Row className="align-items-center justify-content-center">
          <Col md={4} className="text-center">
            <img
              src={imageSrc}
              alt={wali.nama_wali_kelas}
              className="img-fluid rounded"
              style={{ width: "300px", height: "auto", objectFit: "cover" }}
            />
          </Col>
          <Col md={6}>
            <Card.Body>
              <Card.Title className="mb-3">
                <h3><strong>{wali.nama_wali_kelas}</strong></h3>
              </Card.Title>
              <p><strong>Jenis Kelamin:</strong> {wali.jenis_kelamin}</p>
              <p><strong>Agama:</strong> {wali.agama}</p>
              <p><strong>NIP:</strong> {wali.nip}</p>
              <p><strong>Status:</strong> {wali.status}</p>
              <p><strong>Pendidikan:</strong> {wali.pendidikan}</p>
              <p><strong>Lulusan:</strong> {wali.lulusan}</p>
            </Card.Body>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default WaliKelasDetail;
