
// import TopFormBar from './TopForm';
import React from "react";
import SideBar from "./SideBar";
import './Styles.css'


const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <SideBar />
      </aside>
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
