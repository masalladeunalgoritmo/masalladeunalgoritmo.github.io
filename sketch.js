let imagenes = [];
let textos = [];

let imagenActual = null;
let imagenAnterior = null;
let textoActual = "";
let textoAnterior = "";

let tiempoUltimoCambio = 0;
let intervaloCambio = 30000; // cada 30 segundos
let duracionFade = 2000;     // duración del crossfade en ms

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
  fill(255);
  noCursor();
  cambiarContenido(true); // primer contenido sin crossfade
  tiempoUltimoCambio = millis();
}

function draw() {
  background(0);
  let ahora = millis();
  let tiempoTranscurrido = ahora - tiempoUltimoCambio;

  // Calculamos opacidad para el crossfade
  let alpha = constrain(tiempoTranscurrido / duracionFade, 0, 1);

  // Imagen anterior (desapareciendo)
  if (imagenAnterior) {
    tint(255, 255 * (1 - alpha));
    image(imagenAnterior, width / 2, height / 2, 300, 250);
    noTint();
  }

  // Imagen nueva (apareciendo)
  if (imagenActual) {
    tint(255, 255 * alpha);
    image(imagenActual, width / 2, height / 2, 300, 250);
    noTint();
  }

  // Texto anterior
  fill(255, 255 * (1 - alpha));
  text(textoAnterior, width / 2, height / 2 + 180);

  // Texto nuevo
  fill(255, 255 * alpha);
  text(textoActual, width / 2, height / 2 + 180);

  // Cambiar contenido si ha pasado el tiempo
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

    if (primeraVez) {
      imagenAnterior = null;
      textoAnterior = "";
    }
  }
}