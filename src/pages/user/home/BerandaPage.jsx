import React from "react";
import KataSambutan from "../../../components/user/KataSambutan";
import VisiMisi from "../../../components/user/VisiMisi";
import Struktur from "../../../components/user/Struktur";
import CarouselBeranda from "../../../components/user/carousel";
import Acara from "../../../components/user/Acara";
import Dashboard from "./Dashboard";
import Footer from "../../../components/user/Footer";
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