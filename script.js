const socket = io("https://video-impostor-server.onrender.com");

function show(id) {
  document.querySelectorAll(".screen").forEach(s =>
    s.classList.remove("active")
  );
  document.getElementById(id).classList.add("active");
}

function entrar() {
  socket.emit("join");
}

socket.on("palabra", (p) => {
  document.getElementById("palabra").innerText = p;
  show("game");
});

function volver() {
  show("welcome");
}


