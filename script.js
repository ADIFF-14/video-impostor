const palabras = [
  "Pan",
  "Ciudad",
  "Avión",
  "Playa",
  "Hospital"
];

function show(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

function entrarJuego() {
  const palabra = palabras[Math.floor(Math.random() * palabras.length)];

  document.getElementById("roleTitle").innerText = "Tu palabra";
  document.getElementById("roleText").innerText = palabra;

  show("role");
}

function volver() {
  show("welcome");
}

