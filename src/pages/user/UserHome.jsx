
import React from "react";
import KataSambutan from "../../details/KataSambutan";
import VisiMisi from "../../details/VisiMisi";
import Struktur from "../../details/Struktur";

const UserHome = () => {
    return (
        <div>
            {/* <Carousel/> */}
            <KataSambutan/>
            <VisiMisi/>
            {/* <Events/> */}
            <Struktur/>
        </div>
    )
}

export default UserHome;