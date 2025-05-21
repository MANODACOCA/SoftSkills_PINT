import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../login/Login.css';
import softskills from '../../../../assets/images/logos/semfundo3.png';


const NewPassword = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const redirectTo = location.state?.redirectTo || '/login';

    const [error, setError] = useState('');
    const [novapassword, setNovapassword] = useState('');
    const [repNovapassword, setRepNovapassword] = useState('');

    const handleSubmitNewPassword = () => {
        setError('');

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

        console.log('Nova password defenida com sucesso.');
        navigate(redirectTo);
    };

    return (
        <div className="login-form-container">
            <img src={softskills} alt="SoftSkills Logo" className="login-logo" />
            <h2 className="login-title text-start">Nova password</h2>
            <p className="login-subtitle text-start">Defina uma nova password para sua conta para que possa fazer login e aceder a todos os recursos.</p>
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
                    className="login-button primary"
                    onClick={handleSubmitNewPassword}
                >
                    Seguinte
                </button>
            </div>
        </div>
    );
};

export default NewPassword;