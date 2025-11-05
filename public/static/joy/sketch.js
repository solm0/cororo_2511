let song, fft;
let numPoints = 60;
let points = [];
let threshold = 80;

let started = false;
let transition = false;
let hover = false;
let spherePoints = []; // 분해 애니메이션용 점들
let sphereSize = 60;
let sphereTargetSize = 60;
let clickSpheres = []; // 클릭으로 만든 구체들

function preload() {
  song = loadSound('joy.mp3');
}

function setup() {
  let cnv = createCanvas(windowWidth, windowHeight, WEBGL);
  cnv.parent("sketch-holder"); // ✅ 캔버스를 .content 영역에 넣는 핵심 코드
  fft = new p5.FFT();
  colorMode(RGB);

  for (let i = 0; i < numPoints; i++) {
    points.push({
      pos: createVector(random(-100, 100), random(-100, 100), random(-100, 100)),
      origin: createVector(0, 0, 0),
      size: random(2, 10),
    });
    points[i].origin = points[i].pos.copy();
  }

  // 시작 구체 점들
  let detail = 30;
  for (let i = 0; i < detail; i++) {
    let theta = random(TWO_PI);
    let phi = random(PI);
    let r = 60;
    spherePoints.push({
      pos: createVector(
        r * sin(phi) * cos(theta),
        r * sin(phi) * sin(theta),
        r * cos(phi)
      ),
      vel: p5.Vector.random3D().mult(random(1, 3)),
    });
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0, 0);

  fft.analyze();
  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");

  // 배경 빛 효과
  let glowSize = map(bass, 0, 255, width * 0.5, width * 1.5);
  let glowColorR = map(treble, 0, 255, 100, 180);
  let glowColorG = map(mid, 0, 255, 120, 210);
  let glowColorB = map(bass, 0, 255, 200, 255);

  push();
  noStroke();
  translate(0, 0, -500);
  for (let i = 0; i < 6; i++) {
    let alpha = map(i, 0, 6, 150, 0);
    let size = glowSize + i * 300;
    fill(glowColorR, glowColorG, glowColorB, alpha);
    ellipse(0, 0, size);
  }
  pop();

  // ------------------ 시작 구체 ------------------
  if (!started && !transition) {
    push();
    noFill();
    let baseColor = color(180, 210, 255);
    stroke(baseColor);
    strokeWeight(1.5);

    let d = dist(mouseX - width / 2, mouseY - height / 2, 0, 0);
    hover = d < 100;

    rotateY(frameCount * 0.01);
    rotateX(frameCount * 0.008);

    if (hover) {
      rotateY(frameCount * 0.02);
      rotateX(frameCount * 0.015);
      sphereTargetSize = 300;
    } else {
      sphereTargetSize = 60;
    }
    sphereSize = lerp(sphereSize || 60, sphereTargetSize, 0.1);

    sphere(sphereSize);
    pop();

    push();
    translate(0, 150, 0);
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(32);
    text('Click to Start', 0, 0);
    pop();
    return;
  }

  // ------------------ 분해 애니메이션 ------------------
  if (transition && !started) {
    push();
    noFill();
    stroke(180, 210, 255);
    strokeWeight(1);
    for (let s of spherePoints) {
      point(s.pos.x, s.pos.y, s.pos.z);
      s.pos.add(s.vel);
      s.vel.mult(1.05);
    }
    pop();

    if (spherePoints[0].pos.mag() > 600) {
      started = true;
      transition = false;

      setTimeout(() => {
        song.stop();
        song.setVolume(0);
        song.loop();

        let vol = 0;
        let fadeIn = setInterval(() => {
          vol += 0.02;
          song.setVolume(vol);
          if (vol >= 1) {
            song.setVolume(1);
            clearInterval(fadeIn);
          }
        }, 100);
      }, 2000);
    }
    return;
  }

  // ------------------ 본 시각화 ------------------

  let bgR = map(bass, 0, 255, 0, 50);
  let bgG = map(mid, 0, 255, 0, 30);
  let bgB = map(treble, 0, 255, 20, 60);

  push();
  noStroke();
  fill(bgR, bgG, bgB, 100);
  plane(width * 2, height * 2);
  pop();

  camera(0, 0, 150);

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

    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let d = dist(mx, my, px, py);
    if (d < 40) {
      let angle = atan2(py - my, px - mx);
      px += cos(angle) * (50 - d);
      py += sin(angle) * (50 - d);
      stroke(255, 0, 0);
      strokeWeight(0.4);
    } else {
      px = lerp(px, p.origin.x, 0.02);
      py = lerp(py, p.origin.y, 0.02);
      let brightnessColor = map(bass, 0, 255, 255, 180);
      let r = map(treble, 0, 255, brightnessColor, 0);
      let g = map(treble, 0, 255, brightnessColor, 100);
      let b = map(treble, 0, 255, brightnessColor, 255);
      stroke(r, g, b);
      strokeWeight(0.2);
    }

    push();
    translate(px, py);
    noFill();

    let brightnessColor = map(bass, 0, 255, 255, 180);
    let r = map(treble, 0, 25, brightnessColor, 0);
    let g = map(treble, 0, 255, brightnessColor, 100);
    let b = map(treble, 0, 255, brightnessColor, 255);
    stroke(r, g, b);
    strokeWeight(0.2);
    let smoothBass = lerp(0, bass, 0.1);
    sphere(p.size + smoothBass * 0.05);
    pop();
  }

  // 🔵 클릭으로 생성된 구체들 표시 + 공통 기능
  for (let s of clickSpheres) {
    push();

    // 천천히 회전
    s.angle = (s.angle || random(TWO_PI)) + (s.rotationSpeed || 0.01);
    let rx = cos(s.angle) * 0.5;
    let ry = sin(s.angle) * 0.5;
    s.pos.x += rx;
    s.pos.y += ry;
    // 🔵 마우스 피하기 + 색 반응
let mx = mouseX - width / 2;
let my = mouseY - height / 2;
let d = dist(mx, my, s.pos.x, s.pos.y);
let avoiding = false;

if (d < 40) {
  let angle = atan2(s.pos.y - my, s.pos.x - mx);
  s.pos.x += cos(angle) * 5;
  s.pos.y += sin(angle) * 5;
  avoiding = true;
}

// hover 부드럽게 커지기
let targetSize = (d < 80) ? s.baseSize * 1.3 : s.baseSize;
s.size = lerp(s.size, targetSize, 0.08);

translate(s.pos.x, s.pos.y, s.pos.z);
noFill();

let r, g, b;
if (avoiding) {
  // 🚨 회피 중일 때 완전 빨강
  r = 255;
  g = 0;
  b = 0;
} else {
  // 평상시에는 음악 반응형 색상
  let brightnessColor = map(bass, 0, 255, 255, 180);
  r = map(treble, 0, 255, brightnessColor, 0);
  g = map(treble, 0, 255, brightnessColor, 100);
  b = map(treble, 0, 255, brightnessColor, 255);
}

stroke(r, g, b);
strokeWeight(0.4);

let pulse = sin(frameCount * 0.05 + s.offset) * 2;
sphere(s.size + bass * 0.03 + pulse);

    pop();
  }

  pop();
}

function mousePressed() {
  if (!started && hover) {
    transition = true;
  } else if (started) {
    let x = mouseX - width / 2;
    let y = mouseY - height / 2;

    clickSpheres.push({
      pos: createVector(x, y, 0),
      baseSize: random(8, 25),
      size: random(1, 10),
      offset: random(TWO_PI),
      angle: random(TWO_PI),
      rotationSpeed: random(0.005, 0.02),
    });
  }
}
