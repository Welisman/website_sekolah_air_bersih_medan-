import React, { useEffect, useState } from "react";
import { Download, CloudDownload } from 'react-bootstrap-icons';
import axios from "axios";
import { Table, Container, Badge, Spinner, Button, Form, Row, Col } from "react-bootstrap";

const API_URL = "http://localhost:3001/api/admin";

const UserAdminSMP = () => {
  const [adminList, setAdminList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterId, setFilterId] = useState("");
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });
  const [editAdmin, setEditAdmin] = useState(null);
  const [userRole, setUserRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortAscending, setSortAscending] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const payload = JSON.parse(atob(token.split(".")[1]));
      setUserRole(payload.role);
    }
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/admin-smp`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminList(res.data);
    } catch (err) {
      console.error("Gagal mengambil data admin:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (newAdmin.password !== newAdmin.confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/add-admin-smp`, newAdmin, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewAdmin({ username: "", password: "", confirmPassword: "", role: "admin" });
      setShowAddForm(false);
      fetchAdmins();
    } catch (err) {
      console.error("Gagal menambah admin:", err.response?.data || err);
    }
  };

  const handleEditAdmin = async (e) => {
    e.preventDefault();
    if (editAdmin.password && editAdmin.password !== editAdmin.confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const payload = {
        username: editAdmin.username,
        role: editAdmin.role,
        status: editAdmin.status
      };
      if (editAdmin.password) {
        payload.password = editAdmin.password;
      }

      await axios.put(`${API_URL}/update-admin-smp/${editAdmin.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setEditAdmin(null);
      fetchAdmins();
    } catch (err) {
      console.error("Gagal mengupdate admin:", err.response?.data || err);
    }
  };

  const handleEdit = (admin) => {
    setEditAdmin({
      id: admin.id,
      username: admin.username,
      password: "",
      confirmPassword: "",
      role: admin.role,
      status: admin.status,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus admin ini?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/delete-admin-smp/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchAdmins();
    } catch (err) {
      console.error("Gagal menghapus admin:", err);
    }
  };

  const handleDownloadExcel = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin-smp`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'admin_smp.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Gagal download Excel:", error);
    }
  };

  const handleDownloadCSV = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin-smp`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'admin_smp.csv');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Gagal download CSV:", error);
    }
  };

  const filteredData = filterId
    ? adminList.filter(admin => admin.id.toString().includes(filterId))
    : adminList;

  const sortedData = [...filteredData].sort((a, b) => {
    return sortAscending
      ? a.username.localeCompare(b.username)
      : b.username.localeCompare(a.username);
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">Profil Admin</h2>

      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* Tombol Tambah Admin */}
        {userRole === "master" && (
          <Button variant="success" onClick={() => setShowAddForm(!showAddForm)}>
            {showAddForm ? "Tutup Form" : "+ Tambah Admin"}
          </Button>
        )}

        {/* Icon Download */}
        <div className="d-flex gap-3">
          <Download
            size={24}
            style={{ cursor: "pointer", color: "#007bff" }}
            onClick={handleDownloadCSV}
            title="Download CSV"
          />
          <CloudDownload
            size={24}
            style={{ cursor: "pointer", color: "#28a745" }}
            onClick={handleDownloadExcel}
            title="Download Excel"
          />
        </div>
      </div>


      {/* Form Edit Admin */}
      {editAdmin && (
        <Form onSubmit={handleEditAdmin} className="mt-3">
          <Row className="g-3 align-items-end">
            <Col md={2}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                value={editAdmin.username}
                onChange={(e) => setEditAdmin({ ...editAdmin, username: e.target.value })}
                placeholder="Username"
              />
            </Col>
            <Col md={2}>
              <Form.Label>Password (Opsional)</Form.Label>
              <Form.Control
                type="password"
                value={editAdmin.password}
                onChange={(e) => setEditAdmin({ ...editAdmin, password: e.target.value })}
                placeholder="Password Baru"
              />
            </Col>
            <Col md={2}>
              <Form.Label>Ulangi Password</Form.Label>
              <Form.Control
                type="password"
                value={editAdmin.confirmPassword}
                onChange={(e) => setEditAdmin({ ...editAdmin, confirmPassword: e.target.value })}
                placeholder="Konfirmasi"
              />
            </Col>
            <Col md={2}>
              <Form.Label>Role</Form.Label>
              <Form.Select
                value={editAdmin.role}
                onChange={(e) => setEditAdmin({ ...editAdmin, role: e.target.value })}
              >
                <option value="admin">Admin</option>
                <option value="master">Master</option>
              </Form.Select>
            </Col>
            <Col md={2}>
              <Form.Label>Status</Form.Label>
              <Form.Select
                value={editAdmin.status}
                onChange={(e) => setEditAdmin({ ...editAdmin, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Col>
            <Col md="auto">
              <Button type="submit" variant="primary">
                Update
              </Button>
            </Col>
          </Row>
        </Form>
      )}

      {/* Tabel Admin */}
      <Table striped bordered hover responsive className="mt-4">
        <thead>
          <tr>
            <th onClick={() => setSortAscending(!sortAscending)} style={{ cursor: "pointer" }}>
              Username {sortAscending ? "↑" : "↓"}
            </th>
            <th>Status</th>
            <th>Role</th>
            {userRole === "master" && <th>Aksi</th>}
          </tr>
        </thead>
        <tbody>
          {currentItems.length > 0 ? (
            currentItems.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.username}</td>
                <td>
                  {admin.status === "active" ? (
                    <Badge bg="success">Aktif</Badge>
                  ) : (
                    <Badge bg="danger">Nonaktif</Badge>
                  )}
                </td>
                <td>
                  <Badge bg={admin.role === "master" ? "dark" : "secondary"}>{admin.role}</Badge>
                </td>
                {userRole === "master" && (
                  <td>
                    <Button variant="warning" size="sm" onClick={() => handleEdit(admin)} className="me-2">
                      Edit
                    </Button>
                    <Button variant="danger" size="sm" onClick={() => handleDelete(admin.id)}>
                      Hapus
                    </Button>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={userRole === "master" ? 4 : 3} className="text-center">
                Tidak ada data admin.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="d-flex justify-content-center gap-2">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Button
          variant="secondary"
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= sortedData.length}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default UserAdminSMP;
