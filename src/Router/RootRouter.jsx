import React from "react";
import { Routes, Route } from "react-router-dom";
import UserRoutes from "./user/UserRoute";
import AdminRoutes from "./admin/AdminRouter";

const RootRoutes = () => {
    return (
        <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
    );
};

export default RootRoutes;
