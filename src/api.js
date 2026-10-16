export async function buscarSeries(texto) {
  const url = `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(texto)}`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
  }
  return respuesta.json();
}

export async function buscarEpisodios(id) {
  const url = `https://api.tvmaze.com/shows/${id}?embed=episodes`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
  }
  return respuesta.json();
}