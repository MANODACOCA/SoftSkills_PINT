import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import softskills from '../../../assets/images/logos/semfundo2.png';

const preloadHome = () => import('../home/homepage');

const SplashPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(async() =>{
            await preloadHome();
            navigate('/home');
        },2000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className='d-flex justify-content-center align-items-center w-100'
            style={{ height: '100vh'}}
        >
            <img src={softskills} alt="logo_softskills" />
        </motion.div>
    );
};

export default SplashPage;