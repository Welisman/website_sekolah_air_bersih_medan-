import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import axios from "axios";

const Chart = () => {
  const [dataGrafik, setDataGrafik] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/total-siswa-tahunan")
      .then(response => {
        setDataGrafik(response.data); // Langsung set tanpa formatting aneh
      })
      .catch(error => console.error("Gagal memuat data grafik siswa:", error));
  }, []);
  
  return (
    <Container className="mt-5">
      <h4 className="text-center mb-4">📊 Grafik Pertumbuhan Total Siswa/i Per Tahun</h4>

      <div style={{ overflowX: "auto", width: "100%", paddingBottom: "20px" }}>
        <div style={{ width: "1200px" }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={dataGrafik} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="tahun" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="perempuan" fill="#6495ED" name="Perempuan" />
              <Bar dataKey="laki_laki" fill="#003f5c" name="Laki-laki" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Container>
  );
};

export default Chart;
