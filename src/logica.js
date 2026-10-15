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