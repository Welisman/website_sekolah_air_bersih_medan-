import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

const DetailGuruTendik = () => {
  const { id } = useParams(); // Mengambil ID dari URL
  const [guruTendik, setGuruTendik] = useState(null); // Data guru tendik
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Error handling
  const navigate = useNavigate(); // Untuk navigasi kembali ke halaman sebelumnya

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/data-guru-tendik/${id}`)
      .then((response) => {
        setGuruTendik(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil data guru/tendik.", error);
        setError("Gagal mengambil data guru/tendik.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);
  
  

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading data...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p>{error}</p>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={6} className="text-center">
          {/* Menampilkan Foto Guru/Tendik */}
          {guruTendik.image ? (
            <img
              src={`data:image/jpeg;base64,${guruTendik.image}`}
              alt={guruTendik.nama}
              className="img-fluid"
              style={{ objectFit: "cover", height: "300px", borderRadius: "8px" }}
            />
          ) : (
            <div
              style={{
                height: "300px",
                backgroundColor: "#f0f0f0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
              }}
            >
              Tidak ada Foto
            </div>
          )}
        </Col>
        <Col md={6}>
          {/* Menampilkan Detail Data Guru/Tendik */}
          <h2>{guruTendik.nama}</h2>
          <p><strong>NIP:</strong> {guruTendik.nip}</p>
          <p><strong>Email:</strong> {guruTendik.email}</p>
          <p><strong>Alamat:</strong> {guruTendik.alamat}</p>
          <p><strong>No. HP:</strong> {guruTendik.no_hp}</p>
          <p><strong>Mata Pelajaran:</strong> {guruTendik.mata_pelajaran}</p>
        </Col>
      </Row>

      {/* Tombol untuk Kembali */}
      <Button variant="primary" onClick={() => navigate("/data-guru-tendik")}>
        Kembali ke Daftar Guru/Tendik
      </Button>
    </Container>
  );
};

export default DetailGuruTendik;
