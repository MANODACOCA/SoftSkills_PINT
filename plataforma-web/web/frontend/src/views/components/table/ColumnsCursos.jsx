import { formatDayMonthYear } from "../shared_functions/FunctionsUtils";

export const columnsCursos = [
  { label: 'Nº', key: 'id_curso'},
  { label: 'Curso', key: 'nome_curso'},
  { label: 'Tipologia', render: (item) => {
      if(item.issincrono) return 'Sincrono';
      if(item.isassincrono) return 'Assincrono';
    }
  },  
  { label: 'Datas Inscrição', render: (item) => {
      const data_inscricao = [];
      const data_inscricao_i = formatDayMonthYear(item.data_inicio_inscricao);
      const data_inscricao_f = formatDayMonthYear(item.data_fim_inscricao);
      data_inscricao.push(data_inscricao_i);
      data_inscricao.push(data_inscricao_f);
      return data_inscricao.join('-');
    } 
  },
  { label: 'Datas Curso', render: (item) => {
      const data_curso = [];
      const data_curso_i = formatDayMonthYear(item.data_inicio_curso);
      const data_curso_f = formatDayMonthYear(item.data_fim_curso);
      data_curso.push(data_curso_i);
      data_curso.push(data_curso_f);
      return data_curso.join('-');
    }
  },
  { label: 'Criador/Formador', render: (item) => {
    if(item.issincrono) return item.sincrono.id_formador_formadore.id_formador_utilizador.nome_util;
    else return item.id_gestor_administrador_gestor_administrador.id_gestor_administ;
    }
   },
  { label: 'Duração', key: 'horas_curso' },
  { label: 'Vagas', render: (item) => {
      if(item.issincrono) return `${item.contador_formandos} / ${item.sincrono.numero_vagas}`;
      else return ( <>{item.contador_formandos} / <i className="bi bi-infinity"></i></>);
      // if (item.issincrono) return item.sincrono.numero_vagas;
      // else return '-';
    } 
  },
  { label: 'Categoria/Área/Tópico', render: (item) => {
      const cat_area_top = [];
      const cat = item.id_topico_topico.id_area_area.id_categoria_categorium.nome_cat;
      const area = item.id_topico_topico.id_area_area.nome_area;
      const top = item.id_topico_topico.nome_topico;
      cat_area_top.push(cat);
      cat_area_top.push(area);
      cat_area_top.push(top);
      return cat_area_top.join('/ ');
    } 
  },
  { label: 'Estado',   render: (item) => {
    const data_atual = new Date();
    const dataInicioCurso = new Date(item.data_inicio_curso);
    const dataFimCurso = new Date(item.data_fim_curso);

    if(dataFimCurso < data_atual) return <span className=" badge bg-danger" style={{width: '75px'}}>Concluído</span>;

    if(!item.estado) return <span className="badge bg-secondary" style={{backgroundColor: '#ff8400ff', width: '75px'}}>Oculto</span>

    if(dataInicioCurso > data_atual) return <span className="badge"  style={{ backgroundColor: '#ecb100ff', width: '75px'}}>Por iniciar</span>;

    if (dataInicioCurso < data_atual && dataFimCurso > data_atual) return <span className="badge bg-success" style={{width: '75px'}}>Em curso</span>;
    }
  },
  {
  label: 'Ocorrência', render: (item) => {
    const ocorrenciaAtual = item.ocorrencias_edicos?.[0];
    return (
      <div style={{ textAlign: 'center' }}>
        {ocorrenciaAtual ? `#${ocorrenciaAtual.nr_ocorrencia}` : '-'}
      </div>
    );
  }
  }
];
