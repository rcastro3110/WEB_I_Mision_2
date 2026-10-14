import { buscarSeries } from "./api.js";

const datos = await buscarSeries("breaking");
console.log(datos);