
export const getColumnsNotasFinais = (modoEdicao, notasEdit,setNotasEdit) => [
  {
    label: 'Nome',
    render: (item) =>
      item.id_formando_formando.id_formando_utilizador.nome_util
  },
  {
    label: 'Nota final',
    render: (item) => {
      const id = item.id_resul;                 
      if (modoEdicao) {
        return (
          <input type="number" className="form-control form-control-sm" min={0} max={20} step={0.1}
            value={notasEdit[id] ?? item.resul ?? ''}
            onChange={(e) =>
              setNotasEdit((prev) => ({ ...prev, [id]: e.target.value }))
            }
          />
        );
      }
      return item.resul ?? '-';
    }
  }
];
