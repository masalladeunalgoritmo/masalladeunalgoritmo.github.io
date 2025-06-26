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

  // Imagen anterior con jitter inverso
  if (imagenAnterior) {
    tint(255, 255 * (1 - alpha));
    glitchEffect(imagenAnterior, 1 - alpha);
    noTint();
  }

  // Imagen actual con jitter progresivo
  if (imagenActual) {
    tint(255, 255 * alpha);
    glitchEffect(imagenActual, alpha);
    noTint();
  }

  // Máquina de escribir
  let letrasMostrar = floor((tiempoTranscurrido - duracionFade) / velocidadEscritura);
  if (letrasMostrar >= 0) {
    textoVisible = textoActual.substring(0, letrasMostrar);
  } else {
    textoVisible = "";
  }

  fill(255, 255 * alpha);
  text(textoVisible, width / 2, height / 2 + 600);

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

// Glitch pixel jitter effect
function glitchEffect(img, strength) {
  let tiles = 20;
  let tileW = img.width / tiles;
  let tileH = img.height / tiles;

  for (let i = 0; i < tiles; i++) {
    for (let j = 0; j < tiles; j++) {
      let sx = i * tileW;
      let sy = j * tileH;
      let dx = width / 2 - img.width / 2 + sx + random(-5, 5) * (1 - strength);
      let dy = height / 2 - img.height / 2 + sy + random(-5, 5) * (1 - strength);
      copy(img, sx, sy, tileW, tileH, dx, dy, tileW, tileH);
    }
  }
}