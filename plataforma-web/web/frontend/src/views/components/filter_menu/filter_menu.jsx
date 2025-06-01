import React, { useEffect, useState } from "react";
import "./filter_menu.css";

const menuData = {
  "Negócios": {
    tópicos: {
      "Business Analytics e Intelligence": [
        "Power BI",
        "SQL",
        "Modelagem de dados",
        "Análise de dados",
        "DAX",
      ],
      "Gestão de projetos": ["Scrum", "PMI", "Kanban"],
    },
  },
  "Desenvolvimento": {
    tópicos: {
      "Desenvolvimento Web": ["React", "Vue", "Angular"],
      "Mobile": ["Flutter", "React Native"],
    },
  },
};

const MegaMenu = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);

  return (
    <div className="mega-menu">
      <div className="menu-column">
        <h6>Categorias</h6>
        <ul>
          {Object.keys(menuData).map((area) => (
            <li
              key={area}
              onMouseEnter={() => {
                setSelectedArea(area);
                setSelectedTopic(null);
              }}
              className={area === selectedArea ? "active" : ""}
            >
              {area}
            </li>
          ))}
        </ul>
      </div>

      {selectedArea && (
        <div className="menu-column">
          <h6>Áreas</h6>
          <ul>
            {Object.keys(menuData[selectedArea].tópicos).map((topic) => (
              <li
                key={topic}
                onMouseEnter={() => setSelectedTopic(topic)}
                className={topic === selectedTopic ? "active" : ""}
              >
                {topic}
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedArea && selectedTopic && (
        <div className="menu-column">
          <h6>Tópicos</h6>
          <ul>
            {menuData[selectedArea].tópicos[selectedTopic].map((cat) => (
              <li key={cat}>{cat}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MegaMenu;