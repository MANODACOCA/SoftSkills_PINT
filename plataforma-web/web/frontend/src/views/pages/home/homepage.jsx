import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, NavLink } from "react-router-dom";
import Slide from '../../components/carrousel/Carrousel';
import Card from '../../components/card/Card';

const HomePage = () => {
    return(
        <div>
            <Slide />

            <h3>Bem vindo a home da nossa amostra de pagina da softskills</h3>
            <Card/>
        </div>
    );
}

export default HomePage;