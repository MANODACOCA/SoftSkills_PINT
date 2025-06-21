import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./filter_menu.css";
import { getCategoriaAreaTopico } from '../../../api/topico_axios'


const FilterMenu = ({ IdsTopicos, closeMenu }) => {
  const [categoriasAreasTopicos, setCategoriasAreasTopicos] = useState([]);

  const [selectedCategoria, setSelectedCategoria] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedTopico, setSelectedTopico] = useState(null);


  const fetchCategoriasAreasTopicos = async () => {
    try {
      const data = await getCategoriaAreaTopico();
      setCategoriasAreasTopicos(data);
    } catch (error) {
      console.error('Erro ao encontrar Tópicos!');
    }
  }

  useEffect(() => {
    fetchCategoriasAreasTopicos();
  }, []);


  const handleCategoriaClick =  (categoria) => {
    const areas = categoria.areas
    handleAreaClick(areas);
    closeMenu?.();
  }

  const handleAreaClick =  (areas) => {
    const allAreas = Array.isArray(areas) ? areas : [areas];

    const setTopicosIds = allAreas.flatMap(area => area.topicos.map(t => t.id_topico));
    IdsTopicos(setTopicosIds);
    closeMenu?.();
  }

  const handleTopicoClick =  (topico) => {
   IdsTopicos([topico.id_topico]);
   closeMenu?.();
  }



  return (
    <div className="mega-menu">

      {/*Coluna: Categorias*/}
      <div className="menu-column">
        <h6>Categorias</h6>
        <ul>
          {categoriasAreasTopicos.map((categoria) => (
            <li
              key={categoria.id_categoria}
              onClick={() => handleCategoriaClick(categoria)}
              onMouseEnter={() => {
                setSelectedCategoria(categoria);
                setSelectedArea(null);
                setSelectedTopico(null);
              }}
              className={selectedCategoria?.id_categoria === categoria.id_categoria ? "active" : ""}
            >
              {categoria.nome_cat}
            </li>
          ))}
        </ul>
      </div>

      {/*Coluna: Areas*/}
      {selectedCategoria && (
        <div className="menu-column">
          <h6>Áreas</h6>
          <ul>
            {selectedCategoria.areas.map((area) => (
              <li
                key={area.id_area}
                onClick={() => handleAreaClick(area)}
                onMouseEnter={() => {
                  setSelectedArea(area);
                  setSelectedTopico(null);
                }}
                className={selectedArea?.id_area === area.id_area ? "active" : ""}
              >
                {area.nome_area}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/*Coluna: Tópicos*/}
      {selectedCategoria && selectedArea && (
        <div className="menu-column">
          <h6>Tópicos</h6>
          <ul>
            {selectedArea.topicos.map((topico) => (
              <li
                key={topico.id_topico}
                onClick={() => handleTopicoClick(topico)}
                onMouseEnter={() => {
                  setSelectedTopico(topico);
                }}
                className={selectedTopico?.id_topico === topico.id_topico ? "active" : ""}
              >
                {topico.nome_topico}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;