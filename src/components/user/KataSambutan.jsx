import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import Foto from "../../assets/home/image2.png"
import '../../style/components/kataSambutan.css';

function KataSambutan() {
  return (
    <Container className="mt-5" >
      <div md={6}>
        <h3>Kepala Sekolah SMP ADVENT AIR BERSIH MEDAN</h3>
        <Image src={Foto} className='foto' />
        <div className="text">
          <h3>H. Sumarno, M.Pd.</h3>
          <p>
            Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius.
          </p>
          <a href="#">Selengkapnya &gt;</a>
          </div>
      </div>
    </Container>
  );
}

export default KataSambutan;