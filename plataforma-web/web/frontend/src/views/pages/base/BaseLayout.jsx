import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, NavLink } from "react-router-dom";

//components
import Header from '../../components/base_components/Header';
import SideBar from '../../components/base_components/SideBar';
import Footer from '../../components/base_components/Footer';
import Coisas from '../../components/carrousel/Carrousel';

const BaseLayout = () => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className=" d-flex">
            <SideBar collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <div className={`main-container ${collapsed ? 'collapsed' : ''} ms-auto`}>
                <Header collapsed={collapsed} toggleSidebar={toggleSidebar}/>
                <div className="flex-grow-1 p-4" >
                    <Coisas />
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                    <h3>Dashboard content for /star-wars</h3>
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default BaseLayout;

