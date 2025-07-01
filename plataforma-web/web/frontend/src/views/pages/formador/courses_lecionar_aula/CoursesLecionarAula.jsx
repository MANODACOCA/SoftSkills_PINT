import './CoursesLecionarAula.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { ColumnsMaterialApoio } from '../../../components/table/ColumnsMarterialApoio';
import { columnsAulas } from '../../../components/table/ColumnsAula';
import { get_cursos } from '../../../../api/cursos_axios';
import { create_material_apoio, delete_material_apoio, get_material_apoio, get_material_apoio_curso, update_material_apoio } from '../../../../api/material_apoio_axios';
import { list_tipo_formato } from '../../../../api/tipo_formato_axios';
import Swal from 'sweetalert2';
import { create_aulas, delete_aulas, getAulas_Curso, update_aulas } from '../../../../api/aulas_axios';
import { list_formadores } from '../../../../api/formadores_axios';
import Table from '../../../components/table/Table';
import { create_conteudos, delete_conteudos, list_conteudos } from '../../../../api/conteudos_axios';
import { useUser } from '../../../../utils/useUser';

const CursoLecionarAula = () => {
    const { id } = useParams();
    const { user } = useUser();
    const [cursos, setCursos] = useState({});
    const [materiais, setMateriais] = useState([]);
    const [aulas, setAulas] = useState([]);
    const [formadores, setFormadores] = useState([]);
    const [formato, setFormato] = useState([]);


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
                            await fetchAulas(cursos.id_curso);
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
                            <input id="nomeAula" class="form-control mb-3" placeholder="Nome da aula" value="${aulaData?.nome_aula || ''}">
                            <label for="dataAula" class="form-label">Data aula</label>
                            <input id="dataAula" class="form-control mb-3" placeholder= "Data da aula">
                            <label for="dataAula" class="form-label">Data aula</label>
                            <input id="dataAula" class="form-control mb-3" placeholder= "Data da aula">                            
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
            console.log(response);
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
                <i className='bi bi-box-arrow-up-right'></i>
            </a>
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
     

    useEffect(() => {
        const carregarDados = async () => {
            await fetchFormatos();
            await fetchMaterialApoio(id);
            await fetchFormadores();
            await fetchCurso(id);
            await fetchAulas(id);
        }
        carregarDados();
    }, []);

    if (!user || !user.id_utilizador || !cursos || !cursos.sincrono) {
        return <div className="text-center mt-5">A carregar...</div>;
    }

    if (user.id_utilizador !== cursos.sincrono.id_formador) {
        return <div className="alert alert-danger text-center mt-4">Não pode aceder à página visto que não é formador do curso <strong>{cursos.nome_curso}</strong></div>;
    }

    return (
        <div className=""> 
            <div className='w-100'> 
                {cursos && (
                    <img
                        src={cursos.imagem || `https://ui-avatars.com/api/?name=${encodeURIComponent(cursos.imagem)}&background=random&bold=true`}
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(cursos.imagem)}&background=random&bold=true`;
                        }}
                        alt="Imagem de perfil"
                        className='w-100 img-profile rounded-2 mb-5 img-header-course'
                    />
                )}
            </div>
            <Tabs defaultActiveKey="aulas" className="mb-4 nav-justified custom-tabs" >
                <Tab eventKey="aulas" title={<span className='fw-bold'>Aulas</span>}>
                    <div className="mt-4">
                        {/* Aulas */}
                        <div className='mt-4'>
                            <Table columns={columnsAulas} data={aulas || []} actions={renderActionsAula} onAddClick={{callback: HandleEditCreateAula, label: 'Aula'}} conteudos={renderConteudos} />
                        </div>
                    </div>
                </Tab>

                <Tab eventKey="material" title={<span className='fw-bold'>Material de apoio</span>}>
                    <div className="mt-4">
                    {/* Material de Apoio */}
                        <div className='mt-4'>
                            <Table columns={ColumnsMaterialApoio} data={materiais || []} actions={renderActionsMaterialApoio} onAddClick={{callback: handleEditCreateMaterialApoio, label: 'Material Apoio'}} />
                        </div>
                    </div>
                </Tab>
    
                <Tab eventKey="eventos" title={<span className='fw-bold'>Trabalhos</span>}>
                    
                </Tab>

                {/*
                <Tab eventKey="notasTrabalhos" title={<span className='fw-bold'>Trabalhos</span>}>
                    
                </Tab>
                */}
                
                <Tab eventKey="sobre" title={<span className='fw-bold'>Sobre</span>}>
                    <div>
                        <div className='mb-3'>
                            <div>
                                <img src={cursos.imagem} alt="" />
                            </div>
                            <div>
                                <h5>{cursos.sincrono.id_formador_formadore.id_formador_utilizador.nome_util}</h5>
                                <small className='alert alert-success py-1 px-2'>
                                    <i className='bi bi-geo-alt me-2'></i>
                                    teste
                                </small>    
                            </div>
                        </div>
                        <p>{cursos.sincrono.id_formador_formadore.descricao_formador}</p>
                    </div>
                </Tab>
            </Tabs>
        </div>
    )
  
}

export default CursoLecionarAula;