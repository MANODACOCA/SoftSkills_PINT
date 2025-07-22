import removeAccents from 'remove-accents';

export function filtrarCursos(cursos, { search, data_inicio_curso, data_fim_curso }) {
  return cursos.filter(curso => {
    let filtro = true;

    if (search) {
      const nomeCurso = removeAccents(curso.nome_curso.toLowerCase());
      const termoPesquisa = removeAccents(search.toLowerCase());
      filtro = filtro && nomeCurso.includes(termoPesquisa);
    }

    if (data_inicio_curso && !data_fim_curso) {
      const inicioCurso = new Date(curso.data_inicio_curso).toISOString().split('T')[0];
      const inicioFiltro = new Date(data_inicio_curso).toISOString().split('T')[0];
      filtro = filtro && inicioCurso === inicioFiltro;
    }

    if (data_fim_curso && !data_inicio_curso) {
      const fimCurso = new Date(curso.data_fim_curso).toISOString().split('T')[0];
      const fimFiltro = new Date(data_fim_curso).toISOString().split('T')[0];
      filtro = filtro && fimCurso === fimFiltro;
    }

    if (data_inicio_curso && data_fim_curso) {
      const inicioCurso = new Date(curso.data_inicio_curso);
      const fimCurso = new Date(curso.data_fim_curso);
      const inicioFiltro = new Date(data_inicio_curso);
      const fimFiltro = new Date(data_fim_curso);
      filtro = filtro && inicioCurso >= inicioFiltro && fimCurso <= fimFiltro;
    }

    return filtro;
  });
}
