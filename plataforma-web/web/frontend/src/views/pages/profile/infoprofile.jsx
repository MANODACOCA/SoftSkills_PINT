import React, { useRef, useEffect, useState } from 'react';
import './profile.css';

const InfoProfile = () => {
    const [typeProfile, setTypeProfile] = useState(['admin', 'formando'])

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
            <div className='col-6 p-5'>
                <div className='d-flex flex-column'>
                    <div className='mb-2'>
                        <h5 className='mb-3'>Escolha o tipo de conta: </h5>
                        <div className='btn-group'>
                            {typeProfile.map((role, index) => (
                                <button key={index} className='btn btn-color text-white'>
                                    {role}
                                </button>
                            ))}
                        </div>
                    </div>
                    <hr />
                    <div className="form-check form-switch d-flex align-items-center p-0 mb-2">
                        <h5 className='m-0'>
                            <label className="form-check-label me-5" htmlFor="flexSwitchCheckDefault">
                                Autenticação dois Fatores
                            </label>
                        </h5>
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    </div>
                    <small>Texto a explicar autenticação dois fatores</small>
                </div>
            </div>
        </div>
    );
}

export default InfoProfile;