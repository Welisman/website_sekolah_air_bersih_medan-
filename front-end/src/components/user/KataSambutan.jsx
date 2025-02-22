import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import "../../style/components/kataSambutan.css";
import axios from "axios";

function KataSambutan() {
  const [sambutan, setSambutan] = useState({});
  const [fotoUrl, setFotoUrl] = useState("");

  // Ambil data kata sambutan dari backend (JSON)
  useEffect(() => {
    axios.get("http://localhost:3001/api/kata-sambutan")
      .then(response => setSambutan(response.data))
      .catch(error => console.error("Gagal memuat kata sambutan:", error));
  }, []);

  // Ambil foto kepala sekolah dari database
  useEffect(() => {
    axios.get("http://localhost:3001/api/foto", { responseType: "blob" })
      .then(response => {
        const imageUrl = URL.createObjectURL(response.data);
        setFotoUrl(imageUrl);
      })
      .catch(error => console.error("Gagal memuat foto:", error));
  }, []);

  return (
    <Container className="mt-5">
      <div>
        <h3>{sambutan.jabatan}</h3>
        {fotoUrl ? <Image src={fotoUrl} className="foto" /> : <p>Memuat foto...</p>}
        <div className="text">
          <h3>{sambutan.nama}</h3>
          <p>{sambutan.kata_sambutan || "Memuat kata sambutan..."}</p>
          <a href="#">Selengkapnya &gt;</a>
        </div>
      </div>
    </Container>
  );
}

export default KataSambutan;
