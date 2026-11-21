// Panel de administración. No existe ninguna acción de borrado:
// los usuarios solo cambian de estado y todo queda registrado en la bitácora.
import { esc, fmtFecha, aFecha, csv, descargar } from './util.js';

const ETIQUETA = { pendiente: '🟡 Pendiente', aprobado: '🟢 Aprobado', rechazado: '🔴 Rechazado', suspendido: '⚫ Suspendido' };

export function vistaAdmin(el, ctx) {
  const { backend, usuario } = ctx();
  let perfiles = [];
  let filtro = 'pendiente';
  let tab = 'usuarios';
  let intentos = null;
  let baja = () => {};

  el.innerHTML = `
    <div class="card">
      <h2>🛡️ Panel de administración</h2>
      <p class="muted">Aquí apruebas quién puede usar los módulos y consultas los resultados. Nada se elimina: los cambios quedan en la bitácora.</p>
      <div class="tabs" id="atabs">
        <button data-t="usuarios" class="on">👥 Usuarios</button>
        <button data-t="evaluaciones">📊 Evaluaciones</button>
      </div>
      <div id="acont"></div>
    </div>`;

  el.querySelectorAll('#atabs button').forEach(b => b.onclick = () => {
    el.querySelectorAll('#atabs button').forEach(x => x.classList.remove('on'));
    b.classList.add('on'); tab = b.dataset.t; pintar();
  });

  baja = backend.escucharPerfiles(lista => { perfiles = lista; if (tab === 'usuarios') pintar(); },
    e => { el.querySelector('#acont').innerHTML = `<div class="fb">⚠️ ${esc(e.message)}</div>`; });

  function pintar() { tab === 'usuarios' ? pintarUsuarios() : pintarEvaluaciones(); }

  function pintarUsuarios() {
    const c = el.querySelector('#acont');
    const cuentas = e => perfiles.filter(p => e === 'todos' || p.estado === e).length;
    const filas = perfiles
      .filter(p => filtro === 'todos' || p.estado === filtro)
      .sort((a, b) => (aFecha(b.creadoEn) || 0) - (aFecha(a.creadoEn) || 0));
    c.innerHTML = `
      <div class="row" style="margin:8px 0">
        ${['pendiente', 'aprobado', 'rechazado', 'suspendido', 'todos'].map(f =>
          `<button class="btn ${f === filtro ? 'sel' : 'alt'}" data-f="${f}">${f[0].toUpperCase() + f.slice(1)} (${cuentas(f)})</button>`).join('')}
      </div>
      <div class="tabla"><table>
        <thead><tr><th>Nombre</th><th>Correo</th><th>Estado</th><th>Registro</th><th>Acciones</th></tr></thead>
        <tbody>${filas.map(p => `
          <tr>
            <td>${esc(p.nombre)}</td><td>${esc(p.email)}</td>
            <td>${ETIQUETA[p.estado] || esc(p.estado)}${p.rol === 'admin' ? ' · admin' : ''}</td>
            <td>${fmtFecha(p.creadoEn)}</td>
            <td>${p.rol === 'admin' ? '<span class="muted">—</span>' : accionesPara(p)}</td>
          </tr>`).join('') || '<tr><td colspan="5" class="muted">Sin registros en este filtro.</td></tr>'}
        </tbody></table></div>`;
    c.querySelectorAll('[data-f]').forEach(b => b.onclick = () => { filtro = b.dataset.f; pintarUsuarios(); });
    c.querySelectorAll('[data-uid]').forEach(b => b.onclick = async () => {
      b.disabled = true;
      try { await backend.cambiarEstado(b.dataset.uid, b.dataset.e, usuario.email); }
      catch (e) { alert('No se pudo actualizar: ' + e.message); b.disabled = false; }
    });
  }

  function accionesPara(p) {
    const btn = (e, txt, cls = '') => `<button class="btn peq ${cls}" data-uid="${esc(p.id)}" data-e="${e}">${txt}</button>`;
    if (p.estado === 'pendiente') return btn('aprobado', 'Aprobar') + btn('rechazado', 'Rechazar', 'alt');
    if (p.estado === 'aprobado') return btn('suspendido', 'Suspender', 'alt');
    return btn('aprobado', 'Aprobar');
  }

  async function pintarEvaluaciones() {
    const c = el.querySelector('#acont');
    if (!intentos) {
      c.innerHTML = '<p class="muted">Cargando…</p>';
      try { intentos = await backend.todosIntentos(); }
      catch (e) { c.innerHTML = `<div class="fb">⚠️ ${esc(e.message)}</div>`; return; }
    }
    const ord = [...intentos].sort((a, b) => (aFecha(b.fecha) || 0) - (aFecha(a.fecha) || 0));
    c.innerHTML = `
      <div class="row" style="margin:8px 0"><button class="btn alt" id="csv">⬇️ Exportar CSV</button><span class="muted">${ord.length} evaluaciones</span></div>
      <div class="tabla"><table>
        <thead><tr><th>Fecha</th><th>Nombre</th><th>Correo</th><th>Módulo</th><th>Puntaje</th><th></th></tr></thead>
        <tbody>${ord.map((t, n) => `
          <tr><td>${fmtFecha(t.fecha)}</td><td>${esc(t.nombre)}</td><td>${esc(t.email)}</td><td>${esc(t.moduloTitulo)}</td>
          <td><b>${t.puntaje}/${t.total}</b></td><td><button class="btn peq alt" data-n="${n}">Ver</button></td></tr>
          <tr class="det" id="det${n}" hidden><td colspan="6">${(t.respuestas || []).map(r => `
            <div class="rev ${r.acierto ? 'si' : 'no'}"><b>${r.n}. ${esc(r.pregunta)}</b><br>
            ${esc(r.elegida)} ${r.acierto ? '✅' : '❌ (correcta: ' + esc(r.correcta) + ')'}</div>`).join('')}</td></tr>`).join('')
          || '<tr><td colspan="6" class="muted">Aún no hay evaluaciones.</td></tr>'}
        </tbody></table></div>`;
    c.querySelectorAll('[data-n]').forEach(b => b.onclick = () => { const d = c.querySelector('#det' + b.dataset.n); d.hidden = !d.hidden; });
    c.querySelector('#csv').onclick = () => descargar('evaluaciones.csv', csv([
      ['Fecha', 'Nombre', 'Correo', 'Módulo', 'Puntaje', 'Total'],
      ...ord.map(t => [fmtFecha(t.fecha), t.nombre, t.email, t.moduloTitulo, t.puntaje, t.total])
    ]));
  }

  pintar();
  return () => baja();
}
