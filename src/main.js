import { buscarSeries } from "./api.js";
import { limpiarSeries } from "./logica.js";
import {
  mostrarCargando,
  mostrarError,
  mostrarVacio,
  mostrarSeries,
} from "./render.js";

const formulario = document.getElementById("formulario");
const campo = document.getElementById("busqueda");

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault(); // evita que el formulario recargue la página

  const texto = campo.value.trim();
  if (!texto) return; // si está vacío, no hacemos nada

  mostrarCargando();
  try {
    const datos = await buscarSeries(texto);
    const series = limpiarSeries(datos);
    if (series.length === 0) {
      mostrarVacio();
    } else {
      mostrarSeries(series);
    }
  } catch (error) {
    mostrarError(error.message);
  }
});