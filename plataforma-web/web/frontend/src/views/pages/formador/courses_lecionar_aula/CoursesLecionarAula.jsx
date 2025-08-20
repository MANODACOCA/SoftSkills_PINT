import './CoursesLecionarAula.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { ColumnsMaterialApoio } from '../../../components/table/ColumnsMarterialApoio';
import { columnsAulas } from '../../../components/table/ColumnsAula';
import { getColumnsNotasFinais } from '../../../components/table/ColumnsAvaliacaoFinal';
import { get_cursos } from '../../../../api/cursos_axios';
import { create_material_apoio, delete_material_apoio, get_material_apoio, get_material_apoio_curso, update_material_apoio } from '../../../../api/material_apoio_axios';
import { list_tipo_formato } from '../../../../api/tipo_formato_axios';
import { create_resultados, get_resultados, update_resultados } from '../../../../api/resultados_axios';
import Swal from 'sweetalert2';
import { create_aulas, delete_aulas, getAulas_Curso, update_aulas } from '../../../../api/aulas_axios';
import { list_formadores } from '../../../../api/formadores_axios';
import Table from '../../../components/table/Table';
import { create_conteudos, delete_conteudos, list_conteudos } from '../../../../api/conteudos_axios';
import { useUser } from '../../../../utils/useUser';
import SpinnerBorder from '../../../components/spinner-border/spinner-border';
import { isValidMeetingLink, minutesToInterval, toIsoTimestamp, durationToMinutes } from '../../../components/shared_functions/FunctionsUtils';
import { FaVideo, FaFileAlt, FaFilePowerpoint, FaFileImage, FaFilePdf, FaFileWord } from 'react-icons/fa';
import { create_trabalhos, delete_trabalhos, update_trabalhos, get_trabalhos_curso } from '../../../../api/trabalhos_axios';
import { list_entrega_trabalhos } from '../../../../api/entrega_trabalhos_axios';
import { columnsTrabalhos } from '../../../components/table/ColumnsTrabalho';
import { get_avaliacoes_et, create_avaliacoes_et, update_avaliacoes_et, delete_avaliacoes_et } from '../../../../api/avaliacoes_et_axios';
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const CursoLecionarAula = () => {
    const { id } = useParams();
    const { user } = useUser();
    const [cursos, setCursos] = useState({});
    const [materiais, setMateriais] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [formadores, setFormadores] = useState([]);
    const [formato, setFormato] = useState([]);
    const [resultados, setResultados] = useState([]);
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const [modoEditNotas, setModoEditNotas] = useState(false);
    const [notasEditadas, setNotasEditadas] = useState({});
    const [trabalhos, setTrabalhos] = useState([]);
    const [loadingAulas, setLoadingAulas] = useState(true);
    const [loadingMaterialApoio, setLoadingMaterialApoio] = useState(true);
    const [loadingTrabalhos, setLoadingTrabalhos] = useState(true);
    const [loadingNotas, setLoadingNotas] = useState(true);

    const iconMapById = {
        1: <FaFilePdf className="text-danger" />,
        2: <FaFilePowerpoint className="text-warning" />,
        3: <FaFileWord className="text-blue-600" />,
        4: <FaFileAlt className="text-success" />,
        5: <FaFileAlt className="text-success" />,
        6: <FaFileImage className="text-pink-500" />,
        7: <FaVideo className="text-primary" />,
    };
    const getIconById = (id) => {
        return iconMapById[id] || <FaFile className="text-secondary" />;
    };

    const colunasNotasFinais = getColumnsNotasFinais(modoEditNotas, notasEditadas, setNotasEditadas);

    //#region curso
    const fetchCurso = async (id) => {
        try {
            const response = await get_cursos(id);
            console.log(response);
            setCursos(response);
        } catch (error) {
            console.log('Erro ao encontrar curso');
        }
    }

    const fetchFormadores = async () => {
        try {
            const response = await list_formadores();
            setFormadores(response);
        } catch (error) {
            console.log('Erro ao encontrar a lista de formadores', error);
        }
    }

    const fetchResultados = async (id) => {
        try {
            setLoadingNotas(true);
            const response = await get_resultados(id);
            setResultados(response);
        } catch (error) {
            console.log('Erro ao encontrar a lista de resultados dos formandos', error);
        } finally {
            setLoadingNotas(false);
        }
    }
    //#endregion


    //#region Aula
    const fetchAulas = async (id) => {
        try {
            setLoadingAulas(true);
            const response = await getAulas_Curso(id);
            console.log('Aulas recebidas:', response);
            setAulas(response);
        } catch (error) {
            console.log('Erro encontrar as Aulas', error);
        } finally {
            setLoadingAulas(false);
        }
    }

    const renderConteudos = (item, isExpanded, expandedContent = false) => {
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
                                            <a href={conteudo.conteudo} className="btn btn-outline-success me-2" target="_blank">
                                                <i className='bi bi-box-arrow-up-right'></i></a>
                                            <button className="btn btn-outline-danger" onClick={() => handleDeleteConteudo(conteudo.id_conteudo, item.id_aula)}>
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
        return (
            <div className="d-flex align-items-center justify-content-center">
                {isExpanded
                    ? <IoIosArrowDropup size={22} color="    #444444" />
                    : <IoIosArrowDropdown size={22} color="    #444444" />
                }
            </div>
        );

    }

    const renderActionsAula = (item) => {
        return (
            <div className="d-flex">
                <button className="btn btn-outline-primary me-2" onClick={() => HandleEditCreateAula(item.id_aula, item)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-success me-2" onClick={() => handleAddConteudoAula(item.id_aula)}>
                    <i className="bi bi-file-earmark-plus"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={() => handleDeleteAula(item.id_aula)}>
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

        if (result.isConfirmed) {
            try {
                if (id) {
                    const tempoMinutos = durationToMinutes(aulaData?.tempo_duracao);
                    const editarAula = await Swal.fire({
                        title: 'Editar Aula',
                        html: `
                            <label for="nomeAula" class="form-label">Aula</label>
                            <input id="nomeAula" class="form-control mb-3" placeholder="Nome da aula" value="${aulaData?.nome_aula || ''}">
                            <label for="dataAula" class="form-label">Data da Aula</label>
                            <input id="dataAula" type="date" min="${todayStr}" class="form-control mb-3" value="${aulaData?.data_aula?.split('T')[0] || ''}">
                            <label for="horaAula" class="form-label">Hora da Aula</label>
                            <input id="horaAula" type="time" class="form-control mb-3" value="${aulaData?.data_aula?.split('T')[1]?.slice(0, 5) || ''}">
                            <label for="tempoDuracao" class="form-label">Tempo de Duração (min)</label>
                            <input id="tempoDuracao" type="number" class="form-control mb-3" min="0" value="${tempoMinutos}">
                            <label for="urlAula" class="form-label">URL</label>
                            <input id="urlAula" class="form-control" placeholder="https://exemplo.com/aula" value="${aulaData?.caminho_url || ''}">
                        `,
                        showCancelButton: true,
                        confirmButtonText: 'Editar',
                        cancelButtonText: 'Cancelar',
                        inputValidator: (value) => {
                            if (!value) return 'O URL é obrigatório';
                            if (!/^https?:\/\/.+/.test(value)) return 'Insira um URL válido';
                            return null;
                        },
                        customClass: {
                            confirmButton: 'btn btn-success me-2',
                            cancelButton: 'btn btn-danger',
                        },
                        preConfirm: () => {
                            const nome = document.getElementById('nomeAula').value.trim();
                            const data = document.getElementById('dataAula').value;
                            const hora = document.getElementById('horaAula').value;
                            const tempoM = parseInt(document.getElementById('tempoDuracao').value, 10);
                            const url = document.getElementById('urlAula').value.trim();

                            if (!nome || !data || !hora || !url || isNaN(tempoM)) {
                                Swal.showValidationMessage('Todos os campos são obrigatórios!');
                                return;
                            }

                            if (!isValidMeetingLink(url)) {
                                Swal.showValidationMessage('Link inválido! Aceitamos Zoom, Google Meet ou Teams.');
                                return;
                            }


                            const selectedDateTime = new Date(`${data}T${hora}:00`);
                            const now = new Date();

                            if (selectedDateTime <= now) {
                                Swal.showValidationMessage('A data e a hora têm de ser futuras!');
                                return;
                            }

                            const data_aula = toIsoTimestamp(data, hora);
                            const tempo_duracao = minutesToInterval(tempoM);

                            return {
                                id_curso: cursos.id_curso,
                                data_aula,
                                nome_aula: nome,
                                caminho_url: url,
                                tempo_duracao
                            };
                        }
                    });
                    if (editarAula.isConfirmed && editarAula.value) {
                        try {
                            await update_aulas(id, editarAula.value);
                            await fetchAulas(cursos.id_curso);
                            Swal.fire({
                                icon: "success",
                                title: "Aula editada com sucesso!",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        } catch (error) {
                            Swal.fire({
                                icon: "error",
                                title: "Erro",
                                text: "Não foi possível editar a aula",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        }
                    }
                } else {
                    const adicionarAula = await Swal.fire({
                        title: 'Adicionar Aula',
                        html: `
                            <label for="nomeAula" class="form-label">Aula</label>
                            <input id="nomeAula" class="form-control mb-3" placeholder="Nome da aula" value="${aulaData?.nome_aula || ''}">
                            <label for="dataAula" class="form-label">Data da Aula</label>
                            <input id="dataAula" type="date" class="form-control mb-3" min="${todayStr}">
                            <label for="horaAula" class="form-label">Hora da Aula</label>
                            <input id="horaAula" type="time" class="form-control mb-3">
                            <label for="tempoDuracao" class="form-label">Tempo de Duração (min)</label>
                            <input id="tempoDuracao" type="number" class="form-control mb-3" min="0" value="0">
                            <label for="urlAula" class="form-label">URL</label>
                            <input id="urlAula" class="form-control" placeholder="https://exemplo.com/aula" value="${aulaData?.caminho_url || ''}">
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
                            const data = document.getElementById('dataAula').value;
                            const hora = document.getElementById('horaAula').value;
                            const tempoM = parseInt(document.getElementById('tempoDuracao').value, 10);
                            const url = document.getElementById('urlAula').value.trim();

                            if (!nome || !data || !hora || !url || isNaN(tempoM)) {
                                Swal.showValidationMessage('Todos os campos são obrigatórios!');
                                return;
                            }

                            if (!isValidMeetingLink(url)) {
                                Swal.showValidationMessage('Link inválido! Aceitamos Zoom, Google Meet ou Teams.');
                                return;
                            }

                            const selectedDateTime = new Date(`${data}T${hora}:00`);
                            const now = new Date();

                            if (selectedDateTime <= now) {
                                Swal.showValidationMessage('A data e a hora têm de ser futuras!');
                                return;
                            }

                            const data_aula = toIsoTimestamp(data, hora);
                            const tempo_duracao = minutesToInterval(tempoM);

                            return {
                                id_curso: cursos.id_curso,
                                data_aula,
                                nome_aula: nome,
                                caminho_url: url,
                                tempo_duracao
                            };
                        }
                    });

                    if (adicionarAula.isConfirmed && adicionarAula.value) {
                        try {
                            await create_aulas(adicionarAula.value);
                            await fetchAulas(cursos.id_curso);
                            Swal.fire({
                                icon: "success",
                                title: "Aula adicionada com sucesso!",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        } catch (error) {
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
            } catch (error) {
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

    const handleAddConteudoAula = async (id_aula) => {
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

        if (result.isConfirmed) {
            const formatos = await list_tipo_formato();
            const conteudos = await list_conteudos();
            const adicionarConteudo = await Swal.fire({
                title: 'Adicionar Conteudo',
                html: ` 
                    <label for="formato" class="form-label">Formato</label>
                    <select id="formato" class="form-select mb-3">
                    <option value="">-- Selecione um formato --</option>
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
                    <input type="file" id="ficheiroConteudo" class="form-control mb-3" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt">
                    </div>
                `,
                didOpen: () => {
                    const select = document.getElementById('formato');
                    const file2Wrapper = document.getElementById('file2InputWrapper');
                    const file1Wrapper = document.getElementById('file1InputWrapper');
                    const label2 = document.getElementById('ficheiro2Label');
                    const label1 = document.getElementById('ficheiro1Label');
                    const formatosComFicheiro = [1, 2, 3, 4, 5];

                    select.addEventListener('change', () => {
                        const selectedId = parseInt(select.value);
                        const formatoSelecionado = formatos.find(f => f.id_formato === selectedId);

                        if (isNaN(selectedId)) {
                            file1Wrapper.classList.add('d-none');
                            file2Wrapper.classList.add('d-none');
                            return;
                        }
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
                    return {
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
                try {
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

        if (result.isConfirmed) {
            try {
                await delete_aulas(id);
                await fetchAulas(cursos.id_curso);
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
        if (result.isConfirmed) {
            try {
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
            setLoadingMaterialApoio(true);
            const response = await get_material_apoio_curso(id);
            setMateriais(response);
            console.log(response);
        } catch (error) {
            console.log('Erro ao listar Material de Apoio', error);
        } finally {
            setLoadingMaterialApoio(false);
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
        return (
            <div className="d-flex">
                <a href={item.conteudo} className="btn btn-outline-success me-2" target="_blank">
                    <i className='bi bi-box-arrow-up-right'></i>
                </a>
                <button className="btn btn-outline-primary me-2" onClick={() => handleEditCreateMaterialApoio(item.id_material_apoio)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={() => HandleDeleteMaterialApoio(item.id_material_apoio)}>
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

        if (result.isConfirmed) {
            try {
                if (id != null) {
                    const material = await get_material_apoio(id);
                    const formatos = await list_tipo_formato();
                    const editarMaterialApoio = await Swal.fire({
                        title: 'Editar Material de apoio',
                        html: `
                            <label for="formato" class="form-label">Formato</label>
                            <select id="formato" class="form-select mb-3">
                            <option value="">-- Selecione um formato --</option>
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
                            <p id="ficheiroAtual" class="small mb-2"></p>
                            <label for="ficheiroConteudo" id="ficheiro2Label" class="form-label">Ficheiro</label>
                            <input type="file" id="ficheiroConteudo"class="form-control mb-3" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt">
                            </div>
                        `,
                        didOpen: () => {
                            const select = document.getElementById('formato');
                            const file2Wrapper = document.getElementById('file2InputWrapper');
                            const file1Wrapper = document.getElementById('file1InputWrapper');
                            const urlInput = document.getElementById('urlConteudo');
                            const label2 = document.getElementById('ficheiro2Label');
                            const label1 = document.getElementById('ficheiro1Label');
                            const formatosComFicheiro = [1, 2, 3, 4, 5];

                            const ficheiroAtual = document.getElementById('ficheiroAtual');
                            function atualizarCampos() {
                                //select.addEventListener('change', () => {
                                const selectedId = parseInt(select.value);
                                if (isNaN(selectedId)) {
                                    file1Wrapper.classList.add('d-none');
                                    file2Wrapper.classList.add('d-none');
                                    return;
                                }
                                const formatoSelecionado = formatos.find(f => f.id_formato === selectedId);

                                if (formatosComFicheiro.includes(selectedId)) {
                                    file2Wrapper.classList.remove('d-none');
                                    file1Wrapper.classList.add('d-none');
                                    ficheiroAtual.textContent = material.conteudo
                                        ? `Ficheiro atual: ${material.conteudo.split('/').pop()}`
                                        : 'Nenhum ficheiro carregado.';
                                    label2.textContent = `Ficheiro (${formatoSelecionado.formato})`;
                                    label1.textContent = 'Ficheiro';
                                } else {
                                    file2Wrapper.classList.add('d-none');
                                    file1Wrapper.classList.remove('d-none');
                                    label2.textContent = 'Ficheiro';
                                    label1.textContent = `Ficheiro (${formatoSelecionado.formato})`;
                                    urlInput.value = material.conteudo || '';
                                }
                            }
                            atualizarCampos();
                            select.addEventListener('change', atualizarCampos);
                        },
                        preConfirm: () => {
                            const id_formato = document.getElementById("formato").value;
                            const url = document.getElementById("urlConteudo").value;
                            const nome = document.getElementById("nome").value;
                            const ficheiro = document.getElementById('ficheiroConteudo').files[0];

                            if (!id_formato || (!url && !ficheiro) || !nome) {
                                Swal.showValidationMessage("Todos os campos são obrigatórios!");
                                return false;
                            }
                            return {
                                id_curso: cursos.id_curso,
                                id_formato: parseInt(id_formato),
                                conteudo: url,
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

                    if (editarMaterialApoio.isConfirmed && editarMaterialApoio.value) {
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
                        } catch (error) {
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
                            <select id="formato" class="form-select mb-3">
                            <option value="">-- Selecione um formato --</option>
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
                            <input type="file" id="ficheiroConteudo" class="form-control mb-3" accept=".pdf,.png,.jpg,.jpeg,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt">
                            </div>
                        `,
                        didOpen: () => {
                            const select = document.getElementById('formato');
                            const file2Wrapper = document.getElementById('file2InputWrapper');
                            const file1Wrapper = document.getElementById('file1InputWrapper');
                            const label2 = document.getElementById('ficheiro2Label');
                            const label1 = document.getElementById('ficheiro1Label');
                            const formatosComFicheiro = [1, 2, 3, 4, 5];

                            select.addEventListener('change', () => {
                                const selectedId = parseInt(select.value);
                                if (isNaN(selectedId)) {
                                    file1Wrapper.classList.add('d-none');
                                    file2Wrapper.classList.add('d-none');
                                    return;
                                }
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

                            if (!id_formato || (!url && !ficheiro) || !nome) {
                                Swal.showValidationMessage("Todos os campos são obrigatórios!");
                                return false;
                            }
                            return {
                                id_curso: cursos.id_curso,
                                id_formato: parseInt(id_formato),
                                conteudo: url,
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
                    if (adicionarMaterialApoio.isConfirmed && adicionarMaterialApoio.value) {
                        try {
                            await create_material_apoio(adicionarMaterialApoio.value);
                            await fetchMaterialApoio(cursos.id_curso);
                            Swal.fire({
                                icon: "success",
                                title: "Material de apoio adicionado com sucesso!",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        } catch (error) {
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
            } catch (error) {
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

        if (result.isConfirmed) {
            try {
                await delete_material_apoio(id);
                fetchMaterialApoio(cursos.id_curso);
                Swal.fire({
                    icon: "success",
                    title: "Material de apoio excluído com sucesso!",
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
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

    console.log(notasEditadas);
    //#region Resultados
    const handleEditarGuardarResultados = async () => {
        if (modoEditNotas) {
            try {
                await Promise.all(
                    Object.entries(notasEditadas).map(async ([id_resultado, nota]) => {
                        const val = Number(nota);
                        if (isNaN(val) || val < 0 || val > 20) {
                            throw new Error(`Nota ${nota} inválida`);
                        }

                        const resultadoExistente = resultados.find(
                            item => item.id_formando_formando.resultados?.[0]?.id_resul?.toString() === id_resultado
                        );

                        if (resultadoExistente) {
                            return update_resultados(id_resultado, { resul: val });
                        } else {
                            const inscricao = resultados.find(
                                item => item.id_inscricao?.toString() === id_resultado
                            );

                            if (!inscricao) {
                                throw new Error(`Não foi possível encontrar inscrição com id ${id_resultado}`);
                            }

                            const id_formando = inscricao.id_formando_formando.id_formando;

                            return create_resultados({
                                id_formando: id_formando,
                                id_curso_sincrono: id,
                                resul: val
                            });
                        }
                    })
                );

                await fetchResultados(cursos.id_curso);
                setNotasEditadas({});
                Swal.fire({ icon: 'success', title: 'Notas guardadas!', timer: 3000, showConfirmButton: false });

            } catch (err) {
                Swal.fire({ icon: 'error', title: 'Erro ao guardar', text: err.message, timer: 3000, showConfirmButton: false });
                return;
            }
        }

        setModoEditNotas(!modoEditNotas);
    };
    //#endregion



    //#region Trabalhos
    //mostrar trabalhos entregues
    const [entregaTrabalhos, setEntregaTrabalhos] = useState({});
    const [alterarNotasTrabalhos, setAlterarNotasTrabalhos] = useState(false);
    const [notas, setNotas] = useState({});

    const fetchEntregaTrabalhos = async (id_trabalho) => {
        try {
            const data = await list_entrega_trabalhos(id_trabalho);
            setEntregaTrabalhos((prev) => ({
                ...prev,
                [id_trabalho]: data
            }));
        } catch (error) {
            console.error("Erro ao buscar trabalhos entregues:", err)
        }
    }

    const fetchNotasTrabalhos = async (id_trabalho) => {
        const entregas = entregaTrabalhos[id_trabalho];
        const novasNotas = { ...notas };
        for (const entrega of entregas) {
            try {
                const avaliacao = await get_avaliacoes_et(entrega.id_entrega_trabalho);
                novasNotas[entrega.id_entrega_trabalho] = avaliacao?.avaliacao;
            } catch (error) {
                //ainda não tem nota atribuida
            }
        }
        setNotas(novasNotas);
    }

    const salvarNotas = async () => {
        try {

            for (const [id_entrega_trabalho, nota] of Object.entries(notas)) {
                if (nota === '' || nota === null) return;

                if (nota < 0 || nota > 20) {
                    Swal.fire({
                        title: "Nota(s) inválida(s)!",
                        text: "Todas as notas devem estar entre 0 e 20.",
                        icon: "error",
                        draggable: true,
                        showConfirmButton: false,
                        timer: 3000,
                    });
                    return;
                }
            }

            const promessas = Object.entries(notas).map(async ([id_entrega_trabalho, nota]) => {
                if (nota === '' || nota === null) return;

                const data = {
                    id_entrega_trabalho_aet: id_entrega_trabalho,
                    avaliacao: parseFloat(nota),
                };

                try {
                    const existente = await get_avaliacoes_et(id_entrega_trabalho);
                    if (existente) {
                        await update_avaliacoes_et(id_entrega_trabalho, data);
                    }
                } catch {
                    await create_avaliacoes_et(data);
                }
            });

            await Promise.all(promessas);
            Swal.fire({
                title: "Notas dos trabalhos guardadas com sucesso!",
                icon: "success",
                draggable: true,
                showConfirmButton: false,
                timer: 3000,
            });

            setAlterarNotasTrabalhos(false);
        } catch (error) {
            console.error("Erro ao salvar notas:", error);
            Swal.fire({
                title: "Erro ao salvar notas de trabalhos.",
                icon: "error",
                draggable: true,
                showConfirmButton: false,
                timer: 3000,
            });
        }
    };

    useEffect(() => {
        if (entregaTrabalhos || alterarNotasTrabalhos) {
            Object.keys(entregaTrabalhos).forEach(id_trabalho => {
                fetchNotasTrabalhos(id_trabalho);
            });
        }
    }, [entregaTrabalhos, alterarNotasTrabalhos])

    const renderTrabalhos = (item, isExpanded, expandedContent = false) => {
        const entregas = entregaTrabalhos[item.id_trabalho];

        if (expandedContent && entregas === undefined) {
            fetchEntregaTrabalhos(item.id_trabalho);
            return <div className="p-2">Carregando entregas...</div>;
        }

        if (expandedContent) {
            return (
                <div className="m-0 bg-light border rounded">
                    <div className='d-flex align-items-center justify-content-between p-2'>
                        <h6>Trabalhos Entregues</h6>
                        {entregas?.length > 0 && (
                            <>
                                {alterarNotasTrabalhos ? (
                                    <button className='btn btn-primary' onClick={() => salvarNotas()}>
                                        <i className='bi bi-plus-lg me-2'></i>
                                        Guardar
                                    </button>
                                ) : (
                                    <button className='btn btn-primary' onClick={() => setAlterarNotasTrabalhos(true)}>
                                        <i className='bi bi-plus-lg me-2'></i>
                                        Editar
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                    <div className='mx-2 my-1 border rounded'>
                        {entregas?.length > 0 ? (
                            entregas.map((entrega, index) => (
                                <div key={index} className={`${index % 2 === 0 ? 'line-bg' : 'bg-light'} p-2`}>
                                    <div className='d-flex align-items-center justify-content-between'>
                                        <div className='w-25'>
                                            <div><strong>ID Aluno:</strong> {entrega.id_formando_et}</div>
                                        </div>
                                        <div className='w-25'>
                                            <div><strong>Nome do Aluno:</strong> {entrega.id_formando_et_formando.id_formando_utilizador?.nome_util}</div>
                                        </div>

                                        <div className='d-flex align-items-center justify-content-center w-25'>
                                            <strong>Trabalho:</strong>
                                            <a href={entrega.caminho_et} target="_blank" className="btn btn-outline-success ms-3 me-2">
                                                <i className="bi bi-box-arrow-up-right"></i>
                                            </a>
                                        </div>
                                        <div className='d-flex align-items-center justify-content-end gap-1 w-25'>
                                            <strong>Nota:</strong>
                                            {alterarNotasTrabalhos ? (
                                                <input
                                                    placeholder="0-20"
                                                    type="number"
                                                    className="form-control form-control-sm text-end"
                                                    min={0}
                                                    max={20}
                                                    step={0.1}
                                                    style={{ maxWidth: '70px' }}
                                                    value={notas[entrega.id_entrega_trabalho] || ''}
                                                    onChange={(e) =>
                                                        setNotas({
                                                            ...notas,
                                                            [entrega.id_entrega_trabalho]: e.target.value
                                                        })
                                                    }
                                                />
                                            ) : (
                                                <div style={{ width: '35px' }}>{notas[entrega.id_entrega_trabalho]}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-2">Nenhum trabalho entregue no momento</div>
                        )}
                    </div>
                </div>
            );
        }

        return (
            <div className="d-flex align-items-center justify-content-center">
                {isExpanded
                    ? <IoIosArrowDropup size={22} color="    #444444" />
                    : <IoIosArrowDropdown size={22} color="    #444444" />
                }
            </div>
        );
    };
    //mostrar trabalhos entregues


    const handleEditarTrabalho = async (trabalho) => {
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja editar o Trabalho?',
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

        if (result.isConfirmed) {
            try {
                if (id != null) {
                    const formatos = await list_tipo_formato();
                    const formatosComFicheiro = [1, 2, 3, 4, 5];
                    const editarTrabalho = await Swal.fire({
                        title: 'Editar trabalho',
                        html: `
                        <label class="form-label">Nome do Trabalho</label>
                        <input id="nomeTr" class="form-control mb-3" placeholder="Nome..." value="${trabalho?.nome_tr || ''}" />

                        <label for="descTr" class="form-label">Descrição</label>
                        <textarea id="descTr" class="form-control mb-3" placeholder="Descrição...">${trabalho?.descricao_tr || ''}</textarea>

                        <label class="form-label">Data de Entrega</label>
                        <input id="dataTr" type="date" class="form-control mb-3" value="${trabalho?.data_entrega_tr?.split('T')[0] || ''}" />

                        <label class="form-label">Hora de Entrega</label>
                        <input id="horaTr" type="time" class="form-control mb-3" value="${trabalho?.data_entrega_tr?.split('T')[1]?.slice(0, 5) || ''}" />

                        <label for="formatoTr" class="form-label">Formato</label>
                        <select id="formatoTr" class="form-select mb-3">
                            <option value="">-- Selecione um formato --</option>
                            ${formatos.map(f => `
                                <option value="${f.id_formato}" ${f.id_formato == trabalho?.id_formato_tr ? 'selected' : ''}>${f.formato}</option>
                            `).join('')}
                        </select>

                        <div id="fileInputWrapper" class="d-none">
                            <p id="ficheiroAtual" class="small mb-3"></p>
                            <label for="ficheiroTr" id="ficheiroLabel" class="form-label">Ficheiro</label>
                            <input type="file" id="ficheiroTr" class="form-control mb-3" value="${trabalho.caminho_tr}" />
                        </div>

                        <div id="urlInputWrapper" class="d-none">
                            <label for="urlTr" id="urlLabel" class="form-label">URL</label>
                            <input type="text" id="urlTr" class="form-control mb-2" value="${trabalho.caminho_tr}" placeholder="https://exemplo.com/trabalho.pdf" />
                        </div>
                        `,
                        didOpen: () => {
                            const formatoEl = document.getElementById('formatoTr');
                            const fileWrapper = document.getElementById('fileInputWrapper');
                            const urlWrapper = document.getElementById('urlInputWrapper');
                            const ficheiroAtual = document.getElementById('ficheiroAtual');
                            const fileLabel = document.getElementById('ficheiroLabel');
                            const urlLabel = document.getElementById('urlLabel');
                            const urlInput = document.getElementById('urlTr');

                            function atualizarCampos() {
                                const selectedId = parseInt(formatoEl.value);
                                if (isNaN(selectedId)) {
                                    fileWrapper.classList.add('d-none');
                                    urlWrapper.classList.add('d-none');
                                    return;
                                }

                                const formatoSelecionado = formatos.find(f => f.id_formato === selectedId);

                                if (formatosComFicheiro.includes(selectedId)) {
                                    fileWrapper.classList.remove('d-none');
                                    urlWrapper.classList.add('d-none');
                                    ficheiroAtual.textContent = trabalho?.caminho_tr
                                        ? `Ficheiro atual: ${trabalho.caminho_tr.split('/').pop()}`
                                        : 'Nenhum ficheiro carregado.';
                                    fileLabel.textContent = `Ficheiro (${formatoSelecionado.formato})`;
                                } else {
                                    fileWrapper.classList.add('d-none');
                                    urlWrapper.classList.remove('d-none');
                                    urlLabel.textContent = `URL (${formatoSelecionado.formato})`;
                                    urlInput.value = trabalho?.caminho_tr || '';
                                }
                            }

                            atualizarCampos();
                            formatoEl.addEventListener('change', atualizarCampos);
                        },
                        preConfirm: () => {
                            const nome = document.getElementById('nomeTr').value.trim();
                            const descricao = document.getElementById('descTr').value.trim();
                            const data = document.getElementById('dataTr').value;
                            const hora = document.getElementById('horaTr').value;
                            const id_formato = parseInt(document.getElementById('formatoTr').value);
                            const ficheiro = document.getElementById('ficheiroTr').files[0];

                            if (!nome || !descricao || !data || !hora || !id_formato) {
                                Swal.showValidationMessage("Todos os campos são obrigatórios!");
                                return false;
                            }

                            const data_entrega_tr = `${data}T${hora}:00`;

                            return {
                                nome_tr: nome,
                                descricao_tr: descricao,
                                data_entrega_tr,
                                id_formato_tr: id_formato,
                                ficheiro: ficheiro,
                                id_curso_tr: cursos.id_curso
                            };
                        },
                        showCancelButton: true,
                        confirmButtonText: 'Editar Trabalho',
                        cancelButtonText: 'Cancelar',
                        customClass: {
                            confirmButton: 'btn btn-success me-2',
                            cancelButton: 'btn btn-danger'
                        },
                    });

                    if (editarTrabalho.isConfirmed && editarTrabalho.value) {
                        try {
                            await update_trabalhos(trabalho.id_trabalho, editarTrabalho.value);
                            await fetchTrabalhos(trabalho.id_curso_tr);
                            Swal.fire({
                                icon: "success",
                                title: "Trabalho editado com sucesso!",
                                timer: 2000,
                                showConfirmButton: false
                            });
                        } catch (error) {
                            Swal.fire({
                                icon: "error",
                                title: "Erro",
                                text: "Não foi possível editar o trabalho",
                                timer: 2000,
                                showConfirmButton: false,
                            });
                        }
                    } else {
                    }
                } else {

                }
            } catch (error) {

            }
        }
    }



    const handleCreateTrabalho = async (trabalho) => {
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja adicionar trabalho?',
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
        if (result.isConfirmed) {
            try {
                const formatos = await list_tipo_formato();
                const formatosComFicheiro = [1, 2, 3, 4, 5];
                const adicionarTrabalho = await Swal.fire({
                    title: 'Adicionar Trabalho',
                    html: `
                    <label class="form-label">Nome do Trabalho</label>
                    <input id="nomeTr" class="form-control mb-2" placeholder="Nome..." value="${trabalho?.nome_tr || ''}" />

                    <label class="form-label">Descrição</label>
                    <textarea id="descTr" class="form-control mb-2" placeholder="Descrição...">${trabalho?.descricao_tr || ''}</textarea>

                    <label class="form-label">Data de Entrega</label>
                    <input id="dataTr" type="date" class="form-control mb-2" value="${trabalho?.data_entrega_tr?.split('T')[0] || ''}" />

                    <label class="form-label">Hora de Entrega</label>
                    <input id="horaTr" type="time" class="form-control mb-2" value="${trabalho?.data_entrega_tr?.split('T')[1]?.slice(0, 5) || ''}" />

                    <label for="formatoTr" class="form-label">Formato</label>
                    <select id="formatoTr" class="form-select mb-3">
                        <option value="">-- Selecione um formato --</option>
                        ${formatos.map(f => `
                            <option value="${f.id_formato}" ${f.id_formato == trabalho?.id_formato_tr ? 'selected' : ''}>${f.formato}</option>
                        `).join('')}
                    </select>

                    <div id="fileInputWrapper" class="d-none">
                        <p id="ficheiroAtual" class="small mb-2"></p>
                        <label for="ficheiroTr" id="ficheiroLabel" class="form-label">Ficheiro</label>
                        <input type="file" id="ficheiroTr" class="form-control mb-2" />
                    </div>

                    <div id="urlInputWrapper" class="d-none">
                        <label for="urlTr" id="urlLabel" class="form-label">URL</label>
                        <input type="text" id="urlTr" class="form-control mb-2" placeholder="https://exemplo.com/trabalho.pdf" />
                    </div>
                    `,
                    didOpen: () => {
                        const formatoEl = document.getElementById('formatoTr');
                        const fileWrapper = document.getElementById('fileInputWrapper');
                        const urlWrapper = document.getElementById('urlInputWrapper');
                        const ficheiroAtual = document.getElementById('ficheiroAtual');
                        const fileLabel = document.getElementById('ficheiroLabel');
                        const urlLabel = document.getElementById('urlLabel');
                        const urlInput = document.getElementById('urlTr');

                        function atualizarCampos() {
                            const selectedId = parseInt(formatoEl.value);
                            if (isNaN(selectedId)) {
                                fileWrapper.classList.add('d-none');
                                urlWrapper.classList.add('d-none');
                                return;
                            }

                            const formatoSelecionado = formatos.find(f => f.id_formato === selectedId);

                            if (formatosComFicheiro.includes(selectedId)) {
                                fileWrapper.classList.remove('d-none');
                                urlWrapper.classList.add('d-none');
                                ficheiroAtual.textContent = trabalho?.caminho_tr
                                    ? `Ficheiro atual: ${trabalho.caminho_tr.split('/').pop()}`
                                    : 'Nenhum ficheiro carregado.';
                                fileLabel.textContent = `Ficheiro (${formatoSelecionado.formato})`;
                            } else {
                                fileWrapper.classList.add('d-none');
                                urlWrapper.classList.remove('d-none');
                                urlLabel.textContent = `URL (${formatoSelecionado.formato})`;
                                urlInput.value = trabalho?.caminho_tr || '';
                            }
                        }

                        atualizarCampos();
                        formatoEl.addEventListener('change', atualizarCampos);
                    },
                    preConfirm: () => {
                        const nome = document.getElementById('nomeTr').value.trim();
                        const descricao = document.getElementById('descTr').value.trim();
                        const data = document.getElementById('dataTr').value;
                        const hora = document.getElementById('horaTr').value;
                        const id_formato = parseInt(document.getElementById('formatoTr').value);
                        const ficheiro = document.getElementById('ficheiroTr').files[0];

                        if (!nome || !descricao || !data || !hora || !id_formato || !ficheiro) {
                            Swal.showValidationMessage("Todos os campos são obrigatórios!");
                            return false;
                        }

                        const data_entrega_tr = `${data}T${hora}:00`;

                        return {
                            nome_tr: nome,
                            descricao_tr: descricao,
                            data_entrega_tr,
                            id_formato_tr: id_formato,
                            ficheiro: ficheiro,
                            id_curso_tr: cursos.id_curso
                        };
                    },
                    showCancelButton: true,
                    confirmButtonText: 'Adicionar Trabalho',
                    cancelButtonText: 'Cancelar',
                    customClass: {
                        confirmButton: 'btn btn-success me-2',
                        cancelButton: 'btn btn-danger'
                    }
                });
                if (adicionarTrabalho.isConfirmed && adicionarTrabalho.value) {
                    try {
                        const data = await create_trabalhos(adicionarTrabalho.value);
                        fetchTrabalhos(data.id_curso_tr);
                        Swal.fire({
                            icon: "success",
                            title: "Trabalho adicionado com sucesso!",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    } catch (error) {
                        Swal.fire({
                            icon: "error",
                            title: "Erro",
                            text: "Não foi possível adicionar o trabalho",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                }
            } catch (error) {

            }
        }

    }


    const handleDeleteTrabalho = async (item) => {
        const result = await Swal.fire({
            title: "Tem certeza que deseja excluir este trabalho?",
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

        if (result.isConfirmed) {
            try {
                await delete_trabalhos(item.id_trabalho);
                await fetchTrabalhos(item.id_curso_tr);
                Swal.fire({
                    icon: "success",
                    title: "Trabalho excluído com sucesso!",
                    timer: 2000,
                    showConfirmButton: false
                });
            } catch (error) {
                console.error("Erro ao excluir trabalho:", error);
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


    const fetchTrabalhos = async (id_curso) => {
        try {
            setLoadingTrabalhos(true);
            const response = await get_trabalhos_curso(id_curso);
            setTrabalhos(response);
        } catch (err) {
            console.error("Erro ao buscar trabalhos", err);
        } finally {
            setLoadingTrabalhos(false);
        }
    };

    const renderActionsTrabalhos = (item) => {
        return (
            <div className="d-flex">
                <button className="btn btn-outline-primary me-2" onClick={() => handleEditarTrabalho(item)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={() => handleDeleteTrabalho(item)}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        );
    }

    //#endregion

    useEffect(() => {
        const carregarDados = async () => {
            await fetchFormatos();
            await fetchMaterialApoio(id);
            await fetchFormadores();
            await fetchCurso(id);
            await fetchAulas(id);
            await fetchResultados(id);
            await fetchFormatos(id);
            await fetchTrabalhos(id);
        }
        carregarDados();
    }, []);

    if (!user || !user.id_utilizador || !cursos || !cursos.sincrono) {
        return <SpinnerBorder />
    }/* 
    if (cursos.sincrono === null) {
        return <div className="alert alert-danger text-center mt-4">
            <i className='bi bi-x-circle fs-1'></i><br />
            O curso <strong>{cursos.nome_curso}</strong> é assincrono, apenas administradores podem editar!
        </div>;
    } */
    if (user.id_utilizador !== cursos.sincrono.id_formador) {
        return <div className="alert alert-danger text-center mt-4">
            <i className='bi bi-x-circle fs-1'></i><br />
            Não pode aceder à página visto que não é formador do curso <strong>{cursos.nome_curso}</strong>
        </div>;
    }

    return (
        <div className="">
            <div className='w-100'>
                {cursos && (
                    <img
                        src={cursos.imagem || `https://ui-avatars.com/api/?name=${encodeURIComponent(cursos.nome_curso)}&background=random&bold=true`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cursos.nome_curso)}&background=random&bold=true`;
                        }}
                        alt="Imagem de perfil"
                        className='w-100 img-profile rounded-2 mb-3 img-header-course'
                    />
                )}
            </div>
            <div className='mb-3'>
                <h2>{cursos.nome_curso}</h2>
            </div>
            <Tabs defaultActiveKey="aulas" className="mb-4 nav-justified custom-tabs" >
                <Tab eventKey="aulas" title={<span className='fw-bold'>Aulas</span>}>
                    <div className="mt-4">
                        {/* Aulas */}
                        <div className='mt-4'>
                            <Table columns={columnsAulas} data={aulas || []} actions={renderActionsAula} onAddClick={{ callback: HandleEditCreateAula, label: 'Aula' }} conteudos={renderConteudos} loading={loadingAulas} />
                        </div>
                    </div>
                </Tab>

                <Tab eventKey="material" title={<span className='fw-bold'>Material de apoio</span>}>
                    <div className="mt-4">
                        {/* Material de Apoio */}
                        <div className='mt-4'>
                            <Table columns={ColumnsMaterialApoio} data={materiais || []} actions={renderActionsMaterialApoio} onAddClick={{ callback: handleEditCreateMaterialApoio, label: 'Material Apoio' }} loading={loadingMaterialApoio} />
                        </div>
                    </div>
                </Tab>


                <Tab eventKey="trabalhos" title={<span className="fw-bold">Trabalhos</span>}>
                    <div className="mt-4">
                        {/* Trabalhos */}
                        <Table columns={columnsTrabalhos} data={trabalhos || []} actions={renderActionsTrabalhos} onAddClick={{ callback: handleCreateTrabalho, label: 'Trabalhos' }} conteudos={renderTrabalhos} loading={loadingTrabalhos} />
                    </div>
                </Tab>

                <Tab eventKey="avaliacaoFinal" title={<span className='fw-bold'>Avaliação final</span>}>
                    <div className="mt-4">
                        <Table columns={colunasNotasFinais} data={resultados} actions={null} loading={loadingNotas}
                            onAddClick={resultados.length > 0 ? {
                                callback: handleEditarGuardarResultados,
                                label: modoEditNotas ? 'Guardar' : 'Editar',
                                icon: modoEditNotas ? 'bi-check-lg' : 'bi-pencil',
                                variant: modoEditNotas ? 'success' : 'primary',
                            } : null} />
                    </div>
                </Tab>
            </Tabs>
        </div>
    )

}


export default CursoLecionarAula;