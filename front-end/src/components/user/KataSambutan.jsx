import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';
import FotoDefault from "../../assets/kepala-sekolah/Kepala-Sekolah.png";

function KataSambutan() {
    const [foto, setFoto] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFotoKepsek();
    }, []);

    // 🔹 Mengambil foto kepala sekolah dari server
    const fetchFotoKepsek = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/foto", { responseType: "arraybuffer" });

            if (response.data) {
                const imageBlob = new Blob([response.data], { type: "image/jpeg" });
                const imageUrl = URL.createObjectURL(imageBlob);
                setFoto(imageUrl);
            }
        } catch (error) {
            console.error("Gagal mengambil foto kepala sekolah:", error);
            setFoto(FotoDefault); // Jika gagal, gunakan foto default
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                {/* Foto Kepala Sekolah */}
                <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
                    {loading ? (
                        <Spinner animation="border" variant="primary" />
                    ) : (
                        <Image 
                            src={foto} 
                            fluid 
                            style={{ maxWidth: "500px", borderRadius: "10px" }} 
                        />
                    )}
                    <h4 className="mt-3">Kepala Sekolah SMP</h4>
                </Col>

                {/* Kata Sambutan */}
                <Col md={6}>
                    <h2>Kata Sambutan Kepala Sekolah SMP</h2>
                    <div className='kata-sambutan1'>
                        <p>
                            Puji syukur kepada Tuhan Yang Maha Esa atas karunia-Nya
                            sehingga kami dapat menghadirkan website ini sebagai sarana
                            informasi dan komunikasi untuk seluruh siswa, orang tua, guru,
                            serta masyarakat umum. Website ini dirancang untuk menjadi jendela
                            yang memberikan gambaran <span style={{ fontWeight: 'bold' }}>keunggulan, visi, misi, dan berbagai
                            aktivitas</span> yang kami lakukan demi mewujudkan pendidikan berkualitas dengan
                            nilai-nilai Kristiani. <br /><br />

                            Sebagai Kepala Sekolah <span style={{ fontWeight: 'bold' }}>SMP Swasta Advent Air Bersih Medan</span>, 
                            saya berkomitmen untuk terus mendukung perkembangan sekolah 
                            ini menjadi tempat yang nyaman, aman, dan inspiratif bagi siswa dalam mengembangkan potensi mereka secara akademik, spiritual, dan karakter.  Kami percaya bahwa pendidikan bukan hanya berfokus pada ilmu pengetahuan, tetapi juga pada nilai-nilai moral dan iman yang menjadi dasar kehidupan.
                        </p>
                    </div>

                    {/* Tombol Selengkapnya */}
                    <Link to="/kata-sambutan-full" className="selengkapnya-link">
                        Selengkapnya &gt;
                    </Link>
                </Col>
            </Row>
        </Container>
    );
}

export default KataSambutan;
