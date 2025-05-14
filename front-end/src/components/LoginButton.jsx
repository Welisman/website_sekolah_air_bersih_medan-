import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

const LoginButton = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  const handleShow = () => setShow(true);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Username dan password harus diisi!");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/admin/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token, userId, role } = response.data;
        console.log("✅ Login Success", response.data);

        // Simpan data login
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        localStorage.setItem("role", role); // <--- penting untuk kontrol fitur berdasarkan role

        navigate("/admin");
        handleClose();
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      setError(error.response?.data?.message || "Login gagal, coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div>
      <Button onClick={handleShow}>Login</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Admin</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onKeyDown={handleKeyPress}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Loading…" : "Login"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginButton;
