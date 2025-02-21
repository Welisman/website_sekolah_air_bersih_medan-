import React from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "../../../style/admin/trafic/traficData.css";

const trafficData = [
  { year: "2015", traffic: 5000 },
  { year: "2016", traffic: 5200 },
  { year: "2017", traffic: 5400 },
  { year: "2018", traffic: 6000 },
  { year: "2019", traffic: 5800 },
  { year: "2020", traffic: 6500 },
  { year: "2021", traffic: 7000 },
  { year: "2022", traffic: 7500 },
  { year: "2023", traffic: 8000 },
  { year: "2024", traffic: 9000 },
];

const siswaData = [
  { bulan: "Q1", laki: 30, perempuan: 20 },
  { bulan: "Q2", laki: 35, perempuan: 25 },
  { bulan: "Q3", laki: 33, perempuan: 27 },
  { bulan: "Q4", laki: 40, perempuan: 30 },
];

const totalSiswaData = [
  { year: "2015", total: 50 },
  { year: "2016", total: 40 },
  { year: "2017", total: 55 },
  { year: "2018", total: 60 },
  { year: "2019", total: 70 },
  { year: "2020", total: 75 },
  { year: "2022", total: 80 },
  { year: "2023", total: 90 },
  { year: "2024", total: 100 },
];

const eventData = [
  { bulan: "01", event: 60 },
  { bulan: "02", event: 65 },
  { bulan: "03", event: 70 },
  { bulan: "04", event: 75 },
  { bulan: "05", event: 80 },
  { bulan: "06", event: 85 },
  { bulan: "07", event: 78 },
  { bulan: "08", event: 82 },
  { bulan: "09", event: 88 },
  { bulan: "10", event: 90 },
  { bulan: "11", event: 85 },
  { bulan: "12", event: 95 },
];

const Data = () => {
  return (
    <div className="dashboard-container">
      {/* Bagian Kiri: Statistik */}
      <div className="stats-container">
        <h5 className="stat-title2">Pengunjung Website</h5>
        <div className="stat-box">
          <p className="stat-title">Total User</p>
          <p className="stat-value">1000</p>
        </div>
        <div className="stat-box">
          <p className="stat-title">Page View</p>
          <p className="stat-value">24,000</p>
        </div>
        <div className="stat-box">
          <p className="stat-title">Avg Click Rate</p>
          <p className="stat-value">30%</p>
        </div>

        <div className="stats-container2">
        <h5 className="stat-title2">Data siswa/I</h5>
        <div className="stat-box">
          <p className="stat-title">Perempuan</p>
          <p className="stat-value">100</p>
        </div>
        <div className="stat-box">
          <p className="stat-title">Laki-laki</p>
          <p className="stat-value">200</p>
        </div>
        <div className="stat-box">
          <p className="stat-title">Total</p>
          <p className="stat-value">300</p>
        </div>
      </div>
      
      </div>

      {/* Bagian Kanan: Grafik */}
      <div className="chart-wrapper">
        <h5 className="chart-title">Peningkatan Traffic Web Setiap Bulan</h5>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={trafficData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="traffic" stroke="#007bff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        

        <h5 className="chart-title">Perkembangan Jumlah Siswa/i Per Bulan</h5>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={siswaData}>
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar dataKey="laki" fill="#007bff" />
              <Bar dataKey="perempuan" fill="#ff69b4" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <h5 className="chart-title">Perkembangan Jumlah Keseluruhan Siswa/i SMA</h5>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={totalSiswaData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="total" stroke="#007bff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <h5 className="chart-title">Perkembangan Event Setiap Bulan</h5>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={eventData}>
              <XAxis dataKey="bulan" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="event" stroke="#007bff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Data;
