import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Dashboard from '../home/Dashboard';
import Footer from '../../details/Footer';

const Pengumuman = () => {
  return (
    <Container className="mt-4">
      {/* Judul Pengumuman */}
      <h2 className="text-center my-4">📢 Pengumuman Terbaru</h2>

      {/* List Pengumuman */}
      <Row className="justify-content-center">
        {[...Array(3)].map((_, index) => (
          <Col md={4} sm={6} xs={12} key={index} className="mb-4">
            <Card className="shadow border-0">
              <Card.Body>
                <Card.Title className="text-center">Pengumuman {index + 1}</Card.Title>
                <Card.Text className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Pellentesque sit amet dui euismod, placerat metus at, semper eros.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Pengumuman;
