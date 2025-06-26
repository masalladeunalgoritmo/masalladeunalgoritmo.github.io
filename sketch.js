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

  // Imagen anterior
  if (imagenAnterior && glitchActivo) {
    tint(255, 255 * (1 - alpha));
    ghostTrailDatamosh(imagenAnterior);
    noTint();
  } else if (imagenAnterior) {
    tint(255, 255 * (1 - alpha));
    image(imagenAnterior, width / 2, height / 2, 1080, 1920);
    noTint();
  }

  // Imagen actual
  if (imagenActual && glitchActivo) {
    tint(255, 255 * alpha);
    ghostTrailDatamosh(imagenActual);
    noTint();
  } else if (imagenActual) {
    tint(255, 255 * alpha);
    image(imagenActual, width / 2, height / 2, 1080, 1920);
    noTint();
  }

  // Máquina de escribir + shake de texto
  let letrasMostrar = floor((tiempoTranscurrido - duracionFade) / velocidadEscritura);
  if (letrasMostrar >= 0) {
    textoVisible = textoActual.substring(0, letrasMostrar);
  } else {
    textoVisible = "";
  }

  let shakeX = glitchActivo ? random(-2, 2) : 0;
  let shakeY = glitchActivo ? random(-2, 2) : 0;
  fill(255, 255 * alpha);
  text(textoVisible, width / 2 + shakeX, height / 2 + 600 + shakeY);

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

// Glitch horizontal tipo datamosh
function ghostTrailDatamosh(img) {
  let h = img.height;
  let w = img.width;
  let glitchHeight = 20;
  for (let y = 0; y < h; y += glitchHeight) {
    let offset = int(random(-30, 30));
    copy(
      img,
      0, y, w, glitchHeight,
      width / 2 - w / 2 + offset, height / 2 - h / 2 + y,
      w, glitchHeight
    );
  }
}