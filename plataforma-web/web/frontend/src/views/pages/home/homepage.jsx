import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, NavLink } from "react-router-dom";
import Slide from '../../components/carrousel/Carrousel';
import Card from '../../components/card/Card';

const HomePage = () => {
    return(
        <div>
            <Slide />

            <h3>Bem vindo a home da nossa amostra de pagina da softskills</h3>
            <h1>Para si</h1>
            <Card/> <Card/> <Card/> <Card/>
            <h1>Cursos mais populares</h1>
            <Card/> <Card/> <Card/> <Card/>
            <h1>Curso assíncrono em destaque</h1>
            <Card/>
            <h1>Novidades</h1>
            <Card/> <Card/> <Card/> <Card/>
            <h1>Curso síncrono em destaque</h1>
            <Card/>
            <h1>Top 10 formadores</h1>
            <Card/>
        </div>
    );
}

export default HomePage;