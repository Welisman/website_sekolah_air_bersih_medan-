import React from "react";
import { Outlet } from "react-router-dom";
import Dashboard from "../../pages/user/home/Dashboard"; // Header dan Navbar ada di dalam Dashboard
import Footer from "../../components/user/Footer";

const UserLayout = () => {
    return (
        <div>
            {/* Menggunakan Dashboard sebagai header dan navigasi */}
            <Dashboard />
            
            {/* Tempat untuk merender halaman berdasarkan route */}
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default UserLayout;
