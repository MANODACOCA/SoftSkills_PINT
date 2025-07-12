import React, { useState, useEffect } from 'react';
import FundoComponent from '../../components/pageInicial/fundoComponent';
import Slider from '../../components/pageInicial/slider';
import MiddleComponent from '../../components/pageInicial/middleComponent';

const PageInicial = () => {
    return (
        <div >
            <Slider />
            <MiddleComponent />
            <FundoComponent />
        </div>
    );
};

export default PageInicial;