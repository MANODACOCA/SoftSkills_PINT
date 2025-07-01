import { useEffect, useState, useRef } from 'react';
import { list_tipo_formato } from '../../../../api/tipo_formato_axios';
import { getCategoriaAreaTopico, list_topico, update_topico } from '../../../../api/topico_axios';
import { create_material_apoio, delete_material_apoio, get_material_apoio, get_material_apoio_curso, list_material_apoio, update_material_apoio } from '../../../../api/material_apoio_axios';
import { getAulas_Curso, update_aulas, create_aulas, delete_aulas } from '../../../../api/aulas_axios';
import { get_cursos, getCoursePopular, update_cursos } from '../../../../api/cursos_axios';
import { useNavigate, useParams } from 'react-router-dom';
import { calcularHorasCurso, formatYearMonthDay } from '../../../components/shared_functions/FunctionsUtils';
import { Tab, Tabs } from 'react-bootstrap';
import './Editar_Course.css';
import ISO6391 from 'iso-639-1';
import Select from 'react-select';
import { list_formadores } from '../../../../api/formadores_axios';
import Swal from 'sweetalert2';
import Table from '../../../components/table/Table';
import { columnsAulas } from '../../../components/table/ColumnsAula';
import { ColumnsMaterialApoio } from '../../../components/table/ColumnsMarterialApoio';
import {
  FaVideo,
  FaFileAlt,
  FaFilePowerpoint,
  FaFileImage,
  FaFileAudio,
  FaFilePdf,
  FaLink,
  FaFile,
  FaChevronDown,
  FaInfoCircle,
  FaPlayCircle
} from 'react-icons/fa';
import { create_conteudos, delete_conteudos, list_conteudos } from '../../../../api/conteudos_axios';

const EditCourse = () => {
    //#region Variaveis

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
    const todayStr = new Date().toLocaleDateString("en-CA", { timeZone: "Europe/Lisbon" });
    const [isSincrono, setIsSincrono] = useState(false);
    const [sincrono, setSincrono] = useState({
        id_formador: null,
        numero_vagas: "",
    })
    const error = null;
    const successMessage = null;
    const iconMapById = {
        1: <FaVideo className="text-primary" />,
        2: <FaFilePdf className="text-danger" />,
        3: <FaFilePowerpoint className="text-warning" />,
        4: <FaFileAlt className="text-success" />,
        5: <FaFileImage className="text-pink-500" />,
        6: <FaFileAudio className="text-indigo-500" />,
        7: <FaInfoCircle className="text-cyan-600" />,
        8: <FaLink className="text-blue-500" />,
    };
    const [horasCursoFormato, setHorasCursoFormato] = useState();

    //#endregion
    
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


    //#region curso
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
            setCursos(response);
            if (response.idioma) {
                setSelectedLanguage({
                    value: response.idioma,
                    label: ISO6391.getNativeName(response.idioma)
                });
            }
            return response;
        } catch (error) {
            console.log('Erro ao encontrar cursos');
        }
    }

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

    const fetchFormadores = async () => {
        try {
            const response = await list_formadores();
            setFormadores(response);
        } catch (error) {
            console.log('Erro ao encontrar a lista de formadores', error);
        }
    }

    const fetchCategoriaAreaTopico = async () => {
        try {
            const response = await getCategoriaAreaTopico();
            setCatAreaTop(response);
        } catch (error) {
            console.log('Erro ao encontrar Categorias, Áreas e Tópicos', error);
        }
    }

     const handleSubmitCurso = async (e) => {
        e.preventDefault();
        
        const dToday = new Date(`${todayStr}T00:00:00`);
        const dInscIni = new Date(`${cursos.data_inicio_inscricao}T00:00:00`);
        const dInscFim = new Date(`${cursos.data_fim_inscricao}T00:00:00`);
        const dCursoIni = new Date(`${cursos.data_inicio_curso}T00:00:00`);
        const dCursoFim = new Date(`${cursos.data_fim_curso}T00:00:00`);
        
        if(cursos.isassincrono === false && !sincrono.id_formador){
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Para cursos síncronos, é obrigatorio selecionar um formador"
            });
            return;
        }

        if([dInscIni, dInscFim, dCursoIni, dCursoFim].some((d) => d && d < dToday)) {
            Swal.fire({
                icon: "error",
                title: "Datas inválidas",
                text: "Nenhuma data pode ser anterior a hoje",
            });
            return;
        }

        if(dInscIni > dInscFim) {
            Swal.fire({
                icon: "error",
                title: "Datas inválidas",
                text: "A data de fim da inscrição deve ser posterior ao início",
            });
            return;
        }

        if(dCursoIni > dCursoFim) {
            Swal.fire({
                icon: "error",
                title: "Datas inválidas",
                text: "A data de fim do curso deve ser posterior ao início.",
            });
            return;
        }

        if(dCursoIni < dInscFim) {
            Swal.fire({
                icon: "error",
                title: "Datas inválidas",
                text: "O curso deve começar depois de terminar a inscrição",
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
    //#endregion


    //#region Aula
    const fetchAulas = async (id) => {
        try {
            const response = await getAulas_Curso(id);
            setAulas(response);
            return response;
        } catch (error) {
            console.log('Erro encontrar as Aulas', error);
        }
    }

    const renderConteudos = (item, isExpanded, expandedContent = false ) => {
        if (expandedContent) {
            return (
            <div className="m-0 bg-light border rounded">
                <h6 className='p-2'>Conteudos</h6>
                <div className='mx-2 my-1 border rounded'>
                {item.conteudos?.length > 0 ? 
                    (item.conteudos.map((conteudo, index) => (    
                        <div key={index} className={`${index % 2 === 0 ? 'line-bg' : 'bg-light'} p-2`}>
                            <div className='d-flex align-items-center justify-content-between'>
                                <div>
                                    <span className='me-2'>{getIconById(conteudo.id_formato)}</span>
                                    {conteudo.nome_conteudo}   
                                </div>
                                <div>
                                    <a href={conteudo.conteudo}  className="btn btn-outline-success me-2" target="_blank">
                                        <i className='bi bi-box-arrow-up-right'></i></a>
                                    <button className="btn btn-outline-danger" onClick={()=> handleDeleteConteudo(conteudo.id_conteudo, item.id_aula)}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                    ) : (
                        <div className='p-2'>
                            Aula sem conteúdos disponíveis
                        </div>
                    )
                }
                </div>
            </div>
            );
        }
        return(
            <div>
                <i className={`bi ${isExpanded ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
            </div>            
        );
        
    }

    const renderActionsAula = (item) => {
        return(
            <div className="d-flex">
                <button className="btn btn-outline-primary me-2" onClick={() => HandleEditCreateAula(item.id_aula, item)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-success me-2" onClick={()=> handleAddConteudoAula(item.id_aula)}>
                    <i className="bi bi-file-earmark-plus"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={()=> handleDeleteAula(item.id_aula)}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        );
    }

    const HandleEditCreateAula = async (id, aulaData) => {
        const result = await Swal.fire({
            title: id == null ? 'Tem a certeza que deseja adicionar aula?' : 'Tem a certeza que deseja trocar aula?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        });

        if(result.isConfirmed) {
            try{
                if(id){
                    const editarAula = await Swal.fire({
                        title: 'Editar Aula',
                        html: `
                            <label for="nome" class="form-label">Aula</label>
                            <input id="nomeAula" class="form-control mb-3" placeholder="Nome da Aula" value="${aulaData?.nome_aula || ''}">
                            <label for="conteudo" class="form-label">URL</label>
                            <input id="urlAula" class="form-control" placeholder="https://exemplo.com/aula" value="${aulaData?.caminho_url || ''}">
                        `,
                        showCancelButton: true,
                        confirmButtonText: 'Editar',
                        cancelButtonText: 'Cancelar',
                        inputValidator: (value) => {
                            if(!value) return 'O URL é obrigatório';
                            if (!/^https?:\/\/.+/.test(value)) return 'Insira um URL válido';
                            return null;
                        },
                        customClass: {
                            confirmButton: 'btn btn-success me-2',
                            cancelButton: 'btn btn-danger',
                        },
                        preConfirm: () => {
                            const nome = document.getElementById('nomeAula').value;
                            const url = document.getElementById('urlAula').value;

                            if(!nome || !url) {
                                Swal.showValidationMessage('Todos os campos são obrigatórios!');
                                return;
                            }

                            if (!/^https?:\/\/.+/.test(url)) {
                                Swal.showValidationMessage('Insira um URL válido!');
                                return;
                            }
                            
                            return {
                                id_curso: cursos.id_curso,
                                data_aula: materiais.data_aula,
                                nome_aula: nome, 
                                caminho_url: url,
                                tempo_duracao: 0,
                            };
                        }
                    });
                    if(editarAula.isConfirmed && editarAula.value){
                        try {
                            await update_aulas(id, editarAula.value);
                            const aulasCarregadas = await fetchAulas(cursos.id_curso);
                            if (aulasCarregadas && aulasCarregadas?.length > 0) {
                                let horas_curso = calcularHorasCurso(aulasCarregadas);
                                atualizarHorasCursoBD(cursos.id_curso, horas_curso);
                            }
                            Swal.fire({
                                icon: "success",
                                title: "Aula editada com sucesso!",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        } catch(error) {
                            Swal.fire({
                                icon: "error",
                                title: "Erro",
                                text: "Não foi possível editar a aula",
                                timer: 2000,
                                showConfirmButton: false,
                            });                            
                        }
                    }
                }else{    
                    const adicionarAula = await Swal.fire({
                        title: 'Adicionar Aula',
                        html: `
                            <label for="nome" class="form-label">Aula</label>
                            <input id="nomeAula" class="form-control mb-3" placeholder="Nome da Aula" value="${aulaData?.nome_aula || ''}">
                            <label for="conteudo" class="form-label">URL</label>
                            <input id="urlAula" class="form-control" placeholder="https://exemplo.com/aula" value="${aulaData?.caminho_url?.[0] || ''}">
                        `,
                        showCancelButton: true,
                        confirmButtonText: 'Adicionar Aula',
                        cancelButtonText: 'Cancelar',
                        inputValidator: (value) => {
                            if (!value) return 'O URL é obrigatório!';
                            if (!/^https?:\/\/.+/.test(value)) return 'Insira um URL válido';
                            return null;
                        },
                        customClass: {
                            confirmButton: 'btn btn-success me-2',
                            cancelButton: 'btn btn-danger',
                        },
                        preConfirm: () => {
                            const nome = document.getElementById('nomeAula').value;
                            const url = document.getElementById('urlAula').value;
                            const data_aula = new Date().toISOString().split('T')[0];

                            if (!nome || !url) {
                                Swal.showValidationMessage('Todos os campos são obrigatórios!');
                                return;
                            }

                            if (!/^https?:\/\/.+/.test(url)) {
                                Swal.showValidationMessage('Insira um URL válido!');
                                return;
                            }

                            return { 
                                id_curso: cursos.id_curso,
                                data_aula,
                                nome_aula: nome, 
                                caminho_url: url,
                                tempo_duracao: 0
                            };
                        }
                    });
                    if(adicionarAula.isConfirmed && adicionarAula.value){
                        try {
                            await create_aulas(adicionarAula.value);
                            const aulasCarregadas = await fetchAulas(cursos.id_curso);
                            if (aulasCarregadas && aulasCarregadas?.length > 0) {
                                let horas_curso = calcularHorasCurso(aulasCarregadas);
                                atualizarHorasCursoBD(cursos.id_curso, horas_curso);
                            }
                            Swal.fire({
                                icon: "success",
                                title: "Aula adicionada com sucesso!",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        } catch(error) {
                            Swal.fire({
                                icon: "error",
                                title: "Erro",
                                text: "Não foi possível adicionar a aula",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        }
                    }
                }
            }catch(error) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Não foi possível guardar a aula",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } 
    }

    const handleAddConteudoAula =  async (id_aula) => {
        const result = await Swal.fire({
            title: "Tem certeza que deseja adicionar conteudo a esta aula?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonColor: "Cancelar",
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        });

        if(result.isConfirmed) {
            const formatos = await list_tipo_formato();
            const conteudos = await list_conteudos();
            const adicionarConteudo = await Swal.fire({
                title: 'Adicionar Conteudo',
                html: ` 
                    <label for="formato" class="form-label">Formato</label>
                    <select id="formato" class="form-control mb-3">
                        <option value="">-- Selecionar Conteúdo --</option>
                        ${formatos.map(f => `
                        <option value="${f.id_formato}" ${f.id_formato == conteudos.id_formato ? 'selected' : ''}>${f.formato}</option>
                            `).join('')}
                    </select>
                    <label for="nomeConteudo" class="form-label">Nome do Conteúdo</label>
                    <input id="nomeConteudo" class="form-control mb-3" placeholder= "Ex: Slides React">
                    <div id="file1InputWrapper" class="d-none">
                    <label for="urlConteudo" id="ficheiro1Label" class="form-label mb-3">URL do Conteúdo</label>
                    <input id="urlConteudo" class="form-control mb-3" placeholder="https://exemplo.com/conteudo.pdf">
                    </div>
                    <div id="file2InputWrapper" class="d-none">
                    <label for="ficheiroConteudo" id="ficheiro2Label" class="form-label">Ficheiro</label>
                    <input type="file" id="ficheiroConteudo" class="form-control mb-3" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx">
                    </div>
                `,
                didOpen: () => {
                    const select = document.getElementById('formato');
                    const file2Wrapper = document.getElementById('file2InputWrapper');
                    const file1Wrapper = document.getElementById('file1InputWrapper');
                    const label2 = document.getElementById('ficheiro2Label');
                    const label1 = document.getElementById('ficheiro1Label');
                    const formatosComFicheiro = [2, 3, 5, 6, 7];

                    select.addEventListener('change', () => {
                    const selectedId = parseInt(select.value);
                    const formatoSelecionado = formatos.find(f => f.id_formato === selectedId);

                    if (formatosComFicheiro.includes(selectedId)) {
                        file2Wrapper.classList.remove('d-none');
                        file1Wrapper.classList.add('d-none');
                        label2.textContent = `Ficheiro (${formatoSelecionado.formato})`;
                        label1.textContent = 'Ficheiro';
                    } else {
                        file2Wrapper.classList.add('d-none');
                        file1Wrapper.classList.remove('d-none');
                        label2.textContent = 'Ficheiro';
                        label1.textContent = `Ficheiro (${formatoSelecionado.formato})`;
                    }
                    });
                },
                preConfirm: () => {
                    const nome = document.getElementById('nomeConteudo').value;
                    const url = document.getElementById('urlConteudo').value;
                    const formato = document.getElementById('formato').value;
                    const ficheiro = document.getElementById('ficheiroConteudo').files[0];

                    if (!nome || (!url && !ficheiro) || !formato) {
                        Swal.showValidationMessage('Todos os campos são obrigatórios!');
                        return;
                    }

                    if (!ficheiro && !/^https?:\/\/.+/.test(url)) {
                        Swal.showValidationMessage('Insira um URL válido!');
                        return;
                    }
                    return{
                        id_aula,
                        id_curso: cursos.id_curso,
                        nome_conteudo: nome,
                        conteudo: url,
                        id_formato: parseInt(formato),
                        ficheiro: ficheiro || null
                    };
                },
                showCancelButton: true,
                confirmButtonText: 'Adicionar Conteúdo',
                cancelButtonText: 'Cancelar',
                customClass: {
                    confirmButton: 'btn btn-success me-2',
                    cancelButton: 'btn btn-danger'
                },
            });

            if (adicionarConteudo.isConfirmed && adicionarConteudo.value) {
                try{
                    await create_conteudos(adicionarConteudo.value);
                    await fetchAulas(cursos.id_curso); 
                    Swal.fire({
                        icon: "success",
                        title: "Conteudo adicionado com sucesso!",
                        timer: 2000,
                        showConfirmButton: false
                    });

                } catch (error) {
                    console.error("Erro ao adicionar conteudo:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Erro",
                        text: "Não foi possível adicionar o conteudo",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
            }
        }
    }

    const handleDeleteAula = async (id) => {
        const result = await Swal.fire({
            title: "Tem certeza que deseja excluir esta aula?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonColor: "Cancelar",
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        });

        if(result.isConfirmed) {
            try{
                await delete_aulas(id);
                const aulasCarregadas = await fetchAulas(cursos.id_curso);
                if (aulasCarregadas && aulasCarregadas?.length > 0) {
                    let horas_curso = calcularHorasCurso(aulasCarregadas);
                    atualizarHorasCursoBD(cursos.id_curso, horas_curso);
                }
                Swal.fire({
                    icon: "success",
                    title: "Aula excluída com sucesso!",
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                console.error("Erro ao excluir aula:", error);
                Swal.fire({
                    icon: "error",
                    title: "Elimine os conteúdos!",
                    text: "Não foi possível excluir a aula",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        }
    }

    const handleDeleteConteudo = async (idConteudo, idAula) => {
        console.log(id);
        const result = await Swal.fire({
            title: "Tem certeza que deseja excluir este conteúdo?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonColor: "Cancelar",
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        });
        if(result.isConfirmed) {
            try{
                await delete_conteudos(idConteudo);
                await fetchAulas(cursos.id_curso);
                Swal.fire({
                    icon: "success",
                    title: "Conteúdo excluído com sucesso!",
                    timer: 2000,
                    showConfirmButton: false
                });

                await fetchAulas(); 

            } catch (error) {
                console.error("Erro ao excluir Conteúdo:", error);
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Não foi possível excluir o conteúdo",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        }
    }

    //#endregion


    //#region MateriaApoio
    
    const fetchMaterialApoio = async (id) => {
        try {
            const response = await get_material_apoio_curso(id);
            setMateriais(response);
        } catch (error) {
            console.log('Erro ao listar Material de Apoio', error);
        }
    }

    const fetchFormatos = async () => {
        try {
            const response = await list_tipo_formato();
            setFormato(response);
        } catch (error) {
            console.log('Erro ao encontrar formatos', error);
        }
    };

    const renderActionsMaterialApoio = (item) => {
        return(
        <div className="d-flex">
                   <a href={item.conteudo}  className="btn btn-outline-success me-2" target="_blank">
                <i className='bi bi-box-arrow-up-right'></i></a>
            <button className="btn btn-outline-primary me-2" onClick={() => handleEditCreateMaterialApoio(item.id_material_apoio)}>
                <i className="bi bi-pencil"></i>
            </button> 
            <button className="btn btn-outline-danger" onClick={()=> HandleDeleteMaterialApoio(item.id_material_apoio)}>
                <i className="bi bi-trash"></i>
            </button>
        </div>
        );
    }
    
    const handleEditCreateMaterialApoio = async (id) => {
        const result = await Swal.fire({
            title: id == null ? 'Tem a certeza que deseja adicionar Material de apoio?' : 'Tem a certeza que deseja editar Material de apoio?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        });

        if(result.isConfirmed) {
            try {
                if(id != null) {
                    const material = await get_material_apoio(id);
                    const formatos = await list_tipo_formato();
                    const editarMaterialApoio = await Swal.fire({
                        title: 'Editar Material de apoio',
                        html: `
                            <label for="formato" class="form-label">Formato</label>
                            <select id="formato" class="form-select mb-3">
                                ${formatos.map(f => `
                                    <option value="${f.id_formato}" ${f.id_formato == material.id_formato ? 'selected' : ''}>${f.formato}</option>
                                `).join('')}
                            </select>
                            <label for="nome" class="form-label">Nome</label>
                            <input id="nome" class="form-control mb-3" placeholder="Nome material de apoio" value="${material.nome_material || ''}" />
                            <div id="file1InputWrapper" class="d-none">
                            <label for="urlConteudo" id="ficheiro1Label" class="form-label mb-3">URL do Conteúdo</label>
                            <input id="urlConteudo" class="form-control mb-3" placeholder="https://exemplo.com/conteudo.pdf">
                            </div>
                            <div id="file2InputWrapper" class="d-none">
                            <label for="ficheiroConteudo" id="ficheiro2Label" class="form-label">Ficheiro</label>
                            <input type="file" id="ficheiroConteudo" class="form-control mb-3" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx">
                            </div>
                        `,
                        didOpen: () => {
                            const select = document.getElementById('formato');
                            const file2Wrapper = document.getElementById('file2InputWrapper');
                            const file1Wrapper = document.getElementById('file1InputWrapper');
                            const label2 = document.getElementById('ficheiro2Label');
                            const label1 = document.getElementById('ficheiro1Label');
                            const formatosComFicheiro = [2, 3, 5, 6, 7];

                            select.addEventListener('change', () => {
                            const selectedId = parseInt(select.value);
                            const formatoSelecionado = formatos.find(f => f.id_formato === selectedId);

                            if (formatosComFicheiro.includes(selectedId)) {
                                file2Wrapper.classList.remove('d-none');
                                file1Wrapper.classList.add('d-none');
                                label2.textContent = `Ficheiro (${formatoSelecionado.formato})`;
                                label1.textContent = 'Ficheiro';
                            } else {
                                file2Wrapper.classList.add('d-none');
                                file1Wrapper.classList.remove('d-none');
                                label2.textContent = 'Ficheiro';
                                label1.textContent = `Ficheiro (${formatoSelecionado.formato})`;
                            }
                            });
                        },
                        preConfirm: () => {
                            const id_formato = document.getElementById("formato").value;
                            const url = document.getElementById("urlConteudo").value;
                            const nome = document.getElementById("nome").value;
                            const ficheiro = document.getElementById('ficheiroConteudo').files[0];
                            
                            if(!id_formato || (!url && !ficheiro) || !nome) {
                                Swal.showValidationMessage("Todos os campos são obrigatórios!");
                                return false;
                            }
                            return {
                                id_curso: cursos.id_curso,
                                id_formato: parseInt(id_formato),
                                conteudo : url,
                                nome_material: nome,
                                ficheiro: ficheiro || null
                            };
                        },           
                        showCancelButton: true,
                        confirmButtonText: 'Editar Material de Apoio',
                        cancelButtonText: 'Cancelar',
                        customClass: {
                            confirmButton: 'btn btn-success me-2',
                            cancelButton: 'btn btn-danger',
                        },
                    });

                    if(editarMaterialApoio.isConfirmed && editarMaterialApoio.value){
                        try {
                            console.log(editarMaterialApoio.value);
                            await update_material_apoio(id, editarMaterialApoio.value);
                            await fetchMaterialApoio(cursos.id_curso);
                            Swal.fire({
                                icon: "success",
                                title: "Material de apoio editado com sucesso!",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        } catch(error) {
                            Swal.fire({
                                icon: "error",
                                title: "Erro",
                                text: "Não foi possível editar a material de apoio",
                                timer: 2000,
                                showConfirmButton: false,
                            });                            
                        }
                    }
                } else {
                    const formatos = await list_tipo_formato();
                    const adicionarMaterialApoio = await Swal.fire({
                        title: 'Adicionar Material de apoio',
                        html: `
                            <label for="formato" class="form-label">Formato</label>
                            <select id="formato" class="form-control mb-3">
                                ${formatos.map(f => `
                                    <option value="${f.id_formato}" ${f.id_formato}>${f.formato}</option>
                                `).join('')}
                            </select>
                            <label for="nome" class="form-label">Nome</label>
                            <input id="nome" class="form-control mb-3" placeholder="Nome material de apoio"/>
                            <div id="file1InputWrapper" class="d-none">
                            <label for="urlConteudo" id="ficheiro1Label" class="form-label mb-3">URL do Conteúdo</label>
                            <input id="urlConteudo" class="form-control mb-3" placeholder="https://exemplo.com/conteudo.pdf">
                            </div>
                            <div id="file2InputWrapper" class="d-none">
                            <label for="ficheiroConteudo" id="ficheiro2Label" class="form-label">Ficheiro</label>
                            <input type="file" id="ficheiroConteudo" class="form-control mb-3" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx">
                            </div>
                        `,
                            didOpen: () => {
                            const select = document.getElementById('formato');
                            const file2Wrapper = document.getElementById('file2InputWrapper');
                            const file1Wrapper = document.getElementById('file1InputWrapper');
                            const label2 = document.getElementById('ficheiro2Label');
                            const label1 = document.getElementById('ficheiro1Label');
                            const formatosComFicheiro = [2, 3, 5, 6, 7];

                            select.addEventListener('change', () => {
                            const selectedId = parseInt(select.value);
                            const formatoSelecionado = formatos.find(f => f.id_formato === selectedId);

                            if (formatosComFicheiro.includes(selectedId)) {
                                file2Wrapper.classList.remove('d-none');
                                file1Wrapper.classList.add('d-none');
                                label2.textContent = `Ficheiro (${formatoSelecionado.formato})`;
                                label1.textContent = 'Ficheiro';
                            } else {
                                file2Wrapper.classList.add('d-none');
                                file1Wrapper.classList.remove('d-none');
                                label2.textContent = 'Ficheiro';
                                label1.textContent = `Ficheiro (${formatoSelecionado.formato})`;
                            }
                            });
                        },
                        preConfirm: () => {
                            const id_formato = document.getElementById("formato").value;
                            const url = document.getElementById("urlConteudo").value;
                            const nome = document.getElementById("nome").value;
                            const ficheiro = document.getElementById('ficheiroConteudo').files[0];
                            
                            if(!id_formato || (!url && !ficheiro) || !nome) {
                                Swal.showValidationMessage("Todos os campos são obrigatórios!");
                                return false;
                            }
                            return {
                                id_curso: cursos.id_curso,
                                id_formato: parseInt(id_formato),
                                conteudo : url,
                                nome_material: nome,
                                ficheiro: ficheiro || null
                            };
                        },  
                            showCancelButton: true,
                            confirmButtonText: 'Adicionar Material de Apoio',
                            cancelButtonText: 'Cancelar',
                            customClass: {
                                confirmButton: 'btn btn-success me-2',
                                cancelButton: 'btn btn-danger',
                            },
                    });
                    if(adicionarMaterialApoio.isConfirmed && adicionarMaterialApoio.value){
                        try {
                            await create_material_apoio(adicionarMaterialApoio.value);
                            await fetchMaterialApoio(cursos.id_curso);
                            Swal.fire({
                                icon: "success",
                                title: "Material de apoio adicionado com sucesso!",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        } catch(error) {
                            Swal.fire({
                                icon: "error",
                                title: "Erro",
                                text: "Não foi possível adicionar a material de apoio",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        }
                    }
                }
            }catch(error) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Não foi possível adicionar ou editar material de apoio",
                    timer: 2000,
                    showConfirmButton: false,
                });
            }
        } 
    }

    const HandleDeleteMaterialApoio = async (id) => {
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja eliminar Material de apoio?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Não',
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        })

        if(result.isConfirmed) {
            try {
                await delete_material_apoio(id);
                fetchMaterialApoio(cursos.id_curso);
                Swal.fire({
                    icon: "success",
                    title: "Material de apoio excluído com sucesso!",
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch(error) {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Não foi possível excluir a aula",
                    timer: 2000,
                    showConfirmButton: false,
                });
                console.log('Erro ao eliminar material de apoio!');
            }
        }
    }

    //#endregion
    

    //#region extra
    const languageOptions = ISO6391.getAllCodes().map(code => ({
        value: code,
        label: ISO6391.getNativeName(code),
    }));

    const handleLanguageChange = (selectedOption) => {
        setSelectedLanguage(selectedOption);
        setCursos(prev => ({ ...prev, idioma: selectedOption?.value || "" }));
    };

    const getIconById = (id) => {
        return iconMapById[id] || <FaFile className="text-secondary" />;
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

    const atualizarHorasCursoBD = async (id, horas_curso) => {
        try {
            await update_cursos(id, {horas_curso: horas_curso});
            const cursoAtualizado = await fetchCurso(id);
            let hora = Math.floor(cursoAtualizado.horas_curso);
            let minuto = Math.floor((cursoAtualizado.horas_curso - hora) * 60);
            const formato = hora !== 0 && minuto !== 0 ? `${hora}h ${minuto}min` : hora !== 0 ? `${hora}h` : minuto !== 0 ? `${minuto}h` : 'Tempo inválido';
            setHorasCursoFormato(formato);
        } catch (error) {
            console.log('Erro ao atualizar tabela');
        }
    }

    //#endregion


    useEffect(() => {
        const carregarDados = async () => {
            await fetchFormatos();
            await fetchCategoriaAreaTopico();
            await fetchMaterialApoio(id);
            await fetchFormadores();
            const cursosCarregados = await fetchCurso(id);
            const aulasCarregadas = await fetchAulas(id);
            console.log(aulasCarregadas);
            console.log(cursosCarregados);
            if (cursosCarregados?.isassincrono && aulasCarregadas && aulasCarregadas?.length > 0) {
                let horas_curso = calcularHorasCurso(aulasCarregadas);
                atualizarHorasCursoBD(id, horas_curso);
            } else if (cursosCarregados?.isassincrono) {
                atualizarHorasCursoBD(id, 0);
            }
        }
        carregarDados();
    }, []);

    
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
                                    <input type="date" name="data_inicio_inscricao" min={todayStr} className='form-control' value={cursos.data_inicio_inscricao ? formatYearMonthDay(cursos.data_inicio_inscricao) : ""} onChange={handleChange} required />
                                </div>
                                <div className='col'>
                                    <label className='form-label fw-bold'>Fim da Inscrição</label>
                                    <input type="date" name="data_fim_inscricao" min={cursos.data_inicio_inscricao || todayStr} className='form-control' value={cursos.data_fim_inscricao ? formatYearMonthDay(cursos.data_fim_inscricao) : ""} onChange={handleChange} required />
                                </div>
                            </div>

                            <div className='row mt-2'>
                                <div className='col'>
                                    <label className='form-label fw-bold'>Início do Curso</label>
                                    <input type="date" name="data_inicio_curso" min={cursos.data_fim_inscricao || todayStr} className='form-control' value={cursos.data_inicio_curso ? formatYearMonthDay(cursos.data_inicio_curso) : ""} onChange={handleChange} required />
                                </div>
                                <div className='col'>
                                    <label className='form-label fw-bold'>Fim do Curso</label>
                                    <input type="date" name="data_fim_curso" min={cursos.data_inicio_curso || todayStr} className='form-control' value={cursos.data_fim_curso ? formatYearMonthDay(cursos.data_fim_curso) : ""} onChange={handleChange} required />
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
                                <button type="submit" className='btn btn-success mt-3'>Submeter Alterações</button>
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
                                    src={cursos.imagem || `https://ui-avatars.com/api/?name=${encodeURIComponent(cursos.imagem)}&background=random&bold=true`}
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
                                <small>Horas de curso: {horasCursoFormato}</small>
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
                                {/* Aulas */}
                                {cursos.isassincrono === true && (
                                    <div className='mt-4'>
                                        <Table columns={columnsAulas} data={aulas} actions={renderActionsAula} onAddClick={{callback: HandleEditCreateAula, label: 'Aula'}} conteudos={renderConteudos} />
                                    </div>
                                )}
                            </div>
                        </Tab>
                        <Tab eventKey="material_apoio" title="Material Apoio">
                            <div className="mt-4">
                                {/* Material de Apoio */}
                                {cursos.isassincrono === true && (
                                    <div className='mt-4'>
                                        <Table columns={ColumnsMaterialApoio} data={materiais} actions={renderActionsMaterialApoio} onAddClick={{callback: handleEditCreateMaterialApoio, label: 'Material Apoio'}} />
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