let imagenes = [];
let textos = [];
let fadeAlpha = [];
let motionSpeed = 0.005;
let lastInteractionTime = Date.now();
let showPoeticButton = false;
let showPoeticMoment = false;
let poeticMomentStartTime = 0;
let selectedImg = null;
let selectedLine = "";

function preload() {
  for (let i = 1; i <= 40; i++) {
    let pngPath = `assets/${i}.png`;
    let jpgPath = `assets/${i}.jpg`;

    loadImage(pngPath,
      img => imagenes.push(img),
      () => {
        loadImage(jpgPath,
          img => imagenes.push(img),
          () => console.warn(`No se pudo cargar ${pngPath} ni ${jpgPath}`)
        );
      }
    );
  }

  textos = [
    ["arder también es persistir", "me quemo para no olvidar(te)", "la flor que prolonga su muerte", "la memoria se incendia suave", "persisto en combustión"],
    ["soy cuerpo que quema", "lo marchito no es olvido", "el fuego no borra: revela", "una flor que siempre está", "me repito para no extinguirme"],
    ["te pienso desde la ceniza", "la flor que eligió incendiarse", "el deseo arde cuando se archiva", "me sostengo en el calor del recuerdo", "arder es también un gesto de amor"],
    ["memoria corrupta, como un sueño", "recuerdos en bucle", "archivo sensible dañado", "mi cuerpo no cabe en tus metadatos", "cada error guarda un nombre"],
    ["mi voz está comprimida en ruinas", "memoria pixelada de un rostro ausente", "soy el eco de una imagen que nunca muere", "me repito como sistema que falla", "mi archivo carga lento en tu memoria"],
    ["me arrugo para no desaparecer", "flor quemada es flor aún viva", "soy humo que sabe tu nombre", "me marchito sin rendirme", "lo quemado también recuerda"],
    ["la pérdida se guarda en capas", "identidad en loop binario", "soy dato que no se deja borrar", "cada pétalo es una versión mía", "arder fue mi forma de quedarme"],
    ["¿cuando olvidas?", "memoria en delay", "la herida es un archivo abierto", "te guardo como sombra corrupta", "mi cuerpo parpadea en tus errores"]
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
  background(0, 10);

  const now = Date.now();
  if (now - lastInteractionTime > 0) {
    showPoeticButton = true;
  }

  if (showPoeticMoment && now - poeticMomentStartTime < 6000) {
    if (selectedImg && selectedLine) {
      // Fondo semitransparente para destacar el popup
      push();
      fill(0, 180);
      noStroke();
      rect(0, 0, width, height);
      pop();

      // Imagen del popup (1080x720 centrado)
      push();
      imageMode(CENTER);
      tint(255, 220);
      image(selectedImg, width / 2, height / 2, 1080, 720);
      pop();

      // Texto sobre el popup
      push();
      fill(255);
      textSize(36);
      textAlign(CENTER, CENTER);
      text(selectedLine, width / 2, height / 2 + 320);
      pop();
    }
    return;
  } else if (showPoeticMoment && now - poeticMomentStartTime >= 6000) {
    showPoeticMoment = false;
  }

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
  tint(255, 200);
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
    const y = height / 2 - (lineas.length * 40) / 2 + i * 40;
    text(lineas[i], x, y);
    pop();
  }

  if (showPoeticButton) {
    let blink = frameCount % 60 < 30 ? 255 : 100;
    let buttonX = width / 2 + sin(frameCount * 0.1) * 2;
    let buttonY = height - 60 + cos(frameCount * 0.1) * 2;
    let buttonW = 180;
    let buttonH = 50;

    push();
    fill(255, blink);
    stroke(200);
    strokeWeight(2);
    rectMode(CENTER);
    rect(buttonX, buttonY, buttonW, buttonH, 20);
    noStroke();
    fill(0);
    textAlign(CENTER, CENTER);
    textSize(20);
    text("Ir más allá", buttonX, buttonY);
    pop();
  }
}

function mousePressed() {
  lastInteractionTime = Date.now();
  fadeAlpha = Array(10).fill(0);

  if (showPoeticButton) {
    const d = dist(mouseX, mouseY, width / 2, height - 60);
    if (d < 90) {
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
