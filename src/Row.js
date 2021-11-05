import Cell from './Cell.js';

const Row = ({ row, index }) => {

    return (
      <tr>
        {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} index={index} />)} {/* Pasamos las props de la celda*/}
        {/* Como en el componente principal es una tabla recorremos las filas con los indeces de las celdas */}
      </tr>
    );
  };

export default Row;