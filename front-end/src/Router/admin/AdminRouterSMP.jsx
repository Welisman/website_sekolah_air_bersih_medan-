import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../layout/admin_layout_SMP/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import ProfilAdminSMP from "../../pages/admin/SMP/ProfilAdminSMP";
import AdminDashboard from "../../pages/admin/SMP/dashboard/AdminDahsboard";
import ManajemenKonten from "../../pages/admin/SMP/manajemen_konten/ManajemenKonten";
import ProfilSMP from "../../pages/admin/SMP/manajemen_konten/profilSMP/ProfilSMP";
import Pengumuman from "../../pages/admin/SMP/manajemen_konten/AcaraSMP/Pengumuman";
import EventSMP from "../../pages/admin/SMP/manajemen_konten/AcaraSMP/EventSMP";
import KegiatanSMP from "../../pages/admin/SMP/manajemen_konten/AcaraSMP/KegiatanSMP";
import FasilitasSMP from "../../pages/admin/SMP/manajemen_konten/fasilitas/fasilitasSMP";
import ManajemenDataSiswa from "../../pages/admin/SMP/manajemen_data_sekolah/ManajemenDataSiswa";
import ManajemenDataWaliKelas from "../../pages/admin/SMP/manajemen_data_sekolah/ManajemenDataWaliKelas";
import ManajemenDataGuru from "../../pages/admin/SMP/manajemen_data_sekolah/ManajemenDataGuru";
import ManajemenDataAlumni from "../../pages/admin/SMP/manajemen_data_sekolah/ManajemenDataAlumni";
import UserAdminSMP from "../../pages/admin/SMP/UserAdminSMP";


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
                    <Route path="profil-admin-smp" element={<ProfilAdminSMP />} />
                    <Route path="manajemen-konten">
                        <Route index element={<ManajemenKonten />} />
                        <Route path="profil-smp" element={<ProfilSMP />} />
                        <Route path="pengumuman" element={<Pengumuman />} />
                        <Route path="event-smp" element={<EventSMP />} />
                        <Route path="kegiatan-smp" element={<KegiatanSMP />} />
                        <Route path="fasilitas-smp" element={<FasilitasSMP />} />
                    </Route>
                    <Route path="manajemen-data-sekolah">
                        <Route index element={<ManajemenDataSiswa />} />
                        <Route path="manajemen-data-wali-kelas" element={<ManajemenDataWaliKelas />} />
                        <Route path="manajemen-data-guru" element={<ManajemenDataGuru />} />
                        <Route path="manajemen-data-alumni" element={<ManajemenDataAlumni />} />
                        {/* <Route path="data-alumni" element={<EventSMP />} /> */}
                    </Route>
                    <Route path="user-admin-smp" element={<UserAdminSMP />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
