import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate, NavLink } from "react-router-dom";
import Slide from '../../components/carrousel/Carrousel';
import Card from '../../components/card/Card';
import Cardhighlight from '../../components/card_highlight/CardHighlight';

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
            <Cardhighlight />
            <h1>Novidades</h1>
            <Card/> <Card/> <Card/> <Card/>
            <h1>Curso síncrono em destaque</h1>
            <Cardhighlight />
        </div>
    );
}

export default HomePage;