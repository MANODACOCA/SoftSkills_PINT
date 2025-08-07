import Table from "../../../components/table/Table";
import { useEffect, useState } from "react";
import { delete_denuncia, denuncia_comentario_post, list_denuncia } from "../../../../api/denuncia_axios";
import { columnsQueixas } from "../../../components/table/ColumnsQueixas";
import { useNavigate } from "react-router-dom";
import { delete_comentario } from "../../../../api/comentario_axios";
import { delete_post } from "../../../../api/post_axios";
import Swal from "sweetalert2";
import { FaFile } from "react-icons/fa";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";

const QueixasTables = () => {
    const [queixas, setqueixas] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const FetchQueixas = async () => {
        try {
            setLoading(true);
            const response = await list_denuncia();
            setqueixas(response);
            console.log(response);
        } catch (error) {
            console.log('Erro ao carregar os dados das queixas');
        } finally {
            setLoading(false);
        }
    }

    /* const HandleEdit = (id) => {
        navigate(`/admin/queixas/editar/${id}`);
    }; */

    const HandleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja ignorar denuncia?',
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
                await delete_denuncia(id);
                FetchQueixas();
                Swal.fire({
                    title: 'Sucesso',
                    text: `Ignorou a denuncia com sucesso!`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire({
                    title: 'Erro',
                    text: 'Não foi possível ignorar a denuncia!',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                });
                console.log('Erro ao ignorar denuncia');
            }
        }
    }

    const handleDeletePost = async (id) => {
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja apagar post e comentários correspondentes?',
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
                await delete_post(id);
                Swal.fire({
                    title: 'Sucesso',
                    text: `Post e respetivos comentários apagados coom sucesso!`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire({
                    title: 'Erro',
                    text: 'Erro ao apagar post!',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                });
                console.log('Erro ao eliminar post');
            }
        }
    }

    const handleDeleteComentario = async (id) => {
        const result = await Swal.fire({
            title: 'Tem a certeza que deseja apagar comentário?',
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
                await delete_comentario(id);
                Swal.fire({
                    title: 'Sucesso',
                    text: `Comentários apagados com sucesso!`,
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
            } catch (error) {
                Swal.fire({
                    title: 'Erro',
                    text: 'Erro ao apagar comentario',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                });
                console.log('Erro ao eliminar comentário');
            }
        }
    }

    const DetalheQueixa = ({ item, onDelete }) => {
        const [postComent, setPostComent] = useState(null);
        const isPost = item.id_comentario == null;

        useEffect(() => {
            const fetch = async () => {
                try {
                    const response = await denuncia_comentario_post(item.id_denuncia);
                    setPostComent(response);
                } catch (error) {
                    console.log('Erro ao encontrar comentario ou post');
                }
            }
            fetch();
        }, [item.id_denuncia]);

        return (
            <div className="m-0 bg-light border rounded">
                {isPost
                    ? <h6 className='p-2'>Post</h6>
                    : <h6 className='p-2'>Comentário</h6>
                }
                <div className='mx-2 my-1 border rounded p-2'>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-4 mb-2">
                            <img
                                className="border rounded-5"
                                src={postComent?.id_utilizador_utilizador?.img_util || `https://ui-avatars.com/api/?name=${encodeURIComponent(postComent?.id_utilizador_utilizador?.nome_util)}&background=random&bold=true`}
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(postComent?.id_utilizador_utilizador?.nome_util)}&background=random&bold=true`;
                                }}
                                alt="img Util"
                                width={60} height={60}
                            />
                            <div className="d-flex flex-column justify-content-center">
                                <h5 className="mb-1">{postComent?.id_utilizador_utilizador?.nome_util}</h5>
                                <small>{postComent?.id_utilizador_utilizador?.email}</small>
                            </div>
                        </div>
                        <button
                            className="btn btn-outline-danger h-50"
                            onClick={async () => {
                                if (isPost) {
                                    await handleDeletePost(postComent?.id_post);
                                } else {
                                    await handleDeleteComentario(postComent?.id_comentario);
                                }

                                if (onDelete) onDelete();
                            }}
                        >
                            <i className="bi bi-trash"></i>
                            &nbsp;Excluir {isPost ? 'Post' : 'Comentário'}
                        </button>
                    </div>
                    {isPost
                        ? <div style={{ textAlign: 'justify' }}>
                            <div style={{ textAlign: 'justify', overflowWrap: 'anywhere' }}>
                                {postComent?.texto_post}
                            </div>
                            {postComent?.caminho_ficheiro && (
                                <a href={postComent?.caminho_ficheiro} target='blank' className="text-decoration-none text-primary">
                                <div className="d-flex justify-content-between align-items-center border rounded p-3 bg-light" >
                                    <div className="d-flex align-items-center gap-2">
                                    <FaFile className="text-secondary" />
                                    FICHEIRO
                                    </div>
                                    <i className="bi bi-download"></i>
                                </div>
                                </a>
                            )}
                        </div>
                        : <div style={{ textAlign: 'justify' }}>
                            <div style={{ textAlign: 'justify', overflowWrap: 'anywhere' }}>
                                {postComent?.texto_comentario}
                            </div>
                            {postComent?.caminho_ficheiro && (
                                <a href={postComent?.caminho_ficheiro} target='blank' className="text-decoration-none text-primary">
                                <div className="d-flex justify-content-between align-items-center border rounded p-3 bg-light" >
                                    <div className="d-flex align-items-center gap-2">
                                    <FaFile className="text-secondary" />
                                    FICHEIRO
                                    </div>
                                    <i className="bi bi-download"></i>
                                </div>
                                </a>
                            )}
                        </div>
                    }
                </div>
            </div>
        );
    }

    const renderActions = (item) => {
        return (
            <div className="d-flex">
                {/* <button className="btn btn-outline-primary me-2" onClick={() => HandleEdit(item.id_denuncia)}>
                    <i className="bi bi-pencil"></i>
                </button> */}
                <button className="btn btn-outline-danger" onClick={() => HandleDelete(item.id_denuncia)}>
                    <i className="bi bi-x-circle"></i>
                </button>
            </div>
        );
    }

    const renderQueixa = (item, isExpanded, expandedContent = false) => {
        if (expandedContent) {
            return <DetalheQueixa item={item} onDelete={FetchQueixas} />;
        }

        return (
            <div>
                {isExpanded 
                ? <IoIosArrowDropup size={22} color="	#444444" />
                : <IoIosArrowDropdown size={22} color="	#444444" />
                }
            </div>
        );
    }

    useEffect(() => {
        FetchQueixas();
    }, [])

    return (
        <div>
            <Table columns={columnsQueixas} data={queixas} actions={renderActions} conteudos={renderQueixa} loading={loading} />
        </div>
    );
}

export default QueixasTables;