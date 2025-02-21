// src/pages/admin/manajemen_konten/Pengumuman.js
import React, { useReducer } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import ManajemenNav from "../ManajemenNav";

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload];
    case "DELETE":
      return state.filter((_, i) => i !== action.index);
    default:
      return state;
  }
};

const Pengumuman = () => {
  const [pengumumanList, dispatch] = useReducer(reducer, [
    "Pengumuman 1",
    "Pengumuman 2",
  ]);

  return (
    <Container>
      <Navbar bg="light" variant="light" className="mb-3">
        <Container>
          <Navbar.Brand>Manajemen Konten</Navbar.Brand>
        </Container>
      </Navbar>

      <ManajemenNav />

      <div className="pengumuman-container mt-3">
        {pengumumanList.map((text, index) => (
          <div key={index} className="pengumuman-card">
            <p className="pengumuman-text">{text}</p>
            <Button
              variant="danger"
              onClick={() => dispatch({ type: "DELETE", index })}
            >
              Hapus
            </Button>
          </div>
        ))}
      </div>

      <Button
        variant="secondary"
        className="mt-3"
        onClick={() =>
          dispatch({ type: "ADD", payload: "Pengumuman baru ditambahkan." })
        }
      >
        Tambah Pengumuman
      </Button>
    </Container>
  );
};

export default Pengumuman;
