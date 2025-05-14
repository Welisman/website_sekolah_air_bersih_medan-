import React, { useEffect, useState } from "react";
import { Container, Button, Table, Modal, Form, Navbar } from "react-bootstrap";
import * as Icon from "react-feather";
import { Filter, Download, DownloadCloud } from "react-feather";
import axios from "axios";
import ManajemenDataNav from "./ManajemenDataNav";

const ManajemenDataSiswa = () => {
  const [siswa, setSiswa] = useState([]);
  const [filteredSiswa, setFilteredSiswa] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    nis: "",
    nama: "",
    jenis_kelamin: "",
    kelas: "",
    tanggal_lahir: "",
    alamat: "",
    tahun_masuk: ""
  });

  useEffect(() => {
    fetchSiswa();
  }, []);

  useEffect(() => {
    filterSiswa();
  }, [siswa, selectedKelas, searchQuery]);

  const fetchSiswa = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/siswa");
      setSiswa(response.data);
    } catch (error) {
      console.error("Gagal mengambil data siswa:", error);
    }
  };

  const filterSiswa = () => {
    let filtered = siswa;

    if (selectedKelas !== "Semua") {
      filtered = filtered.filter((item) => item.kelas === selectedKelas);
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (item) =>
          item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.nis.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSiswa(filtered);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSend = { ...formData };
    delete dataToSend.id; // Remove id for POST/PUT

    try {
      if (editMode) {
        await axios.put(`http://localhost:3001/api/siswa/${formData.id}`, dataToSend);
      } else {
        await axios.post("http://localhost:3001/api/siswa", dataToSend);
      }
      fetchSiswa();
      setShowModal(false);
    } catch (error) {
      console.error("Gagal menyimpan data siswa:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus siswa ini?")) {
      try {
        await axios.delete(`http://localhost:3001/api/siswa/${id}`);
        fetchSiswa();
      } catch (error) {
        console.error("Gagal menghapus siswa:", error);
      }
    }
  };

  const handleShowModal = (data = null) => {
    if (data) {
      setEditMode(true);
      setFormData({
        ...data,
        tanggal_lahir: data.tanggal_lahir?.split("T")[0] || "",
        tahun_masuk: data.tahun_masuk?.toString() || new Date().getFullYear().toString()
      });
    } else {
      setEditMode(false);
      setFormData({
        id: "",
        nis: "",
        nama: "",
        jenis_kelamin: "",
        kelas: "",
        tanggal_lahir: "",
        alamat: "",
        tahun_masuk: new Date().getFullYear().toString()
      });
    }
    setShowModal(true);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("http://localhost:3001/api/siswa/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Upload dan insert siswa berhasil!");
      fetchSiswa(); // Refresh tabel
    } catch (error) {
      console.error("Gagal upload file Excel:", error);
      alert("Upload gagal. Periksa format file!");
    }
  };
  
  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/siswa/export/excel", {
        responseType: "blob", // penting supaya response dianggap file binary
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'siswa_smp.xlsx'); // nama file
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Gagal download Excel:", error);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/siswa/export/csv", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'siswa_smp.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Gagal download CSV:", error);
    }
  };


  return (
    <Container>
      <Navbar bg="light" variant="light" className="mb-3">
        <Container>
          <Navbar.Brand>Manajemen Data Sekolah</Navbar.Brand>
        </Container>
      </Navbar>

      <ManajemenDataNav />

      <h2 className="mt-3">Data Siswa SMP</h2>

      {/* Filter Kelas */}
      <Form.Group className="mb-3">
        <h4><Form.Label>Kelas</Form.Label></h4>
        <Form.Select
          value={selectedKelas}
          onChange={(e) => setSelectedKelas(e.target.value)}
        >
          <option value="Semua">Semua</option>
          <option value="VII">VII</option>
          <option value="VIII">VIII</option>
          <option value="IX">IX</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          {/* <Button variant="success" onClick={() => handleShowModal()}>
            + Tambah Siswa
          </Button>{" "} */}
          <Form.Group className="d-inline-block ms-2" controlId="formFile" style={{ width: '200px' }}>
            <Form.Control type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
          </Form.Group>
        </div>

        <Form.Group className="mb-0" style={{ width: "50%" }}>
          <Form.Control
            type="text"
            placeholder="🔍 Cari Siswa/i"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Form.Group>

        <div style={{ display: "flex", gap: "20px" }}>
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
      </div>



      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>NIS</th>
            <th>Nama</th>
            <th>Jenis Kelamin</th>
            <th>Kelas</th>
            <th>Tanggal Lahir</th>
            <th>Alamat</th>
            <th>Tahun Masuk</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredSiswa.length > 0 ? (
            filteredSiswa.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nis}</td>
                <td>{item.nama}</td>
                <td>{item.jenis_kelamin}</td>
                <td>{item.kelas}</td>
                <td>{new Date(item.tanggal_lahir).toLocaleDateString("id-ID")}</td>
                <td>{item.alamat}</td>
                <td>{item.tahun_masuk}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleShowModal(item)}>
                    ✏️ Edit
                  </Button>{" "}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(item.id)}>
                    🗑️ Hapus
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">Tidak ada data siswa</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal Form Siswa */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? "Edit Data Siswa" : "Tambah Siswa"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>NIS</Form.Label>
              <Form.Control type="text" name="nis" value={formData.nis} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control type="text" name="nama" value={formData.nama} onChange={handleChange} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Jenis Kelamin</Form.Label>
              <Form.Select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleChange} required>
                <option value="">Pilih</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Kelas</Form.Label>
              <Form.Select name="kelas" value={formData.kelas} onChange={handleChange} required>
                <option value="">Pilih Kelas</option>
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
                <option value="IX">IX</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tanggal Lahir</Form.Label>
              <Form.Control type="date" name="tanggal_lahir" value={formData.tanggal_lahir} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Alamat</Form.Label>
              <Form.Control as="textarea" rows={2} name="alamat" value={formData.alamat} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tahun Masuk</Form.Label>
              <Form.Control
                type="number"
                name="tahun_masuk"
                value={formData.tahun_masuk}
                onChange={handleChange}
                min="1900"
                max={new Date().getFullYear()}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">Simpan</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ManajemenDataSiswa;
