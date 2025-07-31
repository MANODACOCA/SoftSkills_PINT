export const getColumnsNotasFinais = (modoEdicao, notasEdit, setNotasEdit) => [
  {
    label: 'Nome',
    render: (item) =>
      item.id_formando_formando.id_formando_utilizador.nome_util
  },
  {
    label: 'Nota final',
    render: (item) => {
      const id = item.id_formando_formando.resultados?.[0]?.id_resul ?? `${item.id_inscricao}`;

      if (modoEdicao) {
        return (
          <input placeholder="0-20" type="number" className="form-control form-control-sm text-end" min={0} max={20} step={0.1} style={{ maxWidth: '70px' }}
            value={notasEdit[id] ?? item.id_formando_formando.resultados?.[0]?.resul ?? ''}
            onChange={(e) =>
              setNotasEdit((prev) => ({ ...prev, [id]: e.target.value }))
            }
          />
        );
      }

      return item.id_formando_formando.resultados?.[0]?.resul ?? '-';
    }
  }
];
