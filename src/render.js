const contenedor = document.getElementById("resultado");

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
  contenedor.innerHTML = `<p class="estado">⏳ Cargando…</p>`;
}

export function mostrarError(mensaje) {
  contenedor.innerHTML = `<p class="estado estado--error">⚠ ${escapar(mensaje)}</p>`;
}

export function mostrarVacio() {
  contenedor.innerHTML = `<p class="estado">No hay resultados.</p>`;
}

export function mostrarSeries(series) {
  contenedor.innerHTML = series
    .map(
      (s) => `
        <article class="tarjeta">
          ${
            s.poster
              ? `<img class="tarjeta__poster" src="${escapar(s.poster)}" alt="Póster de ${escapar(s.nombre)}" loading="lazy" />`
              : `<div class="tarjeta__poster tarjeta__poster--vacio">Sin póster</div>`
          }
          <div class="tarjeta__info">
            <h2>${escapar(s.nombre)} <span class="anio">(${escapar(s.estreno)})</span></h2>
            <p class="nota">⭐ ${s.nota ?? "Sin nota"}</p>
            <p class="generos">${escapar(s.generos.join(", ")) || "Sin género"}</p>
          </div>
        </article>`
    )
    .join("");
}

export function mostrarMedia(media) {
  const p = document.getElementById("media");
  p.textContent = media === null ? "" : `Nota media: ${media.toFixed(1)}`;
}