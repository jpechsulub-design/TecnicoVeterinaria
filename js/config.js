// ============================================================
//  CONFIGURACIÓN DEL SITIO
//  Reemplaza los valores "REEMPLAZAR" siguiendo el README.md
//  (estos valores son públicos por diseño; la seguridad real la
//   dan las reglas de Firestore incluidas en firestore.rules).
// ============================================================

export const SITIO = {
  nombre: 'Técnico en Veterinaria',
  lema: 'Aprende, practica y evalúa tus conocimientos'
};

// Cuentas administradoras (la validación real está en firestore.rules).
export const ADMINS = ['aspechg@gmail.com', 'jpechsulub@gmail.com'];

// Proyecto de Firebase (Authentication por enlace de correo + Firestore)
export const FIREBASE_CONFIG = {
  apiKey: 'REEMPLAZAR',
  authDomain: 'REEMPLAZAR.firebaseapp.com',
  projectId: 'REEMPLAZAR',
  appId: 'REEMPLAZAR'
};

// Envío de resultados por correo (EmailJS)
export const EMAILJS = {
  serviceId: 'REEMPLAZAR',
  templateId: 'REEMPLAZAR',
  publicKey: 'REEMPLAZAR'
};

export const configurado = cfg => !Object.values(cfg).some(v => String(v).includes('REEMPLAZAR'));

export const esLocal = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
