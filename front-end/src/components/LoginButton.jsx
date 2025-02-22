import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const LoginButton = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3001/api/admin/login", {
                username, // ✅ Gunakan state username
                password,
            });

            if (response.status === 200) {
                console.log("Login Success", response.data);
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("username", response.data.username);
                navigate("/admin");
            } else {
                console.log("Login Failed", response.data);
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Login Gagal!");
        } finally {
            setLoading(false);
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
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Masukkan username"
                                value={username} // ✅ Pastikan state digunakan
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
