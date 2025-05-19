import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../login/Login.css';
import softskills from '../../../../assets/images/logos/semfundo3.png';
import { PiMicrosoftOutlookLogoBold } from "react-icons/pi";

const ForgotPassword = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');

    const handleProviderSignIn = () => {
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

            setTimeout(() => {
                navigate('/login/verificacao-identidade');
            }, 500);
    };

    return (
        <div className="login-form-container">
            <img src={softskills} alt="SoftSkills Logo" className="login-logo" />
            <h2 className="login-title text-start">Esqueceu-se da sua palavra-passe?</h2>
            <p className="login-subtitle text-start">Digite aqui o seu email para receber onde vai receber um codigo</p>

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
        </div>
    );
};

export default ForgotPassword;
