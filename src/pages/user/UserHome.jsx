
import React from "react";
import KataSambutan from "../../components/user/KataSambutan";
import VisiMisi from "../../components/user/VisiMisi";
import Struktur from "../../components/user/Struktur";
import CarouselBeranda from "../../components/user/carousel";

const UserHome = () => {
    return (
        <div>
            <CarouselBeranda/>
            <KataSambutan/>
            <VisiMisi/>
            {/* <Events/> */}
            <Struktur/>
        </div>
    )
}

export default UserHome;