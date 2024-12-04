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
  [
    "tocar el cielo",
    "besar la luna",
    "marcar mi vida",
    "corazón vacío",
    "En los cruces del género y la tecnología",
    "de la carne y el código",
    "las personas trans no binarias se mueven como glitches en un sistema binario que no las previó ni las comprende",
  ],
  [
    "eco de un suspiro",
    "olvidar tus besos",
    "corazón roto",
    "extrañando",
    "Su existencia desafía las normas prediseñadas",
    "exponiendo los fallos de una arquitectura que insiste en reducir la complejidad del ser a ceros y unos",
  ],
  [
    "atravesar el tiempo",
    "besar el olvido",
    "transformar el alma",
    "corazón en tinieblas",
    "En su devenir, hay una danza de resistencia",
    "un hackeo al sistema que busca controlarlo todo",
    "desde los cuerpos hasta los deseos",
    "desde los nombres hasta los futuros",
  ],
  [
    "La experiencia trans no binaria es un acto de desobediencia ontológica",
    "tocar la sombra",
    "cruzar el abismo",
    "amar lo imposible",
    "En un mundo que exige contornos claros",
    "se habitan los márgenes y se reescriben los límites",
  ],
  [
    "Es un caminar por los intersticios donde los géneros se encuentran",
    "se fragmentan y se recomponen",
    "Este corazón perdido",
    "dibuja su silencio",
    "transforma su sombra",
  ],
  [
    "Esta fractura, esta grieta, no es defecto",
    "sino potencial",
    "no es falla",
    "sino apertura a posibilidades infinitas",
    "encontrar la luz",
    "caminar entre reflejos",
    "sostener la niebla",
  ],
  [
    "Como cyborgs",
    "como ángeles",
    "por una vida sin tecnologías que median sus cuerpos y sus vidas",
    "la cirugía",
    "la hormona",
    "el pixel",
    "el algoritmo",
    "la memoria del agua",
    "el eco de un latido",
  ],
  [
    "Su humanidad se expande en ensamblajes donde lo humano y lo maquínico convergen para desafiar lo dado",
    "Se tejen nuevas narrativas donde las prótesis no son mutilación",
    "sino expansión",
    "donde la identidad no es esencialista",
    "sino rizomática",
    "los límites se rompen",
    "los recuerdos respiran",
    "el tiempo se dobla",
  ],
  [
    "Aquí se cruza el manifiesto glitch",
    "ser trans no binarie es encarnar la anomalía",
    "es aceptar",
    "revelar la fragilidad de un sistema",
    "que solo funciona excluyendo",
    "dibujar el abismo",
    "saltar el vacío",
    "crear la grieta",
  ],
  [
    "Es hackear desde dentro",
    "convertir el error en arte",
    "el ruido en música",
    "la disonancia en subversión",
    "cantar en el silencio",
    "gritar en la neblina",
    "resonar en el vacío",
  ],
  [
    "No somos defectos en la máquina",
    "somos la prueba de que la máquina está rota",
    "y nuestra existencia señala hacia una reparación radical que no busca restaurar",
    "sino transformar",
    "abrazar el caos",
    "bordar la confusión",
  ],
  [
    "nos recuerdan que nuestras luchas son múltiples",
    "y que nuestros cuerpos nunca existen aislados",
    "el viento canta secretos",
    "la tierra guarda abrazos",
  ],
  [
    "también una resistencia",
    "a la imposición de un saber que se pensó universal",
    "caminar el borde",
    "soñar la ruptura",
  ],
  [
    "Es el reconocimiento de que nuestras identidades no solo nos pertenecen",
    "sino que están imbricadas en redes de opresión y cuidado que incluyen a otres",
    "humanos y no humanos",
    "compartir el eco",
    "habitar el fragmento",
  ],
  [
    "Desde el hacktivismo",
    "aprendemos que la resistencia no necesita un solo frente ni una sola forma",
    "los colores se entrelazan",
    "el aire susurra nombres",
  ],
  [
    "Está en el código y el poema",
    "en el gesto y la estrategia",
    "el río canta versos",
    "la luna guarda secretos",
  ],
  [
    "Habitar el glitch es también un llamado a imaginar nuevos mundos posibles",
    "donde los sistemas no controlen",
    "sino cuiden",
    "donde el género no oprima",
    "sino juegue",
    "donde los cuerpos sean siempre más de lo que la norma puede contener",
  ],
  [
    "Así tejemos nuestras identidades como un patchwork de deseos",
    "tecnologías",
    "sueños y rebeldías",
    "bordar lo infinito",
    "desplegar el caos",
  ],
  [
    "Somos cyborgs",
    "  que no temen la metamorfosis",
    "alas que rompen cielos",
    "cuerpos que transforman mundos",
  ],
  [
    "Somos cuerpos vivos",
    "cuerpos insurgentes",
    "cuerpos posibles",
    "resonamos en el vacío",
    "vivimos en la grieta",
  ],
  [
    "Somos",
    "en nuestra existencia misma",
    "la pregunta que incomoda y la promesa de un mundo que aún no existe",
    "el eco del cambio",
    "la chispa del futuro",
  ],
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
