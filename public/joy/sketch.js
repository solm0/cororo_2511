let song, fft;
let numPoints = 50;
let points = [];
let threshold = 40;

function preload() {
  song = loadSound('joy.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  fft = new p5.FFT();
  song.loop();
  colorMode(RGB); // WEBGL에서 RGB 방식 사용

  for (let i = 0; i < numPoints; i++) {
    points.push({
      pos: createVector(random(-100, 100), random(-100, 100), random(-100, 100)),
      origin: createVector(0, 0, 0), // 나중에 초기 위치 복원용
    });
    points[i].origin = points[i].pos.copy();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  fft.analyze();
  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");

  background(0);

  // ------------------ 카메라 ------------------
  let normBass = bass / 255;
  let boosted = pow(normBass, 1);
  let camZ = map(boosted, 0, 1, 300, 100);
  camera(0, 0, camZ, 0, 0, 0, 0, 1, 0);

  push();
  for (let i = 0; i < points.length; i++) {
    let p = points[i];

    let spread = sin(frameCount * 0.02 + i) * bass * 0.1;
    let timeWaveX = sin(frameCount * 0.05 + i * 0.3) * 5;
    let timeWaveY = cos(frameCount * 0.05 + i * 0.5) * 5;

    let offsetX = sin(frameCount * 0.01 + i) * bass * 0.2 + spread + timeWaveX;
    let offsetY = cos(frameCount * 0.01 + i) * mid * 0.2 + spread + timeWaveY;
    let offsetZ = sin(frameCount * 0.01 + i * 1.3) * treble * 0.5 + spread;

    let px = p.pos.x + offsetX;
    let py = p.pos.y + offsetY;
    let pz = p.pos.z + offsetZ;

    // ------------------ 마우스 반응 ------------------
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let d = dist(mx, my, px, py);
    if (d < 80) {
      let angle = atan2(py - my, px - mx);
      px += cos(angle) * (100 - d) * 1;
      py += sin(angle) * (100 - d) * 1;
    } else {
      // 원래 위치로 자연 복귀
      px = lerp(px, p.origin.x, 0.02);
      py = lerp(py, p.origin.y, 0.02);
    }

    push();
    translate(px, py, pz);
    noFill();

    // ------------------ RGB 색상 적용 ------------------
    let brightnessColor = map(bass, 0, 255, 255, 180); 
    let r = map(treble, 0, 255, brightnessColor, 0);
    let g = map(treble, 0, 255, brightnessColor, 100);
    let b = map(treble, 0, 255, brightnessColor, 255);
    stroke(r, g, b);
    strokeWeight(0.2);
    torus(3, 3 + bass * 0.05);

    pop();

    // ------------------ 연결선 ------------------
    for (let j = i + 1; j < points.length; j++) {
      let p2 = points[j];
      let offsetX2 = sin(frameCount * 0.01 + j) * bass * 0.2 + spread + timeWaveX;
      let offsetY2 = cos(frameCount * 0.01 + j) * mid * 0.2 + spread + timeWaveY;
      let offsetZ2 = sin(frameCount * 0.01 + j * 1.3) * treble * 0.5 + spread;

      let px2 = p2.pos.x + offsetX2;
      let py2 = p2.pos.y + offsetY2;
      let pz2 = p2.pos.z + offsetZ2;

      let d2 = dist(px, py, pz, px2, py2, pz2);
      if (d2 < threshold) {
        stroke(255); // 연결선은 흰색으로 고정
        strokeWeight(0.1);
        line(px, py, pz, px2, py2, pz2);
      }
    }
  }
  pop();
}
