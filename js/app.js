// Aplicación principal: acceso por correo, control de usuarios y navegación por módulos.
import { SITIO, ADMINS, FIREBASE_CONFIG, configurado, esLocal } from './config.js';
import { esc, correoValido } from './util.js';
import { MODULOS, buscarModulo } from './modulos/registro.js';
import { crearEvaluacion } from './evaluacion.js';
import { vistaAdmin } from './admin.js';

const app = document.getElementById('app');
const menu = document.getElementById('menu');
const sesionEl = document.getElementById('sesion');
const aviso = document.getElementById('aviso');

let backend = null;
let usuario = null;     // { uid, email }
let perfil = null;      // documento usuarios/{uid}
let limpiar = () => {}; // cierra suscripciones de la vista actual
let bajaBadge = () => {};

const ctx = () => ({ backend, usuario, perfil });
const montarEvaluacion = crearEvaluacion(ctx);
const esAdmin = () => perfil && perfil.rol === 'admin' && ADMINS.includes(usuario.email);

/* ---------- arranque ---------- */
async function iniciar() {
  const real = configurado(FIREBASE_CONFIG);
  if (!real && !esLocal) return pantallaSinConfig();

  try {
    backend = real
      ? (await import('./backend/firebase.js')).crearBackend()
      : (await import('./backend/demo.js')).crearBackend();
  } catch (e) {
    return mostrarError('No se pudo iniciar el servicio de acceso', e);
  }
  if (backend.modo === 'demo') {
    aviso.hidden = false;
    aviso.textContent = '🧪 MODO DEMOSTRACIÓN (solo en tu computadora): los datos se guardan en este navegador y no se envían correos reales.';
  }

  try { await backend.completarEnlaceSiExiste(); }
  catch (e) { mostrarError('El enlace de acceso no es válido o ya caducó. Solicita uno nuevo.', e); }

  backend.onUsuario(async u => {
    limpiar(); bajaBadge();
    usuario = u; perfil = null;
    if (!u) return pantallaLogin();
    try {
      perfil = await backend.obtenerPerfil(u.uid);
    } catch (e) { return mostrarError('No se pudo leer tu perfil', e); }
    if (!perfil) return pantallaRegistro();
    rutear();
  });
  window.addEventListener('hashchange', () => { if (usuario && perfil) rutear(); });
}

/* ---------- pantallas de acceso ---------- */
function pantallaSinConfig() {
  menu.innerHTML = ''; sesionEl.innerHTML = '';
  app.innerHTML = `<div class="card centro"><h2>⚙️ Falta configurar el sitio</h2>
    <p>Edita <code>js/config.js</code> con los datos de Firebase y EmailJS. Los pasos están en el <b>README.md</b> del repositorio.</p></div>`;
}

function mostrarError(texto, e) {
  console.error(e);
  app.insertAdjacentHTML('afterbegin', `<div class="card error">⚠️ ${esc(texto)}<br><span class="muted">${esc(e && e.message || '')}</span></div>`);
}

function pantallaLogin() {
  menu.innerHTML = ''; sesionEl.innerHTML = '';
  app.innerHTML = `
    <div class="hero">
      <div class="hero-txt">
        <h1>${esc(SITIO.nombre)}</h1>
        <p>${esc(SITIO.lema)}. Material interactivo por módulos, con evaluaciones y retroalimentación.</p>
      </div>
      <form class="card login" id="fLogin">
        <h2>Ingresa con tu correo</h2>
        <p class="muted">Te enviaremos un enlace de acceso, sin contraseña. Si es tu primera vez, un administrador validará tu registro.</p>
        <label>Correo electrónico
          <input type="email" id="correo" required autocomplete="email" placeholder="tucorreo@ejemplo.com"></label>
        <button class="btn" type="submit">Enviarme el enlace</button>
        <div id="msgLogin" class="fb" hidden></div>
      </form>
    </div>`;
  const f = document.getElementById('fLogin');
  f.onsubmit = async ev => {
    ev.preventDefault();
    const email = document.getElementById('correo').value.trim().toLowerCase();
    const msg = document.getElementById('msgLogin');
    msg.hidden = false;
    if (!correoValido(email)) { msg.textContent = 'Escribe un correo válido.'; return; }
    f.querySelector('button').disabled = true;
    try {
      await backend.enviarEnlace(email);
      msg.innerHTML = backend.modo === 'demo' ? 'Entrando en modo demostración…'
        : `📧 Enlace enviado a <b>${esc(email)}</b>. Ábrelo desde este mismo dispositivo. Si no lo ves, revisa spam.`;
    } catch (e) {
      msg.textContent = 'No se pudo enviar el enlace: ' + e.message;
      f.querySelector('button').disabled = false;
    }
  };
}

function pantallaRegistro() {
  menu.innerHTML = ''; pintarSesion();
  app.innerHTML = `
    <form class="card centro" id="fReg">
      <h2>Completa tu registro</h2>
      <p>Cuenta: <b>${esc(usuario.email)}</b></p>
      <label>Nombre completo <input id="nom" required minlength="3" maxlength="80" autocomplete="name"></label>
      <button class="btn" type="submit">Registrarme</button>
      <div id="msgReg" class="fb" hidden></div>
    </form>`;
  document.getElementById('fReg').onsubmit = async ev => {
    ev.preventDefault();
    const nombre = document.getElementById('nom').value.trim();
    try {
      perfil = await backend.crearPerfil(usuario, { nombre });
      rutear();
    } catch (e) {
      const m = document.getElementById('msgReg'); m.hidden = false; m.textContent = 'No se pudo registrar: ' + e.message;
    }
  };
}

function pantallaEstado() {
  const textos = {
    pendiente: ['⏳ Tu registro está en revisión', 'Un administrador debe aprobar tu acceso. Cuando lo haga, podrás entrar a los módulos con este mismo correo.'],
    rechazado: ['🚫 Registro no aprobado', 'Tu solicitud no fue aprobada. Si crees que es un error, contacta a los administradores.'],
    suspendido: ['⛔ Acceso suspendido', 'Tu acceso está suspendido temporalmente. Contacta a los administradores.']
  };
  const [t, d] = textos[perfil.estado] || ['Estado desconocido', ''];
  menu.innerHTML = ''; pintarSesion();
  app.innerHTML = `<div class="card centro"><h2>${t}</h2><p>${d}</p><p class="muted">Cuenta: ${esc(usuario.email)}</p>
    <button class="btn alt" id="recargar">Revisar de nuevo</button></div>`;
  document.getElementById('recargar').onclick = async () => { perfil = await backend.obtenerPerfil(usuario.uid); rutear(); };
}

/* ---------- navegación ---------- */
function pintarSesion() {
  sesionEl.innerHTML = `<span class="quien">${esc(perfil ? perfil.nombre : usuario.email)}${perfil && perfil.rol === 'admin' ? ' · admin' : ''}</span>
    <button class="btn peq alt" id="salir">Salir</button>`;
  document.getElementById('salir').onclick = () => backend.salir();
}

function pintarMenu(ruta) {
  const items = [['#/inicio', '🏠 Inicio', 'inicio']]
    .concat(MODULOS.map(m => [`#/modulo/${m.id}`, `${m.icono} ${m.titulo}`, 'modulo/' + m.id]))
    .concat([['#/resultados', '📊 Mis resultados', 'resultados']]);
  if (esAdmin()) items.push(['#/admin', '🛡️ Administración <span class="badge" id="badge" hidden></span>', 'admin']);
  menu.innerHTML = items.map(([h, t, r]) => `<a href="${h}" class="${ruta === r ? 'on' : ''}">${t}</a>`).join('');
}

function escucharPendientes() {
  if (!esAdmin()) return;
  bajaBadge = backend.escucharPerfiles(l => {
    const n = l.filter(p => p.estado === 'pendiente').length;
    const b = document.getElementById('badge');
    if (b) { b.hidden = !n; b.textContent = n; }
  }, () => {});
}

function rutear() {
  limpiar(); limpiar = () => {};
  if (perfil.estado !== 'aprobado') return pantallaEstado();

  const ruta = (location.hash || '#/inicio').replace(/^#\//, '');
  pintarSesion(); pintarMenu(ruta);
  bajaBadge(); escucharPendientes();
  window.scrollTo({ top: 0 });

  if (ruta.startsWith('modulo/')) return vistaModulo(ruta.split('/')[1]);
  if (ruta === 'resultados') return vistaResultados();
  if (ruta === 'admin' && esAdmin()) { limpiar = vistaAdmin(app, ctx); return; }
  vistaInicio();
}

/* ---------- vistas ---------- */
function vistaInicio() {
  app.innerHTML = `
    <div class="hero chico">
      <div class="hero-txt"><h1>¡Hola, ${esc(perfil.nombre.split(' ')[0])}! 🐾</h1>
      <p>Elige un módulo para estudiar con material interactivo y presentar tu evaluación.</p></div>
    </div>
    <div class="grid modulos">
      ${MODULOS.map(m => `
        <a class="card modulo" href="#/modulo/${m.id}">
          <div class="ico">${m.icono}</div>
          <h3>${esc(m.titulo)}</h3>
          <b>${esc(m.subtitulo)}</b>
          <p class="muted">${esc(m.descripcion)}</p>
          <span class="btn peq">Abrir módulo →</span>
        </a>`).join('')}
      <div class="card modulo prox"><div class="ico">🔜</div><h3>Próximos módulos</h3>
        <p class="muted">Cada módulo nuevo aparecerá aquí como una sección propia.</p></div>
    </div>`;
}

async function vistaModulo(id) {
  const m = buscarModulo(id);
  if (!m) return vistaInicio();
  app.innerHTML = `<div class="card"><h2>${m.icono} ${esc(m.titulo)} · ${esc(m.subtitulo)}</h2>
    <p class="muted">${esc(m.descripcion)}</p>
    ${m.guia ? `<a class="btn peq alt" href="${esc(m.guia)}" target="_blank" rel="noopener">📄 Guía de estudio</a>` : ''}</div>
    <div id="modRoot"><p class="muted">Cargando…</p></div>`;
  try {
    const mod = await import(m.archivo);
    mod.render(document.getElementById('modRoot'), { montarEvaluacion });
  } catch (e) { mostrarError('No se pudo cargar el módulo', e); }
}

async function vistaResultados() {
  app.innerHTML = `<div class="card"><h2>📊 Mis resultados</h2><div id="lista"><p class="muted">Cargando…</p></div></div>`;
  try {
    const { aFecha, fmtFecha } = await import('./util.js');
    const l = (await backend.misIntentos(usuario.uid)).sort((a, b) => (aFecha(b.fecha) || 0) - (aFecha(a.fecha) || 0));
    document.getElementById('lista').innerHTML = l.length
      ? `<div class="tabla"><table><thead><tr><th>Fecha</th><th>Módulo</th><th>Puntaje</th></tr></thead><tbody>${l.map(t =>
          `<tr><td>${fmtFecha(t.fecha)}</td><td>${esc(t.moduloTitulo)}</td><td><b>${t.puntaje}/${t.total}</b></td></tr>`).join('')}</tbody></table></div>`
      : '<p class="muted">Todavía no has presentado evaluaciones.</p>';
  } catch (e) { mostrarError('No se pudieron cargar tus resultados', e); }
}

iniciar();
