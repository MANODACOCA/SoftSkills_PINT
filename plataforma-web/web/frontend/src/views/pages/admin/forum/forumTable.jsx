import Table from "../../../components/table/Table";
import { useEffect, useState } from "react";
import { columnsForum } from "../../../components/table/ColumnsForum";
import { list_conteudos_partilhado, delete_conteudos_partilhado } from "../../../../api/conteudos_partilhado_axios";
import { useNavigate } from "react-router-dom";

const ForumTable = () => {
    const [forum, setforum] = useState([]);
    const navigate = useNavigate();

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
            <Table columns={columnsForum} data={forum} />
        </div>
    );
}

export default ForumTable;