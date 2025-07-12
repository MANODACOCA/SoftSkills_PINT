import React, { useState } from 'react';
import { useNavigate, Link, redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../login/Login.css';
import softskills from '../../../../assets/images/logos/semfundo3.png';

import { esqueceuPassword } from '../../../../api/utilizador_axios';

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    const handleProviderSignIn = async () => {
        setError('');

        if (!email) {
            setError('O e-mail é campo obrigatório.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor, insira um email válido.');
            return;
        }

        const result = await Swal.fire({
            text: `Tem a certeza de que o e-mail "${email}" está correto?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, enviar e-mail',
            cancelButtonText: 'Cancelar'
        });

        if (!result.isConfirmed) return;

        try {
            await esqueceuPassword(email);

            Swal.fire({
                title: 'E-mail enviado!',
                text: 'Receberá brevemente um e-mail com os seus dados de acesso.',
                icon: 'success',
                timer: 3000,
                showConfirmButton: false
            });

            setTimeout(() => {
                navigate('/login/verificacao-identidade', {
                    state: {
                        email,
                        redirectTo: '/login/nova-password'
                    }
                });
            }, 500);

        } catch (err) {
            Swal.fire({
                title: 'Erro!',
                text: err?.response?.data?.message || 'Erro ao enviar o código. Tente novamente.',
                icon: 'error',
                timer: 3000,
                showConfirmButton: false
            });
        }


    };

    return (
        <div className="login-form-container">
            <Link to="/"><img src={softskills} alt="SoftSkills Logo" className="login-logo" /></Link>
            <h2 className="login-title text-start">Esqueceu-se da sua palavra-passe?</h2>
            <p className="login-subtitle text-start">Digite aqui o seu email para receber um código para verificação de entidade</p>
            <form onSubmit={(e) => {
                e.preventDefault(); // Previne reload da página
                handleProviderSignIn();
            }}>
                <input
                    id='email'
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                />

                {error && <p className="login-error text-end">{error}</p>}

                <div className="login-buttons">
                    <button
                        type="button"
                        className="login-button primary"
                        onClick={() =>
                            handleProviderSignIn()
                        }
                    >
                        Seguinte
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
