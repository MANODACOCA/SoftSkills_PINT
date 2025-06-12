import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, NavLink } from "react-router-dom";
import './Layout.css';

//components
import Header from '../../components/base_components/Header';
import SideBar from '../../components/base_components/sidebar/SideBar';
import Footer from '../../components/base_components/footer/Footer';

const BaseLayout = () => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className=" d-flex bg-light">
            
            <Header collapsed={collapsed} toggleSidebar={toggleSidebar} />
            <SideBar collapsed={collapsed} toggleSidebar={toggleSidebar} />

            <div className={`main-container ${collapsed ? 'collapsed' : ''} ms-auto`}>

                <div className="flex-grow-1 p-4" >
                    <Outlet />
                </div>

                <Footer />
            </div>
        </div>
    );
};

export default BaseLayout;

