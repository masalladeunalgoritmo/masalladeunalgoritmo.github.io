let imagenes = [];
let textos = [];

let imagenActual = null;
let imagenAnterior = null;
let textoActual = "";
let textoAnterior = "";

let tiempoUltimoCambio = 0;
let intervaloCambio = 30000;
let duracionFade = 2000;

let imagenesCargadas = 0;
let totalImagenes = 40;
let ready = false;

function preload() {
  for (let i = 1; i <= totalImagenes; i++) {
    let pngPath = `assets/${i}.png`;
    let jpgPath = `assets/${i}.jpg`;

    loadImage(pngPath,
      img => {
        imagenes.push(img);
        imagenesCargadas++;
        if (imagenesCargadas === totalImagenes) ready = true;
      },
      () => {
        loadImage(jpgPath,
          img => {
            imagenes.push(img);
            imagenesCargadas++;
            if (imagenesCargadas === totalImagenes) ready = true;
          },
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
  fill(255);
  noCursor();
}

function draw() {
  background(0);

  if (!ready) {
    text("Cargando...", width / 2, height / 2);
    return;
  }

  let ahora = millis();
  let tiempoTranscurrido = ahora - tiempoUltimoCambio;
  let alpha = constrain(tiempoTranscurrido / duracionFade, 0, 1);

  if (imagenAnterior) {
    tint(255, 255 * (1 - alpha));
    image(imagenAnterior, width / 2, height / 2, 300, 250);
    noTint();
  }

  if (imagenActual) {
    tint(255, 255 * alpha);
    image(imagenActual, width / 2, height / 2, 300, 250);
    noTint();
  }

  fill(255, 255 * (1 - alpha));
  text(textoAnterior, width / 2, height / 2 + 180);

  fill(255, 255 * alpha);
  text(textoActual, width / 2, height / 2 + 180);

  if (tiempoUltimoCambio === 0 || tiempoTranscurrido > intervaloCambio) {
    cambiarContenido(tiempoUltimoCambio === 0);
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

    if (primeraVez) {
      imagenAnterior = null;
      textoAnterior = "";
    }
  }
}