import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../login/Login.css';
import softskills from '../../../../assets/images/logos/semfundo3.png';

const CreateAccount = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleProviderSignIn = (provider) => {
        setError('');

        if (provider.id === 'credentials') {
            if (!email || !password) {
                if (!email && !password) {
                    setError('O e-mail e a password são campos obrigatórios.');
                } else if (!email) {
                    setError('Por favor, preencha o campo de e-mail.');
                } else {
                    setError('Por favor, preencha o campo da password.');
                }
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError('Por favor, insira um email válido.');
                return;
            }

            setTimeout(() => {
                console.log(`Signing in with Email: ${email}`);
                navigate('/login/new-password');
            }, 500);
        } else {//SSO
            setTimeout(() => {
                console.log(`Signing in with ${provider.name}`);
                navigate('/home');
            }, 500);
        }

    };

    return (
        <div className="login-form-container">
            <img src={softskills} alt="SoftSkills Logo" className="login-logo" />
            <h2 className="login-title text-start">Criar nova conta</h2>
            <p className="login-subtitle text-start">Preencha os campos abaixo para criar uma nova conta.</p>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
            />

            <input
                type="password"
                placeholder="Palavra-passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
            />

            <div className="login-forgot d-flex justify-content-between text-start">
                {error && <p className="login-error text-end">{error}</p>}
            </div>
            <div className="login-buttons">
                <button
                    type="button"
                    className="login-button primary"
                    onClick={() =>
                        handleProviderSignIn({ id: 'credentials', name: 'Email and Password' })
                    }
                >
                    Seguinte
                </button>
            </div>
        </div>
    );
};

export default CreateAccount;
