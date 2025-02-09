import PropTypes from "prop-types";

function Buscar({ buscar, setBuscar }) {
  return (
    <input
      className="input-pais"
      type="text"
      placeholder="Buscar país..."
      value={buscar}
      onChange={(e) => setBuscar(e.target.value)}
    />
  );
}

Buscar.propTypes = {
    buscar: PropTypes.string.isRequired,
    setBuscar: PropTypes.func.isRequired,
  };

export default Buscar;
