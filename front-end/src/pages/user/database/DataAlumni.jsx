import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Dashboard from "../home/Dashboard";

const alumniData = [
  {
    id: 1,
    image: "https://via.placeholder.com/150",
    text: "Apa kata mereka?",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est.",
    position: "left",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/150",
    text: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est.",
    position: "right",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/150",
    text: "",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas porttitor congue massa. Fusce posuere, magna sed pulvinar ultricies, purus lectus malesuada libero, sit amet commodo magna eros quis urna. Nunc viverra imperdiet enim. Fusce est.",
    position: "left",
  },
];

const DataAlumni = () => {
  return (
    <Container>
      <h2 className="text-center my-4">ALUMNI SEKOLAH ADVENT JALAN AIR BERSIH MEDAN</h2>

      {alumniData.map((alumni) => (
        <Row key={alumni.id} className="align-items-center my-4">
          {alumni.position === "left" ? (
            <>
              <Col md={4}>
                <img src={alumni.image} alt="Alumni" className="img-fluid rounded" />
              </Col>
              <Col md={8}>
                {alumni.text && <h5>{alumni.text}</h5>}
                <p>{alumni.description}</p>
              </Col>
            </>
          ) : (
            <>
              <Col md={8} className="text-center">
                <p>{alumni.description}</p>
              </Col>
              <Col md={4}>
                <img src={alumni.image} alt="Alumni" className="img-fluid rounded" />
              </Col>
            </>
          )}
        </Row>
      ))}
    </Container>
  );
};

export default DataAlumni;
