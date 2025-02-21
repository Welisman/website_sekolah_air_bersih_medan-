import React from 'react';
import Dashboard from '../home/Dashboard';
import { Container, Row, Col } from 'react-bootstrap';
import Figure from 'react-bootstrap/Figure';
import Footer from '../../../components/user/Footer';

const Fasilitas = () => {
    return (
        <Container>
            <Row className="justify-content-center text-center mt-4">
                {[...Array(6)].map((_, index) => (
                    <Col md={4} sm={6} xs={12} key={index} className="d-flex justify-content-center">
                        <Figure>
                            <Figure.Image
                                width={200}
                                height={200}
                                alt={`Fasilitas-${index + 1}`}
                                src="https://via.placeholder.com/200"
                                className="rounded"
                            />
                            <Figure.Caption>
                                Fasilitas sekolah yang tersedia.
                            </Figure.Caption>
                        </Figure>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default Fasilitas;
