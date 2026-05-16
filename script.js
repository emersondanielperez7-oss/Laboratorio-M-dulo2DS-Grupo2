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
    "Un computadora tardó solo 4 horas en aprender a jugar al ajedrez a nivel de Gran Maestro sin conocimiento previo (AlphaZero).",
    "El Caballo es la única pieza que puede saltar sobre otras piezas durante su movimiento.",
    "Garry Kasparov se convirtió en el campeón del mundo más joven de la historia a los 22 años en 1985.",
    "El ajedrez se originó en el norte de la India alrededor del siglo VI con el nombre de 'Chaturanga'.",
    "Hay 400 posiciones posibles después de 1 movimiento de cada jugador.",
    "Hay 197,281 posiciones posibles después de 2 movimientos de cada jugador.",
    "Hay más de 9 millones de posiciones posibles después de 3 movimientos de cada jugador.",
    "Se estima que hay más de 10^120 posibles partidas de ajedrez (Número de Shannon).",
    "La regla del 'En passant' (al paso) se introdujo en el siglo XV para contrarrestar el avance doble del peón.",
    "El 'Enroque' fue inventado en Europa en el siglo XIII para acelerar el juego.",
    "Antes del enroque, el Rey tenía que ser movido manualmente a un lugar seguro, lo que llevaba muchas jugadas.",
    "El ajedrez llegó a Europa a través de la conquista árabe de la Península Ibérica.",
    "La palabra 'Ajedrez' viene del persa 'Shatranj'.",
    "En la antigüedad, la Dama o Reina se llamaba 'Firz' o 'Visir' y era la pieza más débil.",
    "El Alfil viene de la palabra árabe 'Al-fil', que significa 'el elefante'.",
    "La Torre originalmente era un carro de guerra indio llamado 'Ratha'.",
    "El Caballo siempre ha mantenido su movimiento en forma de L desde el Chaturanga.",
    "El Peón originalmente solo podía avanzar una casilla desde su posición inicial; el avance doble se añadió después.",
    "El primer torneo de ajedrez moderno del que se tiene registro se jugó en Madrid en 1575.",
    "El reloj de ajedrez se inventó en 1883 para evitar que los jugadores pensaran indefinidamente.",
    "Antes del reloj, existía la regla de que si un jugador tardaba más de 10 minutos en mover, perdía la partida.",
    "El campeón mundial Emanuel Lasker mantuvo su título durante 27 años, el reinado más largo de la historia.",
    "Bobby Fischer se proclamó campeón del mundo en 1972 poniendo fin a 24 años de dominio soviético.",
    "La famosa partida del 'Juego Inmortal' se jugó en 1851 entre Adolf Anderssen y Lionel Kieseritzky.",
    "La 'Partida Evergreen' fue jugada en 1852 por Adolf Anderssen contra Jean Dufresne.",
    "El mate más rápido posible es el 'Mate del Loco', que ocurre en solo 2 jugadas.",
    "El 'Mate del Loco' solo es posible si el jugador de las blancas comete errores garrafales.",
    "Judit Polgár es la jugadora con la puntuación ELO más alta de la historia, superando los 2700.",
    "Judit Polgár es la única mujer que ha vencido a un campeón mundial vigente en un juego de torneo clásico (Kasparov).",
    "El magnate de los ajedreces, Leonardo da Vinci, diseñó un tablero de ajedrez para un noble italiano.",
    "Benjamin Franklin fue un gran aficionado al ajedrez y escribió 'La moral del ajedrez' en 1750.",
    "Napoleón Bonaparte jugaba al ajedrez, pero era conocido por hacer trampa cuando perdía.",
    "El ajedrez es el segundo deporte con más libros escritos sobre él, solo superado por el fútbol.",
    "El campeón del mundo actual (2023) es Ding Liren, de China.",
    "La federación Internacional de Ajedrez (FIDE) se fundó en París en 1924.",
    "El título de Gran Maestro fue introducido oficialmente por la FIDE en 1950.",
    "Las primeras mujeres en recibir el título de Gran Maestro fueron Nona Gaprindashvili y Maia Chiburdanidze.",
    "Sergio Karjakin se convirtió en el Gran Maestro más joven de la historia a los 12 años y 7 meses.",
    "Abhimanyu Mishra batió el récord de Karjakin en 2021, logrando el título a los 12 años y 4 meses.",
    "El Campeón del Mundo Magnus Carlsen tiene el récord de la puntuación ELO más alta de la historia: 2882.",
    "Carlsen también tiene el récord de la racha invicta más larga en el nivel élite, con 125 partidas.",
    "La primera computadora en ganar a un campeón del mundo fue Deep Blue contra Kasparov en 1996 (en una partida).",
    "En 1997, Deep Blue venció a Kasparov en un match completo, causando un hito en la inteligencia artificial.",
    "Stockfish es actualmente el motor de ajedrez de código abierto más fuerte del mundo.",
    "AlphaZero desarrolló un estilo de juego altamente creativo, sacrificando piezas de manera que los motores clásicos no entendían.",
    "El ajedrez es obligatorio en el plan de estudios escolar en países como Armenia.",
    "Se estima que más de 600 millones de personas en el mundo saben jugar al ajedrez.",
    "El 'Elo' es el sistema de puntuación inventado por Arpad Elo, un profesor de física y maestro de ajedrez.",
    "Si un peón alcanza la octava fila, puede ser promovido a cualquier pieza excepto el Rey.",
    "En teoría, un jugador puede tener hasta 9 Reinas en el tablero al mismo tiempo (la original + 8 peones promovidos).",
    "En el pasado, la promoción de peón solo permitía convertirlo en la pieza que ocupaba esa columna en la posición inicial.",
    "El tablero siempre debe colocarse de modo que la casilla de la esquina derecha de cada jugador sea blanca o clara.",
    "Las piezas de ajedrez de Staunton, el diseño estándar actual, se crearon en 1849.",
    "Antes del diseño Staunton, había una gran confusión porque cada región tenía piezas con formas diferentes.",
    "El Rey es la pieza más importante, pero también es la más débil en términos de movilidad.",
    "Un Rey solo y sin ayuda no puede dar jaque mate a otro Rey solitario; la partida sería tablas.",
    "Si un jugador toca una pieza, está obligado a moverla (regla de pieza tocada, pieza movida).",
    "Si un jugador toca una pieza del oponente, está obligado a capturarla si es legal.",
    "El 'Jaque' es una amenaza directa al Rey, y el jugador amenazado debe salir de él en su siguiente movimiento.",
    "Existen 3 formas de salir de un jaque: mover el Rey, bloquear el jaque con otra pieza, o capturar la pieza que da jaque.",
    "Si no es posible salir de un jaque, la partida termina en 'Jaque Mate'.",
    "Las 'Tablas' son un resultado de empate en el ajedrez.",
    "Hay varias formas de lograr tablas: ahogado, falta de material, regla de los 50 movimientos o acuerdo mutuo.",
    "El 'Ahogado' ocurre cuando el jugador al que le toca mover no tiene jugadas legales, pero su Rey no está en jaque.",
    "La regla de los 50 movimientos declara tablas si en 50 turnos no se captura pieza ni se mueve peón.",
    "Si la misma posición se repite 3 veces, cualquiera de los jugadores puede reclamar tablas.",
    "La 'Apertura Española' o Ruy López es una de las aperturas más antiguas y jugadas de la historia.",
    "La 'Apertura Italiana' fue muy popular en el siglo XVII y XVIII.",
    "El 'Gambito de Dama' fue analizado por primera vez en el siglo XV en un manuscrito de Göttingen.",
    "La popularidad del Gambito de Dama se disparó tras la serie de Netflix de 2020.",
    "El 'Gambito de Rey' era el favorito de los jugadores románticos del siglo XIX.",
    "Bobby Fischer popularizó la 'Defensa Najdorf' en la década de 1960 y 70.",
    "Magnus Carlsen ha jugado casi todas las aperturas posibles a nivel de élite.",
    "La 'Defensa Berlinesa' fue apodada 'El Muro de Berlín' tras ser usada por Vladimir Kramnik contra Kasparov en 2000.",
    "El 'Siciliana' es la defensa más popular y agresiva contra 1.e4 a nivel de Gran Maestro.",
    "El ajedrez a ciegas se juega sin ver el tablero; los jugadores comunican las jugadas verbalmente.",
    "Los récords de ajedrez a ciegas simultáneo son impresionantes; algunos han jugado más de 40 partidas a la vez.",
    "Timur, el conquistador mongol, jugaba al ajedrez con un tablero gigante en su patio.",
    "El Gran Maestro Tigran Petrosian era conocido como 'El Tigre' por su estilo defensivo impenetrable.",
    "Mikhail Tal era apodado 'El Mago de Riga' por sus sacrificios de piezas increíbles e intuitivos.",
    "Anatoly Karpov tiene el récord de haber ganado más de 160 torneos de ajedrez en su carrera.",
    "El match por el campeonato mundial de 1984 entre Kasparov y Karpov duró 5 meses y se suspendió sin ganador.",
    "Viswanathan Anand es el único campeón del mundo que ganó el título en tres formatos diferentes: torneo, match y knock-out.",
    "Las piezas de ajedrez más antiguas encontradas son las de la Isla de Lewis, talladas en colmillo de morsa en el siglo XII.",
    "El ajedrez era tan popular en la antigua URSS que el Estado financiaba escuelas de ajedrez especiales.",
    "El Programa de Ajedrez de la URSS consideraba el ajedrez como una herramienta para demostrar la superioridad intelectual soviética.",
    "Durante la Guerra Fría, los enfrentamientos de ajedrez entre EE.UU. y la URSS tenían una enorme carga política.",
    "El match Fischer vs Spassky en 1972 fue llamado 'El Match del Siglo'.",
    "Bobby Fischer desapareció de la vida pública tras negarse a defender su título en 1975.",
    "Al Capone, el famoso gánster, era un ávido jugador de ajedrez y jugaba en la cárcel de Alcatraz.",
    "John Wayne también era un gran aficionado y solía jugar entre tomas de sus películas.",
    "Humphrey Bogart era un jugador de ajedrez muy fuerte y solía jugar por dinero en clubs de Nueva York.",
    "Stanley Kubrick era un entusiasta del ajedrez y a menudo jugaba con los actores durante los rodajes.",
    "La variante 'Ajedrez960' o 'Fischer Random' fue inventada por Bobby Fischer para evitar la memorización de aperturas.",
    "En el Ajedrez960, la posición inicial de las piezas de la primera fila se sortea aleatoriamente (con algunas reglas).",
    "Hay exactamente 960 posiciones iniciales posibles en el Ajedrez960, de ahí su nombre.",
    "El ajedrez bughouse es una variante por equipos donde las piezas capturadas se pasan al compañero.",
    "El ajedrez suicida (o Antiajedrez) es una variante donde el objetivo es perder todas tus piezas.",
    "El ajedrez kwatro es una variante que se juega en cuatro tableros simultáneamente por cuatro jugadores.",
    "En el ajedrez clásico de torneo, está prohibido hablar durante la partida, excepto para ofrecer tablas o ajustar una pieza.",
    "Ajustar una pieza se debe hacer diciendo 'J'adoube' (ajusto en francés) antes de tocarla.",
    "Si un jugador hace un movimiento ilegal, debe rehacer la jugada y hacer otra legal con la misma pieza si es posible.",
    "En la historia del ajedrez olímpico, la Unión Soviética dominó casi todos los eventos desde 1952 hasta su disolución.",
    "La primera Olimpiada de Ajedrez oficial se celebró en Londres en 1927.",
    "Las Olimpiadas de Ajedrez se celebran cada dos años.",
    "Noruega, a pesar de tener una población pequeña, se convirtió en una superpotencia ajedrecística gracias a Carlsen.",
    "China ha invertido fuertemente en ajedrez en las últimas décadas y hoy domina tanto en categorías masculinas como femeninas.",
    "El ELO más bajo posible en la FIDE es 1000, aunque la mayoría de los principiantes comienzan alrededor de 800-1000.",
    "Un jugador de club intermedio suele tener un ELO entre 1500 y 1800.",
    "Un Maestro FIDE (FM) necesita un ELO de al menos 2300.",
    "Un Maestro Internacional (IM) necesita un ELO de 2400 y normas específicas.",
    "Un Gran Maestro (GM) necesita un ELO de 2500 y normas en torneos internacionales.",
    "Para ser campeón del mundo no basta con tener el ELO más alto; hay que ganar el ciclo de candidatos.",
    "La novela 'La defensa Luzhin' de Vladimir Nabokov está centrada en un jugador de ajedrez que enloquece.",
    "El cuento 'El tablero del destino' de Stefan Zweig es una obra maestra sobre la obsesión ajedrecística.",
    "La serie 'El Gambito de Dama' basó a su protagonista, Beth Harmon, en la vida de varias niñas prodigio reales.",
    "En la película 'Star Wars', los hologramas del juego 'Dejarik' que juega Chewbacca están inspirados en el ajedrez.",
    "En 'Harry Potter', el ajedrez mágico juega un papel crucial en la piedra filosofal.",
    "El ajedrez de los hunos, jugado en un tablero circular, apareció en un episodio clásico de 'Star Trek'.",
    "Alan Turing, el padre de la informática moderna, escribió uno de los primeros programas de ajedrez antes de que existieran las computadoras.",
    "Claude Shannon, otro pionero de la informática, calculó el número de posibles partidas de ajedrez (Número de Shannon).",
    "Los motores de ajedrez modernos evalúan posiciones en 'centipeones'. 100 centipeones equivalen a un peón de ventaja.",
    "Una ventaja de +3.00 en un motor significa que un bando tiene ventaja equivalente a tener 3 peones más.",
    "El ajedrez fue reconocido como deporte por el Comité Olímpico Internacional en 1999.",
    "A pesar de ser reconocido como deporte, el ajedrez no ha sido incluido en los Juegos Olímpicos oficiales.",
    "El control de tiempo estándar clásico suele ser de 90 minutos para los primeros 40 movimientos y 30 minutos de incremento.",
    "El ajedrez rápido (Rapid) suele tener un tiempo de 15 minutos por jugador con incrementos de 10 segundos.",
    "El ajedrez blitz (relámpago) suele jugarse a 3 minutos por jugador con incrementos de 2 segundos.",
    "En el ajedrez bala (bullet), cada jugador tiene solo 1 minuto para toda la partida.",
    "En internet, el ajedrez hiperbala se juega con 15 segundos por jugador.",
    "La plataforma online Chess.com superó los 100 millones de usuarios registrados en 2022.",
    "Durante la pandemia de COVID-19, el ajedrez online experimentó un crecimiento sin precedentes.",
    "Los streamers de Twitch y YouTube fueron fundamentales para popularizar el ajedrez entre la Gen Z.",
    "Hikaru Nakamura es el Gran Maestro más popular en Twitch, atrayendo decenas de miles de espectadores.",
    "Alexandra Botez y sus hermanas se hicieron virales combinando humor, ajedrez y streaming.",
    "La frase 'El ajedrez es el gimnasio de la mente' es comúnmente atribuida a Voltaire.",
    "El ajedrez se considera un arte, una ciencia y un deporte al mismo tiempo.",
    "Marcel Duchamp, el famoso artista surrealista, abandonó el arte para dedicarse exclusivamente al ajedrez.",
    "Duchamp compitió en varias Olimpiadas de Ajedrez representando a Francia.",
    "Se ha demostrado que jugar al ajedrez regularmente mejora la memoria, la concentración y la resolución de problemas.",
    "Un estudio en Venezuela demostró que los estudiantes que jugaron ajedrez mejoraron sus calificaciones en matemáticas.",
    "En el ajedrez, el 'Centro' (las casillas e4, d4, e5, d5) es la zona más importante del tablero al principio.",
    "Controlar el centro permite a las piezas tener más movilidad y alcance.",
    "El término 'Fianchetto' se usa cuando se desarrolla un alfil a la segunda fila, detrás de la cadena de peones.",
    "Un 'Isla de peones' es un grupo de peones conectados entre sí en la misma columna o adyacentes.",
    "Las 'Torres dobladas' (dos torres en la misma columna) son una formación muy poderosa para atacar.",
    "El 'Gambito' es un sacrificio de material (usualmente un peón) en la apertura para ganar tiempo o posición.",
    "El 'Sacrificio' es entregar material intencionalmente para lograr una ventaja posicional o un ataque directo.",
    "Un 'Sacrificio de Dama' es uno de los movimientos más espectaculares y celebrados en el ajedrez.",
    "El 'Zugzwang' es una situación donde cualquier movimiento posible empeora la posición del jugador.",
    "El 'Zwischenzug' es una jugada intermedia que se hace antes de responder a una amenaza del oponente.",
    "La 'Clavada' es una táctica donde una pieza no puede moverse porque expondría a una pieza más valiosa detrás de ella.",
    "Una 'Clavada absoluta' es cuando la pieza detrás es el Rey, haciendo ilegal mover la pieza clavada.",
    "La 'Rayuela' o 'Ataque a la descubierta' ocurre al mover una pieza, revelando un ataque de otra pieza detrás.",
    "El 'Tenedor' o 'Ataque doble' es cuando una pieza ataca a dos o más piezas enemigas al mismo tiempo.",
    "Los caballos son las piezas maestras en la ejecución de los tenedores.",
    "El 'Mate de la escalera' es un jaque mate básico dado por dos torres (o dama y torre) avanzando en filas paralelas.",
    "El 'Mate de Boden' es un mate famoso dado por dos alfiles en diagonales cruzadas.",
    "El 'Mate de Damiano' ocurre cuando una Dama da jaque junto al Rey enemigo, apoyada por un peón o pieza propia.",
    "El 'Mate de Anastasia' involucra un Caballo y una Torre atrapando al Rey en el borde del tablero.",
    "El 'Mate de Lolli' es un jaque mate típico con la Dama en g7 apoyada por un peón en f6.",
    "El 'Mate de Philidor' ocurre con una Dama y un Caballo coordinados cerca del Rey enemigo.",
    "El 'Ahogado' es un resultado muy buscado por los jugadores que están perdiendo, para salvar medio punto.",
    "En las finales de Rey y Peón, la 'Oposición' es un concepto clave para forzar la promoción del peón.",
    "Tener la oposición significa que el Rey está frente al Rey rival con una casilla de por medio, obligando al rival a ceder paso.",
    "En la FIDE, los árbitros de ajedrez también tienen títulos, como Árbitro FIDE (FA) y Árbitro Internacional (IA).",
    "En los torneos clásicos, está prohibido tener el teléfono móvil encendido; si suena, se pierde la partida.",
    "Ir al baño durante una partida de ajedrez clásico es común para despejar la mente, pero no se puede consultar nada.",
    "Anatoly Karpov perdió 10 kilos durante su match de 5 meses contra Kasparov en 1984.",
    "La final del Campeonato del Mundo de Ajedrez de 2013 en Chennai, India, fue diseñada para favorecer a Viswanathan Anand, pero Carlsen ganó.",
    "El Gran Maestro Miguel Najdorf era famoso por jugar ajedrez simultáneo a ciegas contra más de 40 oponentes.",
    "Durante la Segunda Guerra Mundial, Najdorf quedó varado en Argentina y decidió quedarse a vivir allí.",
    "El 'Ataque Indio de Rey' es un sistema de apertura flexible donde las blancas empiezan con Cf3 y g3.",
    "El ajedrez 'Bullet' es tan rápido que los jugadores a menudo ganan por tiempo en posiciones perdedoras.",
    "En ajedrez clásico, un jugador puede ofrecer tablas en su turno, pero debe hacerlo después de hacer su movimiento.",
    "Si un jugador ofrece tablas y el oponente no acepta, el juego continúa.",
    "El ELO se calcula con una fórmula matemática compleja donde ganar contra un rival de mayor ELO da más puntos.",
    "Perder contra un rival de ELO mucho más bajo hace que pierdas muchos puntos ELO.",
    "La base de datos de ajedrez más grande del mundo es Chessbase, con millones de partidas registradas.",
    "La apertura favorita de los principiantes suele ser el 'Mate del Pastor' por su efectividad a bajo nivel.",
    "A nivel de Gran Maestro, el Mate del Pastor es prácticamente imposible de ejecutar.",
    "La 'Defensa Francesa' es conocida por generar posiciones muy cerradas y estratégicas.",
    "La 'Defensa Caro-Kann' es considerada una de las defensas más sólidas contra 1.e4.",
    "La 'Apertura Inglesa' comienza con 1.c4 y es muy flexible y transposicional.",
    "La 'Apertura Reti' comienza con 1.Cf3 y es un sistema hipermoderno que controla el centro desde la distancia.",
    "La escuela hipermoderna de ajedrez surgió en la década de 1920, defendiendo que el centro no necesita ser ocupado por peones.",
    "Richard Réti y Aron Nimzowitsch fueron los fundadores de la escuela hipermoderna.",
    "Nimzowitsch escribió 'Mi Sistema', uno de los libros de ajedrez más influyentes de la historia.",
    "El libro 'Mis memorias de ajedrez' de José Raúl Capablanca es otro clásico de la literatura ajedrecística.",
    "Capablanca era conocido por su juego natural; apenas estudiaba teoría pero rara vez perdía.",
    "A Capablanca se le llamó 'La máquina de ajedrez' por su precisión implacable.",
    "Alekhine era conocido por su estilo agresivo y su capacidad para calcular variantes complejas.",
    "Alexander Alekhine es el único campeón del mundo que murió siendo campeón (en 1946).",
    "Tras la muerte de Alekhine, la FIDE organizó un torneo en 1948 para coronar a un nuevo campeón, que fue Mikhail Botvinnik.",
    "Botvinnik es considerado el 'Patriarca de la escuela soviética de ajedrez'.",
    "Botvinnik estableció el concepto de preparación profunda para las partidas, analizando los hábitos del rival.",
    "Viswanathan Anand es conocido como el 'Tigre de Madrás'.",
    "El joven prodigio Rameshbabu Praggnanandhaa derrotó a Magnus Carlsen en una partida de ajedrez rápido cuando tenía 16 años.",
    "En la cultura rusa, el ajedrez es considerado una de las profesiones más nobles.",
    "El título de 'Maestro de Deportes' de ajedrez en la URSS venía con privilegios como mejores apartamentos y viajes.",
    "El ajedrez por correspondencia se jugaba enviando las jugadas por carta postal; una partida podía durar años.",
    "Hoy en día, el ajedrez por correspondencia se juega en servidores web, y los jugadores tienen días para pensar cada jugada.",
    "En el ajedrez por correspondencia, está permitido usar motores de ajedrez en algunas ligas, lo que eleva la calidad a la perfección.",
    "El 'Mate del Alfil y Caballo' contra Rey solitario es una de las finales más difíciles de ejecutar correctamente.",
    "Un jugador tiene 50 movimientos para lograr el mate de Alfil y Caballo; muchos fallan por el tiempo.",
    "La 'Regla de la Mano Muerta' es un término en ajedrez que se refiere a una posición de peones bloqueados.",
    "El término 'Enroque largo' se refiere a enrocar con la torre de la columna 'a' (la torre de la Dama).",
    "El 'Enroque corto' es con la torre de la columna 'h' (la torre del Rey) y es el más común.",
    "El enroque está prohibido si el Rey o la Torre en cuestión ya se han movido.",
    "Tampoco se puede enrocar si el Rey está en jaque.",
    "No se puede enrocar si una casilla por la que el Rey debe pasar está atacada por una pieza rival.",
    "Si un Alfil queda en casillas del mismo color que el Alfil compañero, se dice que se tienen 'Alfiles del mismo color'.",
    "Si cada jugador tiene un Alfil en distinto color, se dice que es una final de 'Alfiles de distinto color', que tiende a tablas.",
    "La 'Torre de la Séptima' es un concepto donde una torre en la séptima fila (la de los peones rivales) es devastadora.",
    "Philidor dijo una vez: 'Los peones son el alma del ajedrez'.",
    "Un 'Peón pasado' es un peón que no tiene peones rivales delante de él ni en columnas adyacentes.",
    "Un 'Peón pasado protegido' es un peón pasado que es defendido por otro peón propio; es una enorme ventaja.",
    "El 'Peón aislado' es un peón que no tiene peones compañeros en las columnas adyacentes, suele ser una debilidad.",
    "Los 'Peones colgantes' son dos peones centrales avanzados sin peones propios en columnas adyacentes que los defiendan.",
    "Un 'Peón retrasado' es un peón que está detrás de los peones de su propio equipo y no puede ser defendido por ellos.",
    "La 'Estructura de peones' determina el carácter estratégico de la posición y rara vez cambia drásticamente.",
    "El 'Plan' en ajedrez es una secuencia de movimientos para alcanzar un objetivo posicional.",
    "Capablanca decía: 'Si ves una buena jugada, busca una mejor; te apresuras demasiado'.",
    "El 'Tempo' en ajedrez se refiere a un turno de movimiento; ganar tiempos es crucial en la apertura.",
    "Pérdida de tempo es hacer movimientos inútiles, como mover la misma pieza dos veces en la apertura.",
    "En las coordenadas del tablero, las columnas se etiquetan de la 'a' a la 'h'.",
    "Las filas se numeran del '1' al '8'.",
    "El Rey blanco empieza en la casilla e1, y el Rey negro en e8.",
    "La Dama blanca empieza en d1, y la Dama negra en d8.",
    "La regla mnemotécnica para colocar las Damas es: 'Dama blanca en casilla blanca, Dama negra en casilla negra'.",
    "Si anotas una jugada de Rey a la columna g, se escribe Rg (o Kg en inglés).",
    "El enroque corto se anota 0-0 y el enroque largo 0-0-0.",
    "Una captura se indica con una 'x' (ej. Cxf3).",
    "El jaque se indica con un '+' (ej. Df7+).",
    "El jaque mate se anota con '#' (ej. Df7#).",
    "La notación algebraica es el estándar mundial actual, pero antiguamente se usaba la notación descriptiva (P4R por peón a 4 de rey).",
    "Los árbitros usan banderas o luces en los relojes analógicos para indicar cuándo se cae el tiempo de un jugador.",
    "Caer de tiempo significa perder la partida, a menos que el rival no tenga material suficiente para dar mate.",
    "En un torneo suizo, los jugadores se emparejan con rivales de similar puntuación en cada ronda.",
    "En un torneo round-robin (todos contra todos), cada jugador se enfrenta a todos los demás.",
    "Las mesas de ajedrez de los parques públicos en ciudades como Nueva York o Moscú son lugares de encuentro culturales.",
    "En Washington Square Park, Nueva York, se pueden ver partidas rápidas por dinero.",
    "La película 'Buscando a Bobby Fischer' está basada en la vida del prodigio del ajedrez Josh Waitzkin.",
    "Josh Waitzkin, tras ser campeón de ajedrez juvenil, se convirtió más tarde en campeón mundial de Tai Chi Chuan.",
    "El ajedrez 'Crazyhouse' es una variante donde al capturar una pieza, ésta pasa a tu reserva y puedes introducirla en el tablero.",
    "El 'King of the Hill' (Rey de la Colina) es una variante donde ganar también es posible llevando tu Rey al centro del tablero.",
    "En 'Three-check chess', el primer jugador que da tres jaques gana la partida.",
    "El ajedrez fue uno de los primeros usos de la red ARPANET (precursora de internet) para transmitir datos en 1972.",
    "La partida 'El Juego del Siglo' fue jugada por Bobby Fischer con solo 13 años contra Donald Byrne en 1956.",
    "En esa partida, Fischer sacrificó su Dama para iniciar un ataque devastador.",
    "El 'Gambito Evans' es una apertura agresiva donde las blancas sacrifican un peón temprano para ganar un desarrollo rápido.",
    "El 'Ataque Marshall' en la Apertura Española es un sacrificio de Dama legendario inventado por Frank Marshall.",
    "Marshall guardó su ataque en secreto durante 8 años para usarlo contra Capablanca, pero este logró defenderse.",
    "El campeón del mundo de ajedrez por correspondencia suele tener una puntuación ELO cercana a los 2600-2700.",
    "Se ha demostrado que el ajedrez estimula el crecimiento de dendritas en el cerebro, mejorando la comunicación neuronal.",
    "El ajedrez puede aumentar el coeficiente intelectual (CI) si se practica regularmente desde la infancia.",
    "El título de 'Gran Maestro Sénior' se otorga a jugadores que superan los 60 años y mantienen un alto nivel.",
    "El ajedrez es obligatorio en muchas escuelas de la provincia de Córdoba, Argentina.",
    "El prodigio español Arturo Pomar jugó su primer campeonato de España a los 11 años.",
    "Pomar logró tablas contra Alexander Alekhine en un torneo cuando solo tenía 13 años.",
    "El ajedrez fue prohibido en varias ocasiones a lo largo de la historia por la Iglesia Católica por considerarlo un juego de azar.",
    "En la antigua Arabia, el ajedrez era considerado un juego noble y estaba exento de las prohibiciones religiosas contra los dados.",
    "El libro más antiguo de ajedrez moderno que se conserva es 'Repetición de Amores y Arte de Ajedrez' de Luis Ramírez de Lucena (1497).",
    "Ruy López de Segura escribió 'Libro de la invención liberal y arte del juego del ajedrez' en 1561.",
    "El término 'Madrugada' en el ajedrez español se refiere a mover una pieza antes de que el rival haya completado su reloj.",
    "La 'Variante del Cambio' en la Apertura Española cambia un alfil por un caballo central de inmediato.",
    "El 'Mate del Epaulette' ocurre cuando el Rey está atrapado entre sus propias torres en la primera fila y la Dama rival da mate.",
    "El 'Mate de Cozio' es un mate de Caballo y Dama donde el Caballo controla la casilla de escape del Rey.",
    "Un 'Zugzwang Recíproco' es una posición donde cualquier jugador que tenga el turno pierde la partida.",
    "El 'Síndrome de Karpov' es un término inventado para describir a un jugador que defiende posiciones pasivas perfectamente.",
    "Las computadoras no sufren de fatiga, lo que les da ventaja en las partidas largas contra humanos.",
    "Garry Kasparov acusó a Deep Blue de hacer movimientos 'demasiado humanos', sugiriendo intervención humana.",
    "IBM nunca reveló los registros completos del código de Deep Blue y desmanteló la máquina tras el match.",
    "El ajedrez es considerado un 'Deporte Mental' y compite con el Go y el Bridge por el título de juego de mesa más complejo.",
    "El Go tiene más combinaciones posibles que el ajedrez, pero el ajedrez tiene una fase de medio juego más tácticamente explosiva.",
    "El mayor número de damas en el tablero en una partida real registrada fue de 5 (una original y cuatro promovidas).",
    "La palabra 'Tablas' viene del latín 'stare', que significa estar de pie o inmóvil.",
    "La 'Defensa Pirc' y la 'Defensa Moderna' permiten a las blancas ocupar el centro para luego contratacarlo.",
    "La 'Apertura Escocesa' (1.e4 e5 2.Cf3 Cc6 3.d4) fue muy popular en el siglo XIX y resurgió con Carlsen.",
    "La 'Defensa Alekhine' (1.e4 Cf6) invita a las blancas a perseguir al caballo con sus peones, debilitando su estructura.",
    "El término 'Houyhnhnm' en la literatura de Jonathan Swift se refería a caballos racionales que jugaban al ajedrez.",
    "El ajedrez era el pasatiempo favorito de Sherlock Holmes en las novelas de Arthur Conan Doyle.",
    "El 'Gambito de la Dama Aceptado' implica que las negras capturan el peón ofrecido, mientras que el 'Rechazado' no.",
    "El ajedrez ralentizado (o postal) permitía el uso de libros de referencia en las primeras épocas.",
    "En 1997, la computadora Deep Thought (precursora de Deep Blue) jugó una partida contra el campeón mundial y perdió.",
    "El ajedrez 'Horde' (Horda) es una variante donde un jugador tiene un ejército normal y el otro tiene 36 peones.",
    "El 'Ataque Panov-Botvinnik' contra la Caro-Kann es uno de los sistemas más agresivos que existen.",
    "La pieza de ajedrez más valiosa en términos de puntos es la Dama (9 puntos), seguida de la Torre (5).",
    "El Alfil y el Caballo valen aproximadamente 3 puntos cada uno, aunque el Alfil suele valer ligeramente más en posiciones abiertas.",
    "Un peón vale 1 punto, que es la unidad de medida básica del ajedrez.",
    "La ventaja de 'Par de Alfiles' (tener los dos alfiles contra alfil y caballo del rival) se considera una ventaja posicional importante.",
    "El ajedrez es un juego de información perfecta; ambos jugadores conocen toda la información en todo momento, a diferencia del póker.",
    "El 'Retroanálisis' es una rama del ajedrez que deduce qué movimientos ocurrieron antes de llegar a una posición dada.",
    "Los problemas de ajedrez (mate en 2, mate en 3) son un género literario y matemático por sí mismos.",
    "El compositor de ajedrez más famoso fue Sam Loyd, quien creó problemas increíblemente ingeniosos en el siglo XIX.",
    "En los problemas de ajedrez, la convención dicta que las blancas siempre juegan y dan mate.",
    "Un 'Estudio' de ajedrez es una posición compuesta donde las blancas deben ganar o tablas, demostrando un concepto estético.",
    "El 'Estudio de Saavedra' es uno de los estudios de finales más famosos de la historia.",
    "En la novela 'El jugador de ajedrez' de Stefan Zweig, el protagonista vence al campeón del mundo jugando a ciegas.",
    "El título de Campeón del Mundo de Ajedrez Femenino se creó en 1927 y la primera campeona fue Vera Menchik.",
    "Vera Menchik fue tan fuerte que competía en torneos masculinos y derrotaba a varios maestros.",
    "Un grupo de jugadores que perdió ante Menchik fue apodado jocosamente como 'El Club Vera Menchik'.",
    "La 'Olimpiada de Ajedrez' de 1976 en Haifa fue boicoteada por los países árabes y el bloque soviético.",
    "El ajedrez era tan importante en la URSS que los analistas de la KGB vigilaban a los jugadores que viajaban al extranjero.",
    "Viktor Korchnoi fue un Gran Maestro soviético que desertó a los Países Bajos en 1976.",
    "Korchnoi jugó dos matches por el campeonato mundial contra Karpov en 1978 y 1981, perdiendo ambos.",
    "En el match de 1978, Korchnoi usó gafas de sol para evitar la hipnosis de un parapsicólogo en el equipo de Karpov.",
    "El ajedrez 'Ciego' se jugaba tradicionalmente con un intermediario que movía las piezas en el tablero.",
    "Hoy en día, los servidores de ajedrez online permiten jugar a ciegas ocultando las piezas en la interfaz gráfica.",
    "El 'Mate de Légal' es una trampa famosa en la apertura donde se sacrifican la Dama y dos piezas menores para dar mate.",
    "El 'Ataque Fried Liver' es una variante de la Giuoco Piano donde las blancas sacrifican un caballo por un ataque mortal.",
    "El nombre 'Fried Liver' (Hígado Frito) viene de que el creador de la trampa era un cocinero.",
    "El ajedrez fue tema central en la ópera 'El jugador de ajedrez' del compositor italiano Francesco Sacrati (siglo XVII).",
    "En el film 'Blade Runner', el movimiento final que Roy Batty usa para ganar contra Tyrell es una referencia a una partida real de 1852.",
    "La final de Rey, Alfil y Peón contra Rey puede ser muy complicada debido a la regla del ahogado y el color de las casillas.",
    "Si el peón se promueve en una casilla del color equivocado para el alfil, la posición a menudo es tablas.",
    "El concepto de 'Buena pieza' y 'Mala pieza' es fundamental; un caballo en un puesto avanzado es bueno, un alfil encerrado por sus peones es malo.",
    "La 'Profecía de Philidor' dice que un peón pasado en la séptima fila es tan fuerte como una Dama.",
    "El ajedrez 'Bughouse' a menudo resulta en posiciones surrealistas con tres o más damas por bando.",
    "En el ajedrez tradicional, nunca es obligatorio capturar una pieza, a diferencia de las damas.",
    "El 'Ataque de los Cuatro Peones' en la Defensa Alekhine es la línea más agresiva contra dicha defensa.",
    "El programa 'Komodo' es otro motor de ajedrez comercial que ha ganado múltiples campeonatos del mundo de computadoras.",
    "El motor 'Leela Chess Zero' es un proyecto de código abierto inspirado en AlphaZero que aprende jugando contra sí misma.",
    "La 'Estrategia de la escalera' en ajedrez es subir el ELO jugando contra rivales cada vez ligeramente mejores.",
    "El ajedrez se considera el juego de mesa más estudiado de la historia de la humanidad.",
    "En muchos clubes de ajedrez, es tradición aplaudir al final de una partida como muestra de respeto.",
    "Un 'Miniatura' es una partida corta, generalmente de menos de 20 o 25 jugadas, a menudo con un sacrificio brillante.",
    "El 'Swindle' es una trampa que un jugador que está perdiendo tiende para engañar al rival y ganar o tablas.",
    "El 'Falso Centinela' es un peón que parece defender una casilla clave pero que en realidad está sobrecargado.",
    "Una 'Jugada de espera' (Zugzwang intermedio) es un movimiento que no cambia la posición pero obliga al rival a mover.",
    "El concepto de 'Sobrecarga' se da cuando una pieza defiende múltiples amenazas y no puede cubrirlas todas a la vez.",
    "El 'Mate de Boden' suele ocurrir en la columna 'c' o 'f' tras un enroque corto mal defendido.",
    "La 'Línea de la Unidad' es un término de finales donde el Rey defensor debe estar a una cierta distancia para detener un peón.",
    "El ajedrez es una de las pocas disciplinas donde un adolescente puede vencer a un adulto de manera legítima y regular.",
    "El campeón de ajedrez de la prisión de Alcatraz en los años 30 era un preso que nunca había jugado fuera de la cárcel.",
    "El 'Gambito de Evans' fue tan popular en el siglo XIX que se consideraba casi obligatorio jugarlo si la posición lo permitía.",
    "El 'Ataque Trompowsky' (1.d4 Cf6 2.Ag5) es una apertura irregular que evita la teoría tradicional.",
    "La 'Defensa Orangután' (1.b4) es una apertura rara y extravagante nombrada por un simio en el zoo de Nueva York.",
    "El 'Gambito de Budapest' (1.d4 e5 2.cxe5) ofrece un peón inmediatamente para destruir el centro blanco.",
    "La regla de la 'Mano en la pieza' es estricta; si sueltas la pieza en una casilla, la jugada se considera hecha.",
    "En la partida 'La Inmortal Perlata', un jugador argentino sacrificó su Dama, ambas Torres y un Alfil para dar mate.",
    "El ajedrez 'Crazyhouse' a menudo se compara con el juego 'Shogi' (ajedrez japonés), donde también se reintroducen piezas.",
    "El ajedrez japonés (Shogi) se juega en un tablero de 9x9 y tiene reglas de promoción diferentes.",
    "El 'Xiangqi' (ajedrez chino) se juega en las intersecciones de un tablero de 9x10 y tiene un río en el medio.",
    "El 'Janggi' (ajedrez coreano) se deriva del Xiangqi pero permite que los caballos puedan ser bloqueados por otras piezas.",
    "El 'Shatranj' (persa) es el ancestro directo del ajedrez moderno y no tenía la regla del enroque ni del avance doble del peón.",
    "En el Shatranj antiguo, el tablero a menudo no era a cuadros, sino de un solo color con líneas marcadas.",
    "El término 'Fianchetto' viene del italiano 'pequeño flanco'.",
    "La 'Variante del Avance' en la Defensa Francesa (1.e4 e6 2.d4 d5 3.e5) crea una cadena de peones rígida.",
    "El 'Ataque Richter-Rauzer' en la Siciliana es una de las líneas más afiladas y teóricas del ajedrez.",
    "El 'Sistema de Londres' (1.d4 seguido de Af4) es un sistema de desarrollo sólido que se puede jugar contra casi cualquier defensa negra.",
    "El 'Sistema Colle' (1.d4 seguido de Ad3) es otro sistema blanco popular entre los jugadores de club.",
    "El concepto de 'Peones colgantes' se hizo famoso en la partida Capablanca vs. Tartakower en Nueva York 1924.",
    "El 'Ataque Torre' (1.d4 Cf6 2.Cf3 e6 3.Ag5) es un sistema que puede transponer a muchas aperturas diferentes.",
    "El ajedrez es un juego tan profundo que se han escrito más libros sobre él que sobre cualquier otro juego.",
    "El matemático Carl Friedrich Gauss era un ávido jugador de ajedrez y usaba el juego para relajar su mente.",
    "El filósofo Jean-Jacques Rousseau jugaba al ajedrez casi a diario y lo consideraba un ejercicio espiritual.",
    "El 'Gambito de Blackmar-Diemer' es un sacrificio de peón agresivo en la apertura que es muy popular en el ajedrez amateur.",
    "En la cultura de la India antigua, el ajedrez era conocido como el 'Juego de los Reyes'.",
    "La leyenda dice que el inventor del ajedrez pidió al rey un grano de trigo por la primera casilla, dos por la segunda, etc., sumando más trigo del que existe en el mundo.",
    "El número total de granos de trigo en esa leyenda es 2^64 - 1, que es 18.446.744.073.709.551.615.",
    "El 'Ataque Fajarowicz' es una variante rara del Gambito de Budapest.",
    "El ajedrez 'Kriegspiel' es una variante donde los jugadores no ven las piezas del oponente, solo se les notifica si una jugada es legal o si hay jaque.",
    "El ajedrez 'Cylinder' se juega en un tablero donde la columna 'a' conecta con la columna 'h'.",
    "La 'Apertura de los Cuatro Caballos' (1.e4 e5 2.Cf3 Cc6 3.Cc3 Cf6) a menudo conduce a posiciones tranquilas y simétricas.",
    "La 'Apertura de los Tres Caballos' ocurre cuando uno de los jugadores evita jugar el segundo caballo, evitando la simetría.",
    "El 'Gambito de Gajewski' es un sacrificio moderno y arriesgado en la Apertura Española.",
    "En una partida de 2009, el Gran Maestro Ivanchuk jugó su movimiento, se levantó y comenzó a hacer flexiones en el suelo.",
    "El ajedrez es el único deporte donde puedes tener 60 años y seguir compitiendo al más alto nivel mundial.",
    "Viktor Korchnoi jugó un match por el campeonato del mundo a los 49 años, algo inaudito en otros deportes.",
    "El actual campeón mundial senior (mayores de 50) a veces tiene un ELO superior a 2600.",
    "El ajedrez 'Mafia' es una variante humorística y rápida donde se puede 'matar' a las piezas de forma peculiar.",
    "El 'Tablero de Ajedrez de la Reina' es una atracción famosa en el Castillo de Traquair en Escocia, con piezas gigantes.",
    "El 'Ataque Sozin' en la Defensa Siciliana implica desarrollar el alfil en c4 para apuntar directamente al enroque negro.",
    "El 'Ataque Velimirović' es una continuación aún más agresiva del Ataque Sozin.",
    "La 'Defensa de los Dos Caballos' (1.e4 e5 2.Cf3 Cc6 3.Ac4 Cf6) a menudo conduce a partidas tácticas y salvajes.",
    "El 'Gambito de Morra' (1.e4 c5 2.d4 cxd4 3.c3) es un gambito agresivo contra la Siciliana muy popular en internet.",
    "El ajedrez 'Horde' fue popularizado en internet por el canal de YouTube 'Agadmator'.",
    "La 'Defensa Escandinava' (1.e4 d5) es una de las defensas más antiguas pero hoy en día se considera ligeramente inferior.",
    "El 'Ataque Barry' (1.d4 Cf6 2.Cf3 g6 3.Cc3 d5 4.Af4) es un sistema agudo contra la India de Rey.",
    "La 'Apertura del Peón de Alfil' (1.b3) también es conocida como Apertura Larsen, por el Gran Maestro danés Bent Larsen.",
    "Bent Larsen fue uno de los pocos jugadores occidentales que logró vencer a la élite soviética en los años 60 y 70.",
    "La 'Apertura del Peón de Dama' (1.d4) suele generar partidas más posicionales y estratégicas que 1.e4.",
    "La 'Apertura del Peón de Rey' (1.e4) tiende a abrir el centro rápidamente, favoreciendo el juego táctico.",
    "El 'Sistema Hippopotamus' es una apertura rara y flexible donde el negro desarrolla todas sus piezas en la tercera fila antes de avanzar peones.",
    "El 'Gambito Englund' (1.d4 e5) es una trampa que intenta tentar a las blancas a entrar en una línea forzada donde pierden.",
    "El 'Ataque Par-SCORE' es un sistema de ajedrez por computadora de los años 70 que usaba un lápiz óptico.",
    "La 'Defensa Pirc' debe su nombre al Gran Maestro vasco-francés Vasja Pirc.",
    "El ajedrez se considera un 'juego no determinista con información perfecta', debido a su inmensa profundidad matemática.",
    "La 'Defensa Chigorin' (1.d4 d5 2.c4 Cc6) desafía los principios clásicos desarrollando un caballo en la columna de la dama.",
    "El 'Gambito de Wing' (1.c4 b5) es un gambito inusual jugado por las negras contra la Apertura Inglesa.",
    "El 'Gambito de Staunton' (1.d4 f5 2.e4) es un ataque directo contra la Defensa Holandesa.",
    "Howard Staunton fue el mejor jugador del mundo en la década de 1840 y dio nombre a las piezas estándar.",
    "El primer match de ajedrez vía internet se jugó en 1994 entre Kasparov y un equipo de jugadores online.",
    "El 'Mate de la Tregua' es un final legendario en el que un jugador, para evitar la ejecución de un prisionero, busca tablas.",
    "La 'Apertura de la Pantera' es un nombre extravagante dado a un sistema de desarrollo hipermoderno.",
    "En la 'Defensa Grünfeld' (1.d4 Cf6 2.c4 g6 3.Cc3 d5), las negras permiten que las blancas construyan un centro de peones para luego atacarlo.",
    "Věra Menčík, la primera campeona mundial, murió trágicamente en un bombardeo durante la Segunda Guerra Mundial en Londres.",
    "El ajedrez 'Charge of the Light Brigade' es un apodo para una variante donde los peones se lanzan al ataque suicidamente.",
    "El 'Ataque de los Alfiles' en la India de Rey a menudo implica sacrificios de piezas en la columna 'h'.",
    "El 'Gambito de Cochrane' (1.e4 e5 2.Cf3 Cf6 3.Cxe5 d6 4.Cxf7) es un sacrificio de caballo temprano muy arriesgado.",
    "El 'Ataque Keres' en la Siciliana Scheveningen es una de las líneas más temibles para las negras.",
    "Paul Keres, 'El príncipe eterno del ajedrez', fue subcampeón del mundo en múltiples ocasiones pero nunca ganó el título.",
    "El ajedrez se juega en más de 160 países de todo el mundo de forma organizada.",
    "La FIDE tiene su sede actual en Lausana, Suiza.",
    "La bandera de la FIDE es blanca con el logo de la organización, que representa un tablero estilizado.",
    "El 'Zugzwang de Saavedra' es uno de los finales más famosos donde un peón en la séptima fila fuerza la victoria.",
    "El 'Ataque Veresov' (1.d4 Cf6 2.Cc3 d5 3.Ag5) es una apertura de desarrollo rápido que evita las líneas principales.",
    "El 'Sistema Averbaj' en la India de Rey es un esquema de desarrollo sólido para las blancas.",
    "La 'Defensa India Antigua' (1.d4 Cf6 2.c4 d6) es un sistema pasivo pero sólido rara vez visto en la élite.",
    "El 'Gambito de Alapin' (1.e4 e5 2.Ce2) busca construir un centro fuerte con f2-f4 después.",
    "El 'Gambito de Stafford' es una trampa popular en internet en la Defensa de los Dos Caballos.",
    "La partida más larga jugada en una Olimpiada duró más de 190 jugadas.",
    "El 'Ataque Polish' (1.d4 b5) es otro nombre para la Defensa Orangután.",
    "El término 'Tablas de Salomón' se refiere a las tablas por ahogado en el ajedrez medieval.",
    "El 'Gambito del Cero' es un término teórico para un gambito que no ofrece peones sino compensación posicional.",
    "El ajedrez es el juego favorito del famoso cantante de ópera Plácido Domingo, quien juega en torneos de celebridades.",
    "El campeón mundial Magnus Carlsen alguna vez dijo: 'No soy un genio, solo trabajo duro'.",
    "Bobby Fischer una vez dijo: 'El ajedrez es la vida'.",
    "Kasparov dijo: 'El ajedrez es el arte más intelectual y el deporte más cruel'.",
    "En el ajedrez árabe antiguo, el elefante (alfil) saltaba dos casillas en diagonal, sin importar si había una pieza en medio.",
    "El 'Gambito de Krejcik' es una apertura hiper-agresiva donde las blancas sacrifican múltiples peones desde el inicio.",
    "El 'Ataque Austrian' en la Defensa Pirc es uno de los sistemas más directos contra dicha defensa.",
    "La 'Apertura del Alfil' (1.e4 e5 2.Ac4) a menudo transpone a la Apertura Italiana o al Gambito de Rey rechazado.",
    "El 'Sistema Closed' en la Siciliana (1.e4 c5 2.Cc3) es un esquema lento y estratégico favorito de los jugadores posicionales.",
    "La 'Defensa Philidor' (1.e4 e5 2.Cf3 d6) es una de las aperturas más antiguas, pero se considera un poco pasiva hoy en día.",
    "François-André Danican Philidor fue el mejor jugador del siglo XVIII y el primero en analizar los finales de peones.",
    "El 'Ataque Grob' (1.g4) es una de las aperturas más extrañas y arriesgadas del ajedrez.",
    "El 'Gambito de Gibbons-Weiler' es un subproducto raro de la Apertura Inglesa.",
    "En 1999, Kasparov jugó una partida en internet contra 'El Mundo', donde los votos de los espectadores elegían la jugada negra.",
    "Kasparov ganó la partida contra 'El Mundo' en 62 movimientos.",
    "El ajedrez 'Extinction' es una variante donde el objetivo no es dar mate al rey, sino capturar un tipo específico de pieza del rival.",
    "El 'Ataque Goring' en la Apertura Escocesa es un gambito de peón central que busca abrir líneas rápidamente.",
    "La 'Defensa Robatsch' o Defensa Moderna (1.e4 g6) es un sistema hipermoderno extremo.",
    "El 'Gambito de Lisitsyn' (1.Cf3 f5 2.e4) es un sacrificio temprano de peón contra la Defensa Holandesa.",
    "En la mitología nórdica, se dice que los dioses jugaban al ajedrez en el Valhalla.",
    "En el poema épico 'El cantar de los Nibelungos', se menciona que los guerreros jugaban al ajedrez antes de las batallas.",
    "El 'Ataque Milner-Barry' es una variante aguda de la Defensa Francesa muy popular en Gran Bretaña.",
    "El 'Sistema Botvinnik' en la India de Rey es un esquema de desarrollo clásico y poderoso.",
    "El primer libro de ajedrez impreso en Inglaterra fue 'The Game and Playe of the Chesse' en 1474.",
    "La 'Defensa Semieslava' es una de las defensas más populares y teóricamente ricas contra 1.d4.",
    "El 'Gambito de Dama Albin' (1.d4 d5 2.e4) es una apertura de gambito agresiva que busca una ventaja rápida o trampa.",
    "La trampa más famosa del Gambito de Dama Albin implica una promoción de peón en la segunda fila del rival.",
    "El 'Ataque Tarrasch' en la Defensa Francesa es un sistema que busca la estabilidad central (3.Cd2).",
    "Siegbert Tarrasch fue un campeón a principios del siglo XX conocido por sus principios dogmáticos de control del centro.",
    "El 'Ataque Rubinstein' en la Defensa Francesa (3.Cc3) es la línea principal y más flexible.",
    "Akiba Rubinstein fue uno de los mejores jugadores del mundo en 1912, pero la Primera Guerra Mundial le impidió jugar por el título.",
    "El 'Gambito de Morphy' es un sacrificio en la Apertura de los Dos Caballos popularizado por Paul Morphy.",
    "Paul Morphy fue el primer ajedrecista indiscutiblemente mejor que el resto del mundo, en la década de 1850.",
    "Morphy se retiró del ajedrez a los 22 años, frustrado porque nadie podía vencerle.",
    "El 'Ataque Max Lange' es una variante agresiva en la defensa de los dos caballos llena de tácticas.",
    "El 'Gambito de Rice' es una subvariante del Ataque Max Lange que ofrece una torre entera.",
    "El ajedrez ha evolucionado más en los últimos 20 años gracias a los motores de IA que en los 200 años anteriores."
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
    intervaloDatos = setInterval(mostrarDato, 15000); // Cambiar cada 15 segundos
}

// Evento del botón manual
if (nextFactBtn) {
    nextFactBtn.addEventListener('click', () => {
        clearInterval(intervaloDatos); // Detenemos el auto-play
        mostrarDato(); // Mostramos el siguiente
        intervaloDatos = setInterval(mostrarDato, 15000); // Reiniciamos el auto-play
    });
}

// Lo iniciamos junto con el DOMContentLoaded de tu código
document.addEventListener('DOMContentLoaded', iniciarDatos);