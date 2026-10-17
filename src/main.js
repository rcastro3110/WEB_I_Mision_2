import { 
  buscarSeries, 
  buscarEpisodios 
} from "./api.js";
import { 
    limpiarSeries,
    limpiarDetalle, 
    soloConNota, 
    notaMedia,
    limpiarEpisodios,
    agruparPorTemporada, 
} from "./logica.js";
import {
  mostrarCargando,
  mostrarError,
  mostrarVacio,
  mostrarSeries,
  mostrarMedia,
  mostrarDetalle,
  mostrarEpisodios,
  mostrarDetalleCargando,
  mostrarDetalleError
} from "./render.js";

const formulario = document.getElementById("formulario");
const campo = document.getElementById("busqueda");
const checkNota = document.getElementById("soloNota");
const contenedor = document.getElementById("resultado");
const detalle = document.getElementById("detalle");

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

function mensajeDeError(error){
  return error instanceof TypeError
    ? "Could not connect. Check your internet connection."
    : error.message;
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
    mostrarError(mensajeDeError(error));
  }
});

checkNota.addEventListener("change", pintar);

contenedor.addEventListener("click", async (evento) => {
  const tarjeta = evento.target.closest(".tarjeta");
  if (!(tarjeta)) return;
  const id = tarjeta.dataset.id;

  document.getElementById("lista").hidden = true;
  document.getElementById("cabecera").hidden = true;
  document.getElementById("detalle").hidden = false;
  mostrarDetalleCargando();

  try{
    const serie = await buscarEpisodios(id);
    mostrarDetalle(limpiarDetalle(serie));
    mostrarEpisodios(agruparPorTemporada(limpiarEpisodios(serie))); 
  } catch(error){
    mostrarDetalleError(mensajeDeError(error));
  }
});

detalle.addEventListener("click", (evento) => {
  if(!evento.target.closest("#volver")) return;

  detalle.hidden = true;
  document.getElementById("lista").hidden = false;
  document.getElementById("cabecera").hidden = false;
});