import "../../../style/admin/sidebar.css";
import { useNavigate } from "react-router-dom";
import React from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <CDBSidebar
        style={{
          position: "fixed",
          overflow: "hidden",
        }}
      >
        <CDBSidebarHeader>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu className="cdb-sidebar-menu-item">
            <NavLink to="/admin" className="nav-link">
              <CDBSidebarMenuItem >Dashboard</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/admin/manajemen-konten" className="nav-link">
              <CDBSidebarMenuItem >Manajemen Konten</CDBSidebarMenuItem>
            </NavLink>
            <NavLink to="/admin/manajemen-data-sekolah" className="nav-link">
              <CDBSidebarMenuItem >Manajemen Data</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/admin/user-admin-smp" className="nav-link">
              <CDBSidebarMenuItem >User Admin</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/admin/profil-admin-smp" className="nav-link">
              <CDBSidebarMenuItem >Profil Admin</CDBSidebarMenuItem>
            </NavLink>

            <CDBSidebarMenuItem lassName="logout">
              <div onClick={handleLogout}>Logout</div>
            </CDBSidebarMenuItem>
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
