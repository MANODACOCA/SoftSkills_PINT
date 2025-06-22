import MaterialForm from '../../../components/courses_form/MaterialForm';
import AulaForm from '../../../components/courses_form/AulaForm';
import { useEffect, useState, useRef } from 'react';
import { list_tipo_formato } from '../../../../api/tipo_formato_axios';
import { getCategoriaAreaTopico, list_topico, update_topico } from '../../../../api/topico_axios';
import { list_material_apoio, update_material_apoio } from '../../../../api/material_apoio_axios';
import { list_aulas, update_aulas } from '../../../../api/aulas_axios';
import { get_cursos, update_cursos } from '../../../../api/cursos_axios';
import { useNavigate, useParams } from 'react-router-dom';
import { formatYearMonthDay } from '../../../components/shared_functions/FunctionsUtils';
import { Tab, Tabs } from 'react-bootstrap';
import './Editar_Course.css';
import ISO6391 from 'iso-639-1';
import Select from 'react-select';
import { list_formadores } from '../../../../api/formadores_axios';
import { list_area } from '../../../../api/area_axios';
import { list_categoria } from '../../../../api/categoria_axios';
import Swal from 'sweetalert2';

const EditCourse = () => {
    const { id } = useParams();
    const [aulas, setAulas] = useState([]);
    const [materiais, setMateriais] = useState([]);
    const [formato, setFormato] = useState([]);
    const [catAreaTopico, setCatAreaTop] = useState([]);
    const [cursos, setCursos] = useState({});
    const [categoria, setCategoria] = useState("");
    const [area, setArea] = useState("");
    const [topico, setTopico] = useState("");
    const [formadores, setFormadores] = useState([]);
    const [formadorSelecionado, setFormadorSelecionado] = useState("");
    //const sentinelRef = useRef(null);
    const stopRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const navigate = useNavigate();
    const [isSincrono, setIsSincrono] = useState(false);
    const [sincrono, setSincrono] = useState({
        id_formador: null,
        numero_vagas: "",
    })

    useEffect(() => {
        window.scrollTo(0, 0);

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsSticky(!entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0.1,
            }
        );

        if (stopRef.current) {
            observer.observe(stopRef.current);
        }

        return () => {
            if (stopRef.current) {
                observer.unobserve(stopRef.current);
            }
        };
    }, [id]);

    const fetchCurso = async (id) => {
        try {
            const response = await get_cursos(id);
            setCategoria(response.id_topico_topico.id_area_area.id_categoria);
            setArea(response.id_topico_topico.id_area);
            setTopico(response.id_topico);
            setIsSincrono(response.issincrono);
            if (response.sincrono != null) {
                setFormadorSelecionado(response.sincrono.id_formador);
                setSincrono(prev => ({...prev, 
                    id_formador: response.sincrono.id_formador,
                    numero_vagas: response.sincrono.numero_vagas,}));
            }
            console.log(sincrono.numero_vagas);
            console.log(response);
            setCursos(response);

            if (response.idioma) {
                setSelectedLanguage({
                    value: response.idioma,
                    label: ISO6391.getNativeName(response.idioma)
                });
            }
        } catch (error) {
            console.log('Erro ao encontrar cursos');
        }
    }

    const fetchFormatos = async () => {
        try {
            const response = await list_tipo_formato();
            console.log(response);
            setFormato(response);
        } catch (error) {
            console.log('Erro ao encontrar formatos', error);
        }
    };

    const fetchCategoriaAreaTopico = async () => {
        try {
            const response = await getCategoriaAreaTopico();
            console.log(response);
            setCatAreaTop(response);
        } catch (error) {
            console.log('Erro ao encontrar Categorias, Áreas e Tópicos', error);
        }
    }

    const fetchMaterialApoio = async () => {
        try {
            const response = await list_material_apoio();
            console.log(response);
            setMateriais(response);
        } catch (error) {
            console.log('Erro ao listar Material de Apoio', error);
        }
    }

    const fetchAulas = async () => {
        try {
            const response = await list_aulas();
            console.log(response);
            setAulas(response);
        } catch (error) {
            console.log('Erro encontrar as Aulas', error);
        }
    }

    const fetchFormadores = async () => {
        try {
            const response = await list_formadores();
            console.log(response);
            setFormadores(response);
        } catch (error) {
            console.log('Erro ao encontrar a lista de formadores', error);
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

    useEffect(() => {
        fetchFormatos();
        fetchCategoriaAreaTopico();
        fetchMaterialApoio();
        fetchFormadores();
        fetchAulas();
        fetchCurso(id);
    }, []);

    const error = null;
    const successMessage = null;


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
                    const trimmed = value.trim();
                    if (!trimmed) return 'Tem de inserir um URL válido!';
                    if (!/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)(\?.*)?$/.test(trimmed))
                        return 'Insira um link de imagem válido (.jpg, .png, etc)';
                    return null;
                }
            });

            if (url) {
                const preview = await Swal.fire({
                    title: "Pré-visualização",
                    imageUrl: url.trim(),
                    imageAlt: "Imagem de curso",
                    showCancelButton: true,
                    confirmButtonText: 'Sim, utilizar',
                    cancelButtonText: 'Cancelar',
                    reverseButtons: true,
                });

                if (preview.isConfirmed) {
                    setCursos(prev => ({ ...prev, imagem: url.trim() }));
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
                text: 'Erro ao definir o URL da imagem.',
                icon: 'error'
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updateValue = value;

        if (name === "issincrono") {
            updateValue = value === "true";
        }

        setCursos(prev => ({
            ...prev,
            [name]: updateValue,
        }));
    };

    const handleSubmitCurso = async (e) => {
        e.preventDefault();

        if(cursos.isassincrono === false && !sincrono.id_formador){
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Para cursos síncronos, é obrigatorio selecionar um formador"
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Tem a certeza que deseja alterar Curso?',
            text: 'Os curso será alterado',
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
        if (result.isConfirmed){
            try {
                await update_cursos(id, {
                    ...cursos,
                    sincrono: isSincrono ? sincrono : null
                });
                navigate('/admin/cursos')
                Swal.fire({
                icon: "success",
                title: "Curso atualizado com sucesso!",
                timer: 2000,
                showConfirmButton: false
            });
            } catch (error) {
                console.log("Erro ao atualizar o curso", error);
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Não foi possível atualizar o curso. Verifica os dados e tenta novamente."
                });
            }
        }
    }

    const handleSubmitAulas = async (e) => {
        e.preventDefault();
        const dadosAulas = {
            ...aulas
        }
        try {
            await update_aulas(dadosAulas);
        } catch (error) {
            console.log("Erro ao atualizar Aula", error);
        }
    }

    const handleSubmitMaterialApoio = async (e) => {
        e.preventDefault();
        const dadosMaterialApoio = {
            ...materiais
        }
        try {
            await update_material_apoio(dadosMaterialApoio);
        } catch (error) {
            console.log("Erro ao atualizar o material apoio", error);
        }
    }

    const handleCancel = async () => {
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja cancelar?',
            text: 'Os curso não será alterado',
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

    const addAula = () => {
        setAulas(prev => [...prev, { nome_aula: '', data_aula: '', caminhos_url: [''], conteudos: [] }]);
    };

    const addMaterial = () => {
        setMateriais(prev => [...prev, { id_formato: '', conteudo: '' }]);
    };

    return (
        <div className='form-group'>
            {error && <div className="alert alert-danger mt-2">{error}</div>}
            {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}

            <div className='d-flex'>
                <div className='col-md-9 pe-4 col-sm-10'>
                    <form onSubmit={handleSubmitCurso}>
                        <div className='mx-5'>
                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Nome do Curso</label>
                                <input type="text" name="nome_curso" className='form-control' value={cursos.nome_curso || ""} onChange={handleChange} required />
                            </div>

                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Descrição do Curso</label>
                                <textarea name="descricao_curso" className='form-control' rows="4" value={cursos.descricao_curso || ""} onChange={handleChange} required />
                            </div>

                            {/* DATAS */}
                            <div className='row mt-2'>
                                <div className='col'>
                                    <label className='form-label fw-bold'>Início da Inscrição</label>
                                    <input type="date" name="data_insc_ini" className='form-control' value={cursos.data_inicio_inscricao ? formatYearMonthDay(cursos.data_inicio_inscricao) : ""} onChange={handleChange} required />
                                </div>
                                <div className='col'>
                                    <label className='form-label fw-bold'>Fim da Inscrição</label>
                                    <input type="date" name="data_insc_fim" className='form-control' value={cursos.data_fim_inscricao ? formatYearMonthDay(cursos.data_fim_inscricao) : ""} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className='row mt-2'>
                                <div className='col'>
                                    <label className='form-label fw-bold'>Início do Curso</label>
                                    <input type="date" name="data_curso_ini" className='form-control' value={cursos.data_inicio_curso ? formatYearMonthDay(cursos.data_inicio_curso) : ""} onChange={handleChange} required />
                                </div>
                                <div className='col'>
                                    <label className='form-label fw-bold'>Fim do Curso</label>
                                    <input type="date" name="data_curso_fim" className='form-control' value={cursos.data_fim_curso ? formatYearMonthDay(cursos.data_fim_curso) : ""} onChange={handleChange} required />
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
                                <input type="number" step="0.5" name="horas_curso" className='form-control' value={cursos.horas_curso || ""} onChange={handleChange} required />
                            </div>

                            {/* Tipo */}
                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Tipologia</label>
                                <select name="issincrono" value={isSincrono} onChange={(e) => {const valorBoolean = e.target.value === "true"; setIsSincrono(valorBoolean); setCursos(prev => ({...prev, issincrono: valorBoolean, isassincrono: !valorBoolean})); handleChange(e)}} className='form-select'>
                                    <option value="">-- Escolher Tipologia --</option>
                                    <option value="true">Síncrono</option>
                                    <option value="false">Assíncrono</option>
                                </select>
                            </div>

                            {/* Se for síncrono, mostra formador */}
                            {isSincrono == true && (
                                <div className='mt-2'>
                                    <label className='mt-2 fw-bold'>Formador</label>
                                    <select name="id_formador" value={formadorSelecionado} onChange={(e) => {
                                            const valor = parseInt(e.target.value);
                                            
                                            setSincrono(prev => ({...prev, id_formador: valor})); 
                                            setFormadorSelecionado(valor); 
                                            handleChange(e);}} 
                                        className='form-select'>
                                        <option value="">-- Selecionar Formador --</option>
                                        {formadores.map((f) => {
                                            return(
                                                <option key={f.id_formador} value={f.id_formador}>{f.id_formador_utilizador.nome_utilizador}</option>
                                            );
                                        })}
                                    </select>
                                    <label className='mt-2 fw-bold'>Descrição Formador</label>
                                    <textarea name="descricao_formador" value={formadores?.find((f) => f.id_formador.toString() == formadorSelecionado)?.descricao_formador} className='form-control mt-2' placeholder="Descrição do Formador..." readOnly/>
                                    <label className='mt-2 fw-bold'>Número Vagas</label>
                                    <input type="number" name="numero_vagas" className='form-control mt-2' min="0" placeholder="Número de Vagas..." value={sincrono.numero_vagas} onChange={(e) => setSincrono(prev => ({ ...prev, numero_vagas: parseInt(e.target.value) }))} required />
                                </div>
                            )}

                            {/* CATEGORIA */}
                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Categoria</label>
                                <select name="id_categoria" className='form-select' value={categoria} onChange={(e) => {setCategoria(e.target.value); handleChange(e)}} required>
                                    <option value="">--Escolher categoria--</option>
                                    {catAreaTopico?.map((c) => (
                                        <option key={c.id_categoria} value={c.id_categoria}>{c.nome_cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* AREA */}
                            <div className='mt-2'>
                                <label className='form-label fw-bold'>Area</label>
                                <select name="id_area" className='form-select' value={area} onChange={(e) => {setArea(e.target.value); handleChange(e); }} required>
                                    <option value="">--Escolher area--</option>
                                    {catAreaTopico?.find((cat) => cat.id_categoria.toString() == categoria)?.areas?.map((a) => (
                                        <option key={a.id_area} value={a.id_area}>{a.nome_area}</option>
                                    ))}
                                </select>
                            </div>

                            {/* TOPICO */}
                            <div ref={stopRef} className='mt-2'>
                                <label className='form-label fw-bold'>Tópico</label>
                                <select name="id_topico" className='form-select' value={topico} onChange={(e) => {setTopico(e.target.value); handleChange(e)}} required>
                                    <option value="">--Escolher tópico--</option>
                                    {catAreaTopico?.find((cat) => cat.id_categoria.toString() == categoria)?.areas?.find((ar) => ar.id_area.toString() == area)?.topicos?.map((t) => (
                                        <option key={t.id_topico} value={t.id_topico}>{t.nome_topico}</option>
                                    ))}
                                </select>
                            </div>
                            <div className='d-flex justify-content-between'>
                                <button type="submit" className='btn btn-success mt-3' onClick={handleSubmitCurso}>Submeter Alterações</button>
                                <button type="button" className='btn btn-danger mt-3' onClick={handleCancel}>Cancelar Alterações</button>
                            </div>
                        </div>
                    </form>
                </div>

                <div className='d-flex min-vh-100 flex-column mt-3'>
                    <div className='sticky-card'>
                        <div className='col-md-3 col-sm-2 bg-custom-light d-flex align-items-center flex-column h-100 w-100 p-3 rounded'>
                            {cursos && (
                                <img
                                    src={cursos.imagem}
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cursos.imagem)}&background=random&bold=true`;
                                    }}
                                    alt="Imagem de perfil"
                                    className='w-100 img-profile rounded-2 mb-2'
                                />
                            )}

                            <div className='d-flex flex-column align-items-center'>
                                <h5 className='m-1 mb-3'>{cursos.nome_curso || 'Nome'}</h5>
                                <small>Número de inscritos: {cursos.contador_formandos}</small>
                            </div>
                            <button onClick={handleSubmitCursoImg} type="button" className='btn btn-color text-white w-100 mt-4'>Alterar Foto</button>
                        </div>
                    </div>
                </div>
            </div>
            
            {cursos.isassincrono && 
                <div className='mx-5'>
                    <Tabs defaultActiveKey="aulas" className="my-4 nav-justified custom-tabs">
                        <Tab eventKey="aulas" title="Aulas">
                            <div className="mt-4">
                                <h2>Aulas</h2>
                                {/* Aulas */}
                                {cursos.isassincrono === true && (
                                    <div className='mt-4'>
                                        <h5>Aulas</h5>
                                        {aulas.map((aulas, idx) => (
                                            <AulaForm
                                                key={idx}
                                                aula={aulas}
                                                formatos={formato}
                                                onChange={(field, value) => {
                                                    const updated = [...aulas];
                                                    updated[idx][field] = value;
                                                    setAulas(updated);
                                                }}
                                                onChangeUrl={(urlIdx, value) => {
                                                    const updated = [...aulas];
                                                    updated[idx].caminhos_url[urlIdx] = value;
                                                    setAulas(updated);
                                                }}
                                                onAddUrl={() => {
                                                    const updated = [...aulas];
                                                    updated[idx].caminhos_url.push('');
                                                    setAulas(updated);
                                                }}
                                                onAddConteudo={() => {
                                                    const updated = [...aulas];
                                                    updated[idx].conteudos.push({
                                                        nome_conteudo: '',
                                                        conteudo: '',
                                                        tempo_duracao: '',
                                                        id_formato: ''
                                                    });
                                                    setAulas(updated);
                                                }}
                                                onChangeConteudo={(conteudoIdx, field, value) => {
                                                    const updated = [...aulas];
                                                    updated[idx].conteudos[conteudoIdx][field] = value;
                                                    setAulas(updated);
                                                }}
                                            />
                                        ))}
                                        <button type="button" className='btn btn-outline-primary' onClick={handleSubmitAulas}>+ Adicionar Aula</button>
                                    </div>
                                )}
                            </div>
                        </Tab>
                        <Tab eventKey="material_apoio" title="Material Apoio">
                            <div className="mt-4">
                                <h2>Material Apoio</h2>
                                {/* Material de Apoio */}
                                {cursos.isassincrono === true && (
                                    <div className='mt-4'>
                                        <h5>Material de Apoio</h5>
                                        {materiais.map((mat, idx) => (
                                            <MaterialForm
                                                key={idx}
                                                material={mat}
                                                formatos={formato}
                                                onChangeFormato={(e) => {
                                                    const updated = [...materiais];
                                                    updated[idx].id_formato = e.target.value;
                                                    setMateriais(updated);
                                                }}
                                                onChangeConteudo={(e) => {
                                                    const updated = [...materiais];
                                                    updated[idx].conteudo = e.target.value;
                                                    setMateriais(updated);
                                                }}
                                            />
                                        ))}
                                        <button type="button" className='btn btn-outline-primary' onClick={handleSubmitMaterialApoio}>+ Adicionar Material</button>
                                    </div>
                                )}
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            }
        </div>
    );
}

export default EditCourse;