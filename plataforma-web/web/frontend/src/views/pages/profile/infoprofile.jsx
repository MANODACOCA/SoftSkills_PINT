import React, { useRef, useEffect, useState } from 'react';
import './profile.css';
import { useUser } from '../../../utils/userContext';
import { alterarPassword, update_utilizador } from '../../../api/utilizador_axios';

const InfoProfile = () => {
    const { user, setUser, roles, activeRole, setActiveRole } = useUser();
    const [is2FAEnabled, setIs2FAEnabled] = useState(user?.aunten2fat || false);
    const [novapassword, setNovapassword] = useState('');
    const [repNovapassword, setRepNovapassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    console.log(user)

    const handleChangeRole = (role) => {
        if (role !== activeRole) {
            setActiveRole(role);
        }
    };

    const handleActive2FA = async () => {
        const estadoNovo = !is2FAEnabled;
        setIs2FAEnabled(estadoNovo);
        try {
            const response = await update_utilizador(user.id_utilizador, { auten2fat: estadoNovo });
            setUser({ ...user, auten2fat: estadoNovo });
        } catch (error) {
            setIs2FAEnabled(!estadoNovo);
        }
    };

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


            
            await alterarPassword(user.email, novapassword);
            setNovapassword('');
            setRepNovapassword('');
            setSuccessMessage('A sua password foi alterada com sucesso!');
        } catch (error) {
            if (error.message === 'Essa é a sua password antiga! Tente outra.') {
                setError(error.message);
            } else {
                setError('Erro ao alterar a password.');
            }
        }

    };

    useEffect(() => {
        setIs2FAEnabled(user?.auten2fat || false);
    }, [user]);

    return (
        <div>
            {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}
            <div className="d-flex flex-wrap">
                <div className="d-flex align-items-center col-12 col-md-4 p-5 border-end bg-light">
                    <div className="w-100">
                        <h4 className="mb-3 text-center">Alterar Password</h4>
                        <small className="text-muted d-block mb-4 text-center">
                            Aqui podes alterar a tua palavra-passe por motivos de segurança ou preferência pessoal.
                        </small>
                        
                        <div className="mb-3">
                            <label htmlFor="novaPassword" className="form-label">Nova Password</label>
                            <input
                                type="password"
                                id="novaPassword"
                                placeholder="Nova palavra-passe"
                                value={novapassword}
                                onChange={(e) => setNovapassword(e.target.value)}
                                className="form-control"
                                autoComplete="new-password"
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="repitaPassword" className="form-label">Confirmar Nova Password</label>
                            <input
                                type="password"
                                id="repitaPassword"
                                placeholder="Repete a nova palavra-passe"
                                value={repNovapassword}
                                onChange={(e) => setRepNovapassword(e.target.value)}
                                className="form-control"
                                autoComplete="new-password"
                            />
                        </div>

                        {error && <p className="text-danger text-end mb-2">{error}</p>}

                        <div className="d-grid mt-4">
                            <button
                                className="btn btn-primary"
                                onClick={handleSubmitNewPassword}
                            >
                                Alterar Password
                            </button>
                        </div>
                    </div>
                </div>



                <div className="col-12 col-md-8 p-5">
                    <div className="mb-5">
                        <h4 className="mb-3">Tipo de Conta</h4>
                        <div className="btn-group mb-3">
                            {roles.map((role, index) => (
                                <button
                                    key={index}
                                    className={`btn ${activeRole === role ? 'btn-active' : 'btn-outline-custom'}`}
                                    onClick={() => handleChangeRole(role)}
                                >
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </button>
                            ))}
                        </div>
                        <small className="text-muted d-block">
                            Cada tipo de conta tem permissões específicas:
                            <br /><strong>Formando</strong>: Participa em cursos.
                            <br /><strong>Formador</strong>: Leciona e partilha conhecimento.
                            <br /><strong>Gestor-Administrador</strong>: Acesso total à plataforma.
                        </small>
                    </div>

                    <hr />

                    <div className="mb-5">
                        <h4 className="mb-3">Segurança</h4>
                        <div className="form-check form-switch d-flex align-items-center mb-2">
                            <input className="form-check-input me-3" type="checkbox" role="switch" id="2faSwitch" checked={is2FAEnabled} onChange={handleActive2FA} />
                            <label className="form-check-label" htmlFor="2faSwitch">
                                Autenticação Dois Fatores
                            </label>
                        </div>
                        <small className="text-muted">
                            A autenticação dois fatores (2FA) adiciona uma camada extra de segurança à tua conta: além da palavra-passe, será necessário introduzir um código de verificação enviado para o teu email para concluir o login.
                        </small>
                    </div>

                    <hr />

                    <div className="mb-3 d-flex align-items-center justify-content-between">
                        <h4 className="m-0">Queres ser Formador?</h4>
                        <button className="btn btn-primary">Pedir Evolução</button>
                    </div>
                    <small className="text-muted">
                        Se queres lecionar cursos, clica para solicitar a evolução da tua conta para Formador.
                    </small>
                </div>
            </div>
        </div>
    );
}

export default InfoProfile;