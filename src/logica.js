export function limpiarSeries(resultados) {
  return resultados.map(({ show }) => ({
    id: show.id,
    nombre: show.name,
    poster: show.image?.medium ?? null,
    nota: show.rating?.average ?? null,
    generos: show.genres ?? [],
    estado: show.status,
    estreno: show.premiered ? show.premiered.slice(0, 4) : "?",
  }));
}

export function soloConNota(series) {
  return series.filter((s) => s.nota !== null);
}

export function notaMedia(series) {
  const conNota = series.filter((s) => s.nota !== null);
  if (conNota.length === 0) return null;
  const suma = conNota.reduce((acc, s) => acc + s.nota, 0);
  return suma / conNota.length;
}