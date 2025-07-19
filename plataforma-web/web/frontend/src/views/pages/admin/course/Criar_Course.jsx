import { useEffect, useState } from "react";
import { list_formadores } from "../../../../api/formadores_axios";
import { getCategoriaAreaTopico } from "../../../../api/topico_axios";
import { create_cursos } from "../../../../api/cursos_axios";
import ISO6391 from 'iso-639-1';
import Select from 'react-select';
import { useUser } from '../../../../utils/useUser';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const CreateCourse = () => {
    const navigate = useNavigate();
    const [formadores, setFormadores] = useState([]);
    const [formadorSelecionado, setFormadorSelecionado] = useState("");
    const [isSincrono, setIsSincrono] = useState("");
    const [categoria, setCategoria] = useState("");
    const [area, setArea] = useState("");
    const [topico, setTopico] = useState("");
    const [catAreaTop, setCatAreaTop] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [sincrono, setSincrono] = useState({
        id_formador: null,
        numero_vagas: null,
    });
    const { user } = useUser();

    const {state} = useLocation();
    const cursoAnterior = state?.cursoAnterior || null;

    const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Lisbon" });

    const [cursos, setCursos] = useState({
        nome_curso: "",
        id_gestor_administrador: user?.id_utilizador,
        id_topico: "",
        descricao_curso: "",
        data_inicio_inscricao: "",
        data_fim_inscricao: "",
        data_inicio_curso: "",
        data_fim_curso: "",
        idioma: "",
        horas_curso: "",
        imagem: "",
        issincrono: false,
        isassincrono: false,
        estado: true,
        contador_formandos: 0,
    });

    const fetchFormadores = async () => {
        try {
            const response = await list_formadores();
            console.log(response);
            setFormadores(response);
        } catch (error) {
            console.log('Erro ao ir buscar os formadores');
        }
    }

    const fetchCategoriaAreaTopico = async () => {
        try {
            const response = await getCategoriaAreaTopico();
            //console.log(response);
            setCatAreaTop(response);
        } catch (error) {
            console.log('Erro ao ir buscar os categoria, área e tópico');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const {
            data_inicio_inscricao,
            data_fim_inscricao,
            data_inicio_curso,
            data_fim_curso,
        } = cursos;

        const dToday = new Date(`${todayStr}T00:00:00`);
        const dInscIni = new Date(`${data_inicio_inscricao}T00:00:00`);
        const dInscFim = new Date(`${data_fim_inscricao}T00:00:00`);
        const dCursoIni = new Date(`${data_inicio_curso}T00:00:00`);
        const dCursoFim = new Date(`${data_fim_curso}T00:00:00`);

        if ([dInscIni, dInscFim, dCursoIni, dCursoFim].some((d) => d && d < dToday)) {
            Swal.fire({
                icon: "error",
                title: "Datas inválidas",
                text: "Nenhuma data pode ser anterior a hoje",
            });
            return;
        }

        if (dInscIni > dInscFim) {
            Swal.fire({
                icon: "error",
                title: "Datas inválidas",
                text: "A data de fim da inscrição deve ser posterior ao início",
            });
            return;
        }

        if (dCursoIni > dCursoFim) {
            Swal.fire({
                icon: "error",
                title: "Datas inválidas",
                text: "A data de fim do curso deve ser posterior ao início.",
            });
            return;
        }

        if (dCursoIni < dInscFim) {
            Swal.fire({
                icon: "error",
                title: "Datas inválidas",
                text: "O curso deve começar depois de terminar a inscrição",
            });
            return;
        }

        const result = await Swal.fire({
            title: cursoAnterior ? 'Pretende criar nova ocorrência deste curso?' : 'Pretende criar curso?',
            text: cursoAnterior ? 'Será criada uma nova ocorrência com base neste curso' : 'Irá adicionar um novo curso',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        if (result.isConfirmed) {
            try {
                console.log({ cursoData: cursos, sincrono: cursos.issincrono ? sincrono : null });
                const payload = {
                    cursoData: cursos,
                    sincrono: cursos.issincrono ? sincrono : null,
                };

                if (cursoAnterior) {
                    payload.id_curso_anterior = cursoAnterior.id_curso;
                }
                console.log('Payload a enviar:', { cursoData: cursos, sincrono: cursos.issincrono ? sincrono : null });
                await create_cursos(payload);
                //await create_cursos({ cursoData: cursos, sincrono: cursos.issincrono ? sincrono : null });
                Swal.fire({
                    title: 'Sucesso',
                    text: `Criado com sucesso`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                navigate('/admin/cursos');
            } catch (error) {
                Swal.fire({
                    title: 'Erro',
                    text: 'Erro ao cancelar operação',
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                    customClass: {
                        confirmButton: 'btn btn-danger',
                    },
                });
                console.log('Erro ao adicionar curso!');
            }
        }
    }

    const handleCancel = async () => {
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja cancelar?',
            text: 'Os curso não será criado',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        });

        if (result.isConfirmed) {
            try {
                navigate('/admin/cursos');
                Swal.fire({
                    title: 'Sucesso',
                    text: `Cancelado com sucesso`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire({
                    title: 'Erro',
                    text: 'Erro ao cancelar operação',
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                    customClass: {
                        confirmButton: 'btn btn-danger',
                    },
                });
                console.error("Erro ao cancelar criação de curso", error);
            }
        }
    }

    const languageOptions = ISO6391.getAllCodes().map(code => ({
        value: code,
        label: ISO6391.getNativeName(code),
    }));

    const handleLanguageChange = (selectedOption) => {
        setSelectedLanguage(selectedOption);
        setCursos(prev => ({ ...prev, idioma: selectedOption?.value || "" }));
    };


    const handleSubmitCursoImg = async (e) => {
        e.preventDefault();
        try {
            const { value: url } = await Swal.fire({
                title: "Insere o URL da imagem do curso",
                input: "url",
                inputLabel: "Link direto da imagem",
                inputPlaceholder: "https://exemplo.com/imagem.jpg",
                showCancelButton: true,
                confirmButtonText: 'Pré-visualizar',
                cancelButtonText: 'Cancelar',
                inputValidator: (value) => {
                    if (!value) return 'Tem de inserir um URL valido!';
                    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/.test(value))
                        return 'Insira um link de imagem válido (.jpg, .png, etc)';
                    return null;
                }
                // customClass: {
                //     confirmButton: 'btn btn-primary me-2',
                //     cancelButton: 'btn btn-danger',
                // },
            });
            if (url) {
                const preview = await Swal.fire({
                    title: "Pré-visualizar",
                    imageUrl: url,
                    imageAlt: "Imagem de curso",
                    showCancelButton: true,
                    confirmButtonText: 'Sim, utilizar',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true,
                });

                if (preview.isConfirmed) {
                    setCursos(prev => ({ ...prev, imagem: url }));
                    Swal.fire({
                        text: "Imagem definida com sucesso!",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            }
        } catch (error) {
            Swal.fire({
                text: 'Erro ao definir o URL da imagem',
                icon: 'error'
            });
        }
    }

    const prepararCursoAnterior = () => {
        if (!cursoAnterior || !user) return;

        const cursoPreparado = {
            nome_curso: cursoAnterior.nome_curso || "",
            descricao_curso: cursoAnterior.descricao_curso || "",
            imagem: cursoAnterior.imagem || "",
            idioma: cursoAnterior.idioma || "",
            horas_curso: cursoAnterior.horas_curso || "",
            id_gestor_administrador: user.id_utilizador,
            issincrono: cursoAnterior.issincrono || false,
            isassincrono: cursoAnterior.isassincrono || false,
            estado: true,
            contador_formandos: 0,
            data_inicio_inscricao: "",
            data_fim_inscricao: "",
            data_inicio_curso: "",
            data_fim_curso: "",
            id_topico: cursoAnterior.id_topico_topico?.id_topico || "",
        };

        setCursos(cursoPreparado);
        setTopico(cursoAnterior.id_topico_topico?.id_topico?.toString() || "");
        setArea(cursoAnterior.id_topico_topico?.id_area_area?.id_area?.toString() || "");
        setCategoria(cursoAnterior.id_topico_topico?.id_area_area?.id_categoria_categorium?.id_catego?.toString() || "");

        const defaultLang = ISO6391.getAllCodes().find(code => code === cursoAnterior.idioma);
        if (defaultLang) {
            setSelectedLanguage({ value: defaultLang, label: ISO6391.getNativeName(defaultLang) });
        }

        setIsSincrono(cursoAnterior.issincrono ? "true" : "false");

        if (cursoAnterior.issincrono && cursoAnterior.sincrono) {
            const formador = cursoAnterior.sincrono.id_formador_formadore;
            setSincrono({
                id_formador: formador?.id_formador || null,
                numero_vagas: cursoAnterior.sincrono.numero_vagas || null,
            });
            setFormadorSelecionado(formador?.id_formador?.toString() || "");
        }
    };

    useEffect(() => {
        if (user) {
            fetchFormadores();
            fetchCategoriaAreaTopico();
        }
    }, [user])

    useEffect(() => {
        if(cursoAnterior && user && catAreaTop.length > 0){
            //console.log(cursoAnterior);
            prepararCursoAnterior();
            console.log(cursoAnterior);
        }
    }, [cursoAnterior, user, catAreaTop]);

    return (
        <div className='form-group'>
            <div className='d-flex'>
                <div className='col-md-9 pe-4 col-sm-10'>
                    <form onSubmit={handleSubmit}>
                        <div className='mx-5'>
                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Nome do Curso</label>
                                <input type="text" name="nome_curso" className='form-control' placeholder="Nome do curso..." value={cursos.nome_curso} onChange={(e) => setCursos(prev => ({ ...prev, nome_curso: e.target.value }))} required />
                            </div>

                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Descrição do Curso</label>
                                <textarea name="descricao_curso" className='form-control' rows="4" placeholder="Descrição do curso..." value={cursos.descricao_curso} onChange={(e) => setCursos(prev => ({ ...prev, descricao_curso: e.target.value }))} required />
                            </div>

                            <div className='row mt-2'>
                                <div className='col'>
                                    <label className='form-label fw-bold'>Início da Inscrição</label>
                                    <input type="date" name="data_insc_ini" className='form-control' min={todayStr} value={cursos.data_inicio_inscricao} onChange={(e) => setCursos(prev => ({ ...prev, data_inicio_inscricao: e.target.value }))} required />
                                </div>
                                <div className='col'>
                                    <label className='form-label fw-bold'>Fim da Inscrição</label>
                                    <input type="date" name="data_insc_fim" className='form-control' min={cursos.data_inicio_inscricao || todayStr} value={cursos.data_fim_inscricao} onChange={(e) => setCursos(prev => ({ ...prev, data_fim_inscricao: e.target.value }))} required />
                                </div>
                            </div>

                            <div className='row mt-2'>
                                <div className='col'>
                                    <label className='form-label fw-bold'>Início do Curso</label>
                                    <input type="date" name="data_curso_ini" className='form-control' min={cursos.data_fim_inscricao || todayStr} value={cursos.data_inicio_curso} onChange={(e) => setCursos(prev => ({ ...prev, data_inicio_curso: e.target.value }))} required />
                                </div>
                                <div className='col'>
                                    <label className='form-label fw-bold'>Fim do Curso</label>
                                    <input type="date" name="data_curso_fim" className='form-control' min={cursos.data_inicio_curso || todayStr} value={cursos.data_fim_curso} onChange={(e) => setCursos(prev => ({ ...prev, data_fim_curso: e.target.value }))} required />
                                </div>
                            </div>

                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Idioma</label>
                                <Select
                                    options={languageOptions}
                                    value={selectedLanguage}
                                    onChange={handleLanguageChange}
                                    isClearable
                                    placeholder="--Escolha o idioma--"
                                    name="idioma"
                                />
                            </div>

                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Horas do Curso</label>
                                <input type="number" step="0.5" min="0.5" name="horas_curso" className='form-control' placeholder="Horas do curso..." value={cursos.horas_curso || ""} onChange={(e) => setCursos(prev => ({ ...prev, horas_curso: parseInt(e.target.value) }))} required />
                            </div>

                            <div className='mt-2'>
                                <label className='form-label fw-bold' >Tipologia</label>
                                <select className='form-select' value={isSincrono} onChange={(e) => { const valorBoolean = e.target.value === "true"; setIsSincrono(e.target.value); setCursos(prev => ({ ...prev, issincrono: valorBoolean, isassincrono: !valorBoolean })); }}>
                                    <option value="">-- Escolher Tipologia --</option>
                                    <option value="true">Síncrono</option>
                                    <option value="false">Assíncrono</option>
                                </select>
                            </div>

                            {cursos.isassincrono == false && (
                                <div className='mt-2'>
                                    <label className='mt-2 fw-bold'>Formador</label>
                                    <select name="id_formador" className='form-select' value={formadorSelecionado} onChange={(e) => { setFormadorSelecionado(parseInt(e.target.value)); setSincrono(prev => ({ ...prev, id_formador: parseInt(e.target.value) })) }}>
                                        <option value="">-- Selecionar Formador --</option>
                                        {formadores.map((f) => {
                                            return (
                                                <option key={f.id_formador} value={f.id_formador}>{f.id_formador_utilizador.nome_utilizador}</option>
                                            );
                                        })}
                                    </select>
                                    <label className='mt-2 fw-bold'>Descrição Formador</label>
                                    <textarea name="descricao_formador" value={formadores.find((f) => f.id_formador.toString() == formadorSelecionado)?.descricao_formador} className='form-control mt-2' placeholder="Descrição do Formador..." readOnly />
                                    <label className='mt-2 fw-bold'>Número Vagas</label>
                                    <input type="number" name="numero_vagas" className='form-control mt-2' min="0" placeholder="Número de Vagas..." value={sincrono.numero_vagas} onChange={(e) => setSincrono(prev => ({ ...prev, numero_vagas: parseInt(e.target.value) }))} />
                                </div>
                            )}

                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Categoria</label>
                                <select className="form-select" value={categoria.toString()} onChange={(e) => setCategoria(e.target.value)}>
                                    <option value="">--Escolher Categoria--</option>
                                    {catAreaTop.map((c) => {
                                        return (
                                            <option key={c?.id_categoria} value={c?.id_categoria}>{c?.nome_cat}</option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Área</label>
                                <select className="form-select" value={area.toString()} onChange={(e) => setArea(e.target.value)}>
                                    <option value="">--Escolher Área--</option>
                                    {catAreaTop.find((cat) => cat.id_categoria.toString() == categoria)?.areas?.map((a) => {
                                        return (
                                            <option key={a?.id_area} value={a?.id_area}>{a?.nome_area}</option>
                                        );
                                    })}
                                </select>
                            </div>

                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Tópico</label>
                                <select className="form-select" value={topico.toString()}
                                 onChange={(e) => {
                                    const value = e.target.value;
                                    setTopico(value);
                                    setCursos(prev => ({ ...prev, id_topico: value ? parseInt(value) : "" }));
                                }}
                                >
                                {/*  onChange={(e) => { setTopico(parseInt(e.target.value)); setCursos(prev => ({ ...prev, id_topico: parseInt(e.target.value) })); }}> */}
                                    <option value="">--Escolher Tópico--</option>
                                    {catAreaTop.find((cat) => cat.id_categoria.toString() == categoria)?.areas?.find((ar) => ar.id_area.toString() == area)?.topicos?.map((t) => {
                                        return (
                                            <option key={t?.id_topico} value={t?.id_topico}>{t?.nome_topico}</option>
                                        );
                                    })}
                                </select>
                            </div>
                            <div className="d-flex justify-content-between">
                                <button type="submit" className='btn btn-success mt-3'>{cursoAnterior ? 'Criar Ocorrência' : 'Criar Curso'}</button>
                                <button type="button" className='btn btn-danger mt-3' onClick={handleCancel}>Cancelar Curso</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='d-flex min-vh-100 flex-column mt-3'>
                    <div className='sticky-card'>
                        <div className='col-md-3 col-sm-2 bg-custom-light d-flex align-items-center flex-column h-100 w-100 p-3 rounded'>
                            <img
                                src={cursos?.imagem || "https://ui-avatars.com/api/?name=Novo+Curso&background=random&bold=true"}
                                alt="Imagem de perfil"
                                className='w-100 img-profile rounded-2 mb-2'
                            />
                            <div className='d-flex flex-column align-items-center'>
                                <h5 className='m-1 mb-3'>{cursos?.nome_curso || 'Novo Curso'}</h5>
                            </div>
                            <button type="button" onClick={handleSubmitCursoImg} className='btn btn-color text-white w-100 mt-4'>Adicionar Imagem</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateCourse;