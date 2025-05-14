import React, { useEffect, useState } from "react";
import { Container, Button, Table, Modal, Form, Image, Alert, Navbar } from "react-bootstrap";
import axios from "axios";
import imageCompression from "browser-image-compression";
import ManajemenNav from "../ManajemenNav";

const AdminFasilitas = () => {
    const [fasilitasList, setFasilitasList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ id: "", nama: "", image: null });
    const [previewImage, setPreviewImage] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [alertMessage, setAlertMessage] = useState({ type: "", text: "" });

    useEffect(() => {
        fetchFasilitas();
    }, []);

    const fetchFasilitas = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/fasilitas");
            setFasilitasList(response.data);
        } catch (error) {
            showAlert("danger", "Gagal mengambil data fasilitas.");
        }
    };

    const showAlert = (type, text) => {
        setAlertMessage({ type, text });
        setTimeout(() => setAlertMessage({ type: "", text: "" }), 3000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];

        if (file) {
            const options = { maxSizeMB: 1, maxWidthOrHeight: 800, useWebWorker: true };
            try {
                const compressedFile = await imageCompression(file, options);
                setPreviewImage(URL.createObjectURL(compressedFile));
                setFormData({ ...formData, image: compressedFile });
            } catch (error) {
                showAlert("danger", "Gagal mengunggah gambar.");
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("nama", formData.nama);

        if (formData.image) formDataToSend.append("image", formData.image);

        try {
            if (isEdit) {
                await axios.put(`http://localhost:3001/api/fasilitas/${formData.id}`, formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                showAlert("success", "Fasilitas berhasil diperbarui!");
            } else {
                await axios.post("http://localhost:3001/api/fasilitas", formDataToSend, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                showAlert("success", "Fasilitas berhasil ditambahkan!");
            }

            fetchFasilitas();
            handleCloseModal();
        } catch (error) {
            showAlert("danger", "Gagal menyimpan fasilitas.");
        }
    };

    const handleEdit = (item) => {
        setFormData({
            id: item.id,
            nama: item.nama,
            image: null,
        });

        setPreviewImage(item.image ? item.image : null);
        setIsEdit(true);
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Apakah Anda yakin ingin menghapus fasilitas ini?")) return;

        try {
            await axios.delete(`http://localhost:3001/api/fasilitas/${id}`);
            showAlert("success", "Fasilitas berhasil dihapus!");
            fetchFasilitas();
        } catch (error) {
            showAlert("danger", "Gagal menghapus fasilitas.");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ id: "", nama: "", image: null });
        setPreviewImage(null);
        setIsEdit(false);
    };

    return (
        <Container>
            <Navbar bg="light" variant="light" className="mb-3">
                <Container>
                    <Navbar.Brand>Manajemen Konten</Navbar.Brand>
                </Container>
            </Navbar>

            <ManajemenNav />

            <h2>🏫 Manajemen Fasilitas</h2>
            {alertMessage.text && <Alert variant={alertMessage.type}>{alertMessage.text}</Alert>}
            <Button onClick={() => setShowModal(true)}>+ Tambah Fasilitas</Button>

            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Gambar</th>
                        <th>Nama</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {fasilitasList.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                {item.image ? (
                                    <Image
                                        src={item.image}
                                        width={80}
                                        height={50}
                                        rounded
                                    />  
                                ) : (
                                    <span>Tidak ada gambar</span>
                                )}
                            </td>
                            <td>{item.nama}</td>
                            <td>
                                <Button
                                    variant="warning"
                                    className="me-2"
                                    onClick={() => handleEdit(item)}
                                >
                                    ✏️ Edit
                                </Button>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    🗑️ Hapus
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? "Edit Fasilitas" : "Tambah Fasilitas"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control
                                type="text"
                                name="nama"
                                value={formData.nama}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Gambar {isEdit && "(Kosongkan jika tidak ingin mengganti)"}</Form.Label>
                            <Form.Control type="file" onChange={handleImageChange} />

                            {previewImage && (
                                <Image
                                    src={previewImage}
                                    alt="Preview"
                                    thumbnail
                                    className="mt-2"
                                    width={150}
                                />
                            )}
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {isEdit ? "Simpan Perubahan" : "Tambah"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default AdminFasilitas;
