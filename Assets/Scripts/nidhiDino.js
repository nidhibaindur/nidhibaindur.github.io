// Get canvas and context
const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

// Load images
const dinoImg = new Image();
dinoImg.src = "Assets/Images/nidhiDinoImage.png";

const cactusImg = new Image();
cactusImg.src = "Assets/Images/cactus.png";

// See boundaries 

let showXray = false;
const xrayButton = document.getElementById("toggleXray");

xrayButton.addEventListener("click", () => {
  showXray = !showXray;
});

// Game variables
let gameOver = false;
let score = 0;

const dino = {
  x: 50,
  y: 150,
  width: 88,
  height: 100,
  vy: 0,
  gravity: 2,
  jumpPower: -38,
  onGround: true,
};

const cactus = {
  x: canvas.width,
  y: 100,
  width: 100,
  height: 150,
  speed: 8,
};

function jump() {
  if (dino.onGround && !gameOver) {
    dino.vy = dino.jumpPower;
    dino.onGround = false;
  }
}

function update() {
  if (gameOver) return;

  dino.vy += dino.gravity;
  dino.y += dino.vy;

  if (dino.y >= 150) {
    dino.y = 150;
    dino.vy = 0;
    dino.onGround = true;
  }

  cactus.x -= cactus.speed;
  if (cactus.x + cactus.width < 0) {
    cactus.x = canvas.width + Math.random() * 200;
    score++;
  }

  // Collision detection with better accuracy
//   const dinoBottom = dino.y + dino.height;
//   const cactusBottom = cactus.y + cactus.height;

//   if (
//     dino.x < cactus.x + cactus.width &&
//     dino.x + dino.width > cactus.x &&
//     dinoBottom > cactus.y + 20 // Add a buffer to avoid false positives
//   ) {
//     gameOver = true;
//     showGameOverMessage();
//   }
// }

const dinoPadding = 10;    // Shrink Dino box by 10px on each side
const cactusPadding = 5;   // Shrink Cactus box slightly

const dinoBox = {
  x: dino.x + dinoPadding,
  y: dino.y + dinoPadding,
  width: dino.width - dinoPadding * 2,
  height: dino.height - dinoPadding * 2,
};

const cactusBox = {
  x: cactus.x + cactusPadding,
  y: cactus.y + cactusPadding,
  width: cactus.width - cactusPadding * 2,
  height: cactus.height - cactusPadding * 2,
};

const isColliding =
  dinoBox.x < cactusBox.x + cactusBox.width &&
  dinoBox.x + dinoBox.width > cactusBox.x &&
  dinoBox.y < cactusBox.y + cactusBox.height &&
  dinoBox.y + dinoBox.height > cactusBox.y;

if (isColliding) {
  gameOver = true;
  showGameOverMessage();
}
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);
  ctx.drawImage(cactusImg, cactus.x, cactus.y, cactus.width, cactus.height);

if (showXray) {
  ctx.strokeStyle = "red";
  ctx.lineWidth = 2;
  ctx.strokeRect(dino.x, dino.y, dino.width, dino.height);
  ctx.strokeStyle = "blue";
  ctx.strokeRect(cactus.x, cactus.y, cactus.width, cactus.height);
  }

  ctx.fillStyle = "#000";
  ctx.font = "20px monospace";
  ctx.fillText("Score: " + score, 20, 30);


  if (gameOver) {
    ctx.fillStyle = "#ff4444";
    ctx.font = "30px sans-serif";
    ctx.fillText("womp womp", canvas.width / 2 - 80, canvas.height / 2);
    ctx.fillStyle = "#0071e3";
    ctx.fillRect(canvas.width / 2 - 60, canvas.height / 2 + 30, 120, 40);
    ctx.fillStyle = "#fff";
    ctx.font = "20px sans-serif";
    ctx.fillText("Try Again", canvas.width / 2 - 40, canvas.height / 2 + 55);
  }
}

function showGameOverMessage() {
  document.removeEventListener("keydown", spaceHandler);
  canvas.addEventListener("click", resetGame);
}

function resetGame(e) {
  const clickX = e.offsetX;
  const clickY = e.offsetY;

  const btnX = canvas.width / 2 - 60;
  const btnY = canvas.height / 2 + 30;
  const btnW = 120;
  const btnH = 40;

  if (
    clickX >= btnX &&
    clickX <= btnX + btnW &&
    clickY >= btnY &&
    clickY <= btnY + btnH
  ) {
    // Reset all game states
    dino.y = 150;
    dino.vy = 0;
    dino.onGround = true;
    cactus.x = canvas.width;
    score = 0;
    gameOver = false;
    canvas.removeEventListener("click", resetGame);
    document.addEventListener("keydown", spaceHandler);
  }
}

function spaceHandler(e) {
  if (e.code === "Space") {
    e.preventDefault();
    jump();
  }
}

document.addEventListener("keydown", spaceHandler);

dinoImg.onload = () => {
  requestAnimationFrame(gameLoop);
};

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}