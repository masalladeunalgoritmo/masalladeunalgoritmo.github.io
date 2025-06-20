let imagenes = [];
let textos = [];

let imagenActual = null;
let imagenAnterior = null;
let textoActual = "";
let textoAnterior = "";
let textoVisible = ""; // ← texto parcial para animación

let tiempoUltimoCambio = 0;
let intervaloCambio = 30000;
let duracionFade = 2000;
let velocidadEscritura = 50; // ms por letra

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

  if (imagenAnterior) {
    tint(255, 255 * (1 - alpha));
    image(imagenAnterior, width / 2, height / 2, 720, 1080);
    noTint();
  }

  if (imagenActual) {
    tint(255, 255 * alpha);
    image(imagenActual, width / 2, height / 2, 720, 1080);
    noTint();
  }

  // Animación de máquina de escribir:
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