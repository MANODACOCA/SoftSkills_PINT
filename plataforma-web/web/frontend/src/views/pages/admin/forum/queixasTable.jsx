import Table from "../../../components/table/Table";
import { useEffect, useState } from "react";
import { delete_denuncia, denuncia_comentario_post, list_denuncia } from "../../../../api/denuncia_axios";
import { columnsQueixas } from "../../../components/table/ColumnsQueixas";
import { useNavigate } from "react-router-dom";

const QueixasTables = () => {
    const [queixas, setqueixas] = useState([]);
    const navigate = useNavigate();
    //const [postComent, setPostComent] = useState([]);
   
    const FetchQueixas = async () => {
        try {
            const response = await list_denuncia();
            setqueixas(response);
            console.log(response);
        } catch(error) {
            console.log('Erro ao carregar os dados das queixas');
        }
    }

    const HandleEdit = (id) => {
        navigate(`/admin/queixas/editar/${id}`);
    };

    const HandleDelete = async (id) => {
        try {
            await delete_denuncia(id);
            FetchQueixas();
        } catch(error) {
            console.log('Erro ao eliminar Utilizador');
        }
    }

    const DetalheQueixa = ({item}) => {
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
        },[item.id_denuncia]);

        return (
            <div className="m-0 bg-light border rounded">
            {isPost 
            ? <h6 className='p-2'>Post</h6>
            : <h6 className='p-2'>Comentário</h6>
            }
            {isPost
            ? <div className='mx-2 my-1 border rounded p-2'>
                <div className="d-flex gap-4">
                    <img className="border rounded-5" src="" alt="img Util" width={60} height={60}/>
                    <div className="d-flex flex-column justify-content-center">
                        <h5 className="mb-1">nome completo</h5>
                        <small>email</small>
                    </div>
                </div>
                </div>
            : <div className='mx-2 my-1 border rounded'>
                
                </div>
            }
        </div>
        );
    }

    const renderActions = (item) => {
        return(
            <div className="d-flex">
                <button className="btn btn-outline-primary me-2" onClick={() => HandleEdit(item.id_denuncia)}>
                    <i className="bi bi-pencil"></i>
                </button>
                <button className="btn btn-outline-danger" onClick={() => HandleDelete(item.id_denuncia)}>
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        );
    }

    const renderQueixa = (item, isExpanded, expandedContent = false ) => {     
        if (expandedContent) {
            return <DetalheQueixa item={item} />;
        }
            
        return(
            <div>
                <i className={`bi ${isExpanded ? 'bi-arrow-up' : 'bi-arrow-down'}`}></i>
            </div>            
        );   
    }

    useEffect(() => {
        FetchQueixas();
    },[])

    return(
        <div>
            <Table columns={columnsQueixas} data={queixas} actions={renderActions} conteudos={renderQueixa} />
        </div>
    );
}

export default QueixasTables;