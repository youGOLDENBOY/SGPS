/* ═══════════════════════════════════════════════
   PROYECTO DE VIDA — SAMIL GERALDO PÉREZ SANTANA
   Archivo: js/script.js
   ═══════════════════════════════════════════════ */


/* ════════════════════════════════════════
   GRUPOS DE FOTOS PARA EL LIGHTBOX
   
   Agrega o cambia los nombres de archivo
   según las fotos que subas a la carpeta fotos/
   ════════════════════════════════════════ */
const grupos = {
  infancia: [
    { src: 'fotos/infancia-1.jpg', cap: 'De pequeño' },
    { src: 'fotos/infancia-2.jpg', cap: 'Creciendo' },
    { src: 'fotos/infancia-3.jpg', cap: 'Mis raíces' },
  ],
  arte: [
    { src: 'fotos/dibujo-1.jpg', cap: 'Ilustración' },
    { src: 'fotos/dibujo-2.jpg', cap: 'Diseño gráfico' },
    { src: 'fotos/dibujo-3.jpg', cap: 'Arte digital' },
    { src: 'fotos/foto-pc.jpg',  cap: 'Mi setup' },
  ],
  torneo: [
    { src: 'fotos/torneo-1.jpg', cap: 'Torneo Nacional · Barahona 2023' },
    { src: 'fotos/torneo-2.jpg', cap: 'En el arco' },
    { src: 'fotos/torneo-3.jpg', cap: 'El equipo' },
  ],
  naciones: [
    { src: 'fotos/naciones-1.jpg', cap: 'Naciones Unidas Escolar' },
    { src: 'fotos/naciones-2.jpg', cap: 'Sesión de Debate' },
    { src: 'fotos/naciones-3.jpg', cap: 'Naciones Unidas' },
    { src: 'fotos/naciones-4.jpg', cap: 'Naciones Unidas' },
  ],
};


/* ════════════════════════════════════════
   LIGHTBOX — visor de fotos
   ════════════════════════════════════════ */
let currentGroup = [];
let currentIdx   = 0;

// Abre el lightbox con una sola foto
function openLightbox(src, cap) {
  currentGroup = [{ src, cap }];
  currentIdx   = 0;
  mostrarLightbox();
}

// Abre el lightbox con un grupo de fotos
function openLightboxGroup(grupo, idx) {
  currentGroup = grupos[grupo] || [];
  currentIdx   = idx;
  mostrarLightbox();
}

// Muestra la foto actual en el lightbox
function mostrarLightbox() {
  if (!currentGroup.length) return;

  const item    = currentGroup[currentIdx];
  const lbImg   = document.getElementById('lb-img');
  const lbCap   = document.getElementById('lb-caption');
  const lbPrev  = document.getElementById('lb-prev');
  const lbNext  = document.getElementById('lb-next');
  const lightbox = document.getElementById('lightbox');

  lbImg.src = item.src;

  // Muestra el contador si hay más de una foto en el grupo
  if (currentGroup.length > 1) {
    lbCap.textContent = item.cap + `  ${currentIdx + 1} / ${currentGroup.length}`;
  } else {
    lbCap.textContent = item.cap;
  }

  // Muestra u oculta los botones de navegación
  lbPrev.style.display = currentGroup.length > 1 ? '' : 'none';
  lbNext.style.display = currentGroup.length > 1 ? '' : 'none';

  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden'; // bloquea el scroll mientras está abierto
}

// Cierra el lightbox
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = ''; // restaura el scroll
}

// Cierra el lightbox si se hace clic en el fondo oscuro
function closeLB(event) {
  if (event.target === document.getElementById('lightbox')) {
    closeLightbox();
  }
}

// Navega entre fotos del grupo (dir = 1 siguiente, dir = -1 anterior)
function lbNav(dir) {
  currentIdx = (currentIdx + dir + currentGroup.length) % currentGroup.length;
  mostrarLightbox();
}

// Atajos de teclado para el lightbox
document.addEventListener('keydown', function(e) {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox.classList.contains('open')) return;

  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft')  lbNav(-1);
});


/* ════════════════════════════════════════
   ANIMACIÓN DE ENTRADA AL HACER SCROLL
   
   Los elementos con clase "reveal" aparecen
   suavemente cuando el usuario los ve
   ════════════════════════════════════════ */
const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry, i) {
    if (entry.isIntersecting) {
      // Pequeño retraso escalonado para que no aparezcan todos a la vez
      setTimeout(function() {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(function(el) {
  revealObserver.observe(el);
});


/* ════════════════════════════════════════
   ANIMACIÓN DE LAS BARRAS DE HABILIDADES
   
   Las barras se llenan cuando el usuario
   llega a la sección de Habilidades
   ════════════════════════════════════════ */
const barObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      // Toma el valor del atributo data-width y lo aplica como ancho
      entry.target.style.width = entry.target.dataset.width;
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.bar-fill').forEach(function(barra) {
  barra.style.width = '0%'; // empieza en 0
  barObserver.observe(barra);
});


/* ════════════════════════════════════════
   MÚSICA DE FONDO
   Controla el botón flotante ▶ / ■
   ════════════════════════════════════════ */
function toggleMusica() {
  const audio = document.getElementById('musica');
  const icono = document.getElementById('icono-musica');
  const boton = document.getElementById('btn-musica');

  if (audio.paused) {
    audio.play();
    icono.textContent = '■';
    boton.classList.add('sonando');
  } else {
    audio.pause();
    icono.textContent = '▶';
    boton.classList.remove('sonando');
  }
}
