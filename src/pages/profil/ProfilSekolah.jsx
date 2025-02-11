import React from 'react'
import Dashboard from '../home/Dashboard';
import { Container } from 'react-bootstrap';
import Footer from '../../details/Footer';

const ProfilSekolah = () => {
  return (
    <Container>

      <div className="about">
        <div className="nama-sekolah">Nama Sekolah :</div>
        <div className="status-kepemilikan">Status Kepemilikan :</div>
        <div className="bentuk-pendidikan">Bentuk Pendidikan :</div>
        <div className="alamat-sekolah">Alamat Sekolah :</div>
        <div className="email-sekolah">Email Sekolah :</div>
        <div className="tanggal-pendiri">Tanggal Pendiri :</div>
      </div>

      <div className="denah">
        <div>Denah sekolah</div>
        <div className="horzontal"></div>
        <div className="vertikal"></div>
        <div className="smp"></div>
        <div className="sd"></div>
        <div className="sma"></div>
      </div>
    </Container>
  )
};
export default ProfilSekolah;