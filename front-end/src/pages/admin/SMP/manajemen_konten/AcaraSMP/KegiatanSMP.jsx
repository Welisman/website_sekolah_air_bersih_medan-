import React, { useEffect, useState } from "react";
import { Container, Button, Table, Modal, Form, Image, Alert, Navbar } from "react-bootstrap";
import axios from "axios";
import ManajemenNav from "../ManajemenNav";

const AdminKegiatan = () => {
    const [kegiatanList, setKegiatanList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ id: "", judul: "", tanggal: "", waktu: "", image: null });
    const [previewImage, setPreviewImage] = useState(null);
    const [alertMessage, setAlertMessage] = useState("");

    useEffect(() => {
        fetchKegiatan();
    }, []);

    const fetchKegiatan = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/kegiatan");
            setKegiatanList(response.data);
        } catch (error) {
            setAlertMessage("Gagal mengambil data kegiatan.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("judul", formData.judul);
        formDataToSend.append("tanggal", formData.tanggal);
        formDataToSend.append("waktu", formData.waktu);
        if (formData.image) formDataToSend.append("image", formData.image);

        try {
            if (isEditing) {
                await axios.put(`http://localhost:3001/api/kegiatan/${formData.id}`, formDataToSend);
                setAlertMessage("✅ Kegiatan berhasil diperbarui!");
            } else {
                await axios.post("http://localhost:3001/api/kegiatan", formDataToSend);
                setAlertMessage("✅ Kegiatan berhasil ditambahkan!");
            }
            fetchKegiatan();
            handleClose();
        } catch (error) {
            setAlertMessage("❌ Gagal menyimpan kegiatan.");
        }
    };

    const handleEdit = (kegiatan) => {
        setIsEditing(true);
        setFormData({
            id: kegiatan.id,
            judul: kegiatan.judul,
            tanggal: kegiatan.tanggal.split("T")[0], // Ambil hanya tanggal
            waktu: kegiatan.waktu,
            image: null,
        });

        setPreviewImage(kegiatan.image ? `data:image/jpeg;base64,${kegiatan.image}` : null);
        setShowModal(true);
    };


    const handleDelete = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus kegiatan ini?")) return;
        try {
            await axios.delete(`http://localhost:3001/api/kegiatan/${id}`);
            fetchKegiatan();
            setAlertMessage("🗑️ Kegiatan berhasil dihapus!");
        } catch (error) {
            setAlertMessage("❌ Gagal menghapus kegiatan.");
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setIsEditing(false);
        setFormData({ id: "", judul: "", tanggal: "", waktu: "", image: null });
        setPreviewImage(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
            }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };


    return (
        <Container>
            <Navbar bg="light" variant="light" className="mb-3">
                <Container>
                    <Navbar.Brand>Manajemen Kegiatan</Navbar.Brand>
                </Container>
            </Navbar>

            <ManajemenNav />

                <h2>📅 Daftar Kegiatan</h2>
                {alertMessage && <Alert variant="info">{alertMessage}</Alert>}
                <Button onClick={() => setShowModal(true)}>➕ Tambah Kegiatan</Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Gambar</th>
                        <th>Judul</th>
                        <th>Tanggal & Waktu</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {kegiatanList.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>
                                <Image
                                    src={item.image ? item.image : "/default.jpg"}
                                    width={80}
                                    height={50}
                                    rounded
                                    onError={(e) => (e.target.src = "/default.jpg")}
                                />

                            </td>
                            <td>{item.judul}</td>
                            <td>
                                {new Date(item.tanggal).toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })} {item.waktu}
                            </td>

                            <td>
                                <Button variant="warning" className="me-2" onClick={() => handleEdit(item)}>✏️ Edit</Button>
                                <Button variant="danger" onClick={() => handleDelete(item.id)}>🗑️ Hapus</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal Form */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEditing ? "✏️ Edit Kegiatan" : "➕ Tambah Kegiatan"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Judul</Form.Label>
                            <Form.Control type="text" value={formData.judul} onChange={(e) => setFormData({ ...formData, judul: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal</Form.Label>
                            <Form.Control type="date" value={formData.tanggal} onChange={(e) => setFormData({ ...formData, tanggal: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Waktu</Form.Label>
                            <Form.Control type="time" value={formData.waktu} onChange={(e) => setFormData({ ...formData, waktu: e.target.value })} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Gambar</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                            {previewImage && <Image src={previewImage} alt="Preview" width={100} className="mt-2" />}
                        </Form.Group>
                        <Button type="submit" variant="primary">{isEditing ? "💾 Simpan Perubahan" : "➕ Tambah Kegiatan"}</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminKegiatan;
