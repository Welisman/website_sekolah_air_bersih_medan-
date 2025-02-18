import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../layout/admin_layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import UserAdmin from "../../pages/admin/UserAdmin";
import AdminDashboard from "../../pages/admin/dashboard/AdminDahsboard";
import ManajemenKonten from "../../pages/admin/manajemen_konten/ManajemenKonten";
import ProfilSMP from "../../pages/admin/manajemen_konten/profilSMP/ProfilSMP";
import Pengumuman from "../../pages/admin/manajemen_konten/Pengumuman/Pengumuman";
import AcaraSMP from "../../pages/admin/manajemen_konten/AcaraSMP/AcaraSMP";

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
                        <Route path="profil-admin" element={<ProfilSMP />} />
                        <Route path="pengumuman" element={<Pengumuman />} />
                        <Route path="acara-smp" element={<AcaraSMP />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
