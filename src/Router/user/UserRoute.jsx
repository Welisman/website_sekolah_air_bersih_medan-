import { Routes, Route } from "react-router-dom";
import UserLayout from "../../layout/user_layout/UserLayout";
import UserHome from "../../pages/user/UserHome";
import InformasiPendaftaran from "../../pages/InformasiPendaftaran";
import ProfilSekolah from "../../pages/user/profil/ProfilSekolah";
import Fasilitas from "../../pages/user/fasilitas/fasilitas";
import DataSiswa from "../../pages/user/database/DataSiswa";
import DataAlumni from "../../pages/user/database/DataAlumni";
import DataGuruTendik from "../../pages/user/database/DataGuruTendik";
import Kegiatan from "../../pages/user/acara/Kegiatan";
import Event from "../../pages/user/acara/event";
import Pengumuman from "../../pages/user/acara/Pengumuman";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserLayout />}>
                <Route index element={<UserHome />} />
                <Route path="informasi-pendaftaran" element={<InformasiPendaftaran />} />
                <Route path="profil" element={<ProfilSekolah />} />
                <Route path="fasilitas" element={<Fasilitas />} />
                
                <Route path="data-siswa" element={<DataSiswa />} />
                <Route path="data-guru-dan-tendik" element={<DataGuruTendik />} />
                <Route path="data-alumni" element={<DataAlumni />} />
                
                <Route path="event" element={<Event />} />
                <Route path="kegiatan" element={<Kegiatan />} />
                <Route path="pengumuman" element={<Pengumuman />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
