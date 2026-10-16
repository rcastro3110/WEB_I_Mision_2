const contenedor = document.getElementById("resultado");
const detalle = document.getElementById("detalle");

//Funcion por si viene codigo HTML que no queremos
function escapar(texto) {
  return String(texto)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function mostrarCargando() {
  contenedor.innerHTML = `<p class="estado">⏳ Loading…</p>`;
}

export function mostrarError(mensaje) {
  contenedor.innerHTML = `<p class="estado estado--error">⚠ ${escapar(mensaje)}</p>`;
}

export function mostrarVacio() {
  contenedor.innerHTML = `<p class="estado">No results found.</p>`;
}

export function mostrarSeries(series) {
  contenedor.innerHTML = series
    .map(
      (s) => `
        <article class="tarjeta" data-id="${s.id}">
          ${s.poster
              ? `<img class="tarjeta__poster" src="${escapar(s.poster)}" alt="Poster of ${escapar(s.nombre)}" loading="lazy" />`
              : `<div class="tarjeta__poster tarjeta__poster--vacio">No poster</div>`
          }
          <div class="tarjeta__info">
            <h2>${escapar(s.nombre)} <span class="anio">(${escapar(s.estreno)})</span></h2>
            <p class="nota">⭐ ${s.nota ?? "No rating"}</p>
            <p class="generos">${escapar(s.generos.join(", ")) || "No genre"}</p>
          </div>
        </article>`
    )
    .join("");
}

export function mostrarMedia(media) {
  const p = document.getElementById("media");
  p.textContent = media === null ? "" : `Average rating: ${media.toFixed(1)}`;
}

export function mostrarDetalle(d) {
  detalle.innerHTML = `
    <button id="volver" class="volver">← Back</button>
    <div class="detalle__cabecera">
        ${d.poster
            ? `<img class="detalle__poster" src="${escapar(d.poster)}" alt="Poster of ${escapar(d.nombre)}" />`
            : `<div class="detalle__poster detalle__poster--vacio">No poster</div>`
        }       
        <div>
        <h2>${escapar(d.nombre)}</h2>
        <p>⭐ ${d.nota ?? "No rating"}</p>
        <p>${escapar(d.generos.join(", ")) || "No genre"}</p>
        <p>${escapar(d.estado)} · Premiered: ${escapar(d.estreno)} · ${escapar(d.cadena)}</p>
      </div>
    </div>
    <div class="detalle__resumen">${d.resumen}</div>
    <section id="episodios" class="episodios"></section>`;
}

export function mostrarEpisodios(porTemporada) {
  const cont = document.getElementById("episodios");
  cont.innerHTML = Object.entries(porTemporada)
    .map(
      ([temporada, lista]) => `
        <h3>Season  ${temporada}</h3>
        <ul class="episodios__lista">
          ${lista
            .map(
              (e) => `
            <li class="episodio">
              <span>${escapar(e.numero)}. ${escapar(e.nombre)}</span>
              <span>${escapar(e.fecha)}</span>
              <span>⭐ ${e.nota ?? "No rating"}</span>
            </li>`
            )
            .join("")}
        </ul>`
    )
    .join("");
}