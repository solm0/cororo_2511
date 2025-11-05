let vid;
let w = 80;
let h = 48;
let scl;
let offsetX, offsetY;

let song, fft;

function preload() {
  song = loadSound('/static/kiseki/kiseki.mp3'); // mp3 파일 경로
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255);

  // 웹캠
  vid = createCapture(VIDEO);
  vid.size(w, h);
  vid.hide();

  calculateScaleAndOffset();
  rectMode(CENTER);
  noStroke();

  // 음악
  song.loop();
  fft = new p5.FFT(0.8, 64); // bins 64개
}

function draw() {
  background(0);
  vid.loadPixels();
  fft.analyze();

  let bass = fft.getEnergy("bass");     // 저음
  let mid = fft.getEnergy("mid");       // 중음
  let treble = fft.getEnergy("treble"); // 고음

  for (let i = 0; i < vid.width; i++) {
    for (let j = 0; j < vid.height; j++) {
      let index = (j * vid.width + i) * 4;
      let r = vid.pixels[index];
      let g = vid.pixels[index + 1];
      let b = vid.pixels[index + 2];
      let c = (r + g + b) / 3;

      let x = offsetX + i * scl + scl / 2;
      let y = offsetY + j * scl + scl / 2;

      // 기본 크기
      let baseSize = map(c, 0, 255, scl*0.09, scl);

      // 밝은 픽셀만 음악에 따라 크기 변화
      let size = baseSize;
      if(c > 180){
        // 저음에 따라 50~150% 변하게
        size *= map(bass, 0, 255, 0.5, 0.1);
      }

      // 색상
      let hueVal = map(c, 0, 255, 180, 20);
      let satVal = map(c, 0, 255, 80, 50);
      let briVal = map(c, 0, 255, 100, 255);

      // 밝은 픽셀 색도 음악에 반응
      if(c > 180){
        briVal += mid/2;
        hueVal += treble/20;
      }

      fill(hueVal, satVal, constrain(briVal, 0, 255));

      // 마우스 근처 튀어나오기
      let dx = x - mouseX;
      let dy = y - mouseY;
      let dSq = dx*dx + dy*dy;
      let radius = 100;
      let radiusSq = radius * radius;
      let corner = 0;

      if(dSq < radiusSq) {
        let factor = 1 - sqrt(dSq)/radius;
        corner = size/2;
        let angle = atan2(dy, dx);
        let push = factor * 20;
        x += cos(angle) * push;
        y += sin(angle) * push;
      }

      rect(x, y, size, size, corner);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateScaleAndOffset();
}

function calculateScaleAndOffset() {
  scl = min(width / w, height / h);
  offsetX = (width - w * scl) / 2;
  offsetY = (height - h * scl) / 2;
}
