// src/components/FirstLogin.jsx
import React, { useState } from 'react';
import './firstLogin.css';
import softskills from '../../../../assets/images/logos/semfundo3.png';

const providers = [
    { id: 'outlook', name: 'Outlook' },
    { id: 'credentials', name: 'Email and Password' },
];

const FirstLogin = () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleProviderSignIn = (provider) => {
        setError('');

        setTimeout(() => {
            if (provider.id === 'credentials') {
                if (!email || !password) {
                    if (!email && !password) {
                        setError('O e-mail e a password são obrigatórios.');
                    } else if (!email) {
                        setError('Por favor, preencha o e-mail.');
                    } else {
                        setError('Por favor, preencha a password.');
                    }
                    return;
                }
                console.log(`Signing in with Email: ${email}`);
            } else {
                console.log(`Signing in with ${provider.name}`);
            }
        }, 500);
    };

    return (
        <div className="login-form-container">
            <img src={softskills} alt="SoftSkills Logo" className="login-logo" />
            <h2 className="login-title text-start">Entre na sua conta</h2>
            <p className="login-subtitle text-start">Invista no seu futuro, aprende com a SoftSkills!</p>

            <div className="login-buttons">
                {providers.map((provider) =>
                    provider.id !== 'credentials' ? (
                        <button
                            key={provider.id}
                            className="login-button social"
                            onClick={() => handleProviderSignIn(provider)}
                        >
                            Login com {provider.name}
                        </button>
                    ) : null
                )}
            </div>

            <div className="login-divider">ou use o seu email</div>

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

            <div className="login-forgot">
                <a href="#">Esqueceu-se da sua password?</a>
            </div>
            <div className="login-buttons">
                <button
                    className="login-button primary"
                    onClick={() =>
                        handleProviderSignIn({ id: 'credentials', name: 'Email and Password' })
                    }
                >
                    Login
                </button>
                     <button
                    className="login-button social"
                >
                    Criar Nova Conta
                </button>
            </div>


            {error && <p className="login-error text-end">{error}</p>}
        </div>
    );
};

export default FirstLogin;
