let circles = [];
let shapes = [];
let basePoints = [[-3, 5], [3, 7], [1, 5], [2, 4], [4, 3], [5, 2], [6, 2], [8, 4], [8, -1], [6, 0], [0, -3], [2, -6], [-2, -3], [-4, -2], [-5, -1], [-6, 1], [-6, 2]];
let song;
let fft;

function preload() {
  song = loadSound('midnight-quirk-255361.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  song.play();
  fft = new p5.FFT();
  
  // 初始化圓形的屬性
  for (let i = 0; i < 20; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(10, 40), // 縮小圓形大小
      xSpeed: random(-2, 2),
      ySpeed: random(-2, 2)
    });
  }
  
  // 初始化圖案的屬性
  for (let i = 0; i < 10; i++) {
    let randomPoints = basePoints.map(point => [point[0] + random(-2, 2), point[1] + random(-2, 2)]);
    shapes.push({
      x: random(width),
      y: random(height),
      xSpeed: random(-2, 2),
      ySpeed: random(-2, 2),
      points: randomPoints
    });
  }
}

function draw() {
  background("#afc1d6");
  
  // 取得音樂頻譜數據
  let spectrum = fft.analyze();
  let bass = fft.getEnergy("bass");
  let treble = fft.getEnergy("treble");
  
  // 設定圓形的顏色和框線
  fill("#f9c5d1");
  stroke(0);
  strokeWeight(1); // 縮小框線粗細
  
  // 更新並畫出每個圓形
  for (let circle of circles) {
    circle.x += circle.xSpeed;
    circle.y += circle.ySpeed;
    
    // 確保圓形在視窗內反彈
    if (circle.x < 0 || circle.x > width) circle.xSpeed *= -1;
    if (circle.y < 0 || circle.y > height) circle.ySpeed *= -1;
    
    let size = circle.size + bass / 10; // 根據音樂震幅調整大小
    ellipse(circle.x, circle.y, size, size);
  }
  
  // 更新並畫出每個圖案
  for (let shape of shapes) {
    shape.x += shape.xSpeed;
    shape.y += shape.ySpeed;
    
    // 確保圖案在視窗內反彈
    if (shape.x < 0 || shape.x > width) shape.xSpeed *= -1;
    if (shape.y < 0 || shape.y > height) shape.ySpeed *= -1;
    
    // 畫出座標點之間的連線並填滿顏色
    fill("#ffff99"); // 淺黃色填滿
    stroke(0);
    strokeWeight(1); // 縮小連線粗細
    beginShape();
    for (let i = 0; i < shape.points.length; i++) {
      let x = map(shape.points[i][0], -10, 10, shape.x, shape.x + width / 5 + treble / 10); // 根據音樂震幅調整範圍
      let y = map(shape.points[i][1], -10, 10, shape.y, shape.y - height / 5 + treble / 10); // 根據音樂震幅調整範圍
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}






