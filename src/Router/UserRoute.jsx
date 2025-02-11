import { Routes, Route } from "react-router-dom";
import UserLayout from "../layout/user_layout/UserLayout";
import UserHome from "../pages/user/UserHome";
import InformasiPendaftaran from "../pages/InformasiPendaftaran";
import ProfilSekolah from "../pages/profil/ProfilSekolah";
import Fasilitas from "../pages/fasilitas/fasilitas";
import DataSiswa from "../pages/database/DataSiswa";
import DataAlumni from "../pages/database/DataAlumni";
import DataGuruTendik from "../pages/database/DataGuruTendik";
import Kegiatan from "../pages/Acara/Kegiatan";
import Event from "../pages/Acara/event";
import Pengumuman from "../pages/Acara/Pengumuman";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserLayout />}>
                <Route index element={<UserHome />} />
                <Route path="informasi-pendaftaran" element={<InformasiPendaftaran />} />
                <Route path="profil" element={<ProfilSekolah />} />
                <Route path="fasilitas" element={<Fasilitas />} />
                
                {/* Database Routes */}
                <Route path="data-siswa" element={<DataSiswa />} />
                <Route path="data-guru-dan-tendik" element={<DataGuruTendik />} />
                <Route path="data-alumni" element={<DataAlumni />} />
                
                {/* Acara & Event Routes */}
                <Route path="event" element={<Event />} />
                <Route path="kegiatan" element={<Kegiatan />} />
                <Route path="pengumuman" element={<Pengumuman />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
