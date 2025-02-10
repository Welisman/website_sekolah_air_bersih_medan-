import React from "react";
import KataSambutan from "../details/KataSambutan";
import VisiMisi from "../details/VisiMisi";
import Struktur from "../details/Struktur";
import ImageCarousel from "../details/carousel";
import UncontrolledExample from "../details/carousel";
import CarouselBeranda from "../details/carousel";
const BerandaPage = () => {
    return (
        <div>
            {/* <CarouselBeranda/> */}
            <KataSambutan/>
            <VisiMisi/>
            {/* <Events/> */}
            <Struktur/>
        </div>
    )
}

export default BerandaPage;