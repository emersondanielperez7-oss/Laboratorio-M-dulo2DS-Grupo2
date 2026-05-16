// =========================
// ANIMACIÓN DE ENTRADA PÁGINA
// =========================

document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => {
        document.body.classList.add('page-loaded');
    });

    crearTablero();
    iniciarPiezas();
});

/* =========================
SCRIPT.JS COMPLETO
========================= */

document.addEventListener('DOMContentLoaded', () => {

    crearTablero();
    iniciarPiezas();

});

function crearTablero(){

    const tablero = document.querySelector('.chess-board');

    if(!tablero) return;

    const piezas = [
        '♜','♞','♝','♛','♚','♝','♞','♜',
        '♟','♟','♟','♟','♟','♟','♟','♟',
        '','','','','','','','',
        '','','','','','','','',
        '','','','','','','','',
        '','','','','','','','',
        '♙','♙','♙','♙','♙','♙','♙','♙',
        '♖','♘','♗','♕','♔','♗','♘','♖'
    ];

    for(let fila = 0; fila < 8; fila++){

        for(let columna = 0; columna < 8; columna++){

            const casilla = document.createElement('div');

            casilla.classList.add('chess-board__square');

            if((fila + columna) % 2 === 0){
                casilla.classList.add('light');
            }else{
                casilla.classList.add('dark');
            }

            casilla.textContent = piezas[fila * 8 + columna];

            casilla.addEventListener('click', () => {

                document
                .querySelectorAll('.chess-board__square')
                .forEach(c => c.classList.remove('selected'));

                casilla.classList.add('selected');

                mostrarToast('Casilla seleccionada');

            });

            tablero.appendChild(casilla);

        }

    }

    const reset = document.getElementById('reset-board');

    reset.addEventListener('click', () => {

        tablero.innerHTML = '';
        crearTablero();

        mostrarToast('Tablero reiniciado');

    });

}

function iniciarPiezas(){

    const botones = document.querySelectorAll('.piece-btn');

    const panel = document.getElementById('piece-info');

    const datos = {

        king:{
            nombre:'Rey',
            simbolo:'♔',
            descripcion:'La pieza más importante del ajedrez.',
            valor:'Infinito'
        },

        queen:{
            nombre:'Reina',
            simbolo:'♕',
            descripcion:'La pieza más poderosa.',
            valor:'9 puntos'
        },

        rook:{
            nombre:'Torre',
            simbolo:'♖',
            descripcion:'Se mueve en líneas rectas.',
            valor:'5 puntos'
        },

        bishop:{
            nombre:'Alfil',
            simbolo:'♗',
            descripcion:'Se mueve en diagonal.',
            valor:'3 puntos'
        },

        knight:{
            nombre:'Caballo',
            simbolo:'♘',
            descripcion:'Se mueve en forma de L.',
            valor:'3 puntos'
        },

        pawn:{
            nombre:'Peón',
            simbolo:'♙',
            descripcion:'Avanza hacia adelante.',
            valor:'1 punto'
        }

    };

    botones.forEach(boton => {

        boton.addEventListener('click', () => {

            const pieza = boton.dataset.piece;

            const info = datos[pieza];

            panel.classList.add('visible');

            panel.querySelector('.piece-info-panel__name').textContent =
            info.nombre;

            panel.querySelector('.piece-info-panel__symbol').textContent =
            info.simbolo;

            panel.querySelector('.piece-info-panel__description').textContent =
            info.descripcion;

            panel.querySelector('.piece-info-panel__value').textContent =
            info.valor;

            mostrarToast(info.nombre + ' seleccionado');

        });

    });

}

function mostrarToast(texto){

    let contenedor = document.getElementById('toast-container');

    if(!contenedor){

        contenedor = document.createElement('div');

        contenedor.id = 'toast-container';

        document.body.appendChild(contenedor);

    }

    const toast = document.createElement('div');

    toast.classList.add('toast');

    toast.textContent = texto;

    contenedor.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);

}

// =========================
// TRANSICIÓN ENTRE PÁGINAS
// =========================

document.querySelectorAll('a[href]').forEach(link => {

    const url = link.getAttribute('href');

    if (!url || url.startsWith('#') || url.startsWith('http')) return;

    link.addEventListener('click', (e) => {
        e.preventDefault();

        document.body.classList.add('page-leave');

        setTimeout(() => {
            window.location.href = url;
        }, 500);
    });

});

// =========================
// DATO CURIOSO DINÁMICO
// =========================

const datosCuriosos = [
    "La partida de ajedrez más larga registrada duró 269 movimientos y terminó en tablas tras 20 horas de juego.",
    "El número de posibles partidas de ajedrez es mayor que el número de átomos en el universo observable.",
    "El 'Mate del Pastor' es una de las trampas más antiguas, permitiendo ganar en solo 4 jugadas.",
    "En el ajedrez medieval, la Reina solo podía moverse una casilla en diagonal. Fue en el siglo XV cuando obtuvo su gran poder.",
    "El primer campeón del mundo oficial de ajedrez fue Wilhelm Steinitz en 1886.",
    "La palabra 'Jaque Mate' proviene del persa 'Shah Mat', que significa 'El rey está indefenso'.",
    "El tablero de ajedrez actual de 64 casillas se estandarizó en Europa durante el siglo XV.",
    "Un computadora tardó solo 4 horas en aprender a jugar al ajedrez a nivel de Gran Maestro sin conocimiento previo (AlphaZero)."
];

let indiceActual = 0;
let intervaloDatos;
const factText = document.getElementById('fact-text');
const nextFactBtn = document.getElementById('next-fact-btn');

function mostrarDato() {
    if (!factText) return; // Si no existe el elemento en la página, no hace nada

    // Efecto de desvanecimiento
    factText.classList.add('fade-out');

    setTimeout(() => {
        factText.textContent = datosCuriosos[indiceActual];
        factText.classList.remove('fade-out');
        
        indiceActual = (indiceActual + 1) % datosCuriosos.length;
    }, 400); // Tiempo que tarda en ocultarse el texto antes de cambiarlo
}

function iniciarDatos() {
    if (!factText) return;
    
    mostrarDato(); // Mostrar el primero
    intervaloDatos = setInterval(mostrarDato, 6000); // Cambiar cada 6 segundos
}

// Evento del botón manual
if (nextFactBtn) {
    nextFactBtn.addEventListener('click', () => {
        clearInterval(intervaloDatos); // Detenemos el auto-play
        mostrarDato(); // Mostramos el siguiente
        intervaloDatos = setInterval(mostrarDato, 6000); // Reiniciamos el auto-play
    });
}

// Lo iniciamos junto con el DOMContentLoaded de tu código
document.addEventListener('DOMContentLoaded', iniciarDatos);