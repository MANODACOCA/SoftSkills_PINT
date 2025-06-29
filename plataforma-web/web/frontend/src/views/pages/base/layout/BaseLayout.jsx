import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate, NavLink } from "react-router-dom";
import './Layout.css';

//components
import HeaderGeral from '../../../components/base_components/header/Index_Header'
import SideBar from '../../../components/base_components/sidebar/Index_SideBar';
import Footer from '../../../components/base_components/footer/Index_Footer';
import { checkUserBlocked } from '../../../../utils/checkUserBlock';

const BaseLayout = () => {

    const [collapsed, setCollapsed] = useState(true);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            checkUserBlocked();
        }, 60000);
        console.log('ola');
        return () => clearInterval(interval);
    }, []);

    return (
        <div className=" d-flex bg-light">
            
            <HeaderGeral collapsed={collapsed} toggleSidebar={toggleSidebar} />
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

