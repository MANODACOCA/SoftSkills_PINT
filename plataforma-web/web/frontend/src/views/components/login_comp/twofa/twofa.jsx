import React, { useEffect, useState, useRef } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import '../login/Login.css';
import './twofa.css';
import softskills from '../../../../assets/images/logos/semfundo3.png';

import { verificarCodigo, resendCodigo } from '../../../../api/utilizador_axios';
import { useUser } from '../../../../utils/useUser';

const TwoFA = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { refreshUser } = useUser();


    const redirectTo = location.state?.redirectTo || '/home';
    const email = location.state?.email || '';
    const response_login = location.state?.response_login || '';

    const inputRefs = useRef([]);
    const [error, setError] = useState('');
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(60);//1min para colocar o código
    const [loading, setLoading] = useState(false);

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (/^[0-9]?$/.test(value)) {
            const code = [...verificationCode];
            code[index] = value;
            setVerificationCode(code);
            if (value && index < 4) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };


    const handleSubmitTwoFA = async () => {

        setError('');
        const codigo = verificationCode.join('');
        if (!codigo) {
            setError('Por favor, insira no campo acima o código que foi enviado para o seu e-mail.');
            return;
        }
        try {
            await verificarCodigo(email, codigo);
            localStorage.setItem('token', response_login.token);
            if (redirectTo === '/home') await refreshUser();
            console.log('TwoFA feita com sucesso.');
            navigate(redirectTo, {
                state: {
                    email,
                }
            });
        } catch (error) {
            console.error('Erro ao verificar código:', error);
            setError('Código inválido ou expirado. Por favor, tente novamente.');
        }
    };

    const handleResendCode = async () => {
        setError('');
        setLoading(true);
        try {
            await resendCodigo(email);
            setTimeLeft(60);
        } catch (error) {
            console.error('Erro ao reenviar código:', error);
            setError('Erro ao enviar código de autenticação. Por favor tente mais tarde!');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [timeLeft]);

    return (
        <div className="login-form-container">
            <Link to="/"><img src={softskills} alt="SoftSkills Logo" className="login-logo" /></Link>
            <h2 className="login-title text-start">Vericação de identidade</h2>
            <p className="login-subtitle text-start">Digite o código de 5 dígitos que você recebeu por e-mail para prosseguir.</p>
            <form onSubmit={(e) => {
                e.preventDefault(); // Previne reload da página
                handleSubmitTwoFA;
            }}>
                <div className='otp-container my-5'>
                    {verificationCode.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            className='otp-input'
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            ref={(el) => (inputRefs.current[index] = el)}
                        />
                    ))}
                </div>

                {error && <p className="login-error text-end">{error}</p>}
                <p className="countdown-timer text-center">
                    {timeLeft > 0
                        ? `Tempo restante: ${timeLeft} segundos`
                        : 'O seu código expirou.'}
                </p>

                <div className="login-buttons">
                    {timeLeft != 0 && (
                        <button
                            type='submit'
                            className="login-button primary"
                            onClick={handleSubmitTwoFA}
                        >
                            Seguite
                        </button>
                    )}
                    {timeLeft === 0 && (
                        <button onClick={handleResendCode} className="login-button social mt-2" disabled={loading}>
                            Reenviar código
                            {loading && (<Spinner size='sm' className='ms-2' />)}
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default TwoFA;