import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Dashboard from "../home/Dashboard";

const dataKelas = {
  "Kelas X": ["X-A", "X-B", "X-C"],
  "Kelas XI": ["XI-A", "XI-B", "XI-C"],
  "Kelas XII": ["XII-A", "XII-B", "XII-C"],
};

const DataSiswa = () => {
  return (
    <Container>
      <h2 className="text-center my-4">Siswa/i SMA Tahun Ajaran 2021/2022</h2>
      
      {Object.entries(dataKelas).map(([kelas, siswa]) => (
        <div key={kelas} className="mb-4">
          <h4>{kelas}</h4>
          <Row className="g-3">
            {siswa.map((namaKelas) => (
              <Col key={namaKelas} xs={12} md={4}>
                <Card className="text-center shadow-sm">
                  <Card.Body>
                    <Card.Title>{namaKelas}</Card.Title>
                    <Card.Text>Total Siswa: 20</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Container>
  );
};

export default DataSiswa;
