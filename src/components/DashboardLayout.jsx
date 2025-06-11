// src/components/DashboardLayout.jsx
import React from 'react';
import DashboardNav from './DashboardNav';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <div className="dashboardLayout_body">
      <DashboardNav />
      <main className="mainContent">
        <div className="content">
          <Outlet />
        </div>
        <footer className="footer">
          <h4>&copy; {new Date().getFullYear()} YourCompanyName. All rights reserved.</h4>
        </footer>
      </main>
    </div>
  );
};

export default DashboardLayout;