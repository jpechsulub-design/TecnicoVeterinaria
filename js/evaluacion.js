// Componente de evaluación reutilizable por cualquier módulo.
// Al terminar: 1) guarda el intento (solo se agrega, nunca se borra),
// 2) envía al correo del usuario las preguntas, respuestas y retroalimentación,
// 3) registra el resultado del envío.
import { esc } from './util.js';
import { armarCorreo, enviarCorreo } from './correo.js';

export function crearEvaluacion(ctx) {
  return function montarEvaluacion(el, { meta, preguntas }) {
    let i = 0;
    let elegidas = [];

    const inicio = () => {
      i = 0; elegidas = [];
      pregunta();
    };

    function pregunta() {
      const q = preguntas[i];
      const pct = Math.round(i / preguntas.length * 100);
      el.innerHTML = `
        <div class="card">
          <div class="row" style="justify-content:space-between">
            <h2 style="margin:0">Evaluación · ${esc(meta.titulo)}</h2>
            <span class="muted">${i + 1} de ${preguntas.length}</span>
          </div>
          <div class="bar" style="margin-top:8px"><i style="width:${pct}%"></i></div>
        </div>
        <div class="card">
          <span class="tag">${esc(q.s)}</span>
          <p><b>${i + 1}. ${esc(q.q)}</b></p>
          ${q.o.map((t, k) => `<button class="opt" data-k="${k}">${esc(t)}</button>`).join('')}
          <div id="fbq"></div>
        </div>`;
      el.querySelectorAll('.opt').forEach(b => b.onclick = () => {
        const k = +b.dataset.k;
        elegidas[i] = k;
        const ok = k === q.a;
        el.querySelectorAll('.opt').forEach((x, j) => { x.disabled = true; if (j === q.a) x.classList.add('ok'); });
        if (!ok) b.classList.add('no');
        el.querySelector('#fbq').innerHTML = `<div class="fb">${ok ? '✅ Correcto.' : '❌ Incorrecto.'} ${esc(q.e)}
          <br><button class="btn" id="sig" style="margin-top:8px">${i === preguntas.length - 1 ? 'Terminar y ver resultado' : 'Siguiente'}</button></div>`;
        el.querySelector('#sig').onclick = () => { i++; i < preguntas.length ? pregunta() : terminar(); };
      });
    }

    function calcular() {
      const porSeccion = {};
      const respuestas = preguntas.map((q, n) => {
        const acierto = elegidas[n] === q.a;
        porSeccion[q.s] = porSeccion[q.s] || [0, 0];
        porSeccion[q.s][1]++; if (acierto) porSeccion[q.s][0]++;
        return {
          n: n + 1, seccion: q.s, pregunta: q.q,
          elegida: q.o[elegidas[n]], correcta: q.o[q.a], acierto, retro: q.e
        };
      });
      const puntaje = respuestas.filter(r => r.acierto).length;
      return { puntaje, total: preguntas.length, porSeccion, respuestas };
    }

    async function terminar() {
      const res = calcular();
      const { backend, usuario, perfil } = ctx();
      el.innerHTML = `<div class="card"><h2>Guardando tu resultado…</h2><p class="muted">No cierres esta página.</p></div>`;

      // Firestore no admite arreglos anidados: se guarda porSeccion como objeto {k:{aciertos,total}}
      const porSeccionDoc = Object.fromEntries(Object.entries(res.porSeccion).map(([k, v]) => [k, { aciertos: v[0], total: v[1] }]));
      const intento = {
        uid: usuario.uid, email: usuario.email, nombre: perfil.nombre,
        moduloId: meta.id, moduloTitulo: meta.titulo,
        puntaje: res.puntaje, total: res.total,
        porSeccion: porSeccionDoc, respuestas: res.respuestas
      };

      let intentoId;
      try {
        intentoId = await backend.guardarIntento(intento);
      } catch (e) {
        el.innerHTML = `<div class="card"><h2>⚠️ No se pudo guardar</h2>
          <p>${esc(e.message)}</p><p class="muted">Tus respuestas siguen en pantalla. Intenta de nuevo.</p>
          <button class="btn" id="reint">Reintentar</button></div>`;
        el.querySelector('#reint').onclick = terminar;
        return;
      }

      const correo = armarCorreo({ nombre: perfil.nombre, meta, ...res });
      const enviar = async () => {
        const r = await enviarCorreo({ para: usuario.email, nombre: perfil.nombre, asunto: correo.asunto, html: correo.html }, backend.modo);
        try { await backend.registrarEnvio({ intentoId, uid: usuario.uid, para: usuario.email, ok: r.ok, detalle: r.detalle }); } catch { /* el intento ya está guardado */ }
        return r;
      };
      const envio = await enviar();
      resultado(res, correo, envio, enviar);
    }

    function resultado(res, correo, envio, reenviar) {
      const pct = Math.round(res.puntaje / res.total * 100);
      const msg = envio.demo ? `🧪 ${esc(envio.detalle)}`
        : envio.ok ? `📧 Te enviamos el detalle (preguntas, respuestas y retroalimentación) a <b>${esc(ctx().usuario.email)}</b>.`
        : `⚠️ Tu resultado quedó guardado, pero el correo no se pudo enviar: ${esc(envio.detalle)}`;
      el.innerHTML = `
        <div class="card">
          <h2>${pct >= 90 ? '🏆 ¡Excelente!' : pct >= 70 ? '👏 Muy bien' : pct >= 50 ? '📚 Vas bien, repasa lo fallado' : '💪 Repasa el módulo y vuelve a intentar'}</h2>
          <p class="big">${res.puntaje}/${res.total} <span class="muted">(${pct}%)</span></p>
          ${Object.entries(res.porSeccion).map(([k, v]) => `<p>${esc(k)}: <b>${v[0]}/${v[1]}</b></p>`).join('')}
          <div class="fb" id="estadoCorreo">${msg}</div>
          <div class="row" style="margin-top:10px">
            ${envio.ok && !envio.demo ? '' : '<button class="btn" id="reenv">Reenviar correo</button>'}
            <button class="btn alt" id="otra">Repetir evaluación</button>
          </div>
        </div>
        <div class="card"><h3>Revisión de tus respuestas</h3>
          ${res.respuestas.map(r => `
            <div class="rev ${r.acierto ? 'si' : 'no'}">
              <div class="muted">${esc(r.seccion)} · Pregunta ${r.n}</div>
              <b>${esc(r.pregunta)}</b>
              <div>Tu respuesta: ${esc(r.elegida)} ${r.acierto ? '✅' : '❌'}</div>
              ${r.acierto ? '' : `<div>Correcta: <b>${esc(r.correcta)}</b></div>`}
              <div class="muted">💡 ${esc(r.retro)}</div>
            </div>`).join('')}
        </div>
        ${envio.demo ? `<div class="card"><h3>Vista previa del correo (demostración)</h3><iframe class="previa" sandbox srcdoc="${esc(correo.html)}"></iframe></div>` : ''}`;
      el.querySelector('#otra').onclick = inicio;
      const rb = el.querySelector('#reenv');
      if (rb) rb.onclick = async () => {
        rb.disabled = true; rb.textContent = 'Enviando…';
        const r = await reenviar();
        resultado(res, correo, r, reenviar);
      };
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    el.innerHTML = `
      <div class="card">
        <h2>📝 Evaluación de 20 reactivos</h2>
        <p>Al terminar, guardaremos tu resultado y te enviaremos por correo las preguntas, tus respuestas y la retroalimentación.</p>
        <button class="btn" id="empezar">Comenzar</button>
      </div>`;
    el.querySelector('#empezar').onclick = inicio;
  };
}
