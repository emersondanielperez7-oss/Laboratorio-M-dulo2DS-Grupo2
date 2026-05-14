const boton = document.getElementById('enter-btn');

const intro = document.querySelector('.intro-screen');

const contenido = document.querySelector('.main-content');

const pieza = document.querySelector('.chess-icon');

boton.addEventListener('click', () => {

    // ANIMACIÓN DE PIEZA SIENDO TUMBADA
    pieza.classList.add('piece-fall');

    // DESAPARECER INTRO
    setTimeout(() => {

        intro.style.opacity = '0';

        intro.style.transition = '1s';

    }, 600);

    // MOSTRAR CONTENIDO PRINCIPAL
    setTimeout(() => {

        intro.style.display = 'none';

        contenido.classList.remove('hidden');

        contenido.classList.add('show');

        document.body.style.overflow = 'auto';

    }, 1600);

});