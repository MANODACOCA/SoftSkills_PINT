import React, { useEffect, useState } from 'react';
import Select from 'react-select'; // Import React Select
import Flags from 'react-world-flags';
import { countries } from 'countries-list';
import './profile.css';

import { useUser } from '../../../utils/userContext';

const EditProfile = () => {
    const { user } = useUser();
    console.log(user);
    const countryOptions = Object.entries(countries)
        .map(([code, info]) => ({
            value: info.name,
            label: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Flags code={code} height="12" width="16" style={{ marginRight: '8px' }} />
                    {info.name}
                </div>
            ),
            code,
        }))
        .sort((a, b) => a.value.localeCompare(b.value));


    const [genero, setGenero] = useState('0');
    const [utilizador, setUtilizador] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telemovel: '',
        dataNascimento: '',
        pais: '',
        genero: '0',
        morada: '',
        img_perfil: ''
    });

    useEffect(() => {
        if (user) {
            setUtilizador(user);
            setFormData({
                nome: user.nome_utilizador || '',
                email: user.email || '',
                telemovel: user.telemovel || '',
                dataNascimento: user.data_nasc?.split('T')[0] || '',
                pais: user.pais || '',
                genero: user.genero?.toString() || '0',
                morada: user.morada || '',
                img_perfil: user.img_perfil || ''
            });
            setGenero(user.genero?.toString() || '0');
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === "genero") setGenero(value);
    };

    const handleCountryChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            pais: selectedOption ? selectedOption.value : ''
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submeter alterações:", formData);
    };

    const renderGeneroLabel = (value) => {
        switch (value) {
            case '1': return 'Masculino';
            case '2': return 'Feminino';
            default: return 'Não definido';
        }
    };

    const selectedCountry = countryOptions.find(c => c.value === formData.pais) || null;

    return (
        <div className='form-group'>
            <form onSubmit={handleSubmit}>
                <div className='d-flex justify-content-between'>
                    <div className='col-md-9 pe-4 col-sm-10'>
                        <div>
                            <label htmlFor="nome" className='form-label'>Nome</label>
                            <input type="text" name="nome" className='form-control' value={formData.nome} onChange={handleChange} required />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="email" className='form-label'>Email</label>
                            <input type="email" name="email" className='form-control' value={formData.email} onChange={handleChange} required />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="telemovel" className='form-label'>Telemóvel <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                            <input type="tel" name="telemovel" className='form-control' value={formData.telemovel} onChange={handleChange} />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="dataNascimento" className='form-label'>Data nascimento <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                            <input type="date" name="dataNascimento" className='form-control' value={formData.dataNascimento} onChange={handleChange} />
                        </div>
                        <div className='d-flex w-100 gap-4 mt-2'>
                            <div className='w-50'>
                                <label htmlFor="pais" className='form-label'>País <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                                <Select
                                    options={countryOptions}
                                    value={selectedCountry}
                                    onChange={handleCountryChange}
                                    isClearable
                                    placeholder="--Escolha o país--"
                                    name="pais"
                                />
                            </div>
                            <div className='w-50'>
                                <label htmlFor="genero" className='form-label'>Género <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                                <select name="genero" id="genero" className='form-select' value={genero} onChange={handleChange}>
                                    <option value="0">--Não definido--</option>
                                    <option value="1">Masculino</option>
                                    <option value="2">Feminino</option>
                                </select>
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="morada" className='form-label'>Morada <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                            <input type="text" name="morada" className='form-control' value={formData.morada} onChange={handleChange} />
                        </div>
                        <button type="submit" className='btn btn-color text-white mt-3'>Submeter alterações</button>
                    </div>

                    <div className='col-md-3 col-sm-2 bg-custom-light d-flex align-items-center flex-column h-100 p-3 rounded'>
                        <img
                            src={formData.img_perfil || `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.nome)}&background=random&bold=true`}
                            alt="Foto de perfil"
                            className='w-100 img-profile'
                        />
                        <div className='d-flex flex-column align-items-center'>
                            <h5 className='m-1'>{formData.nome || 'Nome'}</h5>
                            <p className='m-1'>Formando</p>
                            <small>{formData.email}</small>
                            <small className="text-muted mt-1">{renderGeneroLabel(genero)}</small>
                        </div>
                        <button type="button" className='btn btn-color text-white w-100 mt-4'>Alterar Foto</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditProfile;
