// src/components/AdminNav.js
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const KelasNav = () => (
  <Nav variant="tabs">
    <Nav.Item>
      <Nav.Link as={NavLink} to="/data-siswa/kelasVII" end>
        Dashboard Utama
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={NavLink} to="/data-siswa/kelasVIII">
        Profil SMP
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={NavLink} to="/data-siswa/kelasIX">
        Pengumuman
      </Nav.Link>
    </Nav.Item>
  </Nav>
);

export default KelasNav;
