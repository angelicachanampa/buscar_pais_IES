import { useState, useEffect } from "react";
import Buscar from "./components/Buscar";
import './App.css'

function App() {
  const [buscar, setBuscar] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    if (buscar.length < 3) {
      setCountries([]);
      return;
    }
    setLoading(true);

    fetch(`https://restcountries.com/v3.1/name/${buscar}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) { // verifico si el array existe

          // filtro la busqueda del país con los datos encontrados en buscar del input
          const filtrarPaises = data.filter((pais) => pais.name.common.toLowerCase() === buscar.toLowerCase());
          const count = filtrarPaises.length;

          console.log("cantidad de paises encontrados: ",count);

          
          if (count > 0) {// al tener la cantidad de países encontrados
            filtrarPaises.forEach((nombre) => {
              setCountries([nombre]);  // Establecer el país que coincide
            });
          } else {
            console.log("No devuelve nada...");
          }

          console.log(data);

          setHistorial((prev) => {
            const newHistory = [...prev];
            filtrarPaises.forEach((country) => { // se agrego los paises filtrados
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
  }, [buscar]);

  return (
    <>
    <h1>Buscador de Países</h1>
      <div className="container">
      <Buscar buscar={buscar} setBuscar={setBuscar} />

        
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
    </div>
    <div>
      <h3>Angelica Beatriz Chanampa - IES 2025</h3>
      <h4>Profesor Pablo Sangenis</h4>
    </div>
    </>
  )
}

export default App
