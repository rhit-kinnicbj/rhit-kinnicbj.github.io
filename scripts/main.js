function luxrayHandler() {
  let luxray = document.getElementById("luxray");
  let food = document.getElementById("food");
  let heart = document.getElementById("heart");
  document.querySelector(".btn").addEventListener("click", dropFood);
  let movementInterval;
  let jumpInterval;

  startMoving(50, 25);
  startJumping();

  function dropFood() {
    if (foodExists()) {
      return;
    }
    clearInterval(movementInterval);
    clearInterval(jumpInterval);
    food.style.left = `${Math.random() * (125 - 40) + 40}px`;
    food.style.bottom = "150px";
    food.style.display = "block";
    let foodPos = 150;
    let dropInterval = setInterval(() => {
      if (foodPos > 0) {
        food.style.bottom = `${foodPos}px`;
        foodPos -= 2;
      } else {
        clearInterval(dropInterval);
        eatFood();
      }
    }, 15);
  }

  function eatFood() {
    let foodPos = parseInt(food.style.left.split("px")[0]);
    let luxPos = parseInt(luxray.style.left.split("px")[0]);
    let travelDir = -1;
    let desiredLuxPos = foodPos + (foodPos > luxPos ? -10 : 15);
    if (desiredLuxPos > luxPos) {
      travelDir = 1;
      luxray.style.transform = "scaleX(-1)";
    } else {
      luxray.style.transform = "scaleX(1)";
    }
    console.log(
      "foodPos",
      foodPos,
      "desired",
      desiredLuxPos,
      "initial",
      luxPos
    );
    let goToFoodInterval = setInterval(() => {
      console.log(luxPos);
      if (luxPos === desiredLuxPos) {
        clearInterval(goToFoodInterval);
        heart.style.left = `${luxPos + (desiredLuxPos > luxPos ? 23 : 0)}px`;
        setTimeout(() => {
          food.style.display = "none";
          heart.style.display = "block";
          jump();
          setTimeout(() => {
            startMoving(luxPos, 25);
            startJumping();
            heart.style.display = "none";
          }, 1000);
        }, 500);
      }
      luxray.style.left = `${luxPos}px`;
      luxPos += travelDir;
    }, 10);
  }

  function startMoving(currentPos = 50, speed = 25) {
    if (foodExists()) {
      return;
    }
    let luxDirection = Math.random() > 0.5 ? "left" : "right";
    if (luxDirection === "left") {
      luxray.style.transform = "scaleX(1)";
    } else {
      luxray.style.transform = "scaleX(-1)";
    }
    let luxPos = currentPos;
    movementInterval = setInterval(async () => {
      if (luxPos >= 170) {
        luxDirection = "left";
        luxray.style.transform = "scaleX(1)";
      } else if (luxPos <= 10) {
        luxDirection = "right";
        luxray.style.transform = "scaleX(-1)";
      }
      luxray.style.left = `${luxPos}px`;
      luxPos = luxDirection === "right" ? luxPos + 2 : luxPos - 2;

      if (Math.random() * 100 < 2) {
        clearInterval(movementInterval);
        wait();
      }
    }, speed);
  }

  function wait() {
    let currentPos = parseInt(luxray.style.left.split("px")[0]);
    let speeds = [10, 25, 40];
    let speed = speeds[Math.floor(Math.random() * speeds.length)];
    if (isJumping()) {
      startMoving(currentPos, speed);
      return;
    }
    clearInterval(movementInterval);
    setTimeout(() => {
      startMoving(currentPos, speed);
    }, 2000);
  }

  function startJumping() {
    jumpInterval = setInterval(() => {
      if (Math.random() * 10 > 6) {
        jump();
      }
    }, 2500);
  }

  function jump() {
    if (isJumping()) {
      return;
    }
    let height = 0;
    let dir = "up";
    let jumpInterval = setInterval(() => {
      if (height > 25) {
        dir = "down";
      } else if (height == 0 && dir === "down") {
        clearInterval(jumpInterval);
      }
      luxray.style.bottom = `${height}px`;
      height = dir === "up" ? height + 2 : height - 2;
    }, 15);
    if (Math.random() * 10 > 5) {
      jump();
    }
  }

  function isJumping() {
    return luxray.style.bottom && luxray.style.bottom != "0px";
  }

  function foodExists() {
    return food.style.display && food.style.display != "none";
  }
}

function main() {
  luxrayHandler();
}

main();
