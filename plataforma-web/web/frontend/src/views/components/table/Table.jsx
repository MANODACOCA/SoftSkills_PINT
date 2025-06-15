import './Table.css';

const Table = ({ columns, data, actions }) => {
  return (
    <div className="table-responsive rounded-3 shadow-sm">
      <table className="table table-hover rounded-5">
        <thead className="table-bg">
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
                <td key={colIndex} className={rowIndex % 2 == 0 ? 'bg-white' : 'line-bg'}>
                  {col.render ? col.render(item) : item[col.key]}
                </td>
              ))}
              {actions && (
                <td className={rowIndex % 2 == 0 ? 'bg-white' : 'line-bg'}>
                  {actions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>  
    </div>
    
  );
};

export default Table;