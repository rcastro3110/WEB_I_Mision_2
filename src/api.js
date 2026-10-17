const URL_BASE = "https://api.tvmaze.com";

export async function buscarSeries(texto) {
  const url = `${URL_BASE}/search/shows?q=${encodeURIComponent(texto)}`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
  }
  return respuesta.json();
}

export async function buscarEpisodios(id) {
  const url = `${URL_BASE}/shows/${id}?embed=episodes`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}: ${respuesta.statusText}`);
  }
  return respuesta.json();
}