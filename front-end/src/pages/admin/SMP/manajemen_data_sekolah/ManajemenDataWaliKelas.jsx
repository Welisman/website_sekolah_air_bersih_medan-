import React, { useEffect, useState } from "react";
import { Container, Button, Table, Modal, Form, Navbar, Image } from "react-bootstrap";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import ManajemenDataNav from "./ManajemenDataNav";

const ManajemenDataWaliKelas = () => {
    const [waliKelas, setWaliKelas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

    const [formData, setFormData] = useState({
        id: "",
        nama_wali_kelas: "",
        nip: "",
        kelas: "",
        jenis_kelamin: "",
        agama: "",
        status: "Aktif",
        pendidikan: "",
        lulusan: "",
        image: null,
    });

    useEffect(() => {
        fetchWaliKelas();
    }, []);

    const fetchWaliKelas = async () => {
        try {
            const response = await axios.get("http://localhost:3001/api/wali-kelas");
            setWaliKelas(response.data);
        } catch (error) {
            console.error("Gagal mengambil data:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("nama_wali_kelas", formData.nama_wali_kelas);
            formDataToSend.append("nip", formData.nip);
            formDataToSend.append("kelas", formData.kelas);
            formDataToSend.append("jenis_kelamin", formData.jenis_kelamin);
            formDataToSend.append("agama", formData.agama);
            formDataToSend.append("status", formData.status);
            formDataToSend.append("pendidikan", formData.pendidikan);
            formDataToSend.append("lulusan", formData.lulusan);
            if (formData.image) formDataToSend.append("image", formData.image);

            if (editMode) {
                await axios.put(`http://localhost:3001/api/wali-kelas/${formData.id}`, formDataToSend);
            } else {
                await axios.post("http://localhost:3001/api/wali-kelas", formDataToSend);
            }

            fetchWaliKelas();
            setShowModal(false);
        } catch (error) {
            console.error("Gagal menyimpan data:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`http://localhost:3001/api/wali-kelas/${id}`);
                fetchWaliKelas();
            } catch (error) {
                console.error("Gagal menghapus:", error);
            }
        }
    };

    const handleShowModal = (data = null) => {
        if (data) {
            setEditMode(true);
            setFormData({
                ...data,
                image: null,
            });

            if (data.image && data.image.data) {
                const base64 = arrayBufferToBase64(data.image.data);
                setPreviewImage(`data:image/jpeg;base64,${base64}`);
            } else {
                setPreviewImage(null);
            }

        } else {
            setEditMode(false);
            setFormData({
                id: "",
                nama_wali_kelas: "",
                nip: "",
                kelas: "",
                jenis_kelamin: "",
                agama: "",
                status: "Aktif",
                pendidikan: "",
                lulusan: "",
                image: null,
            });
            setPreviewImage(null);
        }

        setShowModal(true);
    };

    const arrayBufferToBase64 = (buffer) => {
        const binary = new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '');
        return window.btoa(binary);
    };

    return (
        <Container>
            <Navbar bg="light" variant="light" className="mb-3">
                <Navbar.Brand>Manajemen Data Sekolah</Navbar.Brand>
            </Navbar>

            <ManajemenDataNav />
            <h2 className="mt-3">Data Wali Kelas</h2>
            <Button variant="success" className="mb-3" onClick={() => handleShowModal()}>
                + Tambah Wali Kelas
            </Button>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>NIP</th>
                        <th>Kelas</th>
                        <th>Jenis Kelamin</th>
                        <th>Foto</th>
                        <th>Agama</th>
                        <th>Status</th>
                        <th>Pendidikan</th>
                        <th>Lulusan</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {waliKelas.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.nama_wali_kelas}</td>
                            <td>{item.nip}</td>
                            <td>{item.kelas}</td>
                            <td>{item.jenis_kelamin}</td>
                            <td>
                                {item.image ? (
                                    <Image
                                        src={`data:image/jpeg;base64,${arrayBufferToBase64(item.image.data)}`}
                                        rounded
                                        width="50"
                                        height="50"
                                    />
                                ) : "Tidak ada"}
                            </td>
                            <td>{item.agama}</td>
                            <td>{item.status}</td>
                            <td>{item.pendidikan}</td>
                            <td>{item.lulusan}</td>
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
                    <Modal.Title>{editMode ? "Edit Wali Kelas" : "Tambah Wali Kelas"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit}>
                        {["nama_wali_kelas", "nip", "kelas", "agama", "status", "pendidikan", "lulusan"].map(field => (
                            <Form.Group className="mb-3" key={field}>
                                <Form.Label>{field.replace("_", " ").toUpperCase()}</Form.Label>
                                <Form.Control type="text" name={field} value={formData[field]} onChange={handleChange} required />
                            </Form.Group>
                        ))}
                        <Form.Group className="mb-3">
                            <Form.Label>Jenis Kelamin</Form.Label>
                            <Form.Select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} required>
                                <option value="">Pilih</option>
                                <option value="Laki-laki">Laki-laki</option>
                                <option value="Perempuan">Perempuan</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Foto</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                        </Form.Group>
                        {previewImage && (
                            <div className="text-center mb-3">
                                <Image src={previewImage} rounded width="100" height="100" />
                                <div>Preview</div>
                            </div>
                        )}
                        <Button variant="primary" type="submit">Simpan</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </Container>
    );
};

export default ManajemenDataWaliKelas;
