const Cell = ({ value, columnIndex, index }) => {
    let color = 'white'; // iniciamos las celdas en color blanco
    if (value === 1) {
      color = 'red';
    } else if (value === 2) {
      color = 'yellow';
    }
      
    return (
      <td>
        <div className="cell" onClick={() => { index(columnIndex) } }> {/* creamos una funcion para obtener el indice de la celda */}
          <div className={color}> </div> {/* le pasamos el estilo css a la celda dependiendo el value */}
        </div>
      </td>
    );
  };
  export default Cell;