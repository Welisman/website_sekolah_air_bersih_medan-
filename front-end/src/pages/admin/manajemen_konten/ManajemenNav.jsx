// src/components/AdminNav.js
import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ManajemenNav = () => (
  <Nav variant="tabs">
    <Nav.Item>
      <Nav.Link as={NavLink} to="/admin/manajemen-konten" end>
        Dashboard Utama
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={NavLink} to="/admin/manajemen-konten/profil-admin">
        Profil SMP
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={NavLink} to="/admin/manajemen-konten/pengumuman">
        Pengumuman
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={NavLink} to="/admin/manajemen-konten/acara-smp">
        Acara SMP
      </Nav.Link>
    </Nav.Item>
  </Nav>
);

export default ManajemenNav;
