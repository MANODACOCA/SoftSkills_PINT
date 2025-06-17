import React from 'react';
import { formatYearMonthDay } from '../shared_functions/FunctionsUtils';

const AulaForm = ({ aula, onChange, onChangeConteudo, onAddConteudo, formatos }) => {
  const data = formatYearMonthDay(aula.data_aula);
  return (
    <div className='border p-3 mb-3'>
      <input className='form-control mb-2' placeholder="Nome da Aula"
        value={aula.nome_aula} onChange={(e) => onChange('nome_aula', e.target.value)} />

      <input className='form-control mb-2' type="date"
        value={data} onChange={(e) => onChange('data_aula', e.target.value)} />

        <h6>Caminho URL:</h6>
        <input
          className='form-control mb-3'
          placeholder="Caminho URL da Aula"
          value={aula.caminho_url}
          onChange={(e) => onChange('caminho_url', e.target.value)}
        />

      <h6>Conteúdos:</h6>
      {aula?.conteudo?.map((c, i) => (
        <div key={i} className='mb-3 p-2 border rounded'>
          <input className='form-control mb-1' placeholder="Nome do Conteúdo"
            value={c.nome_conteudo} onChange={(e) => onChangeConteudo(i, 'nome_conteudo', e.target.value)} />

          <input className='form-control mb-1' placeholder="Conteúdo (link/texto)"
            value={c.conteudo} onChange={(e) => onChangeConteudo(i, 'conteudo', e.target.value)} />

          <input className='form-control mb-1' type="time" placeholder="Duração"
            value={c.tempo_duracao} onChange={(e) => onChangeConteudo(i, 'tempo_duracao', e.target.value)} />

          <select className='form-select' value={c.id_formato}
            onChange={(e) => onChangeConteudo(i, 'id_formato', e.target.value)}>
            <option value="">-- Formato --</option>
            {formatos.map(f => (
              <option key={f.id_formato} value={f.id_formato}>{f.formato}</option>
            ))}
          </select>
        </div>
      ))}
      <button type="button" className='btn btn-sm btn-outline-secondary' onClick={onAddConteudo}>+ Adicionar Conteúdo</button>
    </div>
  );
};

export default AulaForm;