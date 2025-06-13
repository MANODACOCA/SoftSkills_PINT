

const Table = ({ columns, data, actions }) => {
  return (
    <table className="table table-hover table-bordered">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.label}</th>
          ))}
          {actions && <th>Ações</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {col.render ? col.render(item) : item[col.key]}
              </td>
            ))}
            {actions && (
              <td>
                {actions(item)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;