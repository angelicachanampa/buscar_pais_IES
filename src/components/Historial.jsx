import PropTypes from "prop-types";

function Historial({ historial }) {
  return (
    <div className="historial-busqueda">
      <h3>Historial de Búsqueda</h3>
      {historial.length === 0 ? (
        <p>No hay búsquedas recientes.</p>
      ) : (
        <ul>
          {historial.map((item) => (
            <li key={item.cca3} className="historial-busqueda-container">
              <strong>{item.name}</strong> - Capital: {item.capital} - Población: {item.population.toLocaleString()}
              <br />
              <img
                src={item.flag}
                alt={`Bandera de ${item.name}`}
                className="historial-busqueda-imagen"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

Historial.propTypes = {
  historial: PropTypes.array.isRequired,
};

export default Historial;
