let fontSize;
let index;
let font;

function preload() {
  font = loadFont('assets/AveriaSansLibre-Regular.ttf');
}

const words = ["riche", "célèbre", "triste", "confinée", "en forme", "intelligente", "ruinée", "motivée", "sincère", "dingue", "diplômée", "amoureuse", "malade"];

function setup() {
  createCanvas(400, 400);
  frameRate(10);
  index = 0;
  fontSize = 80;
  textSize(fontSize);
  textFont(font);
  textAlign(CENTER);
}

function draw() {
  background(0);
  let c = color('magenta');
  fill(c);
  text(words[index], 0, height/2, width);

  if (index == words.length - 1) {
    index = 0;
  }
  else {
    index++;
  }
}

function mouseClicked() {
  noLoop();
}
