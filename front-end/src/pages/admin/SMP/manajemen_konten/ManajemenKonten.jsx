import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Image, Alert, Navbar } from 'react-bootstrap';
import axios from 'axios';
import "../../../../style/admin/manajemenKonten/ManajemenKonten.css";
import ManajemenNav from "./ManajemenNav";
import VisiMisiTujuanNav from './admin_visi_misi_tujuan/VisiMisiTujuanNav';

const ManajemenKonten = () => {

    const [nama, setNama] = useState("");
    const [foto, setFoto] = useState(null);
    const [previewFoto, setPreviewFoto] = useState(null);
    const [alertMessage, setAlertMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchFotoKepsek();
    }, []);

    // 🔹 Mengambil data foto kepala sekolah
    const fetchFotoKepsek = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/foto", { responseType: "arraybuffer" });

            const imageBlob = new Blob([response.data], { type: "image/jpeg" });
            const imageUrl = URL.createObjectURL(imageBlob);
            setPreviewFoto(imageUrl);
        } catch (error) {
            console.error("Gagal mengambil foto kepala sekolah:", error);
        }
    };

    // 🔹 Menangani perubahan input file
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFoto(file);
            setPreviewFoto(URL.createObjectURL(file));
        }
    };

    // 🔹 Menangani unggahan foto baru
    const handleUpload = async (e) => {
        e.preventDefault();
        if (!nama || !foto) {
            showAlert("danger", "Nama dan foto harus diisi!");
            return;
        }

        const formData = new FormData();
        formData.append("nama", nama);
        formData.append("foto", foto);

        try {
            await axios.post("http://localhost:3001/api/upload-foto", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            showAlert("success", "Foto berhasil diunggah!");
            fetchFotoKepsek();
        } catch (error) {
            console.error("Gagal mengunggah foto:", error);
            showAlert("danger", "Terjadi kesalahan saat mengunggah.");
        }
    };

    // 🔹 Menampilkan alert sementara
    const showAlert = (type, text) => {
        setAlertMessage({ type, text });
        setTimeout(() => setAlertMessage({ type: "", text: "" }), 3000);
    };


    return (
        <Container>
                       <Navbar bg="light" variant="light" className="mb-3">
                <Container>
                    <Navbar.Brand>Manajemen Konten</Navbar.Brand>
                </Container>
            </Navbar>

            <ManajemenNav />
            <h3 className="text-center mt-4">Kepala Sekolah</h3>

            {alertMessage.text && (
                <Alert variant={alertMessage.type} className="text-center">
                    {alertMessage.text}
                </Alert>
            )}

            <Form onSubmit={handleUpload} className="p-4 shadow-sm bg-light rounded">
                <Form.Group className="mb-3">
                    <Form.Label>Nama Kepala Sekolah</Form.Label>
                    <Form.Control
                        type="text"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Foto Kepala Sekolah</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={handleFileChange} required />
                </Form.Group>

                {previewFoto && (
                    <div className="text-center mb-3">
                        <Image src={previewFoto} alt="Preview Foto" width={200} className="rounded" />
                    </div>
                )}

                <Button variant="success" type="submit">Unggah Foto</Button>
            </Form>

            <div className="p-4 shadow-sm">
                <Form>
                    <div>
                        <Form.Group className="mb-3">
                            <Form.Label>Kata Sambutan :</Form.Label>
                            <Form.Control as="textarea" rows={5} defaultValue="Teks sambutan di sini..." />
                            <Button className="mt-2" variant="success">Update Kata Sambutan</Button>
                        </Form.Group>
                    </div>
                </Form>
            </div>
            <VisiMisiTujuanNav />
        </Container>
    );
};

export default ManajemenKonten;