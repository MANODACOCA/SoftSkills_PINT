import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../login/Login.css';
import softskills from '../../../../assets/images/logos/semfundo3.png';

import { alterarPassword } from '../../../../api/utilizador_axios';


const NewPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || '';

    const [error, setError] = useState('');
    const [novapassword, setNovapassword] = useState('');
    const [repNovapassword, setRepNovapassword] = useState('');

    const handleSubmitNewPassword = async () => {
        setError('');
        try {
            if (novapassword && repNovapassword) {
                if (novapassword !== repNovapassword) {
                    setError('As palavras-passe não coincidem.');
                    return;
                }
                if (novapassword.length < 8 || novapassword.length > 16) {
                    setError('A palavra-passe deve conter 8 e 16 caracteres.');
                    return;
                }
            } else {
                setError('Preencha ambos os campos com a sua nova palavra-passe.');
                return;
            }

            const response = await alterarPassword(email, novapassword);
            if (response) {
                navigate('/login');
            }
        } catch (error) {
            if (error.message === 'Essa é a sua password antiga! Tente outra.') {
                setError(error.message);
            } else {
                setError('Erro ao alterar a password.');
            }
        }
    };

    return (
        <div className="login-form-container">
            <Link to="/"><img src={softskills} alt="SoftSkills Logo" className="login-logo" /></Link>
            <h2 className="login-title text-start">Nova password</h2>
            <p className="login-subtitle text-start">Defina uma nova password para sua conta para que possa fazer login e aceder a todos os recursos.</p>
            <form onSubmit={(e) => {
                e.preventDefault(); // Previne reload da página
                handleSubmitNewPassword();
            }}>
                <input
                    type="password"
                    placeholder="Nova palavra-passe"
                    value={novapassword}
                    onChange={(e) => setNovapassword(e.target.value)}
                    className="login-input"
                    autoComplete="new-password"
                />

                <input
                    type="password"
                    placeholder="Repita nova palavra-passe"
                    value={repNovapassword}
                    onChange={(e) => setRepNovapassword(e.target.value)}
                    className="login-input"
                    autoComplete="new-password"
                />
                {error && <p className="login-error text-end">{error}</p>}
                <div className="login-buttons">
                    <button
                        type='submit'
                        className="login-button primary"
                        onClick={handleSubmitNewPassword}
                    >
                        Seguinte
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewPassword;