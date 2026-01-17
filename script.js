/*****************************************
 * VIDEO IMPOSTOR - MODO ANFITRIÓN
 *****************************************/

// ================================
// CONFIGURACIÓN GENERAL
// ================================
const palabras = [
  "Avión","Aeropuerto","Playa","Hospital","Escuela","Universidad",
  "Restaurante","Supermercado","Banco","Iglesia","Hotel","Cine",
  "Estadio","Parque","Carretera","Puente","Montaña","Río","Lago",
  "Bosque","Ciudad","Isla","Puerto","Oficina","Biblioteca",
  "Carro","Autobús","Taxi","Motocicleta","Bicicleta","Barco",
  "Helicóptero","Tren","Camión",
  "Celular","Computadora","Televisión","Reloj","Cámara","Micrófono",
  "Mochila","Llave","Puerta","Mesa","Silla","Cama",
  "Doctor","Profesor","Policía","Bombero","Piloto","Cocinero",
  "Programador","Pastor","Cantante","Actor",
  "Pizza","Hamburguesa","Arroz","Pollo","Pescado","Pan",
  "Café","Jugo","Agua","Helado",
  "Fútbol","Baloncesto","Béisbol","Tenis",
  "Fiesta","Boda","Cumpleaños","Viaje","Vacaciones",
  "WhatsApp","Instagram","YouTube","TikTok","Internet",
  "Trabajo","Familia","Amigos","Clima","Sol","Lluvia"
];

// ================================
// ESTADO DEL JUEGO
// ================================
let rolesBolsa = [];
let palabraActual = "";
let esHost = false;

// ================================
// DETECTAR HOST
// ================================
function detectarHost() {
  const params = new URLSearchParams(window.location.search);
  esHost = params.get("host") === "1";
}

// ================================
// UTILIDADES
// ================================
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

function mezclar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// ================================
// INICIALIZAR
// ================================
window.onload = () => {
  detectarHost();

  if (esHost) {
    document.getElementById("hostPanel").style.display = "block";
  } else {
    document.getElementById("hostPanel").style.display = "none";
  }
};

// ================================
// INICIAR RONDA (SOLO HOST)
// ================================
function iniciarRonda() {
  if (!esHost) return;

  const totalJugadores = parseInt(
    document.getElementById("totalPlayers").value
  );
  const totalImpostores = parseInt(
    document.getElementById("totalImpostors").value
  );

  if (totalJugadores < 2) {
    alert("Debe haber al menos 2 jugadores.");
    return;
  }

  if (totalImpostores >= totalJugadores) {
    alert("Debe haber menos impostores que jugadores.");
    return;
  }

  // Crear bolsa de roles
  rolesBolsa = [];

  for (let i = 0; i < totalImpostores; i++) {
    rolesBolsa.push("IMPOSTOR");
  }

  for (let i = totalImpostores; i < totalJugadores; i++) {
    rolesBolsa.push("CIUDADANO");
  }

  mezclar(rolesBolsa);

  // Elegir palabra
  palabraActual = palabras[Math.floor(Math.random() * palabras.length)];

  alert("Ronda iniciada. Los jugadores pueden entrar.");

  showScreen("welcome");
}

// ================================
// ENTRAR AL JUEGO (JUGADORES)
// ================================
function entrarJuego() {

  if (rolesBolsa.length === 0) {
    alert("La partida ya está completa.");
    return;
  }

  const rol = rolesBolsa.shift();

  const roleTitle = document.getElementById("roleTitle");
  const roleText = document.getElementById("roleText");

  if (rol === "IMPOSTOR") {
    roleTitle.innerText = "🔴 ERES EL IMPOSTOR";
    roleText.innerHTML = `
      <span style="font-size:42px;color:#ff5252;">
        IMPOSTOR
      </span><br><br>
      Finge que conoces la palabra.
    `;
  } else {
    roleTitle.innerText = "🟢 Eres Ciudadano";
    roleText.innerHTML = `
      La palabra es:<br>
      <span style="font-size:42px;color:#00e676;">
        ${palabraActual}
      </span>
    `;
  }

  showScreen("role");
}

// ================================
// FIN DE RONDA
// ================================
function finishRound() {
  showScreen("end");
}

// ================================
// REVELAR IMPOSTOR
// ================================
function reveal() {
  document.getElementById("revealText").innerHTML = `
    🔍 El impostor era quien <b>NO conocía</b> la palabra:<br><br>
    <span style="font-size:28px;color:#00e676;">
      ${palabraActual}
    </span>
  `;
}

// ================================
// NUEVA RONDA
// ================================
function newRound() {
  rolesBolsa = [];
  palabraActual = "";
  document.getElementById("revealText").innerText = "";
  showScreen("welcome");
}
