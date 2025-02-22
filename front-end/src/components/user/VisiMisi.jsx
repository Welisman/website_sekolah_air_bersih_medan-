import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

const VisiMisi = () => {
  const [visi, setVisi] = useState('');
  const [misi, setMisi] = useState([]);
  const [tujuan, setTujuan] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const visiResponse = await axios.get('http://localhost:3001/api/visi');
      setVisi(visiResponse.data[0]?.visi || 'Tidak ada data visi');

      const misiResponse = await axios.get('http://localhost:3001/api/misi');
      setMisi(misiResponse.data || []);

      const tujuanResponse = await axios.get('http://localhost:3001/api/tujuan');
      setTujuan(tujuanResponse.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Container>
      <h2>Visi, Misi & Tujuan</h2>
      <div>
        <h3>Visi</h3>
        <p>{visi}</p>
      </div>
      <div>
        <h3>Misi</h3>
        <ul>{misi.map((item, index) => <li key={index}>{item.misi}</li>)}</ul>
      </div>
      <div>
        <h3>Tujuan</h3>
        <ul>{tujuan.map((item, index) => <li key={index}>{item.tujuan}</li>)}</ul>
      </div>
    </Container>
  );
};

export default VisiMisi;