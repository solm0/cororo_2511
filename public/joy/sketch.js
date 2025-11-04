let song, fft;
let numPoints = 100;
let points = [];
let threshold = 80;
let started = false; // 시작 여부 체크

function preload() {
  song = loadSound('joy.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  fft = new p5.FFT();
  colorMode(RGB);

  for (let i = 0; i < numPoints; i++) {
    points.push({
      pos: createVector(random(-100, 100), random(-100, 100), random(-100, 100)),
      origin: createVector(0, 0, 0),
    });
    points[i].origin = points[i].pos.copy();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  if (!started) {
    push();
    noFill();
    stroke(255);
    strokeWeight(2);

    // 마우스 호버 계산
    let d = dist(mouseX, mouseY, width / 2, height / 2);
    let hover = d < 100; // 마우스가 sphere 근처에 있으면

    // 회전 및 크기 변화
    let sphereSize = 50;
    if (hover) {
        sphereSize = 50 + sin(frameCount * 0.1) * 20; // 커졌다 작아졌다
        rotateY(frameCount * 0.02); // 회전
        rotateX(frameCount * 0.02);
    }

    sphere(sphereSize);
    pop();

    push();
    translate(0, 100, 0);
    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(32);
    text('Click to Start', 0, 0);
    pop();


  } else {
    // -------------- 그래픽 화면 --------------
    fft.analyze();
    let bass = fft.getEnergy("bass");
    let mid = fft.getEnergy("mid");
    let treble = fft.getEnergy("treble");

    // 음악 반응 배경 + 패턴
    let bgR = map(bass, 0, 255, 0, 50);
    let bgG = map(mid, 0, 255, 0, 30);
    let bgB = map(treble, 0, 255, 20, 60);

    push();
    noStroke();
    fill(bgR, bgG, bgB, 50); // 잔상
    plane(width*2, height*2);

    // 간단한 점 패턴
    let spacing = 40;
    stroke(100, 150, 255, 80);
    strokeWeight(1);
    for (let x = -width; x < width; x += spacing) {
      for (let y = -height; y < height; y += spacing) {
        let offset = sin(frameCount * 0.05 + x*0.01 + y*0.01) * 5;
        point(x + offset, y + offset);
      }
    }
    pop();

    // 카메라
    camera(0, 0, 150);

    // 기존 particle & sphere 코드
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
      if (d < 50) {
        let angle = atan2(py - my, px - mx);
        px += cos(angle) * (100 - d);
        py += sin(angle) * (100 - d);
      } else {
        px = lerp(px, p.origin.x, 0.02);
        py = lerp(py, p.origin.y, 0.02);
      }

      push();
      translate(px, py, pz);
      noFill();

      let brightnessColor = map(bass, 0, 255, 255, 180); 
      let r = map(treble, 0, 255, brightnessColor, 0);
      let g = map(treble, 0, 255, brightnessColor, 100);
      let b = map(treble, 0, 255, brightnessColor, 255);
      stroke(r, g, b);
      strokeWeight(0.2);
      sphere(3 + bass * 0.05);
      pop();
    }
    pop();
  }
}

// 마우스 클릭 시 시작
function mousePressed() {
  if (!started) {
    started = true;
    song.loop();
  }
}
