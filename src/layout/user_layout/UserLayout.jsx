import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../pages/Dashboard"; // Header dan Navbar ada di dalam Dashboard

const UserLayout = () => {
    return (
        <div>
            {/* Menggunakan Dashboard sebagai header dan navigasi */}
            <Dashboard />
            
            {/* Tempat untuk merender halaman berdasarkan route */}
            <main>
                <Outlet />
            </main>
        </div>
    );
};

export default UserLayout;
