import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../login/Login.css';
import softskills from '../../../../assets/images/logos/semfundo3.png';
import Swal from 'sweetalert2';

const CreateAccount = () => {
    const navigate = useNavigate();

    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [nome_util, setNome_util] = useState('');

    const handleProviderSignIn = (provider) => {
        setError('');

        if (provider.id === 'credentials') {
            if (!email && !nome_util) {
                if (!nome_util) {
                    setError('O nome de utilizador é campo obrigatório.');
                }
                else{
                    setError('O e-mail é campo obrigatório.');
                }
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setError('Por favor, insira um email válido.');
                return;
            }

            if (!email.toLowerCase().endsWith('@pt.softinsa.com')) {
                setError('O e-mail que inseriu não é válido. Por favor, insira o seu e-mail profissional (@pt.softinsa.com).');
                return;
            }


            Swal.fire({
                text: `Tem a certeza de que o e-mail "${email}" está correto?`,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sim, enviar e-mail",
                cancelButtonText: "Cancelar"
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: "E-mail enviado!",
                        text: "Receberá brevemente um e-mail com os seus dados de acesso.",
                        icon: "success",
                        timer: 3000,
                        showConfirmButton: false
                    });

                    // Aqui podes colocar a navegação ou chamada real
                    setTimeout(() => {
                        console.log(`Signing in with Email: ${email}`);
                        navigate('/login');
                    }, 500);
                }
            });
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
            <p className="login-subtitle text-start">Preencha os 2 campos obrigatórios abaixo. Vai receber um e-mail com os seus dados de login.</p>

            <input
                id='nome_util'
                type="nome_util"
                placeholder="Nome de utilizador"
                value={nome_util}
                onChange={(e) => setNome_util(e.target.value)}
                className="login-input"
            />

            <input
                id='email'
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
