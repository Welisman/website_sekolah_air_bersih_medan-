import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Mengimpor Link
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Pagination from "react-bootstrap/Pagination";

const DataGuruTendik = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // 5 baris x 2 kolom

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/data-guru-tendik")
      .then((response) => setData(response.data))
      .catch((error) => console.error("Gagal mengambil data guru/tendik:", error));
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <Container>
      <h2 className="text-center mb-5">Guru dan Tendik</h2>

      <Row className="row-costum justify-content-center">
        {Array.isArray(currentItems) && currentItems.length > 0 ? (
          currentItems.map((item) => (
            <Col key={item.id} md={5} className="mb-4 foto d-flex justify-content-center">
              <div className="card dokumentasi-card">
                {/* Menggunakan Link untuk navigasi */}
                <Link
                  to={`/data-guru-tendik-detail/${item.id}`}
                  style={{ cursor: "pointer", textDecoration: "none" }}
                >
                  {item.image ? (
                    <img
                      src={`data:image/jpeg;base64,${item.image}`}
                      alt={item.nama}
                      className="card-img-top dokumentasi-img"
                      style={{ objectFit: "cover", height: "250px" }}
                    />
                  ) : (
                    <div
                      className="card-img-top dokumentasi-img"
                      style={{
                        height: "250px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#f0f0f0",
                      }}
                    >
                      Tidak ada Foto
                    </div>
                  )}
                  <div className="card-body text-center">
                    <h5 className="card-title">{item.nama}</h5>
                    <p className="card-text">NIP: {item.nip}</p>
                  </div>
                </Link>
              </div>
            </Col>
          ))
        ) : (
          <div className="text-center w-100">Belum ada data guru/tendik</div>
        )}
      </Row>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-4">
          <Pagination.Prev
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }, (_, i) => (
            <Pagination.Item
              key={i + 1}
              active={i + 1 === currentPage}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
    </Container>
  );
};

export default DataGuruTendik;
