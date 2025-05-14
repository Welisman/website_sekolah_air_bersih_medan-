import React, { useEffect, useState } from "react";
import { Container, Table, Spinner, Alert } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const SiswaKelas = () => {
    const { kelas } = useParams();
    const [siswa, setSiswa] = useState([]);
    const [waliKelas, setWaliKelas] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);

                // Fetch siswa berdasarkan kelas
                const siswaRes = await axios.get(`http://localhost:3001/api/siswa/${kelas}`);
                setSiswa(siswaRes.data);

                // Fetch wali kelas berdasarkan kelas
                const waliRes = await axios.get(`http://localhost:3001/api/wali-kelas/kelas/${kelas}`);
                setWaliKelas(waliRes.data);

                setError("");
            } catch (err) {
                console.error("Gagal mengambil data:", err);
                setError("Gagal mengambil data. Silakan coba lagi nanti.");
            } finally {
                setLoading(false);
            }
        };

        if (kelas) fetchData();
    }, [kelas]);

    return (
        <Container>
            <h2 className="text-center my-4">📖 Data Siswa Kelas {kelas || "-"}</h2>

            <h5 className="mb-4">
                Wali Kelas:{" "}
                {waliKelas?.id ? (
                    <Link
                        to={`/data-siswa/wali-kelas/${waliKelas.id}`}
                        className="fw-bold text-decoration-none text-primary"
                    >
                        {waliKelas.nama_wali_kelas}
                    </Link>
                ) : (
                    "-"
                )}
            </h5>

            {loading ? (
                <div className="text-center my-4">
                    <Spinner animation="border" variant="primary" />
                    <p>Memuat data siswa...</p>
                </div>
            ) : error ? (
                <Alert variant="danger" className="text-center">
                    {error}
                </Alert>
            ) : (
                <Table striped bordered hover responsive>
                    <thead className="bg-primary text-white">
                        <tr>
                            <th>No</th>
                            <th>kelas</th>
                            <th>NIS</th>
                            <th>Nama</th>
                            <th>Jenis Kelamin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {siswa.length > 0 ? (
                            siswa.map((s, index) => (
                                <tr key={s.id}>
                                    <td>{index + 1}</td>
                                    <td>{s.kelas}</td>
                                    <td>{s.nis}</td>
                                    <td>{s.nama}</td>
                                    <td>{s.jenis_kelamin}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Tidak ada siswa</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default SiswaKelas;
