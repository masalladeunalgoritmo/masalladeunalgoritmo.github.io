let imagenes = [];
let textos = [];
let videos = [];
let isPaused = false;
let glitchEffect;
let capture;
let videoElement;

function preload() {
  // Cargar imágenes
  imagenes = [
    loadImage("https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaTNibGs0ZXU3N3YxNGg4cTdrMWhtNjFoM3Y3cHV6MXprM3RpNHZkaSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/g278Roem7Kz7j1AylB/giphy.gif"),
    loadImage("https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTJyOGNxMDh1dTdydDU4a2p3bnhtZzMyczFhbnRwNXRzd3lhZGs1aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l7n9zmMPMrh71p6Xjm/giphy.gif")
  ];

  // Cargar texto
  textos = [
    ["tocar el cielo", "besar la luna", "marcar mi vida", "corazón vacío"],
    ["eco de un suspiro", "olvidar tus besos", "corazón roto", "extrañando"],
    ["atravesar el tiempo", "besar el olvido", "transformar el alma", "corazón en tinieblas"]
  ];

  // Cargar videos
  videos = [
    "https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4" // Sustituye por el enlace correcto
  ];
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("Playfair Display");
  textAlign(CENTER, CENTER);
  frameRate(10);

  // Configurar captura de video
  capture = createCapture(VIDEO);
  capture.hide();

  // Configurar video
  videoElement = createVideo(random(videos));
  videoElement.hide();
  videoElement.loop();

  glitchEffect = new Glitch(); // Inicializar el efecto glitch
}

function draw() {
  background(0);

  if (!isPaused) {
    // Mostrar captura de video con movimiento
    image(capture, mouseX, mouseY, 240, 180);

    // Mostrar imagen aleatoria con glitch
    let img = random(imagenes);
    glitchEffect.setImage(img);
    glitchEffect.show(random(width / 4, (3 * width) / 4), random(height / 4, (3 * height) / 4));

    // Mostrar video aleatorio
    image(videoElement, random(width), random(height), 320, 240);

    // Mostrar textos aleatorios
    let randomTextArray = random(textos);
    for (let i = 0; i < randomTextArray.length; i++) {
      fill(random(255), random(255), random(255));
      textSize(random(20, 50));
      text(random(randomTextArray), random(width), random(height));
    }
  }
}

// Alternar pausa/ejecución al hacer clic
function mousePressed() {
  isPaused = !isPaused;
}

// Clase para manejar el efecto glitch
class Glitch {
  constructor() {
    this.image = null;
    this.offsetX = random(-10, 10);
    this.offsetY = random(-10, 10);
  }

  setImage(img) {
    this.image = img;
  }

  show(x, y) {
    if (this.image) {
      push();
      translate(x + this.offsetX, y + this.offsetY);
      image(this.image, 0, 0, 320, 240); // Tamaño reducido para glitch
      pop();
    }
  }
}