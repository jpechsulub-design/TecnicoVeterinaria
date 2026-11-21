// Utilidades pequeñas y seguras

export const esc = v => String(v ?? '').replace(/[&<>"']/g, c => (
  { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
));

// Acepta Timestamp de Firestore, ISO string, Date o número
export function aFecha(v) {
  if (!v) return null;
  if (typeof v.toDate === 'function') return v.toDate();
  const d = new Date(v);
  return isNaN(d) ? null : d;
}

export function fmtFecha(v) {
  const d = aFecha(v);
  return d ? d.toLocaleString('es-MX', { dateStyle: 'medium', timeStyle: 'short' }) : '—';
}

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function csv(filas) {
  const celda = v => '"' + String(v ?? '').replace(/"/g, '""') + '"';
  return '﻿' + filas.map(f => f.map(celda).join(',')).join('\r\n');
}

export function descargar(nombre, texto, tipo = 'text/csv;charset=utf-8') {
  const url = URL.createObjectURL(new Blob([texto], { type: tipo }));
  const a = Object.assign(document.createElement('a'), { href: url, download: nombre });
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export const correoValido = e => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
