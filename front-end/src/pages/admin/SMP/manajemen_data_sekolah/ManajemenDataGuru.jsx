import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Form, Button, Container, Navbar } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import * as Icon from "react-feather";
import ManajemenDataNav from "./ManajemenDataNav";

const API_URL = "http://localhost:3001/api";

const ManajemenDataGuru = () => {
    const [dataGuru, setDataGuru] = useState([]);
    const [filteredGuru, setFilteredGuru] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        nama: "",
        email: "",
        alamat: "",
        no_hp: "",
        mata_pelajaran: "",
        image: null
    });
    const [searchQuery, setSearchQuery] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        fetchGuru();
    }, []);

    const fetchGuru = async () => {
        try {
            const res = await axios.get(`${API_URL}/data-guru-tendik`);
            setDataGuru(res.data);
            setFilteredGuru(res.data);
        } catch (err) {
            console.error("Gagal fetch data guru:", err);
        }
    };

    useEffect(() => {
        handleSearch();
    }, [searchQuery, dataGuru]);

    const handleSearch = () => {
        const query = searchQuery.toLowerCase();
        const filtered = dataGuru.filter(guru =>
            guru.nama.toLowerCase().includes(query) ||
            guru.email.toLowerCase().includes(query) ||
            guru.mata_pelajaran.toLowerCase().includes(query)
        );
        setFilteredGuru(filtered);
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "image") {
            setFormData(prev => ({
                ...prev,
                image: files[0]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newFormData = new FormData();
        newFormData.append("nama", formData.nama);
        newFormData.append("email", formData.email);
        newFormData.append("alamat", formData.alamat);
        newFormData.append("no_hp", formData.no_hp);
        newFormData.append("mata_pelajaran", formData.mata_pelajaran);
        if (formData.image) {
            newFormData.append("image", formData.image);
        }

        try {
            if (editMode) {
                await axios.put(`${API_URL}/data-guru-tendik/${formData.id}`, formData);
                setDataGuru(prev =>
                    prev.map(guru => guru.id === formData.id ? { ...guru, ...formData } : guru)
                );
            } else {
                const res = await axios.post(`${API_URL}/data-guru-tendik`, newFormData, {
                    headers: { "Content-Type": "multipart/form-data" }
                });
                setDataGuru(prev => [...prev, res.data]);
            }
            setShowModal(false);
            resetForm();
        } catch (err) {
            console.error("Gagal menyimpan data guru:", err);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Yakin ingin menghapus data ini?")) {
            try {
                await axios.delete(`${API_URL}/data-guru-tendik/${id}`);
                setDataGuru(prev => prev.filter(guru => guru.id !== id));
            } catch (err) {
                console.error("Gagal menghapus data guru:", err);
            }
        }
    };

    const handleShowModal = (data = null) => {
        if (data) {
            setEditMode(true);
            setFormData({
                id: data.id,
                nama: data.nama,
                email: data.email,
                alamat: data.alamat,
                no_hp: data.no_hp,
                mata_pelajaran: data.mata_pelajaran,
                image: null
            });
        } else {
            setEditMode(false);
            resetForm();
        }
        setShowModal(true);
    };

    const resetForm = () => {
        setFormData({
            id: "",
            nama: "",
            email: "",
            alamat: "",
            no_hp: "",
            mata_pelajaran: "",
            image: null
        });
    };

    const handleDownloadExcel = () => {
        const exportData = dataGuru.map(g => ({
            ID: g.id,
            Nama: g.nama,
            Email: g.email,
            Alamat: g.alamat,
            "No HP": g.no_hp,
            "Mata Pelajaran": g.mata_pelajaran
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "DataGuruTendik");
        XLSX.writeFile(wb, "Data_Guru_Tendik.xlsx");
    };

    const handleDownloadCSV = () => {
        const exportData = dataGuru.map(g => ({
            ID: g.id,
            Nama: g.nama,
            Email: g.email,
            Alamat: g.alamat,
            "No HP": g.no_hp,
            "Mata Pelajaran": g.mata_pelajaran
        }));

        const ws = XLSX.utils.json_to_sheet(exportData);
        const csv = XLSX.utils.sheet_to_csv(ws);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "Data_Guru_Tendik.csv");
    };

    return (
        <Container>
            <Navbar bg="light" variant="light" className="mb-3">
                <Container>
                    <Navbar.Brand>Manajemen Data Sekolah</Navbar.Brand>
                </Container>
            </Navbar>

            <ManajemenDataNav />

            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Data Guru & Tendik</h1>
                    <Button variant="success" onClick={() => handleShowModal()}>+ Tambah</Button>
                </div>

                <div style={{ display: "flex", gap: "20px", marginBottom: "10px" }}>
                    <Icon.Download
                        size={24}
                        style={{ cursor: "pointer", color: "#007bff" }}
                        onClick={handleDownloadCSV}
                        title="Download CSV"
                    />
                    <Icon.DownloadCloud
                        size={24}
                        style={{ cursor: "pointer", color: "#28a745" }}
                        onClick={handleDownloadExcel}
                        title="Download Excel"
                    />
                </div>

                <Form.Group className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Cari nama Guru&Tendik"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </Form.Group>

                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Nama</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Alamat</th>
                            <th className="border p-2">No HP</th>
                            <th className="border p-2">Mata Pelajaran</th>
                            <th className="border p-2">Foto</th>
                            <th className="border p-2">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGuru.map(guru => (
                            <tr key={guru.id}>
                                <td className="border p-2">{guru.nama}</td>
                                <td className="border p-2">{guru.email}</td>
                                <td className="border p-2">{guru.alamat}</td>
                                <td className="border p-2">{guru.no_hp}</td>
                                <td className="border p-2">{guru.mata_pelajaran}</td>
                                <td className="border p-2">
                                    {guru.image && (
                                        <img
                                            src={`${API_URL}/uploads/${guru.image}`}
                                            alt={guru.nama}
                                            className="w-16 h-16 object-cover"
                                        />
                                    )}
                                </td>
                                <td className="border p-2">
                                    <Button variant="warning" size="sm" onClick={() => handleShowModal(guru)}>✏️ Edit</Button>{" "}
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(guru.id)}>🗑️ Hapus</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editMode ? "Edit Guru/Tendik" : "Tambah Guru/Tendik"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Nama</Form.Label>
                                <Form.Control type="text" name="nama" value={formData.nama} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Alamat</Form.Label>
                                <Form.Control as="textarea" name="alamat" value={formData.alamat} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>No HP</Form.Label>
                                <Form.Control type="text" name="no_hp" value={formData.no_hp} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Mata Pelajaran</Form.Label>
                                <Form.Control type="text" name="mata_pelajaran" value={formData.mata_pelajaran} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Foto</Form.Label>
                                <Form.Control type="file" name="image" onChange={handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                {editMode ? "Simpan Perubahan" : "Tambah"}
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </Container>
    );
};

export default ManajemenDataGuru;
