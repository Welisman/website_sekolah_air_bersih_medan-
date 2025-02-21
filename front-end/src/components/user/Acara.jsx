import React from 'react';
import { Container, Row, Col } from "react-bootstrap";

const Acara = () => {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={4} className="mb-4 costum-card">
          <div className="card shadow">
            <div className="card-header">
              <h2 className="card-title text-center">Pengumuman</h2>
            </div>
            <div className="card-body costum">
              <p>......</p>
            </div>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="card shadow">
            <div className="card-header">
              <h2 className="card-title text-center">Event</h2>
            </div>
            <div className="card-body costum">
              <ul className="costum-list">
                <p>.......</p> {/* Pesan loading jika data masih kosong */}
              </ul>
            </div>
          </div>
        </Col>
        <Col md={4} className="mb-4">
          <div className="card shadow">
            <div className="card-header">
              <h2 className="card-title text-center">Kegiatan</h2>
            </div>
            <div className="card-body costum">
              <ul className="costum-list">
                <p>.......</p> {/* Pesan loading jika data masih kosong */}
              </ul>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Acara;
