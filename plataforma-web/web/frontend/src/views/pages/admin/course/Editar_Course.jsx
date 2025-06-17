//Aqui é imports!


import React, { useState, useEffect } from 'react'; 

const EditCourse = () => {
    
  const formData = {
    nome_curso: '',
    descricao_curso: '',
    descricao: '', // Descrição extra
    data_inicio_inscricao: '',
    data_fim_inscricao: '',
    data_inicio_curso: '',
    data_fim_curso: '',
    idioma: '',
    horas_curso: '',
    contador_formandos: '',
    imagem: '',
    isassincrono: '', // Define tipo
    id_topico: '',
    id_gestor_administrador: '1',

    // Síncrono
    id_formador: '',
    descricao_formador: '',
    numero_vagas: ''
  };


  const [aulas, setAulas] = useState([]);
  const [materiais, setMateriais] = useState([]);

const formadores = [
  { id_formador: 1, nome: 'João Silva' },
  { id_formador: 2, nome: 'Ana Costa' },
];

const formatos = [
  { id_formato: 1, formato: 'PDF' },
  { id_formato: 2, formato: 'Vídeo' },
  { id_formato: 3, formato: 'YouTube' },
];


  const topicos = [
    { id_topico: 1, nome_topico: 'Programação' },
    { id_topico: 2, nome_topico: 'Design' },
    { id_topico: 3, nome_topico: 'Marketing' }
  ];

  const error = null;
  const successMessage = null;





  const handleChange = () => {};

  const handleSubmit = (e) => e.preventDefault();

  const addAula = () => {
    setAulas(prev => [...prev, { nome_aula: '', data_aula: '', caminhos_url: [''], conteudos: [] }]);
  };
  
    const addMaterial = () => {
    setMateriais(prev => [...prev, { id_formato: '', conteudo: '' }]);
  };




    return (
    <div className='form-group'>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
        <div className='col-md-10 mx-auto'>

            <div className='mt-2'>
            <label className='form-label'>Nome do Curso</label>
            <input type="text" name="nome_curso" className='form-control' value={formData.nome_curso} onChange={handleChange} required />
            </div>

            <div className='mt-2'>
            <label className='form-label'>Descrição do Curso</label>
            <textarea name="descricao_curso" className='form-control' rows="4" value={formData.descricao_curso} onChange={handleChange} required />
            </div>



            {/* DATAS */}
            <div className='row mt-2'>
            <div className='col'>
                <label className='form-label'>Início da Inscrição</label>
                <input type="date" name="data_inicio_inscricao" className='form-control' value={formData.data_inicio_inscricao} onChange={handleChange} required />
            </div>
            <div className='col'>
                <label className='form-label'>Fim da Inscrição</label>
                <input type="date" name="data_fim_inscricao" className='form-control' value={formData.data_fim_inscricao} onChange={handleChange} required />
            </div>
            </div>

            <div className='row mt-2'>
            <div className='col'>
                <label className='form-label'>Início do Curso</label>
                <input type="date" name="data_inicio_curso" className='form-control' value={formData.data_inicio_curso} onChange={handleChange} required />
            </div>
            <div className='col'>
                <label className='form-label'>Fim do Curso</label>
                <input type="date" name="data_fim_curso" className='form-control' value={formData.data_fim_curso} onChange={handleChange} required />
            </div>
            </div>

            <div className='mt-2'>
            <label className='form-label'>Idioma</label>
            <input type="text" name="idioma" className='form-control' value={formData.idioma} onChange={handleChange} required />
            </div>

            <div className='mt-2'>
            <label className='form-label'>Horas do Curso</label>
            <input type="number" step="0.5" name="horas_curso" className='form-control' value={formData.horas_curso} onChange={handleChange} required />
            </div>

            <div className='mt-2'>
            <label className='form-label'>Numero de Formandos</label>
            <input type="number" name="contador_formandos" className='form-control' value={formData.contador_formandos} onChange={handleChange} required />
            </div>

            <div className='mt-2'>
            <label className='form-label'>Imagem (URL ou nome de ficheiro)</label>
            <input type="text" name="imagem" className='form-control' value={formData.imagem} onChange={handleChange} required />
            </div>






      {/* Tipo */}
      <select name="isassincrono" value={formData.isassincrono} onChange={handleChange} className='form-select mt-2'>
        <option value="">-- Escolher Tipologia --</option>
        <option value="false">Síncrono</option>
        <option value="true">Assíncrono</option>
      </select>



      {/* Se for síncrono, mostra formador */}
      {formData.isassincrono === "false" && (
        <div className='mt-3'>
          <select name="id_formador" value={formData.id_formador} onChange={handleChange} className='form-select'>
            <option value="">-- Selecionar Formador --</option>
            {formadores.map(f => (
              <option key={f.id_formador} value={f.id_formador}>{f.nome}</option>
            ))}
          </select>
          <textarea name="descricao_formador" value={formData.descricao_formador} onChange={handleChange} className='form-control mt-2' placeholder="Descrição do Formador" />
          <input type="number" name="numero_vagas" value={formData.numero_vagas} onChange={handleChange} className='form-control mt-2' placeholder="Número de Vagas" />
        </div>
      )}


      {/* Aulas */}
      <div className='mt-4'>
        <h5>Aulas</h5>
        {aulas.map((aula, idx) => (
          <div key={idx} className='border p-2 mb-2'>
            <input className='form-control' placeholder="Nome da Aula" value={aula.nome_aula} onChange={(e) => {
              const updated = [...aulas];
              updated[idx].nome_aula = e.target.value;
              setAulas(updated);
            }} />
            <input className='form-control mt-2' type="date" value={aula.data_aula} onChange={(e) => {
              const updated = [...aulas];
              updated[idx].data_aula = e.target.value;
              setAulas(updated);
            }} />
            {/* Caminhos URL múltiplos */}
            {aula.caminhos_url.map((url, i) => (
              <input key={i} className='form-control mt-2' placeholder="Caminho URL" value={url} onChange={(e) => {
                const updated = [...aulas];
                updated[idx].caminhos_url[i] = e.target.value;
                setAulas(updated);
              }} />
            ))}
          </div>
        ))}
        <button type="button" className='btn btn-outline-primary' onClick={addAula}>+ Adicionar Aula</button>
      </div>

      {/* Material de Apoio */}
      <div className='mt-4'>
        <h5>Material de Apoio</h5>
        {materiais.map((mat, idx) => (
          <div key={idx} className='border p-2 mb-2'>
            <select className='form-select' value={mat.id_formato} onChange={(e) => {
              const updated = [...materiais];
              updated[idx].id_formato = e.target.value;
              setMateriais(updated);
            }}>
              <option value="">-- Formato --</option>
              {formatos.map(f => (
                <option key={f.id_formato} value={f.id_formato}>{f.formato}</option>
              ))}
            </select>
            <input className='form-control mt-2' placeholder="Conteúdo (link ou caminho)" value={mat.conteudo} onChange={(e) => {
              const updated = [...materiais];
              updated[idx].conteudo = e.target.value;
              setMateriais(updated);
            }} />
          </div>
        ))}
        <button type="button" className='btn btn-outline-primary' onClick={addMaterial}>+ Adicionar Material</button>
      </div>



            {/* CATEGORIA */}
            <div className='mt-2'>
            <label className='form-label'>Categoria</label>
            <select name="id_topico" className='form-select' value={formData.id_topico} onChange={handleChange} required>
                <option value="">--Escolher categoria--</option>
                {topicos.map(t => (
                <option key={t.id_topico} value={t.id_topico}>{t.nome_topico}</option>
                ))}
            </select>
            </div>


            {/* AREA */}

           <div className='mt-2'>
            <label className='form-label'>Area</label>
            <select name="id_topico" className='form-select' value={formData.id_topico} onChange={handleChange} required>
                <option value="">--Escolher area--</option>
                {topicos.map(t => (
                <option key={t.id_topico} value={t.id_topico}>{t.nome_topico}</option>
                ))}
            </select>
            </div>

            {/* TOPICO */}
            <div className='mt-2'>
            <label className='form-label'>Tópico</label>
            <select name="id_topico" className='form-select' value={formData.id_topico} onChange={handleChange} required>
                <option value="">--Escolher tópico--</option>
                {topicos.map(t => (
                <option key={t.id_topico} value={t.id_topico}>{t.nome_topico}</option>
                ))}
            </select>
            </div>

            <button type="submit" className='btn btn-success mt-3'>Submeter Alterações</button>
        </div>
        </form>
    </div>
    );

}

export default EditCourse;