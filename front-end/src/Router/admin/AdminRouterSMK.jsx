import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../layout/admin_layout_SMK/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import UserAdmin from "../../pages/admin/SMK/UserAdmin";
import AdminDashboard from "../../pages/admin/SMK/dashboard/AdminDahsboard";
import ManajemenKonten from "../../pages/admin/SMK/manajemen_konten/ManajemenKonten";
import ProfilSMK from "../../pages/admin/SMK/manajemen_konten/profilSMK/ProfilSMK";
import Pengumuman from "../../pages/admin/SMK/manajemen_konten/AcaraSMK/Pengumuman";
import EventSMK from "../../pages/admin/SMK/manajemen_konten/AcaraSMK/EventSMK";
import KegiatanSMK from "../../pages/admin/SMK/manajemen_konten/AcaraSMK/KegiatanSMK";
import FasilitasSMK from "../../pages/admin/SMK/manajemen_konten/fasilitas/fasilitasSMK";
import ManajemenDataSiswa from "../../pages/admin/SMK/manajemen_data_sekolah/ManajemenDataSiswa";
import ManajemenDataWaliKelas from "../../pages/admin/SMK/manajemen_data_sekolah/ManajemenDataWaliKelas";
import ManajemenDataGuru from "../../pages/admin/SMK/manajemen_data_sekolah/ManajemenDataGuru";


const AdminRoutes = () => {
    return (
        <Routes>
            {/* ProtectedRoute untuk memastikan /admin dan sub-routes diproteksi */}
            <Route path="/" element={<ProtectedRoute />}>
                {/* Layout admin untuk semua halaman di bawah /admin */}
                <Route path="/" element={<AdminLayout />}>
                    {/* Route root /admin menampilkan AdminDashboard */}
                    <Route index element={<AdminDashboard />} />
                    {/* Subroute untuk /admin/user-admin */}
                    <Route path="user-admin" element={<UserAdmin />} />
                    <Route path="manajemen-konten">
                        <Route index element={<ManajemenKonten />} />
                        <Route path="profil-admin" element={<ProfilSMK />} />
                        <Route path="pengumuman" element={<Pengumuman />} />
                        <Route path="event-SMK" element={<EventSMK />} />
                        <Route path="kegiatan-SMK" element={<KegiatanSMK />} />
                        <Route path="fasilitas-SMK" element={<FasilitasSMK />} />
                    </Route>
                    <Route path="manajemen-data-sekolah">
                        <Route index element={<ManajemenDataSiswa />} />
                        <Route path="data-wali-kelas" element={<ManajemenDataWaliKelas />} />
                        <Route path="data-guru" element={<ManajemenDataGuru />} />
                        {/* <Route path="data-alumni" element={<EventSMK />} /> */}
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
