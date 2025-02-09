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

export default Buscar;
