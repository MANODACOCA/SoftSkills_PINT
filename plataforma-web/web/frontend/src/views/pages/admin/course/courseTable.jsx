import Table from "../../../components/table/Table";
import { columnsCursos } from "../../../components/table/ColumnsCursos";
import { useEffect, useState } from "react";
import { getCourseAdminLista, update_cursos } from "../../../../api/cursos_axios";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from 'sweetalert2';
import { debounce } from 'lodash';

const CourseTable = () => {
    const [cursos, setcursos] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchTerm, setSearchTerm] = useState('');
 
    const FetchCursos = async () => {
        try {
            const response = await getCourseAdminLista(searchTerm || "");
    
            const cursosPorRaiz = {};

            response.forEach((curso) => {
                const raiz = curso.ocorrencias_edicos?.[0]?.id_curso_raiz || curso.id_curso;
                if (!cursosPorRaiz[raiz]) cursosPorRaiz[raiz] = [];
                cursosPorRaiz[raiz].push(curso);
            });

            const cursosFinais = Object.values(cursosPorRaiz).map(grupo => {
                const ordenado = grupo.sort((a, b) => {
                    const dataA = new Date(a.ocorrencias_edicos?.[0]?.data_ult_ocorrencia || a.data_inicio_curso);
                    const dataB = new Date(b.ocorrencias_edicos?.[0]?.data_ult_ocorrencia || b.data_inicio_curso);
                    return dataB - dataA;
                });
                return {
                    ...ordenado[0],
                    ocorrencias_anteriores: ordenado.slice(1)
                };
            });

            setcursos(cursosFinais);

        } catch(error) {
            console.log('Erro ao listar Cursos')
        }
    }

    const debouncedNavigate = debounce((value) => {
        const params = new URLSearchParams(location.search);
        if (value) {
            params.set("search", value);
        } else {
            params.delete("search");
        }
        navigate(`${location.pathname}?${params.toString()}`);
    });

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        setSearchTerm(params.get('search') || '');
    }, [location.search]);
    
    const HandleUpdate = async (id, estado) => {
        const result = await Swal.fire({
            title: estado ? 'Deseja ocultar este curso?' : 'Deseja mostrar este curso?',
            text: estado ? 'O curso será escondido da lista!' : 'O curso será tornado visível novamente!',
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

        if(result.isConfirmed){
            try{
                await update_cursos(id, {estado: !estado});
                await FetchCursos();
                console.log(estado);
                Swal.fire({
                    title: 'Sucesso',
                    text: `Curso ${estado ? 'ocultado' : 'visivel'} com sucesso`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }); 
            } catch(error){
                Swal.fire({
                    title: 'Erro', 
                    text: 'Ocorreu um erro ao atualizar o curso', 
                    icon: 'error',
                    confirmButtonText: 'Fechar',
                    customClass: {
                        confirmButton: 'btn btn-danger',
                    },
                });
                console.error("Erro ao esconder curso", error);
            }
        }
    }

    const HandleEditCreate = (id = null) => {
        if (id != null) {
            navigate(`/admin/cursos/editar/${id}`);
        } else {
            navigate(`/admin/cursos/criar`);
        }
    };

    const HandleCriarNovaOcorrencia = async (id) => {
        const cursoAnterior = cursos.find((c) => c.id_curso === id);

        const result = await Swal.fire({
            title: 'Pretende criar nova ocorrência baseada neste curso?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sim',
            cancelButtonText: 'Cancelar',
            customClass: {
                confirmButton: 'btn btn-success me-2',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false,
        });

        if (result.isConfirmed) {
            navigate(`/admin/cursos/criar`, { state: { cursoAnterior } });
        }
    };

    const renderActions = (item) => {
        return(
            <div className="d-flex">
                <button className="btn btn-outline-primary me-2" onClick={() => HandleEditCreate(item.id_curso)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger me-2" onClick={() =>  HandleUpdate(item.id_curso, item.estado)}>
                    <i className={`bi ${item.estado ? "bi-eye" : "bi-eye-slash"}`}></i>
                </button>
                {item.estado === false && (
                    <button className="btn btn-outline-primary me-2" onClick={() => HandleCriarNovaOcorrencia(item.id_curso)}>
                        <i className="bi bi-plus-circle"></i>
                    </button>
                )}
            </div>
        );
    }

    const renderOcorrencias = (item, isExpanded, expandedContent = false) => {
        const ocorrencias = item.ocorrencias_anteriores || [];

        if (expandedContent) {
            return (
                <div className="m-0 bg-light border rounded">
                    <h6 className="p-2">Ocorrências anteriores</h6>
                    <div className="mx-2 my-1 border rounded">
                        {ocorrencias.length === 0 ? (
                            <div className="p-2 text-muted">
                                Sem ocorrências anteriores
                            </div>
                        ) : (
                            ocorrencias.map((ocorr, idx) => (
                                <div key={ocorr.id_curso} className={`${idx % 2 === 0 ? 'line-bg' : 'bg-light'} p-2`}>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <strong>#{ocorr.ocorrencias_edicos?.[0]?.nr_ocorrencia || idx + 1}</strong> - {ocorr.nome_curso}
                                            <div className="text-muted small">
                                                Datas Curso: {new Date(ocorr.data_inicio_curso).toLocaleDateString()} - {new Date(ocorr.data_fim_curso).toLocaleDateString()}
                                            </div>
                                            {ocorr.sincrono?.numero_vagas != null && (
                                                <div className="text-muted small">Formandos: {ocorr.contador_formandos} / {ocorr.sincrono.numero_vagas}</div>
                                            )}
                                        </div>
                                        <button className="btn btn-outline-primary me-2" onClick={() => HandleEditCreate(ocorr.id_curso)}>
                                            <i className="bi bi-eye"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            );
        }

        if (ocorrencias.length > 0) {
            return (
                <div>
                    <i className={`bi ${isExpanded ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
                </div>
            );
        }
        return null;
    };

    useEffect(() => {
        FetchCursos();
    }, [searchTerm])

    return(
        <div>
            <Table 
                columns={columnsCursos} 
                data={cursos} 
                actions={renderActions} 
                onAddClick={{callback: HandleEditCreate, label: 'Curso'}} 
                pesquisa={true} 
                conteudos={renderOcorrencias} 
                searchTerm={searchTerm}
                onSearchChange={(value) => {
                    setSearchTerm(value);
                    debouncedNavigate(value);
                }}
            />
        </div>
    );
}

export default CourseTable;