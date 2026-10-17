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
  mostrarDetalleError,
  mostrarVistaDetalle,
  mostrarVistaLista
} from "./render.js";

const formulario = document.getElementById("formulario");
const campo = document.getElementById("busqueda");
const checkNota = document.getElementById("soloNota");
const contenedor = document.getElementById("resultado");
const detalle = document.getElementById("detalle");

let seriesActuales = []; // últimas series recibidas de la API
let ultimaBusqueda = 0;  // nº de la última búsqueda lanzada
let ultimoDetalle = 0;   // nº del último detalle pedido

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

  const miBusqueda = ++ultimaBusqueda; // mi número de búsqueda
  mostrarCargando();
  try {
    const datos = await buscarSeries(texto);
    if (miBusqueda !== ultimaBusqueda) return; // llegó tarde: la ignoramos
    seriesActuales = limpiarSeries(datos);
    pintar();
  } catch (error) {
    if (miBusqueda !== ultimaBusqueda) return;
    mostrarMedia(null);
    mostrarError(mensajeDeError(error));
  }
});

checkNota.addEventListener("change", pintar);

contenedor.addEventListener("click", async (evento) => {
  const tarjeta = evento.target.closest(".tarjeta");
  if (!(tarjeta)) return;
  const id = tarjeta.dataset.id;

  const miDetalle = ++ultimoDetalle; // mi número de detalle
  mostrarVistaDetalle();
  mostrarDetalleCargando();

  try{
    const serie = await buscarEpisodios(id);
    if (miDetalle !== ultimoDetalle) return;
    mostrarDetalle(limpiarDetalle(serie));
    mostrarEpisodios(agruparPorTemporada(limpiarEpisodios(serie))); 
  } catch(error){
    if (miDetalle !== ultimoDetalle) return;
    mostrarDetalleError(mensajeDeError(error));
  }
});

detalle.addEventListener("click", (evento) => {
  if(!evento.target.closest("#volver")) return;
  
  ultimoDetalle++; // invalida cualquier detalle que siga cargando
  mostrarVistaLista();
});