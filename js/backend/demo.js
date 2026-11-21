// Backend de DEMOSTRACIÓN (solo se usa en localhost). Guarda en localStorage del navegador.
// Sirve para probar el sitio sin Firebase. No borra datos: solo agrega o actualiza estados.
import { ADMINS } from '../config.js';

const K = 'tv_demo_datos';
const leer = () => {
  try { return JSON.parse(localStorage.getItem(K)) || {}; } catch { return {}; }
};
const base = () => ({ perfiles: {}, intentos: [], envios: [], bitacora: [], sesion: null, ...leer() });
const guardar = d => localStorage.setItem(K, JSON.stringify(d));

export function crearBackend() {
  let oyente = () => {};
  let oyentesPerfiles = [];
  const avisarPerfiles = () => {
    const d = base();
    oyentesPerfiles.forEach(cb => cb(Object.entries(d.perfiles).map(([id, p]) => ({ id, ...p }))));
  };
  return {
    modo: 'demo',

    onUsuario(cb) {
      oyente = cb;
      setTimeout(() => cb(base().sesion), 0);
      return () => {};
    },

    async enviarEnlace(email) {
      // En demo se inicia sesión directo, sin correo real
      const d = base();
      d.sesion = { uid: 'demo-' + email.replace(/[^a-z0-9]/gi, '_'), email };
      guardar(d);
      setTimeout(() => oyente(d.sesion), 0);
    },

    async completarEnlaceSiExiste() { return false; },

    async salir() {
      const d = base(); d.sesion = null; guardar(d); oyente(null);
    },

    async obtenerPerfil(uid) {
      const p = base().perfiles[uid];
      return p ? { id: uid, ...p } : null;
    },

    async crearPerfil(user, { nombre }) {
      const d = base();
      const admin = ADMINS.includes(user.email);
      d.perfiles[user.uid] = {
        email: user.email, nombre,
        estado: admin ? 'aprobado' : 'pendiente',
        rol: admin ? 'admin' : 'usuario',
        creadoEn: new Date().toISOString()
      };
      guardar(d); avisarPerfiles();
      return { id: user.uid, ...d.perfiles[user.uid] };
    },

    escucharPerfiles(cb) {
      oyentesPerfiles.push(cb); avisarPerfiles();
      return () => { oyentesPerfiles = oyentesPerfiles.filter(x => x !== cb); };
    },

    async cambiarEstado(uid, estado, adminEmail, motivo = '') {
      const d = base();
      Object.assign(d.perfiles[uid], { estado, actualizadoPor: adminEmail, actualizadoEn: new Date().toISOString() });
      d.bitacora.push({ uid, estadoNuevo: estado, por: adminEmail, motivo, fecha: new Date().toISOString() });
      guardar(d); avisarPerfiles();
    },

    async guardarIntento(datos) {
      const d = base();
      const id = 'int-' + Date.now();
      d.intentos.push({ id, ...datos, fecha: new Date().toISOString() });
      guardar(d);
      return id;
    },

    async registrarEnvio(datos) {
      const d = base(); d.envios.push({ ...datos, fecha: new Date().toISOString() }); guardar(d);
    },

    async misIntentos(uid) { return base().intentos.filter(i => i.uid === uid); },
    async todosIntentos() { return base().intentos; }
  };
}
