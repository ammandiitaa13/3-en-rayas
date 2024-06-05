const tablero = document.querySelector('.tablero'); //Creación tablero
const mensajeTurno = document.querySelector('.mensaje'); //Mensaje de turno
const finDeJuego = document.querySelector('.fin-de-juego'); //Pantalla fin
const resultado = document.querySelector('.resultado'); //Muestra ganador
const botonReiniciar = document.querySelector('.boton'); //Reiniciar juego

let turnoX = true; // Indica a quien le toca jugar, por defecto empiezan las X
let turno = 0;
const maxTurno = 9; // Número máximo de turnos permitidos
const jugadores = { x: 'cruz', o: 'circulo'};

// Posibles combinaciones ganadoras
const posicionesGanadoras = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];

iniciarJuego();

function iniciarJuego() 
{
    finDeJuego.classList.remove('mostrar'); // Oculta la pantalla de fin de juego
    crearTablero();
    mensajeTurno.textContent = `Turno de ${turnoX ? 'X' : 'O'}`; 
    turnoX = true; 
    turno = 0; // Reinicia el contador de turnos
}

function crearTablero() 
{
    const celdas = 9; 
    while (tablero.firstElementChild) { tablero.firstElementChild.remove(); }  // Elimina las celdas existentes 
    for (let i = 0; i < celdas; i++)      // Crea las celdas 
    {
        const div = document.createElement('div'); // Para representar una celda
        div.classList.add('celda'); 
        div.addEventListener('click', manejarJuego, { once: true }); 
        tablero.appendChild(div); // Agrega la celda al tablero
    }
}

function manejarJuego(e) 
{
    const celdaActual = e.currentTarget; // Obtiene la celda en la que se hizo clic
    const jugadorActual = turnoX ? jugadores.x : jugadores.o; // Determina el jugador actual
    turno++; 
    dibujarFigura(celdaActual, jugadorActual); // Dibuja X o O
    if (comprobarGanador(jugadorActual)) { return; }    // Si hay un ganador, termina la función 
    if (turno === maxTurno) { mostrarFinDeJuego(false);} // Comprueba si hay empate
    cambiarTurno(); 
}

function dibujarFigura(elemento, nuevaClase)  //Para dibujar X o O
{
    elemento.classList.add(nuevaClase); 
}

function cambiarTurno() 
{
    turnoX = !turnoX;
    mensajeTurno.textContent = turnoX ? "X" : "O"; // Mensaje de turno para el próximo jugador
}

function comprobarGanador(jugadorActual) 
{
    const celdas = document.querySelectorAll('.celda'); // Obtiene todas las celdas del tablero
    const ganador = posicionesGanadoras.some(array => array.every(posicion => celdas[posicion].classList.contains(jugadorActual)));     // Comprueba si hay alguna de las combinaciones ganadoras
    if (!ganador) { return; }
    mostrarFinDeJuego(true); 
    return true; 
}

function mostrarFinDeJuego(ganador) 
{
    finDeJuego.classList.add("mostrar");
    if (ganador) { resultado.textContent = `¡${turnoX ? "X" : "O"} ha ganado la partida!`; } 
    else { resultado.textContent = 'El juego ha quedado en tablas'; }
}

botonReiniciar.addEventListener('click', iniciarJuego); 
