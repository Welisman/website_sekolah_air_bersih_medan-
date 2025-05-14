import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./user/UserRouteSMP";
import AdminRoutes from "./admin/AdminRouterSMP"; // Pastikan path benar
import UserLayout from "../layout/user_layout_SMP/UserLayout"; // Pastikan path benar
import AdminLayout from "../layout/admin_layout_SMP/AdminLayout"; // Pastikan path benar

const RootRoutes = () => {
    return (
        <Routes>
            {/* Rute untuk User */}
            <Route path="/*" element={<UserRoutes />} />
            {/* Rute untuk Admin, menggunakan wildcard untuk menangani sub-routes */}
            <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
    );
};

export default RootRoutes;
