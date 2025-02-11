import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function Struktur() {
  return (
    <Container>
      <h2 className="text-center mt-5 mb-4"></h2>
      <Row className="justify-content-md-center">
        <Col md="auto" className="mb-2 ">
          <h5 className="text-center mt-2">Kepala Sekolah</h5>
          <Image src="https://placehold.co/300x400" fluid alt="Kepala Sekolah" />
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto" className="mb-4">
          <h5 className="text-center mt-2">Wakil Kepala Sekolah</h5>
          <Image src="https://placehold.co/300x400" fluid alt="Wakil Kepala Sekolah" />
        </Col>
        <Col md="auto" className="mb-5">
          <h5 className="text-center mt-2">Bendahara</h5>
          <Image src="https://placehold.co/300x400" fluid alt="Bendahara" />
        </Col>
      </Row>
    </Container>
  );
};
export default Struktur;