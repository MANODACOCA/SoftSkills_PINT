import React from 'react';

const MaterialForm = ({ material, onChangeFormato, onChangeConteudo, formatos }) => {
  return (
    <div className='border p-2 mb-3'>
      <select className='form-select mb-2' value={material.id_formato} onChange={onChangeFormato}>
        <option value="">-- Formato --</option>
        {formatos.map(f => (
          <option key={f.id_formato} value={f.id_formato}>{f.formato}</option>
        ))}
      </select>
      <input className='form-control' placeholder="Conteúdo (link ou caminho)" value={material.conteudo} onChange={onChangeConteudo} />
    </div>
  );
};

export default MaterialForm;