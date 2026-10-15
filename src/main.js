import { buscarSeries } from "./api.js";
import { limpiarSeries } from "./logica.js";

const datos = await buscarSeries("breaking");
const series = limpiarSeries(datos);
console.log(series);