let imagenes = [];
let textos = [];
let isPaused = false;
let fadeAlpha = [];
let motionSpeed = 0.005;
let lastInteractionTime = Date.now();
let showPoeticButton = false;
let showPoeticMoment = false;
let poeticMomentStartTime = 0;
let selectedImg = null;
let selectedLine = "";

function preload() {
  for (let i = 1; i <= 7; i++) {
    imagenes.push(loadImage(`assets/${i}.png`));
  }

  textos = [
    ["sueño fragmentado", "recuerdo suspendido", "el eco del cuerpo", "latido binario", "presencia espectral", "gesto disuelto"],
    ["una grieta suave", "entre la carne y el código", "voces apagadas", "resonar en el olvido", "memoria incompleta"],
    ["cuerpo sin borde", "nombres que se evaporan", "deseos reconfigurados", "una flor en loop", "la herida como lenguaje"],
    ["parpadeo ancestral", "tecnología húmeda", "rostro entre líneas", "el error como verdad", "cicatriz de datos"],
    ["repetición infinita", "lo real se comprime", "latido que titubea", "ecos de un archivo corrupto"],
    ["imagen flotante", "el futuro filtrado", "una memoria pixelada", "fragmentos de mí", "código emocional"],
    ["existencia intermitente", "belleza anómala", "nombre distorsionado", "voz transcodificada", "paisaje interior"],
    ["cuerpo que pulsa", "metamorfosis digital", "el borde se desdibuja", "sombra que parpadea"],
    ["archivo sensible", "poesía en la falla", "el loop como consuelo", "desear es reprogramar"],
    ["la niebla contiene", "la pantalla respira", "transparencia saturada", "conexión rota"],
    ["deseo mutante", "identidad expandida", "la lógica se fragmenta", "una flor desenfocada"],
    ["nada es binario", "todo es transición", "belleza en pausa", "cuerpo en deriva", "sensorial y sintético"]
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont("serif");
  frameRate(30);
  fadeAlpha = Array(10).fill(0);
}

function draw() {
  noStroke();
  fill(0, 10);
  rect(0, 0, width, height);

  const now = Date.now();
  if (now - lastInteractionTime > 120000) {
    showPoeticButton = true;
  }

  if (showPoeticMoment && now - poeticMomentStartTime < 3000) {
    if (selectedImg && selectedLine) {
      push();
      imageMode(CENTER);
      tint(255, 200);
      image(selectedImg, width / 2, height / 2, 300, 250);
      pop();

      push();
      fill(255);
      textSize(26);
      text(selectedLine, width / 2, height / 2 + 150);
      pop();
    }
    return;
  } else if (showPoeticMoment && now - poeticMomentStartTime >= 3000) {
    showPoeticMoment = false;
  }

  if (!isPaused) {
    const img = random(imagenes);
    const imgX = random(width);
    const imgY = random(height);
    const d = dist(mouseX, mouseY, imgX, imgY);
    motionSpeed = d < 150 ? 0.03 : 0.005;

    const breath = 1 + 0.03 * sin(frameCount * motionSpeed * 100);
    let zoom = map(d, 0, 300, 1.3, 1) * breath;
    const angle = noise(frameCount * motionSpeed * 20) * 0.2;

    push();
    translate(imgX, imgY);
    rotate(angle);
    scale(zoom);
    imageMode(CENTER);
    tint(255, 80);
    image(img, 0, 0, 220, 180);
    pop();

    const lineas = random(textos);
    fadeAlpha = Array(lineas.length).fill(0);
    for (let i = 0; i < lineas.length; i++) {
      push();
      fadeAlpha[i] = min(fadeAlpha[i] + 10, 255);
      const size = map(sin(frameCount * motionSpeed * 100 + i), -1, 1, 16, 32);
      fill(255, fadeAlpha[i]);
      textSize(size);
      const x = width / 2 + sin(frameCount * motionSpeed * 50 + i) * 200;
      const y = height / 2 + i * 40;
      text(lineas[i], x, y);
      pop();
    }
  }

  if (showPoeticButton) {
    push();
    fill(255, 180);
    textSize(28);
    textAlign(CENTER, CENTER);
    text("Ir más allá", width / 2, height - 60);
    pop();
  }
}

function mousePressed() {
  lastInteractionTime = Date.now();
  fadeAlpha = Array(10).fill(0);
  isPaused = !isPaused;

  if (showPoeticButton) {
    const d = dist(mouseX, mouseY, width / 2, height - 60);
    if (d < 40) {
      selectedImg = random(imagenes);
      const lineaAleatoria = random(textos);
      selectedLine = random(lineaAleatoria);
      poeticMomentStartTime = Date.now();
      showPoeticMoment = true;
      showPoeticButton = false;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

document.addEventListener("mousemove", (e) => {
  const cursor = document.getElementById("cursor");
  if (cursor) {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }
});
