const contenedor = document.getElementById("resultado");

export function mostrarCargando() {
  contenedor.innerHTML = `<p class="estado">⏳ Cargando…</p>`;
}

export function mostrarError(mensaje) {
  contenedor.innerHTML = `class="estado estado--error">⚠ ${mensaje}</p>`;
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
              ? `<img class="tarjeta__poster" src="${s.poster}" alt="Póster de ${s.nombre}" loading="lazy" />`
              : `<div class="tarjeta__poster tarjeta__poster--vacio">Sin póster</div>`
          }
          <div class="tarjeta__info">
            <h2>${s.nombre} <span class="anio">(${s.estreno})</span></h2>
            <p class="nota">⭐ ${s.nota ?? "Sin nota"}</p>
            <p class="generos">${s.generos.join(", ") || "Sin género"}</p>
          </div>
        </article>`
    )
    .join("");
}

export function mostrarMedia(media) {
  const p = document.getElementById("media");
  p.textContent = media === null ? "" : `Nota media: ${media.toFixed(1)}`;
}