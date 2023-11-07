import React from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/main/SideBar'
import TopSideBar from '../../components/main/TopSideBar'

const IndexAdmin = () => {
    return (
        <div className="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full"
            data-sidebar-position="fixed" data-header-position="fixed">
            <SideBar />
            <div className="body-wrapper" style={{ height: "100vh" }}>
                <TopSideBar />
                <Outlet />
            </div>
        </div >
    )
}

export default IndexAdmin