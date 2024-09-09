document.addEventListener('DOMContentLoaded', () => {
  const dino = document.getElementById('dino');
  const cactus = document.getElementById('cactus');
  const squareObstacle = document.getElementById('squareObstacle');
  const scoreDisplay = document.getElementById('score');
  const message = document.getElementById('message');
  let score = 0;

  let isJumping = false;
  let dinoBottom = 0;
  let gravity = 0.9;
  let jumpHeight = 50;
  let cactusLeft = 600;
  let cactusSpeed = 4;
  let squareTop = 200;
  let squareSpeed = 4;
  let dinoLeft = 50;

  function jump() {
    if (!isJumping) {
      isJumping = true;
      dino.classList.add('jump');

      let jumpTimeout = setTimeout(() => {
        if (dinoBottom < jumpHeight) {
          dinoBottom += jumpHeight;
          dino.style.bottom = dinoBottom + 'px';
          jumpTimeout = setTimeout(jumpTimeout, 20); 
        } else {
          dinoBottom -= gravity;
          dino.style.bottom = dinoBottom + 'px';
          if (dinoBottom <= 0) {
            clearTimeout(jumpTimeout);
            dino.classList.remove('jump');
            isJumping = false;
            dino.style.bottom = '0px';
          } else {
            jumpTimeout = setTimeout(jumpTimeout, 20);
          }
        }
      }, 20);
    }
  }

  function handleCactus() {
    cactusLeft -= cactusSpeed;
    cactus.style.left = cactusLeft + 'px';

    if (cactusLeft < -60) {
      cactusLeft = 600;
      cactus.style.left = cactusLeft + 'px';
    }

    dino.style.left = dinoLeft + 'px';

    let dinoRect = dino.getBoundingClientRect();
    let cactusRect = cactus.getBoundingClientRect();
    if (dinoRect.right >= cactusRect.left &&
        dinoRect.left <= cactusRect.right &&
        dinoRect.bottom >= cactusRect.top &&
        dinoRect.top <= cactusRect.bottom) {
      gameOver();
    }
  }

  function handleSquareObstacle() {
    squareTop -= squareSpeed;
    squareObstacle.style.top = squareTop + 'px';

    if (squareTop < -60) {
      squareTop = 200;
      squareObstacle.style.top = squareTop + 'px';
    }

    let dinoRect = dino.getBoundingClientRect();
    let squareRect = squareObstacle.getBoundingClientRect();
    if (dinoRect.right >= squareRect.left &&
        dinoRect.left <= squareRect.right &&
        dinoRect.bottom >= squareRect.top &&
        dinoRect.top <= squareRect.bottom) {
      gameOver();
    }
  }

  function gameOver() {
    clearInterval(cactusInterval);
    clearInterval(squareInterval);
    message.textContent = 'Game Over! Your score: ' + score;
    message.style.display = 'block';
  }

  let cactusInterval = setInterval(handleCactus, 20);
  let squareInterval = setInterval(handleSquareObstacle, 20);

  document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
      jump();
    }
  });

  function increaseScore() {
    score++;
    scoreDisplay.textContent = score;
  }

  setInterval(increaseScore, 2000);
});
