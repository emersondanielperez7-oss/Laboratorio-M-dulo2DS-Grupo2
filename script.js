/* ============================================================
   CHESS PAGE — script.js
   Módulos incluidos:
   1. Navbar (scroll y estado activo)
   2. Tablero de ajedrez interactivo (8×8)
   3. Botones de piezas con panel de información
   4. Sistema de Toast (notificaciones)
   5. Animaciones de entrada (scroll reveal)
   6. Contador animado de estadísticas
   7. Efecto ripple en botones
   ============================================================ */

/* ============================================================
   1. INICIALIZACIÓN — se ejecuta cuando el DOM está listo
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Llama a cada módulo en orden
  // Comenta o elimina las líneas que no necesites
  initNavbar();
  initChessBoard();
  initPieceButtons();
  initToast();
  initScrollReveal();
  initCounters();
  initRippleButtons();
});

/* ============================================================
   2. NAVBAR — comportamiento al hacer scroll
   ============================================================ */
function initNavbar() {
  // Selecciona la barra de navegación por su clase
  // Cambia '.navbar' si le pones otro nombre en tu HTML
  const navbar = document.querySelector('.navbar');

  if (!navbar) return; // Sale silenciosamente si no existe el elemento

  // Umbral de scroll en píxeles para activar la clase 'scrolled'
  // Aumenta este número si quieres que tarde más en cambiar
  const SCROLL_THRESHOLD = 60;

  // Escucha el evento scroll en la ventana
  window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('scrolled');    // Fondo más sólido al bajar
    } else {
      navbar.classList.remove('scrolled'); // Fondo semitransparente al subir
    }
  }, { passive: true }); // 'passive: true' mejora el rendimiento del scroll

  // Marca el enlace activo según la sección visible
  // Los links deben tener href="#id-seccion" y las secciones el data-section correspondiente
  const navLinks = document.querySelectorAll('.navbar__links a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');

  // Observador de intersección — más eficiente que calcular scroll manualmente
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          // Quita la clase activa de todos los links
          link.classList.remove('active');
          // Añade la clase activa solo al link que corresponde a la sección visible
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-40% 0px -55% 0px'  // Ajusta cuándo se considera "visible" una sección
  });

  // Observa cada sección con id
  sections.forEach(section => sectionObserver.observe(section));
}

/* ============================================================
   3. TABLERO DE AJEDREZ INTERACTIVO
   Genera un tablero 8×8 con piezas en posición inicial
   y permite seleccionar y mover piezas con clic
   ============================================================ */
function initChessBoard() {
  // Busca el contenedor del tablero en el HTML
  // Debe tener la clase 'chess-board' o el ID que definas
  const boardEl = document.querySelector('.chess-board');
  if (!boardEl) return;

  // ---- POSICIÓN INICIAL DEL TABLERO ----
  // Cada string de 8 caracteres representa una fila (de arriba a abajo)
  // Letras MAYÚSCULAS = piezas negras | letras minúsculas = piezas blancas
  // r=torre, n=caballo, b=alfil, q=reina, k=rey, p=peón
  // '.' = casilla vacía
  const INITIAL_POSITION = [
    'rnbqkbnr',  // Fila 8 (negras — piezas)
    'pppppppp',  // Fila 7 (negras — peones)
    '........',  // Fila 6 (vacía)
    '........',  // Fila 5 (vacía)
    '........',  // Fila 4 (vacía)
    '........',  // Fila 3 (vacía)
    'PPPPPPPP',  // Fila 2 (blancas — peones)
    'RNBQKBNR',  // Fila 1 (blancas — piezas)
  ];

  // ---- MAPA DE PIEZAS A SÍMBOLOS UNICODE ----
  // Cambia los valores si prefieres otros caracteres o imágenes
  const PIECE_SYMBOLS = {
    // Piezas negras (minúsculas en el array de posición)
    r: '♜', n: '♞', b: '♝', q: '♛', k: '♚', p: '♟',
    // Piezas blancas (mayúsculas en el array de posición)
    R: '♖', N: '♘', B: '♗', Q: '♕', K: '♔', P: '♙',
  };

  // Estado interno del juego
  let boardState = INITIAL_POSITION.map(row => row.split(''));  // Array 2D de caracteres
  let selectedSquare = null;    // Coordenada [fila, columna] de la casilla seleccionada
  let currentTurn = 'white';    // 'white' o 'black' — turno actual

  // ---- RENDERIZADO DEL TABLERO ----
  function renderBoard() {
    boardEl.innerHTML = '';     // Limpia el tablero antes de redibujar

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const square = document.createElement('div');
        square.className = 'chess-board__square';

        // Determina el color de la casilla:
        // Si la suma fila+columna es par → casilla clara; impar → oscura
        square.classList.add((row + col) % 2 === 0 ? 'light' : 'dark');

        // Guarda las coordenadas como atributos de datos en el HTML
        square.dataset.row = row;
        square.dataset.col = col;

        // Añade la pieza si la casilla no está vacía
        const piece = boardState[row][col];
        if (piece !== '.') {
          square.textContent = PIECE_SYMBOLS[piece] || '';
          // Color de la pieza según si es mayúscula (blanca) o minúscula (negra)
          square.style.color = piece === piece.toUpperCase() ? '#fff' : '#111';
          square.style.textShadow = '1px 2px 4px rgba(0,0,0,0.7)';
        }

        // Resalta la casilla seleccionada
        if (selectedSquare && selectedSquare[0] === row && selectedSquare[1] === col) {
          square.classList.add('selected');
        }

        // Evento de clic en cada casilla
        square.addEventListener('click', () => handleSquareClick(row, col));

        boardEl.appendChild(square);
      }
    }
  }

  // ---- MANEJO DE CLICS EN CASILLAS ----
  function handleSquareClick(row, col) {
    const piece = boardState[row][col];
    const isWhitePiece = piece !== '.' && piece === piece.toUpperCase();
    const isBlackPiece = piece !== '.' && piece === piece.toLowerCase();

    if (selectedSquare) {
      const [selRow, selCol] = selectedSquare;

      // Si el jugador clica la misma casilla → deselecciona
      if (selRow === row && selCol === col) {
        selectedSquare = null;
        renderBoard();
        return;
      }

      // Intenta mover la pieza seleccionada a la nueva casilla
      const moved = movePiece(selRow, selCol, row, col);

      if (moved) {
        // Mueve exitosamente — cambia de turno
        currentTurn = currentTurn === 'white' ? 'black' : 'white';
        showToast(
          `Turno de las ${currentTurn === 'white' ? 'blancas ♔' : 'negras ♚'}`,
          'move'
        );
      }
      selectedSquare = null;    // Deselecciona siempre tras intentar mover
    } else {
      // No hay selección previa — selecciona la casilla si tiene una pieza del turno correcto
      if (piece === '.') return; // No seleccionar casillas vacías

      const isTurn = (currentTurn === 'white' && isWhitePiece) ||
                     (currentTurn === 'black' && isBlackPiece);

      if (isTurn) {
        selectedSquare = [row, col];
        showToast(`Seleccionado: ${PIECE_SYMBOLS[piece]} (${coordName(row, col)})`, 'select');
      } else {
        // Turno incorrecto
        showToast(`¡Es el turno de las ${currentTurn === 'white' ? 'blancas' : 'negras'}!`, 'error');
      }
    }

    renderBoard();
  }

  // ---- LÓGICA DE MOVIMIENTO (SIMPLIFICADA) ----
  // Esta función mueve la pieza sin validar reglas de ajedrez completas.
  // Puedes reemplazar esta función con un motor de ajedrez completo.
  function movePiece(fromRow, fromCol, toRow, toCol) {
    const piece = boardState[fromRow][fromCol];
    const target = boardState[toRow][toCol];

    // No puede capturar pieza propia
    if (target !== '.') {
      const isFromWhite = piece === piece.toUpperCase();
      const isToWhite = target === target.toUpperCase();
      if (isFromWhite === isToWhite) {
        showToast('¡No puedes capturar tu propia pieza!', 'error');
        return false;
      }

      // Mensaje de captura
      showToast(`¡${PIECE_SYMBOLS[piece]} captura ${PIECE_SYMBOLS[target]}!`, 'capture');
    }

    // Realiza el movimiento en el estado del tablero
    boardState[toRow][toCol] = piece;
    boardState[fromRow][fromCol] = '.';  // Casilla origen queda vacía
    return true;
  }

  // ---- BOTÓN DE RESET DEL TABLERO ----
  // Conecta a un botón con id="reset-board" en el HTML
  const resetBtn = document.getElementById('reset-board');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // Restablece el estado inicial
      boardState = INITIAL_POSITION.map(row => row.split(''));
      selectedSquare = null;
      currentTurn = 'white';
      renderBoard();
      showToast('¡Tablero reiniciado! Juegan las blancas ♔', 'info');
    });
  }

  // ---- FUNCIÓN AUXILIAR: Nombre de coordenada estilo ajedrez ----
  // Convierte [fila, columna] a notación ajedrecística (ej: [0,0] → 'a8')
  function coordName(row, col) {
    const files = 'abcdefgh';   // Columnas: a-h
    const rank = 8 - row;       // Filas: 8 a 1
    return `${files[col]}${rank}`;
  }

  // Render inicial del tablero
  renderBoard();
}

/* ============================================================
   4. BOTONES DE PIEZAS
   Muestra información sobre cada pieza al hacer clic
   ============================================================ */
function initPieceButtons() {
  // Datos de cada pieza — edita aquí para cambiar los textos
  // Agrega más piezas si lo necesitas siguiendo el mismo formato
  const PIECE_DATA = {
    king: {
      name: 'Rey',
      symbol: '♔',
      description: 'La pieza más importante del juego. Si el Rey queda en jaque mate, la partida termina. Se mueve una casilla en cualquier dirección: horizontal, vertical o diagonal. Su protección es la prioridad absoluta.',
      value: 'Valor: ∞ (Invaluable)',
    },
    queen: {
      name: 'Reina',
      symbol: '♕',
      description: 'La pieza más poderosa en términos de movilidad. Combina los movimientos de la torre y el alfil: puede moverse cualquier número de casillas en línea recta o diagonal. Domina el tablero.',
      value: 'Valor relativo: ~9 puntos',
    },
    rook: {
      name: 'Torre',
      symbol: '♖',
      description: 'Pieza de gran potencia en líneas abiertas. Se mueve cualquier número de casillas horizontal o verticalmente. Junto con el Rey puede ejecutar el enroque, un movimiento especial defensivo.',
      value: 'Valor relativo: ~5 puntos',
    },
    bishop: {
      name: 'Alfil',
      symbol: '♗',
      description: 'El alfil se desliza en diagonal cualquier número de casillas. Cada alfil permanece siempre en las casillas de su color inicial. En pareja, los dos alfiles controlan colores complementarios.',
      value: 'Valor relativo: ~3 puntos',
    },
    knight: {
      name: 'Caballo',
      symbol: '♘',
      description: 'La única pieza que puede saltar sobre otras. Su movimiento tiene forma de "L": dos casillas en una dirección y una en perpendicular. Maestro de los movimientos sorpresivos y las horquillas.',
      value: 'Valor relativo: ~3 puntos',
    },
    pawn: {
      name: 'Peón',
      symbol: '♙',
      description: 'El alma del ajedrez. Avanza una casilla hacia adelante (dos en su primera jugada) y captura en diagonal. Si llega al otro extremo del tablero, se corona en cualquier pieza (generalmente Reina).',
      value: 'Valor relativo: ~1 punto',
    },
  };

  // Selecciona todos los botones de pieza en el HTML
  // Deben tener el atributo data-piece="nombre-de-pieza"
  const pieceButtons = document.querySelectorAll('.piece-btn[data-piece]');

  // Panel donde se muestra la información al seleccionar una pieza
  // Asegúrate de tener un elemento con id="piece-info" en tu HTML
  const infoPanel = document.getElementById('piece-info');

  pieceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const pieceKey = btn.dataset.piece;  // Lee el atributo data-piece del botón
      const data = PIECE_DATA[pieceKey];
      if (!data) return;

      // Quita la clase 'active' de todos los botones
      pieceButtons.forEach(b => b.classList.remove('active'));

      // Activa el botón clicado
      btn.classList.add('active');

      // Actualiza el panel de información si existe en el HTML
      if (infoPanel) {
        infoPanel.querySelector('.piece-info-panel__name').textContent = data.name;
        infoPanel.querySelector('.piece-info-panel__symbol').textContent = data.symbol;
        infoPanel.querySelector('.piece-info-panel__description').textContent = data.description;
        infoPanel.querySelector('.piece-info-panel__value').textContent = data.value;

        // Muestra el panel (cambia display:none a display:block vía clase CSS)
        infoPanel.classList.add('visible');
      }

      // Muestra un toast al seleccionar la pieza
      showToast(`${data.symbol} ${data.name} seleccionado`, 'info');
    });
  });
}

/* ============================================================
   5. SISTEMA DE TOAST (Notificaciones temporales)
   Función global: showToast(mensaje, tipo)
   Tipos: 'info', 'move', 'capture', 'select', 'error'
   ============================================================ */
function initToast() {
  // Crea el contenedor de toasts si no existe en el HTML
  if (!document.getElementById('toast-container')) {
    const container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
}

// Función pública para mostrar notificaciones desde cualquier parte del código
// Uso: showToast('¡Mensaje!', 'info');
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  // Iconos por tipo de notificación — cámbia a emojis o SVGs a tu gusto
  const ICONS = {
    info:    '♟',
    move:    '♞',
    capture: '💥',
    select:  '✨',
    error:   '⚠️',
  };

  // Crea el elemento toast
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span class="toast__icon">${ICONS[type] || '♟'}</span>
    <span class="toast__message">${message}</span>
  `;

  container.appendChild(toast);

  // Duración del toast en milisegundos — aumenta si quieres que dure más
  const DURATION = 2500;

  // Elimina el toast después de DURATION ms
  setTimeout(() => {
    toast.classList.add('removing');  // Activa la animación de salida
    // Espera a que termine la animación antes de eliminar del DOM
    setTimeout(() => toast.remove(), 300);
  }, DURATION);
}

/* ============================================================
   6. SCROLL REVEAL — elementos aparecen al entrar en la pantalla
   ============================================================ */
function initScrollReveal() {
  // Selecciona todos los elementos que deben animarse al entrar en pantalla
  // Añade la clase 'reveal' en tu HTML a los elementos que quieras animar
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length === 0) return;

  // Configura el estado inicial (invisible y desplazado hacia abajo)
  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(32px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  // Observador de intersección para detectar cuándo el elemento entra en pantalla
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Anima el elemento cuando entra en el viewport
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';

        // Una vez revelado, deja de observarlo (evita re-animaciones)
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,          // Se activa cuando el 10% del elemento es visible
    rootMargin: '0px 0px -50px 0px'  // Margen inferior — retrasa un poco la activación
  });

  // Empieza a observar cada elemento, con un delay escalonado
  revealElements.forEach((el, index) => {
    // Cada elemento se retrasa 100ms más que el anterior (efecto cascada)
    // Cambia '100' para ajustar la velocidad de la cascada
    el.style.transitionDelay = `${index * 100}ms`;
    revealObserver.observe(el);
  });
}

/* ============================================================
   7. CONTADORES ANIMADOS
   Los números cuentan desde 0 hasta su valor objetivo
   ============================================================ */
function initCounters() {
  // Selecciona todos los contadores — deben tener data-target="número"
  // Ejemplo en HTML: <span class="counter" data-target="1500">0</span>
  const counters = document.querySelectorAll('.counter[data-target]');
  if (counters.length === 0) return;

  // Opciones del observador — empieza a contar cuando el contador es visible
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);   // Valor final del contador
      const duration = parseInt(el.dataset.duration, 10) || 2000;  // Duración en ms

      animateCounter(el, 0, target, duration);
      counterObserver.unobserve(el);  // Solo cuenta una vez
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));

  // ---- FUNCIÓN DE ANIMACIÓN DEL CONTADOR ----
  function animateCounter(el, start, end, duration) {
    const startTime = performance.now();  // Tiempo de inicio para calcular progreso

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);  // 0 a 1

      // Función de easing: ease-out (rápido al inicio, lento al final)
      // Cámbiala por 'progress' para velocidad lineal
      const eased = 1 - Math.pow(1 - progress, 3);

      // Calcula el valor actual y actualiza el DOM
      el.textContent = Math.round(start + (end - start) * eased).toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(update);  // Continúa la animación
      }
    }

    requestAnimationFrame(update);
  }
}

/* ============================================================
   8. EFECTO RIPPLE EN BOTONES
   Onda que se expande desde el punto de clic
   ============================================================ */
function initRippleButtons() {
  // Aplica el efecto a todos los elementos con clase 'btn'
  // Para añadir el efecto a otros elementos, agrega su selector aquí
  const buttons = document.querySelectorAll('.btn');

  buttons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      // Calcula la posición del clic relativa al botón
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Tamaño del círculo: el doble del lado más largo del botón
      const size = Math.max(rect.width, rect.height) * 2;

      // Crea el elemento de ripple
      const ripple = document.createElement('span');
      ripple.className = 'btn__ripple';

      // Posiciona y dimensiona el ripple centrado en el punto de clic
      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x - size / 2}px;
        top: ${y - size / 2}px;
      `;

      btn.appendChild(ripple);

      // Elimina el elemento del DOM cuando termina la animación CSS
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
}

/* ============================================================
   9. MENÚ MÓVIL (Hamburguesa)
   Activa/desactiva el menú en pantallas pequeñas
   ============================================================ */

// Agrega esto a tu HTML: <button id="menu-toggle" aria-label="Abrir menú">☰</button>
// Y la clase 'navbar__links' a tu lista de navegación
document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.navbar__links');

  if (!menuToggle || !navLinks) return;  // Sale si no existen los elementos

  menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');  // Alterna la clase 'open'
    menuToggle.textContent = isOpen ? '✕' : '☰';       // Cambia el icono
    menuToggle.setAttribute('aria-expanded', isOpen);   // Accesibilidad
  });

  // Cierra el menú al hacer clic en un link (UX móvil)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.textContent = '☰';
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
});

/* ============================================================
   10. UTILIDADES GENERALES
   Funciones de ayuda que puedes usar en todo el proyecto
   ============================================================ */

/**
 * Debounce: limita la frecuencia de ejecución de una función.
 * Úsalo en eventos de scroll/resize para mejorar el rendimiento.
 * @param {Function} fn   - Función a ejecutar
 * @param {number}   wait - Tiempo de espera en milisegundos
 * @returns {Function}
 */
function debounce(fn, wait = 200) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

/**
 * Throttle: garantiza que una función no se ejecute más de una vez
 * por intervalo de tiempo. Útil para eventos de scroll.
 * @param {Function} fn       - Función a ejecutar
 * @param {number}   interval - Intervalo mínimo en milisegundos
 * @returns {Function}
 */
function throttle(fn, interval = 100) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= interval) {
      last = now;
      fn(...args);
    }
  };
}

/**
 * Formatea un número con separadores de miles.
 * @param {number} n - Número a formatear
 * @returns {string} Ej: 1500000 → '1.500.000'
 */
function formatNumber(n) {
  return n.toLocaleString('es-ES');
}

/**
 * Genera un ID único simple.
 * Útil para crear elementos dinámicos con IDs únicos.
 * @returns {string} Ej: 'chess-3f7a2b'
 */
function generateId(prefix = 'chess') {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

/* ============================================================
   FIN DEL SCRIPT
   Para agregar nuevas funcionalidades:
   1. Crea una función initMiModulo() abajo
   2. Llámala dentro del bloque DOMContentLoaded al inicio
   ============================================================ */