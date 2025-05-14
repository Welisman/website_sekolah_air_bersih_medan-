import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../../style/admin/AdminLayout.css";
import Sidebar from "../../pages/admin/SMP/SideBar";
const AdminLayout = () => {

    return (
        <div className="dashboard-container">
            <Sidebar />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;