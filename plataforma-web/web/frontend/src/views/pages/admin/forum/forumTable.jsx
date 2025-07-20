import Table from "../../../components/table/Table";
import { useEffect, useState } from "react";
import { columnsForum } from "../../../components/table/ColumnsForum";
import { list_conteudos_partilhado, delete_conteudos_partilhado } from "../../../../api/conteudos_partilhado_axios";
import { useNavigate } from "react-router-dom";

const ForumTable = () => {
    const [forum, setforum] = useState([]);
    const opcoes = ['Fóruns', 'Pedidos'];
    const [opcao, setOpcao] = useState("Fóruns");
    const navigate = useNavigate();

    const handleChangeOpcao = (a) => {
        setOpcao(a);
    };
    const FetchForum = async () => {
        try {
            const response = await list_conteudos_partilhado();
            setforum(response);
            console.log(response);
        } catch(error) {
            console.log('Erro ao carregar os dados dos Foruns');
        }
    }

    const HandleEdit = (id) => {
        navigate(`/forum/editar/${id}`);
    };

    const HandleDelete = async (id) => {
        try{
            await delete_conteudos_partilhado(id);
            FetchForum();
        } catch(error){
            console.error("Erro ao eliminar conteudo partilhado", error);
        }
    }

    useEffect(() => {
        FetchForum();
    },[])

    return(
        <div>
            <div className="mb-3 d-flex justify-content-between">
                <div>
                    {opcao === 'Fóruns' && (
                    <h3>Lista tópicos fórum</h3>
                    )}
                    {opcao === 'Pedidos' && (
                    <h3>Pedidos de tópicos fórum</h3>
                    )}
                </div>
                <div className="btn-group w-25">
                    {opcoes.map((o, index) => (
                    <button
                        key={index}
                        className={`btn ${opcao === o ? 'btn-active' : 'btn-outline-custom'}`}
                        onClick={() => handleChangeOpcao(o)}
                    >
                        {o.charAt(0).toUpperCase() + o.slice(1)}
                    </button>
                    ))}
                </div>    
            </div>
            
            {opcao === 'Fóruns' && (
               <Table columns={columnsForum} data={forum} /> 
            )}
            {opcao === 'Pedidos' && (
               <div>olaaaa</div>
            )}
        </div>
    );
}

export default ForumTable;