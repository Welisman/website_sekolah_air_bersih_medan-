import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import InformasiPendaftaran from "../components/pages/user/InformasiPendaftaran";
// import Contact from "../components/pages/user/UserContact";
import UserHome from "../pages/user/UserHome";

const UserRoutes = () => {
    return (
        <Routes>
            
            <Route path="/" element={<UserLayout />}>
                <Route index element={<UserHome />} />
                <Route path="informasi-pendaftaran" element={<InformasiPendaftaran />} />
                {/* <Route path="/contact" element={<Contact />} /> */}
            </Route>
        </Routes>
    );
};

export default UserRoutes;