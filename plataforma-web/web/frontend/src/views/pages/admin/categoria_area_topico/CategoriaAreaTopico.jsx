import Table from "../../../components/table/Table";
import { useEffect, useState } from "react";
import { getCategoriaAreaTopico } from "../../../../api/topico_axios";
import { catColumns, areaColumns, topicoColumns } from "../../../components/table/ColumnsCatAreaTopico";

const CategoriaAreaTopicoTable = () => {
   // const [cat, setCat] = useState("");
    //const [area, setCategoria] = useState("");
    //const [topico, setCategoria] = useState("");
    const [CatAreaTop, setCatAreaTop] = useState([]); 

    const fetchCategoriaAreaTopico = async () => {
        try {
            const response = await getCategoriaAreaTopico();
            console.log(response);
            setCatAreaTop(response);
        } catch (error) {
            console.log('Erro ao ir buscar as categoria, área e tópico');
        }
    }

   /*const renderTopics = (area, isExpanded, expandedContent = false) => {
        if (expandedContent) {
            return (
                <div className="m-0 bg-light border rounded">
                    <h6 className="p-2">Tópicos</h6>
                    {area.topicos?.length ? (
                        area.topicos.map((t, idx) => (
                            <div key={idx} className={`${idx % 2 === 0 ? 'line-bg' : 'bg-light'} p-2`}>
                                {t.nome_topico}
                            </div>
                        ))
                    ) : (
                        <div className="p-2">Área sem tópicos associados</div>
                    )}
                </div>
            );
        }
        return <i className={`bi ${isExpanded ? 'bi-arrow-up' : 'bi-arrow-down'}`} />;
    }; */
    const renderTopics = (area, isExpanded, expandedContent = false) => {
        if (expandedContent) {
            return (
                <div className="m-0 bg-light border rounded">
                    <Table columns={topicoColumns} data={area.topicos ?? []} actions={renderActionsArea} /*onAddClick={handleAddEditArea}*/ conteudos={renderTopics} showPagination={false}/>
                </div>
            );
        }
        return <i className={`bi ${isExpanded ? 'bi-arrow-up' : 'bi-arrow-down'}`} />;
    };

    const renderAreas = (categoria, isExpanded, expandedContent = false) => {
        if (expandedContent) {
            return (
                <div className="m-0 bg-light border rounded">
                    <Table columns={areaColumns} data={categoria.areas ?? []} actions={renderActionsArea} /*onAddClick={handleAddEditArea}*/ conteudos={renderTopics} showPagination={false}/>
                </div>
            );
        }
        return <i className={`bi ${isExpanded ? 'bi-arrow-up' : 'bi-arrow-down'}`} />;
    };

    const renderActionsCategoria = () => null;
    const handleAddEditCategoria = () => {};

    const renderActionsArea = () => null;
    const handleAddEditArea = () => {};

    useEffect(() => {
        fetchCategoriaAreaTopico();
    }, []);

    return (
        <div className="">
            <Table columns={catColumns} data={CatAreaTop} actions={renderActionsCategoria} onAddClick={handleAddEditCategoria} conteudos={renderAreas}/>
            {/*<Table columns={catColumns} data={} actions={} onAddClick={} conteudos={} /> */}
        </div>
        
    );
}

export default CategoriaAreaTopicoTable;