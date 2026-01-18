// CONEXIÓN AL BACKEND (CEREBRO ÚNICO)
const socket = io("https://video-impostor-server.onrender.com");

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

// BOTÓN VERDE
function entrarJuego() {
  socket.emit("join-game");
}

// RESPUESTA DEL SERVIDOR
socket.on("role", (data) => {
  const title = document.getElementById("roleTitle");
  const text = document.getElementById("roleText");

  if (data.rol === "IMPOSTOR") {
    title.innerText = "🔴 ERES EL IMPOSTOR";
    text.innerHTML = `
      <span style="font-size:42px;color:#ff5252;">
        IMPOSTOR
      </span><br><br>
      Finge que conoces la palabra.
    `;
  } else {
    title.innerText = "🟢 Eres Ciudadano";
    text.innerHTML = `
      La palabra es:<br>
      <span style="font-size:42px;color:#00e676;">
        ${data.palabra}
      </span>
    `;
  }

  showScreen("role");
}

// ===== FUNCIONES QUE FALTABAN =====

// Botón "Listo"
function finishRound() {
  showScreen("end");
}

// Botón "Revelar"
function reveal() {
  document.getElementById("revealText").innerText =
    "La palabra era: (solo el impostor no la sabía)";
}

// Botón "Nueva ronda"
function newRound() {
  showScreen("welcome");
}
