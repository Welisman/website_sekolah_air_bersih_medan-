import { Routes, Route } from "react-router-dom";
import UserLayout from "../../layout/user_layout_SMP/UserLayout";
import UserHome from "../../pages/user/UserHome";
import InformasiPendaftaran from "../../pages/InformasiPendaftaran";
import ProfilSekolah from "../../pages/user/SMP/profil/ProfilSekolah";
import Fasilitas from "../../pages/user/SMP/fasilitas/fasilitas";
import DataSiswa from "../../pages/user/SMP/database/DataSiswa";
import DataAlumni from "../../pages/user/SMP/database/DataAlumni";
import DataGuruTendik from "../../pages/user/SMP/database/DataGuruTendik";
import Kegiatan from "../../pages/user/SMP/acara/Kegiatan";
import Event from "../../pages/user/SMP/acara/event";
import Pengumuman from "../../pages/user/SMP/acara/Pengumuman";
import SiswaKelas from "../../pages/user/SMP/database/detail/SiswaKelas";
import WaliKelasDetail from "../../pages/user/SMP/database/detail/DetailWaliKelas";
import DetailGuruTendik from "../../pages/user/SMP/database/detail/DetailGuruTendik";
import KataSambutanFull from "../../pages/user/KataSambutanFull";

const UserRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserLayout />}>
                <Route index element={<UserHome />} />
                <Route path="kata-sambutan-full" element={<KataSambutanFull />} />
                <Route path="informasi-pendaftaran" element={<InformasiPendaftaran />} />
                <Route path="profil" element={<ProfilSekolah />} />
                <Route path="fasilitas" element={<Fasilitas />} />
                
                {/* Rute Data Siswa */}
                <Route path="data-siswa" element={<DataSiswa />} />
                <Route path="data-siswa/:kelas" element={<SiswaKelas />} />
                <Route path="data-siswa/wali-kelas/:id" element={<WaliKelasDetail />} />

                {/* Rute Data Guru dan Tendik */}
                <Route path="data-guru-tendik" element={<DataGuruTendik />} />
                {/* Pastikan ini memiliki dynamic segment :id untuk GuruTendikDetail */}
                <Route path="data-guru-tendik-detail/:id" element={<DetailGuruTendik />} />
                
                {/* Data Alumni */}
                <Route path="data-alumni" element={<DataAlumni />} />
                
                {/* Rute Acara */}
                <Route path="event" element={<Event />} />
                <Route path="kegiatan" element={<Kegiatan />} />
                <Route path="pengumuman" element={<Pengumuman />} />
            </Route>
        </Routes>
    );
};

export default UserRoutes;
