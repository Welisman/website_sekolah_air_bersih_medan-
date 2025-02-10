import Carousel from 'react-bootstrap/Carousel';
import Foto from "../assets/carousel/slide1.jpg"
import Foto2 from "../assets/carousel/slide2.jpg"

const CarouselBeranda = () => {
    return (
        <Carousel style={{ top: "30px" }}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Foto}
                    alt="First slide"

                />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Foto2}
                    alt="Second slide"
                />

            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={Foto}
                    alt="Third slide"
                />

            </Carousel.Item>
        </Carousel>
    )
}

export default CarouselBeranda;