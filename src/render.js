const contenedor = document.getElementById("resultado");

export function mostrarCargando() {
  contenedor.innerHTML = "<p>⏳ Cargando…</p>";
}

export function mostrarError(mensaje) {
  contenedor.innerHTML = `<p style="color:#c00">⚠ ${mensaje}</p>`;
}

export function mostrarVacio() {
  contenedor.innerHTML = "<p>No hay resultados.</p>";
}

export function mostrarSeries(series) {
  contenedor.innerHTML = series
    .map(
      (s) => `
        <article>
          <img src="${s.poster ?? ""}" alt="Póster de ${s.nombre}" width="120" />
          <h2>${s.nombre} (${s.estreno})</h2>
          <p>⭐ ${s.nota ?? "Sin nota"}</p>
          <p>${s.generos.join(", ") || "Sin género"}</p>
        </article>`
    )
    .join("");
}