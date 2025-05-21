import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../login/Login.css';
import './twofa.css';
import softskills from '../../../../assets/images/logos/semfundo3.png';

function gerarCodigo5Digitos() {
    return Math.floor(10000 + Math.random() * 90000);
}


const TwoFA = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const redirectTo = location.state?.redirectTo || '/home';

    const inputRefs = useRef([]);
    const [error, setError] = useState('');
    const [codeTFA, setCodeTFA] = useState('');
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);


    useEffect(() => {
        const codeg = gerarCodigo5Digitos()
        setCodeTFA(codeg);
        localStorage.setItem('codeTFA', codeg);
    }, []);

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
        if(e.key === 'Backspace' && !verificationCode[index] && index > 0){
             inputRefs.current[index - 1].focus();
        }
    };


    const handleSubmitTwoFA = () => {

        setError('');
        const codeEntered = verificationCode.join(''); 
        if (codeEntered) {
            if (codeEntered != codeTFA) {
                setError('Código inserido não é o correto! Por favor tente novamente.');
                return;
            }
        } else {
            setError('Por favor, insira no campo acima o código que foi enviado para o seu e-mail.');
            return;
        }

        console.log('TwoFA feita com sucesso.');
        navigate(redirectTo);
    };

    return (
        <div className="login-form-container">
            <img src={softskills} alt="SoftSkills Logo" className="login-logo" />
            <h2 className="login-title text-start">Vericação de identidade</h2>
            <p className="login-subtitle text-start">Digite o código de 5 dígitos que você recebeu por e-mail para prosseguir.</p>

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

            <div className="login-buttons">
                <button
                    className="login-button primary"
                    onClick={handleSubmitTwoFA}
                >
                    Seguite
                </button>
            </div>
        </div>
    );
};

export default TwoFA;