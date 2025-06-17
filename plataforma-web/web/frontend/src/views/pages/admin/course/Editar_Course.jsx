import MaterialForm from '../../../components/courses_form/MaterialForm';
import AulaForm from '../../../components/courses_form/AulaForm';
import { useEffect, useState } from 'react';
import { list_tipo_formato } from '../../../../api/tipo_formato_axios';
import { getCategoriaAreaTopico } from '../../../../api/topico_axios';
import { list_material_apoio } from '../../../../api/material_apoio_axios';
import { list_aulas } from '../../../../api/aulas_axios';
import { get_cursos } from '../../../../api/cursos_axios';
import { useParams } from 'react-router-dom';
import { formatYearMonthDay } from '../../../components/shared_functions/FunctionsUtils';

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

        <form onSubmit={handleSubmit}>
            <div className='col-md-10 mx-auto'>

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
                        <input type="date" name="data_curso_ini" className='form-control' value={cursos.data_curso_inicio ? formatYearMonthDay(cursos.data_curso_inicio) : ""} onChange={handleChange} required />
                    </div>
                    <div className='col'>
                        <label className='form-label'>Fim do Curso</label>
                        <input type="date" name="data_curso_fim" className='form-control' value={cursos.data_curso_fim ? formatYearMonthDay(cursos.data_curso_fim) : ""} onChange={handleChange} required />
                    </div>
                </div>

                <div className='mt-2'>
                    <label className='form-label'>Idioma</label>
                    <input type="text" name="idioma" className='form-control' value={cursos.idioma || ""} onChange={handleChange} required />
                </div>

                <div className='mt-2'>
                    <label className='form-label'>Horas do Curso</label>
                    <input type="number" step="0.5" name="horas_curso" className='form-control' value={cursos.horas_curso || ""} onChange={handleChange} required />
                </div>

                <div className='mt-2'>
                    <label className='form-label'>Numero de Formandos</label>
                    <input type="number" name="contador_formandos" className='form-control' value={cursos.contador_formandos || ""} onChange={handleChange} required />
                </div>

                <div className='mt-2'>
                    <label className='form-label'>Imagem (URL ou nome de ficheiro)</label>
                    <input type="text" name="imagem" className='form-control' value={cursos.imagem || ""} onChange={handleChange} required />
                </div>

                {/* Tipo */}
                <select name="isassincrono" value={cursos.isassincrono} onChange={handleChange} className='form-select mt-2'>
                    <option value="">-- Escolher Tipologia --</option>
                    <option value="false">Síncrono</option>
                    <option value="true">Assíncrono</option>
                </select>

                {/* Se for síncrono, mostra formador */}
                {cursos.isassincrono === "false" && (
                    <div className='mt-3'>
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

                {/* Aulas */}
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

                    {/* {aulas.map((aula, idx) => (
        <div key={idx} className='border p-2 mb-2'>
        <input className='form-control' placeholder="Nome da Aula" value={aula.nome_aula} onChange={(e) => {
            const updated = [...aulas];
            updated[idx].nome_aula = e.target.value;
            setAulas(updated);
        }} />
        <input className='form-control mt-2' type="date" value={aula.data_aula} onChange={(e) => {
            const updated = [...aulas];
            updated[idx].data_aula = e.target.value;
            setAulas(updated);
        }} />
        {/* Caminhos URL múltiplos 
        {aula.caminhos_url.map((url, i) => (
            <input key={i} className='form-control mt-2' placeholder="Caminho URL" value={url} onChange={(e) => {
            const updated = [...aulas];
            updated[idx].caminhos_url[i] = e.target.value;
            setAulas(updated);
            }} />
        ))}
        </div>
    ))} */}
                    <button type="button" className='btn btn-outline-primary' onClick={addAula}>+ Adicionar Aula</button>
                </div>

                {/* Material de Apoio */}
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

                    {/* {materiais.map((mat, idx) => (
                        <div key={idx} className='border p-2 mb-2'>
                            <select className='form-select' value={mat.id_formato} onChange={(e) => {
                                const updated = [...materiais];
                                updated[idx].id_formato = e.target.value;
                                setMateriais(updated);
                            }}>
                                <option value="">-- Formato --</option>
                                {formatos.map(f => (
                                    <option key={f.id_formato} value={f.id_formato}>{f.formato}</option>
                                ))}
                            </select>
                            <input className='form-control mt-2' placeholder="Conteúdo (link ou caminho)" value={mat.conteudo} onChange={(e) => {
                                const updated = [...materiais];
                                updated[idx].conteudo = e.target.value;
                                setMateriais(updated);
                            }} />
                        </div>
                    ))} */}
                    <button type="button" className='btn btn-outline-primary' onClick={addMaterial}>+ Adicionar Material</button>
                </div>

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
                <div className='mt-2'>
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
    );
}

export default EditCourse;