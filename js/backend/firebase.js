// Backend real: Firebase Authentication (enlace por correo) + Firestore.
// IMPORTANTE: este archivo NO contiene ninguna operación de borrado.
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js';
import {
  getAuth, onAuthStateChanged, sendSignInLinkToEmail,
  isSignInWithEmailLink, signInWithEmailLink, signOut
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js';
import {
  getFirestore, doc, getDoc, setDoc, addDoc, updateDoc, collection,
  getDocs, onSnapshot, query, where, serverTimestamp
} from 'https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js';
import { FIREBASE_CONFIG, ADMINS } from '../config.js';

const CLAVE_CORREO = 'tv_correo_login';

export function crearBackend() {
  const app = initializeApp(FIREBASE_CONFIG);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const normal = u => (u ? { uid: u.uid, email: String(u.email || '').toLowerCase() } : null);
  const lista = snap => snap.docs.map(d => ({ id: d.id, ...d.data() }));

  return {
    modo: 'firebase',

    onUsuario: cb => onAuthStateChanged(auth, u => cb(normal(u))),

    async enviarEnlace(email) {
      await sendSignInLinkToEmail(auth, email, {
        url: location.origin + location.pathname,
        handleCodeInApp: true
      });
      localStorage.setItem(CLAVE_CORREO, email);
    },

    async completarEnlaceSiExiste() {
      if (!isSignInWithEmailLink(auth, location.href)) return false;
      let email = localStorage.getItem(CLAVE_CORREO);
      if (!email) email = prompt('Para confirmar tu acceso, escribe el correo al que llegó el enlace:');
      if (!email) return false;
      await signInWithEmailLink(auth, email.trim(), location.href);
      localStorage.removeItem(CLAVE_CORREO);
      history.replaceState({}, '', location.origin + location.pathname + location.hash);
      return true;
    },

    salir: () => signOut(auth),

    async obtenerPerfil(uid) {
      const s = await getDoc(doc(db, 'usuarios', uid));
      return s.exists() ? { id: s.id, ...s.data() } : null;
    },

    async crearPerfil(user, { nombre }) {
      const admin = ADMINS.includes(user.email);
      const perfil = {
        email: user.email,
        nombre,
        estado: admin ? 'aprobado' : 'pendiente',
        rol: admin ? 'admin' : 'usuario',
        creadoEn: serverTimestamp()
      };
      await setDoc(doc(db, 'usuarios', user.uid), perfil);
      return { id: user.uid, ...perfil, creadoEn: new Date() };
    },

    escucharPerfiles: (cb, onError) =>
      onSnapshot(collection(db, 'usuarios'), s => cb(lista(s)), onError),

    async cambiarEstado(uid, estado, adminEmail, motivo = '') {
      await updateDoc(doc(db, 'usuarios', uid), {
        estado, actualizadoPor: adminEmail, actualizadoEn: serverTimestamp()
      });
      // Bitácora: solo se agrega, nunca se modifica ni se borra
      await addDoc(collection(db, 'bitacora'), {
        uid, estadoNuevo: estado, por: adminEmail, motivo, fecha: serverTimestamp()
      });
    },

    async guardarIntento(datos) {
      const r = await addDoc(collection(db, 'intentos'), { ...datos, fecha: serverTimestamp() });
      return r.id;
    },

    async registrarEnvio(datos) {
      await addDoc(collection(db, 'envios'), { ...datos, fecha: serverTimestamp() });
    },

    async misIntentos(uid) {
      const s = await getDocs(query(collection(db, 'intentos'), where('uid', '==', uid)));
      return lista(s);
    },

    async todosIntentos() {
      return lista(await getDocs(collection(db, 'intentos')));
    }
  };
}
