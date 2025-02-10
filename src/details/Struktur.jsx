import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';

function Struktur() {
  return (
    <Container>
      <h2 className="text-center mt-5 mb-4">Jajaran Pengurus Yayasan</h2>
      <Row className="justify-content-md-center">
        <Col md="auto" className="mb-2 ">
          <Image src="https://placehold.co/300x400" fluid alt="Kepala Sekolah" />
          <h5 className="text-center mt-2">Kepala Sekolah</h5>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md="auto" className="mb-4">
          <Image src="https://placehold.co/300x400" fluid alt="Wakil Kepala Sekolah" />
          <h5 className="text-center mt-2">Wakil Kepala Sekolah</h5>
        </Col>
        <Col md="auto" className="mb-5">
          <Image src="https://placehold.co/300x400" fluid alt="Bendahara" />
          <h5 className="text-center mt-2">Bendahara</h5>
        </Col>
      </Row>
    </Container>
  );
};
export default Struktur;