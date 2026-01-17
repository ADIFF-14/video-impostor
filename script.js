/*****************************************
 * VIDEO IMPOSTOR - MVP FUNCIONAL
 *****************************************/

// ================================
// PALABRAS
// ================================
const palabras = [
  "Avión","Playa","Hospital","Escuela","Universidad",
  "Restaurante","Banco","Iglesia","Hotel","Cine",
  "Parque","Montaña","Río","Ciudad","Biblioteca",
  "Carro","Autobús","Bicicleta","Barco","Tren",
  "Celular","Computadora","Televisión","Cámara",
  "Mesa","Silla","Cama",
  "Doctor","Profesor","Policía","Bombero",
  "Pizza","Hamburguesa","Arroz","Pan",
  "Café","Agua","Helado",
  "Fútbol","Béisbol","Tenis",
  "Fiesta","Cumpleaños","Viaje",
  "WhatsApp","Instagram","YouTube",
  "Trabajo","Familia","Amigos","Sol","Lluvia"
];

// ================================
// ESTADO DEL JUEGO
// ================================
let palabraActual = "";
let rolActual = "";

// ================================
// UTILIDADES
// ================================
function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

// ================================
// ENTRAR AL JUEGO (BOTÓN VERDE)
// ================================
function entrarJuego() {

  // Elegir palabra
  palabraActual = palabras[Math.floor(Math.random() * palabras.length)];

  // 1 impostor cada 5 aprox (simple)
  rolActual = Math.random() < 0.2 ? "IMPOSTOR" : "CIUDADANO";

  const roleTitle = document.getElementById("roleTitle");
  const roleText = document.getElementById("roleText");

  if (rolActual === "IMPOSTOR") {
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
// REVELAR
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
  palabraActual = "";
  rolActual = "";
  document.getElementById("revealText").innerText = "";
  showScreen("welcome");
}
