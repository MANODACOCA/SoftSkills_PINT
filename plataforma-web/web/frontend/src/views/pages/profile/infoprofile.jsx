import React, { useRef, useEffect, useState } from 'react';
//import './infoprofile.css';

const InfoProfile = () => {
    return(
        <div className='d-flex'>
            <div className='col-6 form-group p-5 border-end'>
                <h5>Alterar Password</h5>
                <div className='mt-2'>
                    <label htmlFor="passant" className='form-label'>Password antiga</label>
                    <input type="text" className='form-control' required /> 
                </div>
                <div className='mt-2'>
                    <label htmlFor="passnova" className='form-label'>Password nova</label>
                    <input type="text" className='form-control' required /> 
                </div>
                <div className='d-flex justify-content-end mt-2'>
                    <small>Esqueceu-se da palavra-passe?</small>
                </div>
                
            </div>
            <div className='col-6'>
                
            </div>
        </div>
    );
}

export default InfoProfile;