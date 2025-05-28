import React, { useRef, useEffect, useState } from 'react';
import './profile.css';

const EditProfile = () => {
    const [genero, setGenero] = '';
    const userId = 2;

    useEffect(() => {
        
    });

    return(
        <div className='form-group'>
            <div className='d-flex justify-content-between'>
                <div className='col-md-9 pe-4 col-sm-10'>
                    <div className=''>
                        <label htmlFor="nome" className='form-label'>Nome</label>
                        <input type="text" className='form-control' required />    
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="mail" className='form-label'>email</label>
                        <input type="email" className='form-control' required />    
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="telemovel" className='form-label'>Telemóvel <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                        <input type="tel" className='form-control' />    
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="nasc" className='form-label'>Data nascimento <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                        <input type="date" className='form-control' />    
                    </div>
                    <div className='d-flex w-100 gap-4 mt-2'>
                        <div className='w-50'>
                            <label htmlFor="pais" className='form-label'>País <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                            <select name="" id="" className='form-select'>
                                {/* Percorrer api paises */}
                            </select>
                        </div>
                        <div className='w-50'>
                            <label htmlFor="genero" className='form-label'>Género <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                            <select name="genero" id="genero" className='form-select' value={genero}>
                                <option value="" disabled hidden>--Escolha o genero--</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                            </select>
                        </div>
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="morada" className='form-label'>Morada <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                        <input type="text" className='form-control' />    
                    </div>
                    <button className='btn btn-color text-white mt-3'>Submeter alterações</button>
                </div>
                <div className='col-md-3 col-sm-2 bg-custom-light d-flex align-items-center flex-column h-100 p-3 rounded'>
                    <img src="https://cdn.europosters.eu/image/750/23817.jpg" alt="" className='w-100 img-profile' />
                    <div className='d-flex flex-column align-items-center'>
                        <h5 className='m-1'>nome</h5>
                        <p className='m-1'>fromando</p>
                        <small>mail</small>
                    </div>
                    <button className='btn btn-color text-white w-100 mt-4'>Alterar Foto</button>
                </div>
            </div> 
        </div>
    );
}

export default EditProfile;