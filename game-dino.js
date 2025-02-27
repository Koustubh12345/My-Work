document.addEventListener("DOMContentLoaded", () => {
    const dino = document.querySelector(".dino");
    const cactus = document.querySelector(".kaktus");
    const startButton = document.querySelector("button");
    let isJumping = false;
    let gameRunning = false;

    // Function to make the dinosaur jump
    function jump() {
        if (isJumping) return;
        isJumping = true;

        let position = 0;
        let upInterval = setInterval(() => {
            if (position >= 150) {  // Jump height limit
                clearInterval(upInterval);
                let downInterval = setInterval(() => {
                    if (position <= 0) {
                        clearInterval(downInterval);
                        isJumping = false;
                    }
                    position -= 5;
                    dino.style.bottom = position + "px";
                }, 20);
            }
            position += 5;
            dino.style.bottom = position + "px";
        }, 20);
    }

    // Function to move the cactus
    function moveCactus() {
        let cactusPosition = 600; // Start position
        cactus.style.left = cactusPosition + "px";

        let cactusInterval = setInterval(() => {
            if (cactusPosition <= 0) {
                cactusPosition = 600; // Reset position
            }

            if (cactusPosition > 20 && cactusPosition < 50 && parseInt(dino.style.bottom) < 30) {
                clearInterval(cactusInterval);
                alert("Game Over! Try again.");
                gameRunning = false;
                startButton.style.display = "block"; // Show start button again
                return;
            }

            cactusPosition -= 5;
            cactus.style.left = cactusPosition + "px";
        }, 20);
    }

    // Start Game Function
    function startGame() {
        if (gameRunning) return;
        gameRunning = true;
        startButton.style.display = "none"; // Hide button
        moveCactus();
    }

    // Event Listeners
    startButton.addEventListener("click", startGame);
    document.addEventListener("keydown", (event) => {
        if (event.code === "Space") {
            jump();
        }
    });
});