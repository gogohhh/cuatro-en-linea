const Cell = ({ value, columnIndex }) => {
    let color = 'white'; // iniciamos las celdas en color blanco
    if (value === 1) {
      color = 'red';
    } else if (value === 2) {
      color = 'yellow';
    }
      
    return (
      <td>
        <div className="cell">
          <div className={color}></div> {/* le pasamos el estilo css a la celda dependiendo el value */}
        </div>
      </td>
    );
  };
  export default Cell;