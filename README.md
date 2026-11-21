# 🐾 Técnico en Veterinaria

Sitio web (estático) para publicar los módulos educativos. Cada módulo es una **sección** del sitio, con acceso por correo, validación de usuarios por administradores y evaluación cuyo resultado llega por correo.

| Pieza | Tecnología | Para qué |
|---|---|---|
| Sitio | HTML + CSS + JavaScript (sin compilar) | Se publica gratis con GitHub Pages |
| Acceso | Firebase Authentication (enlace por correo, sin contraseña) | Inicio de sesión basado en correo |
| Datos | Firestore + `firestore.rules` | Usuarios, resultados y bitácora **sin borrado** |
| Correos | EmailJS | Envía preguntas, respuestas y retroalimentación al usuario |

**Administradores:** `aspechg@gmail.com` y `jpechsulub@gmail.com` (definidos en `js/config.js` y, lo que realmente protege, en `firestore.rules`).

## Cómo funciona el acceso

1. La persona escribe su correo y recibe un enlace de acceso.
2. En su primera entrada captura su nombre y queda **pendiente**.
3. Un administrador la **aprueba, rechaza o suspende** desde la sección 🛡️ Administración.
4. Solo los usuarios **aprobados** ven los módulos, presentan evaluaciones y reciben el correo.

## Datos que no se borran

- Las reglas de Firestore (`firestore.rules`) prohíben `delete` en **todas** las colecciones, incluso a administradores.
- Los resultados (`intentos`), los envíos de correo (`envios`) y la `bitacora` de decisiones **solo se pueden crear**, nunca modificar.
- Los usuarios solo cambian de estado; no existe ningún botón ni código que elimine registros.
- Recomendado además: en Firebase, activa copias de seguridad programadas / exportaciones periódicas y no des el rol de "Propietario" del proyecto a más personas de las necesarias (los permisos de la consola sí pueden borrar datos).

## Puesta en marcha (una sola vez)

### 1. Firebase
1. Entra a <https://console.firebase.google.com> con `jpechsulub@gmail.com` → **Agregar proyecto**.
2. **Authentication → Método de acceso → Correo electrónico/contraseña →** activa **"Vínculo de correo electrónico (acceso sin contraseña)"**.
3. **Authentication → Configuración → Dominios autorizados →** agrega `jpechsulub-design.github.io`.
4. **Firestore Database → Crear base de datos** (modo producción) → pestaña **Reglas** → pega el contenido de `firestore.rules` → **Publicar**.
5. **Configuración del proyecto → Tus apps → Web (`</>`)** → copia el objeto `firebaseConfig`.
6. Pega `apiKey`, `authDomain`, `projectId` y `appId` en `js/config.js` (`FIREBASE_CONFIG`).

> Estos valores son públicos por diseño; lo que protege los datos son las reglas del paso 4.

### 2. EmailJS (envío de resultados)
1. Crea cuenta en <https://www.emailjs.com> y agrega un **Email Service** (por ejemplo, tu Gmail).
2. Crea una **plantilla** con:
   - **To Email:** `{{to_email}}`
   - **Subject:** `{{subject}}`
   - **Contenido (HTML):** `{{{resultado_html}}}` (con **tres** llaves, para que se vea formateado)
3. En **Account → Security** limita los dominios permitidos a `jpechsulub-design.github.io`.
4. Copia `Service ID`, `Template ID` y `Public Key` en `js/config.js` (`EMAILJS`).

El plan gratuito tiene un límite mensual de correos; si crece el uso, cambia de plan o migra a la extensión "Trigger Email" de Firebase.

### 3. Publicar con GitHub Pages
**Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**. El sitio queda en `https://jpechsulub-design.github.io/TecnicoVeterinaria/`.

### 4. Verificar
Entra con `jpechsulub@gmail.com` (se registra como administrador automáticamente), crea otra cuenta de prueba, apruébala desde Administración y presenta la evaluación.

## Probar en tu computadora (modo demostración)

```bash
python3 -m http.server 8000
# abre http://localhost:8000
```
Mientras `js/config.js` tenga valores `REEMPLAZAR`, en `localhost` el sitio funciona en **modo demostración** (datos en el navegador, sin correos reales). En un dominio público sin configurar, el sitio no se abre.

## Agregar un módulo nuevo

1. Copia `js/modulos/modulo1.js` como `js/modulos/modulo2.js`; cambia el contenido y el arreglo `preguntas` (`s` sección, `q` pregunta, `o` opciones, `a` índice correcto, `e` retroalimentación).
2. Agrega el módulo en `js/modulos/registro.js`.
3. (Opcional) sube su guía a `modulos/modulo2/`.

Aparecerá solo en el menú y en la página de inicio, y su evaluación usará el mismo guardado y envío de correo.

## Limitación a tener en cuenta

El sitio se sirve desde un repositorio. El **control de acceso protege el uso, el registro y los resultados**, pero los archivos de contenido de los módulos están en el repositorio y no son secretos. Si más adelante necesitas contenido realmente confidencial, se puede mover a Firestore/Storage protegido por las mismas reglas.

## Estructura

```
index.html            página única
css/styles.css        diseño veterinario
js/app.js             acceso, rutas y vistas
js/admin.js           panel de administradores
js/evaluacion.js      evaluación reutilizable (guardado + correo)
js/correo.js          armado y envío del correo
js/backend/           firebase.js (real) y demo.js (solo localhost)
js/modulos/           registro.js y un archivo por módulo
modulos/modulo1/      guía de estudio del módulo 1
firestore.rules       reglas de seguridad (sin borrado)
```
