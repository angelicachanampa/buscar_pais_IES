import PropTypes from "prop-types";

function Resultados({ countries }) {
  return (
    <div className="mostrar-resultados">
      {countries.length === 0 ? (
        <p>No hay resultados para mostrar.</p>
      ) : (
        countries.map((country) => (
          <div key={country.cca3} className="mostrar-resultados-container">
            <strong>{country.name.common}</strong> - Capital: {country.capital?.[0] || "N/A"} - Población: {country.population.toLocaleString()}
            <br />
            <img
              src={country.flags.svg}
              alt={`Bandera de ${country.name.common}`}
              className="mostrar-resultados-imagen"
            />
          </div>
        ))
      )}
    </div>
  );
}

Resultados.propTypes = {
  countries: PropTypes.array.isRequired,
};

export default Resultados;
