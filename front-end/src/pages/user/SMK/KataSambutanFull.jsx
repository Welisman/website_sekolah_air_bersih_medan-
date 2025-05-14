import React, { useState, useEffect } from 'react';
import { Container, Image, Spinner } from 'react-bootstrap';
import axios from 'axios';
// import FotoDefault from "../../assets/kepala-sekolah/Kepala-Sekolah.png"; 

const KataSambutanFull = () => {
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
            <div className="text-center">
                {loading ? (
                    <Spinner animation="border" variant="primary" />
                ) : (
                    <Image 
                        src={foto} 
                        fluid 
                        style={{ maxWidth: "500px", borderRadius: "10px" }} 
                    />
                )}
            </div>

            {/* Kata Sambutan */}
            <div>
                <h2>Kata Sambutan Kepala Sekolah SMP</h2>
                <p>
                    Puji syukur kepada Tuhan Yang Maha Esa atas karunia-Nya sehingga kami dapat menghadirkan website ini sebagai sarana informasi dan komunikasi untuk seluruh siswa, orang tua, guru, serta masyarakat umum. Website ini dirancang untuk menjadi jendela yang memberikan gambaran
                    <span style={{ fontWeight: 'bold' }}> keunggulan, visi, misi, dan berbagai aktivitas</span> yang kami lakukan demi mewujudkan pendidikan berkualitas dengan nilai-nilai Kristiani.
                    <br /><br />
                    Sebagai Kepala Sekolah <span style={{ fontWeight: 'bold' }}>SMA Swasta Advent Air Bersih Medan</span>, saya berkomitmen untuk terus mendukung perkembangan sekolah ini menjadi tempat yang nyaman, aman, dan inspiratif bagi siswa dalam mengembangkan potensi mereka secara akademik, spiritual, dan karakter. Kami percaya bahwa pendidikan bukan hanya berfokus pada ilmu pengetahuan, tetapi juga pada nilai-nilai moral dan iman yang menjadi dasar kehidupan.
                    <br /><br />
                    Dengan adanya website ini, kami ingin memberikan kemudahan bagi seluruh pengunjung untuk mendapatkan informasi terkait program sekolah, kegiatan akademik, serta berbagai aktivitas yang dapat memperkaya wawasan siswa. Kami juga berharap website ini menjadi media interaktif yang dapat meningkatkan komunikasi antara sekolah dan masyarakat.
                    <br /><br />
                    Kami mengucapkan terima kasih kepada semua pihak yang telah mendukung pengembangan sekolah ini. Semoga SMA Swasta Advent Air Bersih Medan terus maju dan menjadi institusi pendidikan yang unggul dan berdaya saing tinggi.
                    <br /><br />
                    <span style={{ fontWeight: 'bold' }}>Hormat kami,</span> <br />
                    Hendra Manullang, ST.h <br />
                    Kepala Sekolah <br />
                    SMP Swasta Advent Air Bersih Medan
                </p>
            </div>
        </Container>
    );
};

export default KataSambutanFull;
