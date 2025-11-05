let song;
let bgImg;
let video;
let angleX = 0;
let angleY = 0;
let targetAngleX = 0;
let targetAngleY = 0;

// 스쿼글 라인 변수
let lineSpacing = 4;
let squiggleStrength = 3;
let lineWeight = 1;

// GUI 슬라이더
let lineSpacingSlider, squiggleSlider, weightSlider;
let layoutDiv, canvasParent, guiDiv;

// 2D 그래픽 버퍼
let lineCanvas;

function preload() {
  soundFormats('mp3', 'ogg');
  song = loadSound('sound1.mp3'); // 음악 파일
  bgImg = loadImage('alien_room.png'); // 이미지 파일
}

function setup() {
  // WEBGL 캔버스
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // 2D 그래픽 버퍼
  lineCanvas = createGraphics(width, height);
  lineCanvas.pixelDensity(1);

  // 웹캠
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  // 음악 재생 (브라우저 정책상 유저 클릭 필요할 수 있음)
  song.loop();

  // GUI 생성
  layoutDiv = createDiv().class('layout-container').style('position', 'absolute').style('top', '20px').style('right', '20px').style('color', '#fff');
  
  guiDiv = createDiv().parent(layoutDiv).class('gui-container');
  
  // 라인 간격
  createP('Line Spacing').parent(guiDiv);
  lineSpacingSlider = createSlider(1, 20, lineSpacing, 1).parent(guiDiv);
  
  // 스쿼글 강도
  createP('Squiggle Strength').parent(guiDiv);
  squiggleSlider = createSlider(0, 10, squiggleStrength, 0.1).parent(guiDiv);
  
  // 선 굵기
  createP('Line Thickness').parent(guiDiv);
  weightSlider = createSlider(0.5, 5, lineWeight, 0.1).parent(guiDiv);
}

function draw() {
  background(0);

  // 마우스 이동으로 이미지 회전
  targetAngleY = map(mouseX, 0, width, -PI / 24, PI / 24);
  targetAngleX = map(mouseY, 0, height, PI / 24, -PI / 24);
  angleX = lerp(angleX, targetAngleX, 0.05);
  angleY = lerp(angleY, targetAngleY, 0.05);

  // 스쿼글 라인 파라미터 업데이트
  lineSpacing = lineSpacingSlider.value();
  squiggleStrength = squiggleSlider.value();
  lineWeight = weightSlider.value();

  // 2D 스쿼글 라인 그리기
  drawSquiggles(lineCanvas);

  // WEBGL 씬
  push();

  // 포인트 입체감 효과
  push();
  translate(0, 0, -300);

  let numPoints = 500; // 포인트 수 증가
  for (let i = 0; i < numPoints; i++) {
  let t = frameCount * 0.02 + i;
  let x = sin(t * 0.7) * 400 + sin(t * 0.3) * 50;
  let y = cos(t * 0.5) * 300 + cos(t * 0.2) * 30;
  let z = sin(t * 0.3) * 200;

  // 색상 변화 (HSV 기반)
  let hue = (frameCount + i * 5) % 360;
  let col = color(`hsl(${hue}, 80%, 60%)`);
  stroke(col);
  strokeWeight(2);

  point(x, y, z);
  }
  pop();

  // 메인 이미지 회전
  push();
  rotateX(angleX);
  rotateY(angleY);
  texture(bgImg);
  plane(width * 0.8, height * 0.8);
  pop();

  // 웹캠 스쿼글 라인 텍스처
  push();
  translate(0, 0, 100); // 이미지 앞쪽
  texture(lineCanvas);
  plane(width, height);
  pop();

  pop();

  // 안내 문구
  push();
  resetMatrix();
  fill(255);
  textAlign(CENTER);
  textSize(16);
  text('Move your mouse to explore • Music auto-plays', 0, height / 2 - 40);
  pop();
}

function drawSquiggles(g) {
  g.clear();
  g.stroke(255);
  g.strokeWeight(lineWeight);

  video.loadPixels();
  const numLines = int(height / lineSpacing);

  for (let i = 0; i < numLines; i++) {
    const yBase = i * lineSpacing;
    g.beginShape();
    for (let x = 0; x <= width; x += 2) {
      const mirrorX = video.width - x - 1;
      const imgX = constrain(mirrorX, 0, video.width - 1);
      const imgY = constrain(yBase, 0, video.height - 1);

      const index = (imgY * video.width + imgX) * 4;
      const r = video.pixels[index];
      const g_ = video.pixels[index + 1];
      const b = video.pixels[index + 2];
      const bright = (r + g_ + b) / 3;

      let y = yBase + map(bright, 0, 255, -15, 15);

      let n = noise(x * 0.05, i * 0.1, frameCount * 0.05);
      let squiggle = map(n, 0, 1, -squiggleStrength, squiggleStrength);
      y += squiggle;

      g.vertex(x, y);
    }
    g.endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}