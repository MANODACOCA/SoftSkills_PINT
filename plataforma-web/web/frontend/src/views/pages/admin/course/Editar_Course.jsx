import MaterialForm from '../../../components/courses_form/MaterialForm';
import AulaForm from '../../../components/courses_form/AulaForm';
import { useEffect, useState, useRef } from 'react';
import { list_tipo_formato } from '../../../../api/tipo_formato_axios';
import { getCategoriaAreaTopico } from '../../../../api/topico_axios';
import { list_material_apoio } from '../../../../api/material_apoio_axios';
import { list_aulas } from '../../../../api/aulas_axios';
import { get_cursos } from '../../../../api/cursos_axios';
import { useParams } from 'react-router-dom';
import { formatYearMonthDay } from '../../../components/shared_functions/FunctionsUtils';
import { Tab, Tabs } from 'react-bootstrap';
import './Editar_Course.css';
import ISO6391 from 'iso-639-1';
import Select from 'react-select';

const formadores = [
    { id_formador: 1, nome: 'João Silva' },
    { id_formador: 2, nome: 'Ana Costa' },
];

const EditCourse = () => {
    const {id} = useParams();
    const [aulas, setAulas] = useState([]);
    const [materiais, setMateriais] = useState([]);
    const [formato, setFormato] = useState([]);
    const [catAreaTopico, setCatAreaTop] = useState([]);
    const [cursos, setCursos] = useState({});
    //const sentinelRef = useRef(null);
    const stopRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(null);

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
        try{
            const response = await get_cursos(id);
            console.log(response);
            setCursos(response);
        } catch (error) {
            console.log('Erro ao encontrar cursos');
        }
    }

    const fetchFormatos =  async () => {
        try {
            const response = await list_tipo_formato();
            console.log(response);
            setFormato(response);
        } catch (error) {
            console.log('Erro ao encontrar formatos');
        }
    };

    const fetchCategoriaArea = async () => {
        try {
            const response = await getCategoriaAreaTopico();
            console.log(response);
            setCatAreaTop(response);
        } catch (error) {
            console.log('Erro ao encontrar Categorias, Áreas e Tópicos');
        }
    }
    
    const fetchMaterialApoio = async () => {
        try {
            const response = await list_material_apoio();
            console.log(response);
            setMateriais(response);
        } catch(error) {
            console.log('Erro ao listar Material de Apoio');
        }
    }

    const fetchAulas = async () => {
        try{
            const response = await list_aulas();
            console.log(response);
            setAulas(response);
        } catch(error) {
            console.log('Erro encontrar as Aulas');
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
        fetchCategoriaArea();
        fetchMaterialApoio();
        fetchAulas();
        fetchCurso(id);
    }, []);

    const error = null;
    const successMessage = null;


    const handleChange = () => { };

    const handleSubmit = (e) => e.preventDefault();

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
                <form onSubmit={handleSubmit}>
                    <div className='mx-5'>
                        <div className='mt-2'>
                            <label className='form-label'>Nome do Curso</label>
                            <input type="text" name="nome_curso" className='form-control' value={cursos.nome_curso || ""} onChange={handleChange} required />
                        </div>

                        <div className='mt-2'>
                            <label className='form-label'>Descrição do Curso</label>
                            <textarea name="descricao_curso" className='form-control' rows="4" value={cursos.descricao_curso || ""} onChange={handleChange} required />
                        </div>

                        {/* DATAS */}
                        <div className='row mt-2'>
                            <div className='col'>
                                <label className='form-label'>Início da Inscrição</label>
                                <input type="date" name="data_insc_ini" className='form-control' value={cursos.data_inicio_inscricao ? formatYearMonthDay(cursos.data_inicio_inscricao) : ""} onChange={handleChange} required />
                            </div>
                            <div className='col'>
                                <label className='form-label'>Fim da Inscrição</label>
                                <input type="date" name="data_insc_fim" className='form-control' value={cursos.data_fim_inscricao ? formatYearMonthDay(cursos.data_fim_inscricao) : ""} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className='row mt-2'>
                            <div className='col'>
                                <label className='form-label'>Início do Curso</label>
                                <input type="date" name="data_curso_ini" className='form-control' value={cursos.data_inicio_curso ? formatYearMonthDay(cursos.data_inicio_curso) : ""} onChange={handleChange} required />
                            </div>
                            <div className='col'>
                                <label className='form-label'>Fim do Curso</label>
                                <input type="date" name="data_curso_fim" className='form-control' value={cursos.data_fim_curso ? formatYearMonthDay(cursos.data_fim_curso) : ""} onChange={handleChange} required />
                            </div>
                        </div>

                        <div className='mt-2'>
                            <label className='form-label'>Idioma</label>
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
                            <label className='form-label'>Horas do Curso</label>
                            <input type="number" step="0.5" name="horas_curso" className='form-control' value={cursos.horas_curso || ""} onChange={handleChange} required />
                        </div>

                        {/* Tipo */}
                        <div className='mt-2'>
                            <label className='form-label'>Tipologia</label>
                            <select name="isassincrono" value={cursos.isassincrono} onChange={handleChange} className='form-select'>
                                <option value="">-- Escolher Tipologia --</option>
                                <option value={cursos.issincrono}>Síncrono</option>
                                <option value={cursos.isassincrono}>Assíncrono</option>
                            </select>    
                        </div>

                        {/* Se for síncrono, mostra formador */}
                        {cursos.isassincrono === false && (
                            <div className='mt-2'>
                                <select name="id_formador" value={cursos.id_formador} onChange={handleChange} className='form-select'>
                                    <option value="">-- Selecionar Formador --</option>
                                    {formadores.map(f => (
                                        <option key={f.id_formador} value={f.id_formador}>{f.nome}</option>
                                    ))}
                                </select>
                                <textarea name="descricao_formador" value={cursos.descricao_formador || ""} onChange={handleChange} className='form-control mt-2' placeholder="Descrição do Formador" />
                                <input type="number" name="numero_vagas" value={cursos.numero_vagas || ""} onChange={handleChange} className='form-control mt-2' placeholder="Número de Vagas" />
                            </div>
                        )}
                        
                        {/* CATEGORIA */}
                        <div className='mt-2'>
                            <label className='form-label'>Categoria</label>
                            <select name="id_topico" className='form-select' value={cursos.id_topico} onChange={handleChange} required>
                                <option value="">--Escolher categoria--</option>
                                {catAreaTopico.map(t => (
                                    <option key={t.id_categoria} value={t.id_categoria}>{t.nome_cat}</option>
                                ))}
                            </select>
                        </div>

                        {/* AREA */}
                        <div className='mt-2'>
                            <label className='form-label'>Area</label>
                            <select name="id_topico" className='form-select' value={cursos.id_topico} onChange={handleChange} required>
                                <option value="">--Escolher area--</option>
                                {catAreaTopico?.areas?.map(t => (
                                    <option key={t.id_area} value={t.id_area}>{t.nome_area}</option>
                                ))}
                            </select>
                        </div>

                        {/* TOPICO */}
                        <div ref={stopRef} className='mt-2'>
                            <label className='form-label'>Tópico</label>
                            <select name="id_topico" className='form-select' value={cursos.id_topico} onChange={handleChange} required>
                                <option value="">--Escolher tópico--</option>
                                {catAreaTopico?.areas?.topicos?.map(t => (
                                    <option key={t.id_topico} value={t.id_topico}>{t.nome_topico}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className='btn btn-success mt-3'>Submeter Alterações</button>
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
                        <button onClick={()=>{}} type="button" className='btn btn-color text-white w-100 mt-4'>Alterar Foto</button>
                    </div>
                </div>
            </div>
        </div>
        
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
                                <button type="button" className='btn btn-outline-primary' onClick={addAula}>+ Adicionar Aula</button>
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
                                <button type="button" className='btn btn-outline-primary' onClick={addMaterial}>+ Adicionar Material</button>
                            </div>
                        )}
                    </div>
                </Tab>    
            </Tabs>
        </div>
        
    </div>
    );
}

export default EditCourse;