
import React from "react";
import KataSambutan from "../../details/KataSambutan";
import VisiMisi from "../../details/VisiMisi";
import Struktur from "../../details/Struktur";
import CarouselBeranda from "../../details/carousel";

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