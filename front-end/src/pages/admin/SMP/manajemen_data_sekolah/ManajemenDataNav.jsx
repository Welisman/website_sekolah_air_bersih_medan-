import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const ManajemenDataNav = () => (
  <Nav variant="tabs">
    <Nav.Item>
      <Nav.Link as={NavLink} to="/admin/manajemen-data-sekolah" end>
        Data siswa
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={NavLink} to="/admin/manajemen-data-sekolah/manajemen-data-guru">
        Data Guru & Tendik
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={NavLink} to="/admin/manajemen-data-sekolah/manajemen-data-wali-kelas">
        Data Wali Kelas
      </Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link as={NavLink} to="/admin/manajemen-data-sekolah/manajemen-data-alumni">
        Data Alumni
      </Nav.Link>
    </Nav.Item>
  </Nav>
);

export default ManajemenDataNav;
