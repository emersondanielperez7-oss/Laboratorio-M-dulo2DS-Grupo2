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