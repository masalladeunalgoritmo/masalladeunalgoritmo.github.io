let imagenes = [];
let textos = [];

let imagenActual = null;
let imagenAnterior = null;
let textoActual = "";
let textoAnterior = "";
let textoVisible = "";

let tiempoUltimoCambio = 0;
let intervaloCambio = 6000;
let duracionFade = 1000;
let velocidadEscritura = 40;

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
    ["soy cuerpo que quema", "lo marchito no es olvido", "el fuego no borra lo vivido", "ceniza no es ausencia", "arder es otra forma de florecer"],
    ["lo que arde no se olvida", "de los restos brota vida", "en la llama vive el eco", "cuerpo hecho incendio", "la pérdida también enciende"]
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(28);
  textFont("Courier");
  fill(255);
  noCursor();
  cambiarContenido(true);
  tiempoUltimoCambio = millis();
}

function draw() {
  background(0);
  let ahora = millis();
  let tiempoTranscurrido = ahora - tiempoUltimoCambio;
  let alpha = constrain(tiempoTranscurrido / duracionFade, 0, 1);
  let glitchActivo = tiempoTranscurrido < 1000;

  if (glitchActivo) {
    hydraStyleVisual();
  }

  // Imagen anterior
  if (imagenAnterior && glitchActivo) {
    tint(255, 255 * (1 - alpha));
    ghostTrailDatamosh(imagenAnterior);
    noTint();
  } else if (imagenAnterior) {
    tint(255, 255 * (1 - alpha));
    drawFullImage(imagenAnterior);
    noTint();
  }

  // Imagen actual
  if (imagenActual && glitchActivo) {
    tint(255, 255 * alpha);
    ghostTrailDatamosh(imagenActual);
    noTint();
  } else if (imagenActual) {
    tint(255, 255 * alpha);
    drawFullImage(imagenActual);
    noTint();
  }

  // Texto con máquina de escribir, shake y glow
  let letrasMostrar = floor((tiempoTranscurrido - duracionFade) / velocidadEscritura);
  textoVisible = letrasMostrar >= 0 ? textoActual.substring(0, letrasMostrar) : "";

  let shakeX = glitchActivo ? random(-2, 2) : 0;
  let shakeY = glitchActivo ? random(-2, 2) : 0;

  push();
  if (glitchActivo) {
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(255, 255, 255, 180);
  }
  fill(255, 255 * alpha);
  text(textoVisible, width / 2 + shakeX, height / 2 + 600 + shakeY);
  pop();

  if (tiempoTranscurrido > intervaloCambio) {
    cambiarContenido(false);
    tiempoUltimoCambio = ahora;
  }
}

function cambiarContenido(primeraVez = false) {
  if (imagenes.length > 0) {
    if (!primeraVez) {
      imagenAnterior = imagenActual;
      textoAnterior = textoActual;
    }

    imagenActual = random(imagenes);
    let grupo = random(textos);
    textoActual = random(grupo);
    textoVisible = "";

    if (primeraVez) {
      imagenAnterior = null;
      textoAnterior = "";
    }
  }
}

// Escalado proporcional para imagen completa
function drawFullImage(img) {
  let scaleFactor = max(width / img.width, height / img.height);
  let w = img.width * scaleFactor;
  let h = img.height * scaleFactor;
  image(img, width / 2, height / 2, w, h);
}

// Glitch horizontal
function ghostTrailDatamosh(img) {
  let scaleFactor = max(width / img.width, height / img.height);
  let w = img.width * scaleFactor;
  let h = img.height * scaleFactor;
  let glitchHeight = 20;
  for (let y = 0; y < h; y += glitchHeight) {
    let offset = int(random(-30, 30));
    copy(
      img,
      0, (y / h) * img.height, img.width, (glitchHeight / h) * img.height,
      width / 2 - w / 2 + offset, height / 2 - h / 2 + y,
      w, glitchHeight
    );
  }
}

// Visual Hydra-style
function hydraStyleVisual() {
  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.002);

  for (let i = 0; i < 20; i++) {
    let offset = i * 20 + frameCount * 0.3;
    stroke(255 - i * 10, 100, 200, 100);
    strokeWeight(2);
    noFill();
    ellipse(
      sin(frameCount * 0.01 + i) * 150,
      cos(frameCount * 0.01 + i) * 150,
      200 + sin(frameCount * 0.05 + i) * 50
    );
  }

  for (let i = 0; i < 6; i++) {
    push();
    rotate(TWO_PI * i / 6 + frameCount * 0.005);
    translate(150, 0);
    fill(255, 50);
    stroke(255, 180);
    polygon(0, 0, 40 + sin(frameCount * 0.1 + i) * 10, 4);
    pop();
  }

  pop();
}

// Polígono tipo shape(n)
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
