import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Chart from "./detail/Chart";

const DataSiswa = () => {
    const [kelasData, setKelasData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/api/siswa")
            .then(response => {
                const dataPerKelas = {};
                response.data.forEach(siswa => {
                    if (!dataPerKelas[siswa.kelas]) {
                        dataPerKelas[siswa.kelas] = 1;
                    } else {
                        dataPerKelas[siswa.kelas]++;
                    }
                });
                setKelasData(Object.entries(dataPerKelas));
            })
            .catch(error => console.error("Gagal mengambil data siswa:", error));
    }, []);

    return (
        <Container>
            <h2 className="text-center my-4">📚 Data Siswa/i </h2>
            <Row>
                {kelasData.map(([kelas, jumlah]) => (
                    <Col key={kelas} xs={12} md={4} onClick={() => navigate(`/data-siswa/${kelas}`)}>
                        <Card className="text-center shadow-sm border-80" style={{ cursor: "pointer" }}>
                            <Card.Body>
                                <Card.Title className="fw-bold">{kelas}</Card.Title>
                                <Card.Text>Jumlah Siswa: {jumlah}</Card.Text>
                                <Card.Text>🔍</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <div className="">
                <Chart />
            </div>
        </Container>
    );
};

export default DataSiswa;
