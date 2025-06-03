import React from 'react'
import {Outlet} from 'react-router'
import DashboardNav from './DashboardNav'
import DashboardHeader from './DashboardHeader'

const DashboardLayout = () => {
  return (
    <div className="dashboardLayout_body">
      <DashboardNav />
      <div className="mainContent">
        {/* <DashboardHeader /> */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout