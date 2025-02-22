import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import axios from 'axios';

const KataSambutan = () => {
    const [sambutan, setSambutan] = useState({});
    const [fotoUrl, setFotoUrl] = useState('');
    const [showFull, setShowFull] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:3001/api/kata-sambutan')
            .then(response => setSambutan(response.data[0] || {}))
            .catch(error => console.error('Gagal memuat kata sambutan:', error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/api/foto', { responseType: 'blob' })
            .then(response => {
                const imageUrl = URL.createObjectURL(response.data);
                setFotoUrl(imageUrl);
            })
            .catch(error => console.error('Gagal memuat foto kepala sekolah:', error));
    }, []);

    return (
        <Container className="mt-5">
            <Row className="align-items-center">
                {/* Kolom Foto (Kiri) */}
                <Col md={4} className="text-center">
                    {fotoUrl ? (
                        <Image src={fotoUrl} className="foto rounded shadow-lg" fluid />
                    ) : (
                        <p>Memuat foto...</p>
                    )}
                </Col>

                {/* Kolom Teks (Kanan) */}
                <Col md={8}>
                    <h5 className="text-primary">{sambutan.nama}</h5>
                    <h6 className="text-muted">{sambutan.jabatan}</h6>
                    <h5 className="mt-3">Kata Sambutan</h5>
                    <p>{showFull ? sambutan.kata_sambutan : sambutan.kata_sambutan?.slice(0, 200) + '...'}</p>
                    {sambutan.kata_sambutan?.length > 200 && (
                        <Button variant="link" onClick={() => setShowFull(!showFull)}>
                            {showFull ? 'Lihat lebih sedikit' : 'Lihat selengkapnya >'}
                        </Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default KataSambutan;
