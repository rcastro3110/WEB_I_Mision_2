# TV Show Finder

Misión M2 · Async Odyssey — Web Development I.

Aplicación web que busca series de TV usando la API pública de TVMaze 
(https://www.tvmaze.com/api)
Se puede buscar por nombre, ver la nota y los géneros de cada serie y abrir una vista de detalle con su resumen y sus episodios por temporada.


## Qué puedes hacer
- Buscar una serie por nombre (el buscador ignora los textos vacíos).
- Marcar "Rated only" para ocultar las series sin nota.
- Pulsar una tarjeta para ver el detalle: póster, nota, géneros, estado, cadena, resumen y episodios agrupados por temporada.
- Volver a la lista con el botón "Back" sin repetir la búsqueda.
- La app muestra estados de carga, error y "sin resultados", y aguanta datos incompletos (series sin póster, sin nota o sin géneros).


## Estructura
-  `api.js`: solo hace las peticiones `fetch` a TVMaze, comprueba `response.ok` y devuelve el JSON.
- `logica.js`: transforma los datos con `map`, `filter`, `reduce` y `Object.groupBy` (limpiar series, filtrar por nota, calcular la media, agrupar episodios). No toca el DOM.
- `render.js`: solo toca el DOM; pinta tarjetas, detalle, episodios y los mensajes de cargando, error y vacío.
- `main.js`: conecta todo: escucha los eventos, llama a la API, pasa los datos por la lógica y los envía al render.
+

## Uso de IA
Usé Claude como guía paso a paso durante la misión: para elegir la API, cconfigurar el Vite con el github, entender cómo funcionan `fetch`, los módulos y los eventos y preguntar sobre dudas que me surgian a la hora de usar los conceptos nuevos.

Ejemplos de prompts reales:
- "Vamos paso a paso, porfa. Primero lo de la API, ¿como deberia de guardar la información?
- Ya tengo creado el repositorio en github que tenog que subir a la web pero no he hecho nada con el vite para conectarlo, me puedes explicar como funciona vite y despues como conectarlo a el repositorio?

Escribí a mano: 
Los listeners de clic de las tarjetas y del botón Back, y las funciones limpiarEpisodios y buscarEpisodios. Con la ayuda de Claude para las otras partes, estas fueron más sencillas de sacar porque ya tenía el patrón. El resto fue más seguir los pasos de Claude, mostrarle mi intento y que me corrigiera lo que faltaba. Funcionara o no le pedía a Claude que me explicara el fallo y la corrección.


## Decisiones

1. Delegación de eventos. Un solo listener en `#resultado` y otro en `#detalle`, en vez de uno por tarjeta, porque las tarjetas y el botón Back se vuelven a crear cada vez que se repinta con `innerHTML`.
2. Una sola página con `hidden`. El detalle no es otro HTML: ocultamos la lista y mostramos el detalle. Es más sencillo con Vite y permite volver sin repetir la búsqueda, porque la lista queda guardada en `seriesActuales`.
3. `innerHTML` con `escapar()`. Uso plantillas con `innerHTML` porque son más legibles que `createElement`, y escapo los datos de texto que vienen de la API. La excepción es el resumen, que TVMaze devuelve con etiquetas `<p>` y `<b>`; lo dejo sin escapar para que se vea con formato y asumo ese riesgo porque la fuente es una API conocida.
4. Tener solo un idioma en pantalla. Toda la interfaz está en inglés porque la API devuelve los datos en inglés.