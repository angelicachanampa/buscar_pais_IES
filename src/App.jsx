import { useState, useEffect } from "react";
//import { motion } from "framer-motion";
import './App.css'

function App() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    if (query.length < 3) {
      setCountries([]);
      return;
    }
    setLoading(true);

    fetch(`https://restcountries.com/v3.1/name/${query}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {

          const filtrarPaises = data.filter((pais) => pais.name.common.toLowerCase().slice(0,3) === query.toLowerCase().slice(0,3));
          const count = filtrarPaises.length;

          console.log("cantidad de paises encontrados: ",count);

          if (count > 0) {
            filtrarPaises.forEach((nombre) => {
              setCountries([nombre]);  // Establecer el país que coincide
            });
          } else {
            console.log("no devuelve nada");
          }

          console.log(data);
          setSearchHistory((prev) => {
            const newHistory = [...prev];
            data.forEach((country) => {
              if (!newHistory.some((item) => item.cca3 === country.cca3)) {
                newHistory.unshift({
                  name: country.name.common,
                  capital: country.capital?.[0] || "N/A",
                  population: country.population,
                  flag: country.flags.svg,
                  cca3: country.cca3,
                });
              }
            });
            return newHistory.slice(0, 5);
          });
        } else {
          setCountries([]);
        }
      })
      .catch(() => setCountries([]))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <>
    <h1>Buscador de Países</h1>
      <label className="titulo" htmlFor="buscar">Buscar Países</label>
      <div className="container">
      <input
        className="input-pais"        
        type="text"
        placeholder="Buscar país..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        />

        
      {loading && <p>Cargando...</p>}


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



      <div className="historial-busqueda">
        <h3>Historial de Búsqueda</h3>
        {searchHistory.length === 0 ? (
          <p>No hay búsquedas recientes.</p>
        ) : (
          <ul>
            {searchHistory.map((item) => (
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
    </div>
    </>
  )
}

export default App
