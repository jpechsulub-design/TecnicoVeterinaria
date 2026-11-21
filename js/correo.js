// Envío del resultado de la evaluación por correo (EmailJS) y armado del mensaje.
import { EMAILJS, configurado } from './config.js';
import { esc } from './util.js';

export function armarCorreo({ nombre, meta, puntaje, total, porSeccion, respuestas }) {
  const pct = Math.round(puntaje / total * 100);
  const secciones = Object.entries(porSeccion)
    .map(([k, v]) => `<li>${esc(k)}: <b>${v[0]}/${v[1]}</b></li>`).join('');
  const filas = respuestas.map(r => `
    <tr>
      <td style="padding:10px;border-top:1px solid #dde7e5;vertical-align:top">
        <div style="font-size:12px;color:#5b6f73">${esc(r.seccion)} · Pregunta ${r.n}</div>
        <div style="font-weight:600;margin:2px 0 6px">${esc(r.pregunta)}</div>
        <div>Tu respuesta: <span style="color:${r.acierto ? '#1f7a4d' : '#b3382c'};font-weight:600">${esc(r.elegida)} ${r.acierto ? '✔' : '✘'}</span></div>
        ${r.acierto ? '' : `<div>Respuesta correcta: <b>${esc(r.correcta)}</b></div>`}
        <div style="margin-top:6px;padding:8px;background:#eef6f5;border-radius:6px;font-size:13px">💡 ${esc(r.retro)}</div>
      </td>
    </tr>`).join('');
  const html = `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:auto;color:#12343b">
    <div style="background:#0e7c86;color:#fff;padding:16px 20px;border-radius:10px 10px 0 0">
      <div style="font-size:18px;font-weight:700">🐾 Resultado de tu evaluación</div>
      <div style="opacity:.9">${esc(meta.titulo)} · ${esc(meta.subtitulo)}</div>
    </div>
    <div style="padding:16px 20px;border:1px solid #dde7e5;border-top:0">
      <p>Hola ${esc(nombre)}, este es el detalle de tu evaluación.</p>
      <p style="font-size:26px;margin:6px 0"><b>${puntaje} / ${total}</b> <span style="font-size:14px;color:#5b6f73">(${pct}%)</span></p>
      <ul style="padding-left:18px">${secciones}</ul>
      <table style="width:100%;border-collapse:collapse;margin-top:8px">${filas}</table>
      <p style="font-size:12px;color:#5b6f73;margin-top:16px">Este correo se generó automáticamente al terminar tu evaluación.</p>
    </div>
  </div>`;
  return { asunto: `Resultado ${meta.titulo}: ${puntaje}/${total}`, html };
}

// Devuelve { ok, detalle, demo? }
export async function enviarCorreo({ para, nombre, asunto, html }, modo) {
  if (modo === 'demo') return { ok: true, demo: true, detalle: 'Modo demostración: no se envió correo real.' };
  if (!configurado(EMAILJS)) return { ok: false, detalle: 'EmailJS no está configurado en js/config.js' };
  try {
    const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS.serviceId,
        template_id: EMAILJS.templateId,
        user_id: EMAILJS.publicKey,
        template_params: { to_email: para, to_name: nombre, subject: asunto, resultado_html: html }
      })
    });
    const t = await r.text();
    return r.ok ? { ok: true, detalle: 'Enviado' } : { ok: false, detalle: `EmailJS respondió ${r.status}: ${t}` };
  } catch (e) {
    return { ok: false, detalle: 'Error de red: ' + e.message };
  }
}
