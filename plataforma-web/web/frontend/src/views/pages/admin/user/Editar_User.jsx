import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import Select from 'react-select';
import Flags from 'react-world-flags';
import { countries } from 'countries-list';
import { FaLock } from 'react-icons/fa';

import { update_utilizador, alterarImgPerfil } from '../../../../api/utilizador_axios';
import { useUser } from '../../../../utils/userContext';

const EditUser = () => {
    const API_URL = 'https://softskills-api.onrender.com/';
    const { user, setUser } = useUser();
    const [successMessage, setSuccessMessage] = useState('');
    const [error, setError] = useState('');
    const [genero, setGenero] = useState('0');
    const [formData, setFormData] = useState({
        nome_utilizador: '',
        email: '',
        telemovel: '',
        data_nasc: '',
        pais: '',
        genero: '0',
        morada: '',
        img_perfil: ''
    });
    const [initialFormData, setInitialFormData] = useState(null);


    useEffect(() => {
        window.scrollTo(0, 0);
        if (user) {

            const userData = ({
                nome_utilizador: user.nome_utilizador ?? '',
                email: user.email ?? '',
                telemovel: user.telemovel ?? '',
                data_nasc: user.data_nasc?.split('T')[0] ?? '',
                pais: user.pais ?? '',
                genero: user.genero?.toString() ?? '0',
                morada: user.morada ?? '',
                img_perfil: user.img_perfil ?? ''
            });
            setFormData(userData);
            setInitialFormData(userData);
            setGenero(userData.genero);
        }
    }, [user]);

    const ifFormChanged = () => {
        if (!initialFormData) return false;
        return Object.keys(formData).some(key => formData[key] !== initialFormData[key]);
    }

    const countryOptions = Object.entries(countries)//vai buscar os paises e as suas bandeiras
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


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError('');
        setSuccessMessage('');
        if (name === "genero") setGenero(value);
    };


    const handleCountryChange = (selectedOption) => {
        setFormData(prev => ({
            ...prev,
            pais: selectedOption ? selectedOption.value : ''
        }));
        setError('');
        setSuccessMessage('');
    };


    const renderGeneroLabel = (value) => {
        switch (value) {
            case '1': return 'Masculino';
            case '2': return 'Feminino';
            default: return 'Não definido';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const cleanedFormData = {//caso venha com campos vazios o formulário
            ...formData,
            pais: formData.pais?.trim() === '' ? null : formData.pais,//pais nao preenchido
            morada: formData.morada?.trim() === '' ? null : formData.morada,//morada nao preenchida
            telemovel: formData.telemovel?.toString().trim() === '' ? null : parseInt(formData.telemovel),//telemovel nao preenchido
            data_nasc: formData.data_nasc?.trim() === '' ? null : formData.data_nasc //data de nascimento nao preenchida
        };

        if (cleanedFormData.data_nasc) {
            const hoje = new Date();
            const dataNascimento = new Date(cleanedFormData.data_nasc);
            let idade = hoje.getFullYear() - dataNascimento.getFullYear();
            const mes = hoje.getMonth() - dataNascimento.getMonth();
            if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
                idade--;
            }

            if (idade < 18) {
                setError("Tem de ter pelo menos 18 anos de idade.");
                return;
            }
        }

        if (cleanedFormData.telemovel !== null && !/^\d{9}$/.test(cleanedFormData.telemovel.toString())) {
            setError("O número de telemóvel deve ter 9 dígitos numéricos.");
            return;
        }
        try {
            Swal.fire({
                title: "Tens a certeza que queres guardar as alterações?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Guardar",
                denyButtonText: `Não Guardar`,
                cancelButtonText: `Cancelar`,
                customClass: {
                    confirmButton: 'btn btn-success me-2',
                    denyButton: 'btn btn-danger',
                    cancelButton: 'btn btn-secondary',
                },
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await update_utilizador(user.id_utilizador, cleanedFormData);
                    Swal.fire({
                        text: "Alterações guardadas com sucesso!",
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false
                    });
                    setSuccessMessage('Perfil atualizado com sucesso!');
                    setInitialFormData(cleanedFormData);
                    setUser(prev => ({ ...prev, ...cleanedFormData }));
                } else if (result.isDenied) {
                    Swal.fire({
                        text: "Alterações não guardadas!",
                        icon: "info",
                        timer: 3000,
                        showConfirmButton: false
                    });
                    setFormData(initialFormData);
                }
            });

        } catch (error) {
            setError('Ocorreu um erro a atualizar o perfil. Por favor, tente mais tarde!');
        }
    };

    const handleSubmitProfilePhoto = async (e) => {
        e.preventDefault();
        try {
            const { value: file } = await Swal.fire({
                title: "Seleciona a tua imagem de perfil",
                input: "file",
                inputAttributes: {
                    "accept": "image/*",
                    "aria-label": "Upload da imagem de perfil"
                },
                showCancelButton: true,
                confirmButtonText: 'Pré-visualizar',
                cancelButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn btn-primary me-2',
                    cancelButton: 'btn btn-danger',
                },
            });
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    Swal.fire({
                        title: "Pré-vizualização",
                        text: 'É esta a imagem que pretende utilizar?',
                        imageUrl: e.target.result,
                        imageAlt: "Imagem de perfil",
                        showCancelButton: true,
                        confirmButtonText: 'Sim, alterar!',
                        cancelButtonText: 'Cancelar',
                        reverseButtons: true,
                        customClass: {
                            confirmButton: 'btn btn-success me-2',
                            cancelButton: 'btn btn-danger',
                        },

                        willOpen: () => {
                            const img = document.querySelector('.swal2-image');
                            if (img) {
                                img.style.borderRadius = '50%';
                                img.style.width = '100%';
                                img.style.height = '100%';
                                img.style.objectFit = 'cover';
                                img.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
                            }
                        }

                    }).then(async (result) => {
                        if (result.isConfirmed) {

                            const result = await alterarImgPerfil(user.id_utilizador, file);
                            setFormData(prev => ({ ...prev, img_perfil: result.ficheiro }));
                            setUser(prev => ({ ...prev, img_perfil: result.ficheiro }));
                            setSuccessMessage('Foto de perfil atualizada com sucesso!');
                            Swal.fire({
                                text: "Alteração da imagem de perfil realizada com sucesso!",
                                icon: "success",
                                timer: 3000,
                                showConfirmButton: false
                            });
                        }
                    });
                };
                reader.readAsDataURL(file);
            }
        } catch (error) {
            setError('Ocorreu um erro a atualizar a foto de perfil. Por favor, tente mais tarde!');
        }
    }

    const selectedCountry = countryOptions.find(c => c.value === formData.pais) || null;

    return (
        <div className='form-group'>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <div className='d-flex justify-content-between'>
                    <div className='col-md-9 pe-4 col-sm-10'>
                        <div className='mt-2'>
                            <label htmlFor="nome" className='form-label'>Nome</label>
                            <input type="text" name="nome_utilizador" className='form-control' value={formData.nome_utilizador} onChange={handleChange} required />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="email" className='form-label'>Email</label>
                            <div className='position-relative'>
                                <input
                                    type="email"
                                    name="email"
                                    className='form-control ps-5'
                                    value={formData.email}
                                    onChange={handleChange}
                                    disabled
                                />
                                <FaLock
                                    style={{
                                        position: 'absolute',
                                        left: '12px',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        color: '#6c757d',
                                        pointerEvents: 'none'
                                    }}
                                />
                            </div>
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="telemovel" className='form-label'>Telemóvel <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                            <input type="tel" name="telemovel" className='form-control' value={formData.telemovel} onChange={handleChange} />
                        </div>
                        <div className='mt-2'>
                            <label htmlFor="dataNascimento" className='form-label'>Data nascimento <small className='text-secondary'>&#40;Opcional&#41;</small></label>
                            <input type="date" name="data_nasc" className='form-control' value={formData.data_nasc} onChange={handleChange} />
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
                        {ifFormChanged() && (
                            <button type="submit" className='btn btn-color text-white mt-3'>Submeter alterações</button>
                        )}
                    </div>

                    <div className='col-md-3 col-sm-2 bg-custom-light d-flex align-items-center flex-column h-100 p-3 rounded'>
                        {user && (
                            <img
                                src={`${API_URL}${user.img_perfil}`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nome_utilizador)}&background=random&bold=true`;
                                }}
                                alt="Imagem de perfil"
                                className='w-100 img-profile rounded-2'
                            />
                        )}
                        <div className='d-flex flex-column align-items-center'>
                            <h5 className='m-1'>{formData.nome_utilizador || 'Nome'}</h5>
                            <small>{formData.email}</small>
                            <small className="text-muted mt-1">{renderGeneroLabel(genero)}</small>
                        </div>
                        <button onClick={handleSubmitProfilePhoto} type="button" className='btn btn-color text-white w-100 mt-4'>Alterar Foto</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditUser;
