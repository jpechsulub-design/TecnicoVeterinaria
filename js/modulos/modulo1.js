// Módulo 1 · Anatomía, homeostasis y bienestar animal (5 dominios)
import { buscarModulo } from './registro.js';
const meta = buscarModulo('modulo1');

export const preguntas=[
 {s:'Anatomía',q:'¿Qué término indica “hacia la cabeza”?',o:['Caudal','Craneal','Ventral','Dorsal'],a:1,e:'Craneal = hacia la cabeza.'},
 {s:'Anatomía',q:'¿Qué término indica “hacia la cola”?',o:['Rostral','Craneal','Caudal','Dorsal'],a:2,e:'Caudal = hacia la cola.'},
 {s:'Anatomía',q:'En relación con la columna vertebral, el corazón está en posición…',o:['Dorsal','Ventral','Caudal','Craneal'],a:1,e:'La columna va por el lomo (dorsal); el corazón queda hacia la panza (ventral).'},
 {s:'Anatomía',q:'Los riñones se ubican en la zona ___ del abdomen.',o:['Ventral','Rostral','Dorsal','Distal'],a:2,e:'Están pegados al lomo, junto a la columna.'},
 {s:'Anatomía',q:'El plano que divide al animal en mitad izquierda y mitad derecha es el…',o:['Transversal','Dorsal','Sagital','Distal'],a:2,e:'Sagital separa izquierda y derecha; el transversal, cabeza y cola; el dorsal, lomo y panza.'},
 {s:'Anatomía',q:'¿Cuál de estas estructuras es la más caudal?',o:['Cerebro','Corazón','Pulmones','Vejiga'],a:3,e:'La vejiga está en la pelvis, cerca de la cola.'},
 {s:'Anatomía',q:'Escápula, húmero, radio y ulna pertenecen al miembro…',o:['Pélvico','Torácico','Caudal','Dorsal'],a:1,e:'Son los huesos del miembro delantero o torácico.'},
 {s:'Homeostasis',q:'La homeostasis es…',o:['La reproducción de células','Mantener estable el medio interno','El movimiento de los huesos','La digestión del alimento'],a:1,e:'Es el equilibrio interno frente a cambios externos.'},
 {s:'Homeostasis',q:'Los tres componentes básicos de un circuito homeostático son…',o:['Receptor, centro de control y efector','Hueso, músculo y nervio','Plano, eje y corte','Hambre, sed y sueño'],a:0,e:'Detecta, decide y ejecuta.'},
 {s:'Homeostasis',q:'Si el cuerpo responde para revertir un cambio, hablamos de retroalimentación…',o:['Positiva','Negativa','Cruzada','Ventral'],a:1,e:'La negativa corrige y devuelve al valor normal.'},
 {s:'Homeostasis',q:'El centro de control de la temperatura corporal es el…',o:['Hipotálamo','Hígado','Esternón','Estómago'],a:0,e:'El hipotálamo funciona como termostato.'},
 {s:'Homeostasis',q:'¿Qué respuesta ayuda al perro a perder calor?',o:['Temblor','Piloerección','Jadeo y vasodilatación','Vasoconstricción'],a:2,e:'El jadeo evapora agua y la vasodilatación libera calor por la piel.'},
 {s:'Bienestar',q:'¿Quién formuló el Modelo de los Cinco Dominios?',o:['David J. Mellor','Louis Pasteur','Claude Bernard','Ivan Pavlov'],a:0,e:'David J. Mellor, en 1994 en su primera versión, y lo ha actualizado después.'},
 {s:'Bienestar',q:'¿Cuántos dominios tiene el modelo?',o:['3','4','5','7'],a:2,e:'Nutrición, ambiente, salud, comportamiento y estado mental.'},
 {s:'Bienestar',q:'¿Cuál NO es un dominio del modelo?',o:['Nutrición','Reproducción','Salud','Ambiente'],a:1,e:'La reproducción no es un dominio; sí lo son los otros tres.'},
 {s:'Bienestar',q:'Un perro encadenado al sol a 38 °C sin sombra afecta principalmente el dominio de…',o:['Nutrición','Ambiente (confort térmico)','Salud','Comportamiento'],a:1,e:'Es una falla en el confort térmico del ambiente.'},
 {s:'Bienestar',q:'Un gato con cojera que no recibe atención afecta sobre todo…',o:['Salud','Ambiente','Nutrición','Comportamiento'],a:0,e:'Falla la ausencia de lesiones y de enfermedad.'},
 {s:'Bienestar',q:'Un perro aislado, sin poder socializar ni jugar, sufre en el dominio de…',o:['Nutrición','Salud','Comportamiento','Ambiente'],a:2,e:'Falta la expresión de conducta social y de otras conductas.'},
 {s:'Bienestar',q:'Un cachorro con miedo constante en la clínica refleja un problema del…',o:['Estado mental','Dominio nutricional','Plano sagital','Dominio de salud física únicamente'],a:0,e:'Miedo y estrés son estados emocionales negativos.'},
 {s:'Bienestar',q:'¿Qué criterio corresponde al dominio de nutrición?',o:['Comfort térmico','Ausencia de sed','Ausencia de lesiones','Conducta social'],a:1,e:'Nutrición: ausencia de hambre prolongada y de sed.'}
];

const PLANTILLA = `
<div class="tabs" id="mtabs">
  <button data-t="t1" class="on">1 · Anatomía</button>
  <button data-t="t2">2 · Homeostasis</button>
  <button data-t="t3">3 · Cinco dominios</button>
  <button data-t="t4">📝 Evaluación (20)</button>
</div>
<!-- ============ ANATOMÍA ============ -->
<div class="msec on" id="t1">
  <div class="card">
    <h2>Direcciones para ubicarte en el cuerpo</h2>
    <p>Imagina a un perro de pie visto de lado. Estas palabras sirven para decir <b>dónde</b> está cada hueso u órgano:</p>
    <div class="row">
      <span class="tag">Craneal → hacia la cabeza</span>
      <span class="tag">Caudal → hacia la cola</span>
      <span class="tag">Dorsal → hacia el lomo</span>
      <span class="tag">Ventral → hacia la panza</span>
    </div>
    <p class="muted">Extra útil: <b>rostral</b> (hacia la nariz, solo en la cabeza), <b>proximal</b> (cerca del tronco) y <b>distal</b> (lejos del tronco). Los <b>planos</b> son cortes imaginarios: <b>sagital</b> (izquierda/derecha), <b>transversal</b> (cabeza/cola) y <b>dorsal</b> (lomo/panza).</p>
  </div>

  <div class="card">
    <div class="row">
      <button class="btn sel" id="bBones">🦴 Huesos</button>
      <button class="btn alt" id="bOrgans">🫀 Órganos</button>
      <button class="btn alt" id="bChallenge">🎯 Reto de ubicación</button>
    </div>
    <svg viewBox="0 0 620 340" id="dog" role="img" aria-label="Perro visto de lado con huesos y órganos">
      <!-- indicadores de dirección -->
      <g font-size="13" fill="#5d6b75" font-weight="600">
        <text x="8" y="22">← CRANEAL</text>
        <text x="540" y="22">CAUDAL →</text>
        <text x="300" y="22" text-anchor="middle">↑ DORSAL</text>
        <text x="300" y="334" text-anchor="middle">↓ VENTRAL</text>
      </g>
      <!-- silueta -->
      <g fill="#efe3cf" stroke="#c9b99b" stroke-width="2">
        <ellipse cx="300" cy="150" rx="175" ry="72"/>
        <path d="M60 110 Q45 135 55 165 Q80 185 125 170 L150 90 Q110 80 60 110Z"/>
        <path d="M125 90 L195 85 L200 150 L140 175Z"/>
        <rect x="150" y="195" width="30" height="105" rx="12"/>
        <rect x="425" y="195" width="30" height="105" rx="12"/>
        <path d="M470 115 Q540 80 560 45 Q570 40 568 55 Q545 110 480 150Z"/>
      </g>
      <g id="layerBones"></g>
      <g id="layerOrgans" style="display:none"></g>
    </svg>
    <div id="chal" class="fb" style="display:none"></div>
  </div>

  <div class="card info" id="info">
    <h3>Toca una estructura</h3>
    <p class="muted">Selecciona cualquier hueso (o cambia a órganos) para ver dónde está, qué hace y un dato clínico.</p>
  </div>
</div>

<!-- ============ HOMEOSTASIS ============ -->
<div class="msec" id="t2">
  <div class="card">
    <h2>¿Qué es la homeostasis?</h2>
    <p>Es la capacidad del cuerpo de <b>mantener su medio interno estable</b> (temperatura, agua, glucosa, pH…) aunque el exterior cambie. Funciona como un termostato: <b>retroalimentación negativa</b>, cuando algo se aleja de lo normal, el cuerpo hace lo contrario para regresarlo.</p>
    <div class="flow">
      <div><b>1. Receptor</b><br>detecta el cambio</div><span>→</span>
      <div><b>2. Centro de control</b><br>compara con lo normal (hipotálamo)</div><span>→</span>
      <div><b>3. Efector</b><br>actúa (músculos, vasos, glándulas)</div><span>→</span>
      <div><b>4. Respuesta</b><br>regresa al equilibrio</div>
    </div>
  </div>
  <div class="card">
    <h2>🌡️ Simulador: temperatura de un perro</h2>
    <p>Mueve el control de la temperatura ambiente y observa qué hace el cuerpo.</p>
    <input type="range" id="temp" min="-10" max="48" value="22">
    <div class="row"><span>Ambiente: <b id="tAmb">22 °C</b></span><span>Cuerpo del perro: <b id="tBody" class="big">38.6 °C</b></span></div>
    <div class="bar"><i id="tBar"></i></div>
    <div class="fb" id="tFb"></div>
    <p class="muted">Referencia: la temperatura rectal normal del perro ronda 38.0–39.2 °C. Es un modelo simplificado para estudiar, no un valor clínico exacto.</p>
  </div>
  <div class="card">
    <h2>Haz clic: ¿qué mecanismo es?</h2>
    <div id="homQ"></div>
  </div>
</div>

<!-- ============ DOMINIOS ============ -->
<div class="msec" id="t3">
  <div class="card">
    <h2>Modelo de los Cinco Dominios (David J. Mellor)</h2>
    <p>Sirve para evaluar el bienestar de forma ordenada y completa. Los cuatro primeros dominios son <b>físicos/funcionales</b> y el quinto es lo que el animal <b>siente</b> como resultado. Toca cada uno:</p>
    <div class="grid" id="doms"></div>
  </div>
  <div class="card info" id="domInfo"><p class="muted">Selecciona un dominio para ver sus criterios y cómo aplicarlo con tu mascota y en la clínica.</p></div>
  <div class="card">
    <h2>🎮 Juego: ¿a qué dominio afecta?</h2>
    <p class="muted">Lee la situación y elige el dominio principal.</p>
    <div id="game"></div>
  </div>
</div>
<div class="msec" id="t4"><div id="evalRoot"></div></div>
`;

export function render(root, ctx) {
  root.innerHTML = PLANTILLA;
  root.querySelectorAll('#mtabs button').forEach(b => b.onclick = () => {
    root.querySelectorAll('#mtabs button').forEach(x => x.classList.remove('on'));
    root.querySelectorAll('.msec').forEach(x => x.classList.remove('on'));
    b.classList.add('on');
    root.querySelector('#' + b.dataset.t).classList.add('on');
    root.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  iniciarContenido(root);
  ctx.montarEvaluacion(root.querySelector('#evalRoot'), { meta, preguntas });
}

function iniciarContenido(root) {

const $=id=>root.querySelector('#'+id);

/* ---------- ANATOMÍA ---------- */
const bones=[
 {id:'craneo',n:'Cráneo',sh:'<ellipse cx="88" cy="118" rx="36" ry="28"/>',c:'#e8e0c8',
  loc:'Extremo <b>craneal</b> del cuerpo; la parte más <b>rostral</b> es el hocico.',fn:'Protege el cerebro y sostiene órganos de los sentidos.',cl:'En golpes de cabeza se valora estado neurológico antes que cualquier otra cosa.'},
 {id:'mandibula',n:'Mandíbula',sh:'<ellipse cx="78" cy="156" rx="32" ry="9"/>',c:'#dfd5b4',
  loc:'<b>Ventral</b> al cráneo, formando la quijada inferior.',fn:'Mastica y sostiene los dientes inferiores.',cl:'La enfermedad dental y las fracturas de mandíbula son comunes en pequeñas especies.'},
 {id:'cervicales',n:'Vértebras cervicales (7)',sh:'<ellipse cx="160" cy="105" rx="38" ry="9" transform="rotate(18 160 105)"/>',c:'#e8e0c8',
  loc:'Entre el cráneo y el tórax, en posición <b>dorsal</b> del cuello.',fn:'Dan movilidad al cuello y protegen la médula espinal.',cl:'Su lesión puede causar dolor intenso y déficits neurológicos; se maneja el cuello con cuidado.'},
 {id:'escapula',n:'Escápula',sh:'<ellipse cx="208" cy="122" rx="12" ry="34" transform="rotate(20 208 122)"/>',c:'#dfd5b4',
  loc:'<b>Craneal</b> y <b>dorsal</b> en el tórax, parte del miembro torácico.',fn:'Une el miembro delantero al tronco (sin articulación ósea rígida).',cl:'Referencia para ubicar la zona de inyección subcutánea interescapular.'},
 {id:'humero',n:'Húmero',sh:'<ellipse cx="188" cy="190" rx="8" ry="30" transform="rotate(-20 188 190)"/>',c:'#e8e0c8',
  loc:'Miembro torácico, <b>proximal</b> al antebrazo.',fn:'Hueso del brazo; forma el hombro y el codo.',cl:'Las fracturas de húmero suelen requerir cirugía ortopédica.'},
 {id:'radio',n:'Radio y ulna',sh:'<ellipse cx="166" cy="248" rx="7" ry="32"/>',c:'#dfd5b4',
  loc:'Miembro torácico, <b>distal</b> al húmero.',fn:'Forman el antebrazo.',cl:'La vena cefálica, donde se canaliza, corre por la cara dorsal del antebrazo.'},
 {id:'costillas',n:'Costillas y esternón',sh:'<ellipse cx="290" cy="148" rx="62" ry="52" fill="none" stroke-width="7"/>',c:'#e8e0c8',
  loc:'Jaula torácica, rodea corazón y pulmones.',fn:'Protegen órganos del tórax y ayudan a respirar.',cl:'Se cuentan y palpan al evaluar condición corporal.'},
 {id:'columna',n:'Columna toracolumbar',sh:'<rect x="205" y="88" width="205" height="11" rx="5"/>',c:'#dfd5b4',
  loc:'Línea <b>dorsal</b> del tronco, entre cuello y pelvis.',fn:'Soporta el cuerpo y protege la médula espinal.',cl:'Las hernias de disco son frecuentes en razas de espalda larga.'},
 {id:'pelvis',n:'Pelvis',sh:'<ellipse cx="430" cy="135" rx="20" ry="32" transform="rotate(-20 430 135)"/>',c:'#e8e0c8',
  loc:'<b>Caudal</b> en el tronco, une el miembro pélvico a la columna.',fn:'Soporta el peso trasero y protege órganos pélvicos.',cl:'Se valora con radiografía en displasia de cadera.'},
 {id:'femur',n:'Fémur',sh:'<ellipse cx="442" cy="190" rx="9" ry="32" transform="rotate(25 442 190)"/>',c:'#dfd5b4',
  loc:'Miembro pélvico, <b>proximal</b> a la tibia.',fn:'Hueso del muslo; el más largo y fuerte.',cl:'Sitio común de fracturas por atropello.'},
 {id:'tibia',n:'Tibia y peroné',sh:'<ellipse cx="446" cy="250" rx="7" ry="32" transform="rotate(-10 446 250)"/>',c:'#e8e0c8',
  loc:'Miembro pélvico, <b>distal</b> al fémur.',fn:'Forman la pierna.',cl:'La vena safena se usa para toma de muestra en la cara lateral.'},
 {id:'caudales',n:'Vértebras caudales',sh:'<path d="M475 125 Q540 90 560 52" fill="none" stroke-width="9" stroke-linecap="round"/>',c:'#dfd5b4',
  loc:'Extremo más <b>caudal</b> del cuerpo (la cola).',fn:'Equilibrio y comunicación.',cl:'Se lesionan por pellizcos o jalones; en el gato puede causar daño nervioso.'}
];
const organs=[
 {id:'cerebro',n:'Cerebro',sh:'<ellipse cx="88" cy="116" rx="21" ry="17"/>',c:'#e79ab0',
  loc:'En la cabeza, <b>craneal</b> y <b>dorsal</b>, dentro del cráneo.',fn:'Centro de control del sistema nervioso.',cl:'Es el “centro de mando” de la homeostasis (hipotálamo).'},
 {id:'pulmones',n:'Pulmones',sh:'<ellipse cx="252" cy="133" rx="44" ry="37"/>',c:'#8ec5e8',
  loc:'Tórax, <b>craneales</b> al diafragma y <b>dorsales</b> al corazón.',fn:'Intercambio de gases (O₂ y CO₂).',cl:'Se auscultan en ambos lados del tórax.'},
 {id:'corazon',n:'Corazón',sh:'<ellipse cx="212" cy="172" rx="22" ry="24"/>',c:'#d9534f',
  loc:'Tórax, <b>ventral</b> a los pulmones y a la columna, algo <b>craneal</b>.',fn:'Bomba que mueve la sangre.',cl:'Se ausculta en el lado izquierdo, a la altura del codo.'},
 {id:'higado',n:'Hígado',sh:'<ellipse cx="288" cy="168" rx="24" ry="30"/>',c:'#a8553a',
  loc:'Abdomen <b>craneal</b>, justo detrás del diafragma.',fn:'Metaboliza, desintoxica y produce bilis.',cl:'Sus enzimas en sangre indican daño hepático.'},
 {id:'estomago',n:'Estómago',sh:'<ellipse cx="322" cy="160" rx="25" ry="22"/>',c:'#e8b36b',
  loc:'Abdomen craneal, <b>caudal</b> al hígado.',fn:'Inicia la digestión química.',cl:'La dilatación-vólvulo gástrico es una urgencia en razas grandes.'},
 {id:'intestinos',n:'Intestinos',sh:'<ellipse cx="372" cy="170" rx="40" ry="30"/>',c:'#f0cf8a',
  loc:'Abdomen medio, <b>caudales</b> al estómago, hacia <b>ventral</b>.',fn:'Absorben nutrientes y agua.',cl:'La diarrea prolongada rompe la homeostasis del agua y electrolitos.'},
 {id:'rinon',n:'Riñón',sh:'<ellipse cx="338" cy="116" rx="15" ry="9"/>',c:'#b05e7a',
  loc:'<b>Dorsal</b> en el abdomen, junto a la columna.',fn:'Filtra la sangre, regula agua y electrolitos.',cl:'Clave para la homeostasis; se evalúa con urea y creatinina.'},
 {id:'vejiga',n:'Vejiga',sh:'<ellipse cx="415" cy="182" rx="14" ry="12"/>',c:'#f4e27a',
  loc:'<b>Caudal</b> y <b>ventral</b>, en la pelvis.',fn:'Almacena la orina.',cl:'La cistocentesis se hace desde la pared ventral del abdomen.'}
];
function draw(list,layer){
  $(layer).innerHTML=list.map(p=>`<g class="part" data-id="${p.id}" fill="${p.c}" stroke="#7a6a4a" stroke-width="2">${p.sh}</g>`).join('');
}
draw(bones,'layerBones');draw(organs,'layerOrgans');
let mode='bones',challenge=null;
const all=()=>mode==='bones'?bones:organs;
function setMode(m){
  mode=m;
  $('layerBones').style.display=m==='bones'?'':'none';
  $('layerOrgans').style.display=m==='organs'?'':'none';
  $('bBones').className='btn '+(m==='bones'?'sel':'alt');
  $('bOrgans').className='btn '+(m==='organs'?'sel':'alt');
  if(challenge)nextChallenge();
}
$('bBones').onclick=()=>{endChallenge();setMode('bones')};
$('bOrgans').onclick=()=>{endChallenge();setMode('organs')};
$('bChallenge').onclick=()=>{challenge={score:0,total:0};$('bChallenge').className='btn sel';nextChallenge()};
function endChallenge(){challenge=null;$('chal').style.display='none';$('bChallenge').className='btn alt'}
function nextChallenge(){
  root.querySelectorAll('.part').forEach(e=>e.classList.remove('ok','no','sel'));
  const l=all();challenge.target=l[Math.floor(Math.random()*l.length)];
  $('chal').style.display='block';
  $('chal').innerHTML=`🎯 Toca: <b>${challenge.target.n}</b> &nbsp; <span class="muted">Aciertos: ${challenge.score}/${challenge.total} · <a href="#" id="stop">terminar reto</a></span>`;
  $('stop').onclick=e=>{e.preventDefault();endChallenge()};
}
root.querySelector('#dog').addEventListener('click',e=>{
  const g=e.target.closest('.part');if(!g)return;
  const p=all().find(x=>x.id===g.dataset.id);if(!p)return;
  if(challenge){
    challenge.total++;
    const hit=p.id===challenge.target.id;
    if(hit){challenge.score++;g.classList.add('ok')}else{g.classList.add('no')}
    $('info').innerHTML=`<h3>${hit?'✅ ¡Correcto!':'❌ Esa es: '+p.n}</h3><p>${hit?'':'Buscabas: <b>'+challenge.target.n+'</b>. '}${challenge.target.loc}</p>`;
    setTimeout(nextChallenge,1300);return;
  }
  root.querySelectorAll('.part').forEach(x=>x.classList.remove('sel'));g.classList.add('sel');
  $('info').innerHTML=`<h3>${p.n}</h3><p>📍 <b>Dónde:</b> ${p.loc}</p><p>⚙️ <b>Para qué:</b> ${p.fn}</p><p>🩺 <b>En la clínica:</b> ${p.cl}</p>`;
});

/* ---------- HOMEOSTASIS ---------- */
function bodyTemp(a){
  // modelo simplificado: regulación efectiva entre 5 y 38 °C ambientales
  if(a<5)return Math.max(30,38.6-(5-a)*0.45);
  if(a>38)return Math.min(42.5,38.9+(a-38)*0.4);
  return 38.2+ (a-5)*(0.7/33);
}
function tempUpdate(){
  const a=+$('temp').value,t=bodyTemp(a);
  $('tAmb').textContent=a+' °C';$('tBody').textContent=t.toFixed(1)+' °C';
  let msg,col;
  if(a<5){msg='⚠️ <b>Falla homeostática: hipotermia.</b> Los mecanismos ya no alcanzan. Hay que abrigar y calentar de forma gradual.';col='#c0392b'}
  else if(a<16){msg='🥶 <b>Frío:</b> el receptor (piel/hipotálamo) detecta pérdida de calor → los efectores responden con <b>temblor muscular</b>, <b>vasoconstricción</b> periférica y <b>piloerección</b>.';col='#d9822b'}
  else if(a<=28){msg='✅ <b>Zona de confort:</b> el cuerpo casi no necesita gastar energía extra para mantener su temperatura.';col='#2e8b57'}
  else if(a<=38){msg='🥵 <b>Calor:</b> el hipotálamo activa <b>jadeo</b> (evaporación), <b>vasodilatación</b> y busca sombra y agua.';col='#d9822b'}
  else{msg='⚠️ <b>Falla homeostática: golpe de calor.</b> El jadeo ya no basta. Es una urgencia: enfriar de forma gradual y trasladar a clínica.';col='#c0392b'}
  $('tFb').innerHTML=msg;
  const pct=Math.max(0,Math.min(100,(t-30)/(42.5-30)*100));
  $('tBar').style.width=pct+'%';$('tBar').style.background=col;
}
$('temp').oninput=tempUpdate;tempUpdate();

function mcq(containerId,items,onDone){
  let i=0,sc=0;const c=$(containerId);
  function show(){
    if(i>=items.length){c.innerHTML=`<div class="fb"><b>Resultado: ${sc}/${items.length}</b> <button class="btn" id="rst_${containerId}">Repetir</button></div>`;
      $('rst_'+containerId).onclick=()=>{i=0;sc=0;show()};return}
    const q=items[i];
    c.innerHTML=`<p><b>${q.q}</b></p>`+q.o.map((t,k)=>`<button class="opt" data-k="${k}">${t}</button>`).join('')+`<div id="fb_${containerId}"></div>`;
    c.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
      const k=+b.dataset.k,ok=k===q.a;if(ok)sc++;
      c.querySelectorAll('.opt').forEach((x,j)=>{x.disabled=true;if(j===q.a)x.classList.add('ok')});
      if(!ok)b.classList.add('no');
      $('fb_'+containerId).innerHTML=`<div class="fb">${ok?'✅':'❌'} ${q.e} <br><button class="btn" id="nx_${containerId}" style="margin-top:8px">Siguiente</button></div>`;
      $('nx_'+containerId).onclick=()=>{i++;show()};
    });
  }
  show();
}
mcq('homQ',[
 {q:'El perro tiene calor y empieza a jadear. Ese ajuste es un ejemplo de…',o:['Retroalimentación positiva','Retroalimentación negativa','Reflejo condicionado','Falla homeostática'],a:1,e:'Jadear busca bajar la temperatura, o sea, revierte el cambio. Eso es retroalimentación negativa.'},
 {q:'¿Quién actúa como “centro de control” de la temperatura?',o:['Los pulmones','El corazón','El hipotálamo','El riñón'],a:2,e:'El hipotálamo compara la temperatura con el valor normal y ordena la respuesta.'},
 {q:'El temblor muscular en el frío cumple el papel de…',o:['Receptor','Efector','Centro de control','Estímulo'],a:1,e:'Los músculos ejecutan la orden y generan calor: son efectores.'},
 {q:'Un perro con diarrea severa pierde agua y sales. ¿Qué se está alterando?',o:['La homeostasis hídrica y electrolítica','Solo el apetito','El plano sagital','La conducta social'],a:0,e:'La pérdida de líquidos desequilibra el medio interno; por eso se hidrata y se trata la causa.'}
]);

/* ---------- DOMINIOS ---------- */
const doms=[
 {id:'nut',e:'🍖',n:'1 · Nutrición',crit:['Ausencia de hambre prolongada','Ausencia de sed'],pet:'Ración adecuada a su peso y etapa, agua limpia y fresca siempre disponible.',cli:'Evaluar condición corporal, preguntar qué y cuánto come, y verificar que haya agua en hospitalización.'},
 {id:'amb',e:'🏠',n:'2 · Ambiente (medio ambiente)',crit:['Confort durante el descanso','Facilidad de movimiento','Confort térmico'],pet:'Cama cómoda, espacio para moverse, sombra en verano y abrigo en frío.',cli:'Jaulas limpias y con espacio, piso antiderrapante, temperatura controlada y cobija para el paciente.'},
 {id:'sal',e:'🩺',n:'3 · Salud',crit:['Ausencia de enfermedad','Ausencia de lesiones','Ausencia de dolor inducido por el manejo'],pet:'Vacunas, desparasitación, revisión periódica y atención rápida ante cojera o cambios.',cli:'Sujeción adecuada, manejo gentil, analgesia cuando corresponde y prevención de lesiones por mal manejo.'},
 {id:'com',e:'🐕',n:'4 · Comportamiento apropiado',crit:['Expresión de conducta social','Expresión de otras conductas','Buena relación humano-animal'],pet:'Paseos, juego, olfateo, interacción con otros animales y trato respetuoso.',cli:'Dejar que el animal explore, evitar forzarlo, usar refuerzo positivo y respetar sus señales de estrés.'},
 {id:'men',e:'💛',n:'5 · Estado mental',crit:['Estado emocional positivo (en la diapositiva aparece junto a comportamiento)'],pet:'Rutinas predecibles, juego, cariño y ausencia de miedo o aburrimiento crónico.',cli:'Sala tranquila, feromonas, toallas con olor familiar, voz suave y minimizar esperas con ruido.'}
];
$('doms').innerHTML=doms.map(d=>`<button class="dom" data-id="${d.id}"><div class="e">${d.e}</div><b>${d.n}</b></button>`).join('');
root.querySelectorAll('.dom').forEach(b=>b.onclick=()=>{
  root.querySelectorAll('.dom').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  const d=doms.find(x=>x.id===b.dataset.id);
  $('domInfo').innerHTML=`<h3>${d.e} ${d.n}</h3><p><b>Criterios:</b></p><p>${d.crit.map(c=>`<span class="tag">${c}</span>`).join('')}</p><p>🏡 <b>Con tu mascota:</b> ${d.pet}</p><p>🏥 <b>En la clínica:</b> ${d.cli}</p>`;
  $('domInfo').scrollIntoView({behavior:'smooth',block:'nearest'});
});
const sit=[
 {t:'Un perro pasa todo el día atado en una azotea sin sombra.',a:'amb'},
 {t:'Un gato lleva horas con el plato de agua vacío.',a:'nut'},
 {t:'Un cachorro llega con una herida infectada que nadie ha curado.',a:'sal'},
 {t:'Un perro no puede jugar ni convivir con otros perros desde hace meses.',a:'com'},
 {t:'En la consulta, un gato tiembla y se esconde por miedo; se le baja el estrés con toalla y voz suave.',a:'men'},
 {t:'Al sujetar a un perro con una pata lastimada, el auxiliar lo jala y le provoca dolor.',a:'sal'},
 {t:'Un perro come solo una vez cada dos días y se ve flaco.',a:'nut'},
 {t:'Un perro vive en un cuarto tan pequeño que no puede estirarse ni caminar.',a:'amb'}
];
mcq('game',sit.map(s=>{
  const opts=doms.map(d=>d.n);const a=doms.findIndex(d=>d.id===s.a);
  return {q:s.t,o:opts,a,e:'Dominio principal: <b>'+doms[a].n+'</b>. Ojo: una situación real puede afectar varios dominios a la vez.'};
}));


}
