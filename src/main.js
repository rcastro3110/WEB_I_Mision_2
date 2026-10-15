import { buscarSeries } from "./api.js";
import { 
    limpiarSeries, 
    soloConNota, 
    notaMedia 
} from "./logica.js";
import {
  mostrarCargando,
  mostrarError,
  mostrarVacio,
  mostrarSeries,
  mostrarMedia
} from "./render.js";

const formulario = document.getElementById("formulario");
const campo = document.getElementById("busqueda");
const checkNota = document.getElementById("soloNota");

let seriesActuales = []; // últimas series recibidas de la API

function pintar() {
  const lista = checkNota.checked ? soloConNota(seriesActuales) : seriesActuales;
  mostrarMedia(notaMedia(lista));
  if (lista.length === 0) {
    mostrarVacio();
  } else {
    mostrarSeries(lista);
  }
}

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault(); // evita que el formulario recargue la página

  const texto = campo.value.trim();
  if (!texto) return; // si está vacío, no hacemos nada

  mostrarCargando();
  try {
    const datos = await buscarSeries(texto);
    seriesActuales = limpiarSeries(datos);
    pintar();
  } catch (error) {
    mostrarMedia(null);
    mostrarError(error.message);
  }
});

checkNota.addEventListener("change", pintar);