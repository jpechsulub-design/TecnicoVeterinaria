// REGISTRO DE MÓDULOS
// Para agregar un módulo nuevo:
//   1) crea js/modulos/moduloN.js (exporta `preguntas` y `render(root, ctx)`; ver modulo1.js)
//   2) agrega aquí un objeto con su información
// (la ruta de 'archivo' es relativa a js/app.js)
// Cada módulo aparece automáticamente como una sección del sitio.
export const MODULOS = [
  {
    id: 'modulo1',
    numero: 1,
    titulo: 'Módulo 1',
    subtitulo: 'Anatomía, homeostasis y bienestar animal',
    descripcion: 'Direcciones anatómicas, huesos y órganos, equilibrio interno del cuerpo y el modelo de los 5 dominios de bienestar.',
    icono: '🐕',
    archivo: './modulos/modulo1.js',
    guia: 'modulos/modulo1/guia-de-estudio.md'
  }
];

export const buscarModulo = id => MODULOS.find(m => m.id === id);
