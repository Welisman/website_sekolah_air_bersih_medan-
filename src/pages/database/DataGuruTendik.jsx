import React, { useState } from "react";
import { Container, Row, Col, Card, Pagination } from "react-bootstrap";
import Dashboard from "../home/Dashboard";

const guruData = [
  { id: 1, name: "Nisa, S.Pd", nip: "221130642", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Andin, S.Pd", nip: "221130642", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Paul, S.Pd", nip: "221130642", image: "https://via.placeholder.com/150" },
  { id: 4, name: "Gina, S.Pd", nip: "221130642", image: "https://via.placeholder.com/150" },
  { id: 5, name: "Demos, S.Pd", nip: "221130642", image: "https://via.placeholder.com/150" },
  { id: 6, name: "Rian, S.Pd", nip: "221130642", image: "https://via.placeholder.com/150" },
];

const itemsPerPage = 4;

const DataGuruTendik = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(guruData.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const displayedData = guruData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      <h2 className="text-center my-4">Data Guru dan Tenaga Kependidikan</h2>

      <Row className="justify-content-center">
        {displayedData.map((guru) => (
          <Col key={guru.id} xs={12} md={4} className="mb-4 text-center">
            <Card className="border-0">
              <Card.Img variant="top" src={guru.image} className="rounded img-fluid" />
              <Card.Body>
                <Card.Title>{guru.name}</Card.Title>
                <Card.Text>NIP: {guru.nip}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
        <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />

        {[...Array(totalPages)].map((_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}

        <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
        <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
      </Pagination>
    </Container>
  );
};

export default DataGuruTendik;
