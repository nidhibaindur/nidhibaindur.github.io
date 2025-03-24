document.addEventListener("DOMContentLoaded", () => {
    const dino = document.getElementById("dino");
    const obstacle = document.getElementById("obstacle");
    const gameContainer = document.getElementById("game-container");
    let isJumping = false;
    let gameOver = false;
    let gameActive = false;  // Track if game window is active

    // Listen for click on game container to activate the game
    gameContainer.addEventListener("click", () => {
        gameActive = true;
    });

    // Jumping Logic
    function jump() {
        if (!isJumping && !gameOver && gameActive) {
            isJumping = true;
            dino.classList.add("dino-jumping");

            setTimeout(() => {
                dino.classList.remove("dino-jumping");
                isJumping = false;
            }, 600);  // Duration of jump animation
        }
    }

    // Listen for spacebar to jump only when the game is active
    document.addEventListener("keydown", (e) => {
        if (e.code === "Space" && gameActive) {  // Trigger jump only if game is active
            e.preventDefault();  // Prevent the default behavior (e.g., scrolling in terminal)
            jump();
        }
    });

    // Listen for up arrow key to jump only when the game is active
    document.addEventListener("keydown", (e) => {
        if (e.code === "ArrowUp" && gameActive) {  // Trigger jump only if game is active
            e.preventDefault();  // Prevent the default behavior (e.g., scrolling in terminal)
            jump();
        }
    });

    // Check collision with obstacle
    function checkCollision() {
        const dinoRect = dino.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        // Only check collision if the obstacle is in range of the dino
        if (obstacleRect.right > 0 && obstacleRect.left < dinoRect.right) {
            // Dino and obstacle overlap on the x-axis
            if (dinoRect.bottom > obstacleRect.top - 10 && !isJumping) {
                gameOver = true;
                resetGame();
            }
        }
    }

    // Reset the game
    function resetGame() {
        obstacle.style.animation = 'none';
        obstacle.offsetHeight; // trigger reflow to reset the animation
        obstacle.style.animation = 'moveObstacle 2s linear infinite';
        gameOver = false; // Allow to play again
    }

    // Check collision periodically
    setInterval(checkCollision, 10);
});
