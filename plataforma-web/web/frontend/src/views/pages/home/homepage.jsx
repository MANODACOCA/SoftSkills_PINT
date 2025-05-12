import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, NavLink } from "react-router-dom";
import Slide from '../../components/carrousel/Carrousel';


const HomePage = () => {
    return(
        <div>
            <Slide />
            <h3>Bem vindo a home da nossa amostra de pagina da softskills</h3>
        </div>
    );
}

export default HomePage;