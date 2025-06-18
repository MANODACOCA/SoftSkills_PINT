import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './Login.css';
import softskills from '../../../../assets/images/logos/semfundo3.png';
import { PiMicrosoftOutlookLogoBold } from "react-icons/pi";
import { login } from '../../../../api/utilizador_axios';
import { useUser } from '../../../../utils/userContext';


const providers = [
    { id: 'outlook', name: 'Outlook' },
    { id: 'credentials', name: 'Email and Password' },
];

const FirstLogin = () => {

    const { refreshUser } = useUser();

    const navigate = useNavigate();


    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        const email = queryParams.get('email');
        const password = queryParams.get('password_util');

        if (email && password) {
            setEmail(email);
            setPassword(password);

            const autoLogin = async () => {

                const response = await login(email, password);
                if (response.success) {
                    navigate('/login/nova-password', {
                        state: {
                            email,
                        }
                    });
                }
            };

            autoLogin();
        }
    }, [queryParams]);

    const handleProviderSignIn = async (provider) => {
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


            try {
                const response_login = await login(email, password);
                console.log(response_login);
                if (response_login.success) {
                    if (response_login.jaAtivou && !response_login.twoFa) {
                        localStorage.setItem('token', response_login.token);
                        await refreshUser();
                        navigate('/home');
                    } else if (response_login.jaAtivou && response_login.twoFa) {
                        navigate('/login/verificacao-identidade', {
                            state: {
                                email,
                                response_login,
                                redirectTo: '/home'
                            }
                        });
                    } else {
                        navigate('/login/nova-password', {
                            state: {
                                email,
                            }
                        });
                    }
                }


            } catch (error) {
                if (error.response?.status === 401) {
                    const field = error.response.data?.field;

                    if (field === 'email') {
                        setError('Email inserido é inválido. Por favor digite outro email!');
                    } else if (field === 'password') {
                        setError('Password inserida é inválida. Por favor digite outra password!');
                    }
                } else {
                    setError('Erro ao efetuar login. Tente novamente mais tarde.');
                }
            }
        } else {//SSO
            setTimeout(() => {
                console.log(`Signing in with ${provider.name}`);
                navigate('/home');
            },);
        }

    };

    return (
        <div className="login-form-container">
            <img src={softskills} alt="SoftSkills Logo" className="login-logo" />
            <h2 className="login-title text-start">Entre na sua conta</h2>
            <p className="login-subtitle text-start">Invista no seu futuro, aprende com a SoftSkills!</p>

            {/*             <div className="login-buttons">
                {providers.map((provider) =>
                    provider.id !== 'credentials' ? (
                        <button
                            key={provider.id}
                            className="login-button social outlook"
                            onClick={() => handleProviderSignIn(provider)}
                        >
                            <PiMicrosoftOutlookLogoBold />  Login com {provider.name}
                        </button>
                    ) : null
                )}
            </div>

            <div className="login-divider"><p>ou use o seu email</p></div> */}
            <form onSubmit={(e) => {
                e.preventDefault(); // Previne reload da página
                handleProviderSignIn({ id: 'credentials', name: 'Email and Password' });
            }}>
                <input
                    id='email'
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
                    <Link to="/login/esqueceu-password">Esqueceu-se da sua palavra-passe?</Link>
                    {error && <p className="login-error text-end">{error}</p>}
                </div>
                <div className="login-buttons">
                    <button
                        type="submit"
                        className="login-button primary"
                    >
                        Login
                    </button>
                </div>
            </form>
            <div className="login-buttons">
                <button
                    type="button"
                    onClick={() => navigate('/login/criar-conta')}
                    className="login-button social"
                >
                    Criar Nova Conta
                </button>
            </div>
        </div>
    );
};

export default FirstLogin;
