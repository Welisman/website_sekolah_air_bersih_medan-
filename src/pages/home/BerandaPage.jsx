import React from "react";
import KataSambutan from "../../details/KataSambutan";
import VisiMisi from "../../details/VisiMisi";
import Struktur from "../../details/Struktur";
import CarouselBeranda from "../../details/carousel";
import Acara from "../../details/Acara";
import Dashboard from "./Dashboard";
import Footer from "../../details/Footer";
const BerandaPage = () => {
    return (
        <div>
            <Dashboard/>
            <CarouselBeranda/>
            <KataSambutan/>
            <VisiMisi/>
            <Acara/>
            <Struktur/>
            <Footer/>
        </div>
    )
}

export default BerandaPage;