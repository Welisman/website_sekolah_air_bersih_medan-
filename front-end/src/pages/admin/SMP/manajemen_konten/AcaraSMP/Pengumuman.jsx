import React, { useEffect, useState } from "react";
import { Container, Button, Table, Modal, Form, Navbar } from "react-bootstrap";
import axios from "axios";
import ManajemenNav from "../ManajemenNav";

const Pengumuman = () => {
    const [pengumuman, setPengumuman] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({ id: "", judul: "", isi: "", tanggal: "" });

    useEffect(() => {
        fetchPengumuman();
    }, []);

    // 🔹 Mengambil data dari API
    const fetchPengumuman = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/pengumuman");
            setPengumuman(response.data);
        } catch (error) {
            console.error("Gagal mengambil pengumuman:", error);
        }
    };

    // 🔹 Format Tanggal & Jam (WIB)
    const formatTanggalJam = (tanggal) => {
        const optionsTanggal = { weekday: "long", day: "2-digit", month: "2-digit", year: "numeric" };
        const optionsJam = { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Jakarta" };
        return `${new Date(tanggal).toLocaleDateString("id-ID", optionsTanggal)} ${new Date(tanggal).toLocaleTimeString("id-ID", optionsJam)} WIB`;
    };

    // 🔹 Handle perubahan input form
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🔹 Tambah / Edit Pengumuman
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                // Jika mode edit, update data
                await axios.put(`http://localhost:3001/api/pengumuman/${formData.id}`, formData);
            } else {
                // Jika mode tambah, kirim data baru
                await axios.post("http://localhost:3001/api/pengumuman", formData);
            }
            fetchPengumuman();
            setShowModal(false);
        } catch (error) {
            console.error("Gagal menyimpan pengumuman:", error);
        }
    };

    // 🔹 Hapus Pengumuman
    const handleDelete = async (id) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) {
            try {
                await axios.delete(`http://localhost:3001/api/pengumuman/${id}`);
                fetchPengumuman(); // Refresh data setelah hapus
            } catch (error) {
                console.error("Gagal menghapus pengumuman:", error);
            }
        }
    };

    // 🔹 Buka Modal (Tambah / Edit)
    const handleShowModal = (pengumuman = null) => {
        if (pengumuman) {
            setEditMode(true);
            setFormData(pengumuman);
        } else {
            setEditMode(false);
            setFormData({ id: "", judul: "", isi: "", tanggal: new Date().toISOString().slice(0, 16) }); // Format ISO untuk input type="datetime-local"
        }
        setShowModal(true);
    };

    return (
        <Container>
            <Navbar bg="light" variant="light" className="mb-3">
                <Container>
                    <Navbar.Brand>Manajemen Konten</Navbar.Brand>
                </Container>
            </Navbar>

            <ManajemenNav />
            <h2 className="mt-3">📢 Manajemen Pengumuman</h2>
            <Button variant="success" className="mb-3" onClick={() => handleShowModal()}>+ Tambah Pengumuman</Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Judul</th>
                        <th>Isi</th>
                        <th>Tanggal & Waktu</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {pengumuman.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.judul}</td>
                            <td>{item.isi.length > 50 ? item.isi.substring(0, 50) + "..." : item.isi}</td>
                            <td>{formatTanggalJam(item.tanggal)}</td>
                            <td>
                                <Button variant="warning" size="sm" onClick={() => handleShowModal(item)}>✏️ Edit</Button>{" "}
                                <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>🗑️ Hapus</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal Form */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{editMode ? "Edit Pengumuman" : "Tambah Pengumuman"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Judul</Form.Label>
                            <Form.Control type="text" name="judul" value={formData.judul} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Isi</Form.Label>
                            <Form.Control as="textarea" rows={3} name="isi" value={formData.isi} onChange={handleChange} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Tanggal & Waktu</Form.Label>
                            <Form.Control type="datetime-local" name="tanggal" value={formData.tanggal} onChange={handleChange} required />
                        </Form.Group>
                        <Button variant="primary" type="submit">Simpan</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default Pengumuman;
