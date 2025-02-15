// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import "../../styles/molecules/VisiMisi.css"
import React from 'react';

const VisiMisi = () => {

  return (
    <div className="mt-5" style={{textAlign:"center"}}>
      <h3 className="visimisi">Visi Misi</h3>
      <div className="visi">
        <h4>Visi</h4>
        <p>Menjadi lembaga pendidikan yang membangun dan memperkembangkan di dalamdiri anak - anak kepada keseimbangan bidang akademis, fisik, sosial, dan spiritual dan secara utuh.</p>
      </div>
      <div className="Misi">
        <h4>Misi</h4>
        <p>Memastikan pemuda-pemudi usia sekolah memperoleh pendidikan yang seimbang  dengan disiplin ilmu pengetahuan dan keselamatan dengan mengedepankan pendidikan keagamaan, intelektual, keterampilan sosial.   </p>
      </div>
    </div>
  );
};

export default VisiMisi;