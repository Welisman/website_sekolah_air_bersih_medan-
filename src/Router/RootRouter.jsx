import React from "react";
import { Route, Routes } from "react-router-dom";
import BerandaPage from "../pages/BerandaPage.jsx";
import Dashboard from "../pages/Dashboard.jsx";


const RootRoutes = () => {
    return (
        
            <div>
                <Routes>
                    <Route path="/" element={<BerandaPage />} />
                </Routes>
            </div>
    

    )
}

export default RootRoutes;