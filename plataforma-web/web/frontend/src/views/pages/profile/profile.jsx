import React, { useRef, useEffect, useState } from 'react';
import './profile.css';

const EditProfile = () => {


    return(
        <div className='form-group'>
            <div className='d-flex justify-content-between'>
                <div className='col-md-9 pe-4 col-sm-10'>
                    <div className=''>
                        <label htmlFor="nome" className='form-label'>Nome</label>
                        <input type="text" className='form-control' />    
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="telemovel" className='form-label'>Telemóvel</label>
                        <input type="text" className='form-control' />    
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="nasc" className='form-label'>Data nascimento</label>
                        <input type="data" className='form-control' />    
                    </div>
                    <div className='d-flex w-100 gap-4 mt-2'>
                        <div className='w-50'>
                            <label htmlFor="pais" className='form-label'>País</label>
                            <input type="text" className='form-control' />    
                        </div>
                        <div className='w-50'>
                            <label htmlFor="genero" className='form-label'>Género</label>
                            <input type="data" className='form-control' />    
                        </div>
                         
                    </div>
                    <div className='mt-2'>
                        <label htmlFor="morada" className='form-label'>Morada</label>
                        <input type="text" className='form-control' />    
                    </div>
                    <button className='btn btn-color text-white mt-3'>Submeter alterações</button>
                </div>
                <div className='col-md-3 col-sm-2 bg-secondary d-flex align-items-center flex-column h-100 p-3'>
                    <img src="https://cdn.europosters.eu/image/750/23817.jpg" alt="" className='w-100' />
                    <button className='btn btn-color text-white w-100 mt-4'>Alterar Foto</button>
                </div>
            </div> 
        </div>
    );
}

export default EditProfile;