import React, { useEffect } from 'react';
import HeaderInicial from '../../components/base_components/header/Header_Inicial';
import PageInicial from './PageInicial';
import FooterInicial from '../../components/base_components/footer/Footer_Inicial';



const InicialPage = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <HeaderInicial />
            <div >
                <div className="flex-grow-1" style={{ paddingTop: '80px' }}>
                    <PageInicial />
                </div>
                <FooterInicial />
            </div>
        </>
    );
};

export default InicialPage;
