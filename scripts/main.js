function luxrayHandler() {
  let luxray = document.getElementById("luxray");
  let food = document.getElementById("food");
  let heart = document.getElementById("heart");
  let dropBtn = document.getElementById("dropBtn");
  let sidebar = document.querySelector(".sidebar");
  dropBtn.addEventListener("click", dropFood);

  let movementInterval;
  let jumpingInterval;

  startMoving(50, 25);
  startJumping();

  function dropFood() {
    if (foodExists()) {
      return;
    }

    clearInterval(movementInterval);
    clearInterval(jumpingInterval);
    luxray.dataset.isMoving = false;

    let foodPos =
      window.innerHeight -
      dropBtn.getBoundingClientRect().y -
      dropBtn.offsetHeight;
    food.style.bottom = `${foodPos}px`;
    food.style.left = `${
      Math.random() * (sidebar.offsetWidth - 110 - 40) + 40
    }px`;
    food.style.display = "block";
    console.log();
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
    goToFoodInterval = setInterval(() => {
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
    if (foodExists() || luxray.dataset.isMoving == "true") {
      return;
    }
    luxray.dataset.isMoving = true;
    let luxDirection = Math.random() > 0.5 ? "left" : "right";
    if (luxDirection === "left") {
      luxray.style.transform = "scaleX(1)";
    } else {
      luxray.style.transform = "scaleX(-1)";
    }

    movementInterval = setInterval(async () => {
      if (parsePx(luxray.style.left) >= sidebar.offsetWidth - 80) {
        luxDirection = "left";
        luxray.style.transform = "scaleX(1)";
      } else if (parsePx(luxray.style.left) <= 10) {
        luxDirection = "right";
        luxray.style.transform = "scaleX(-1)";
      }

      let newPos = currentPos;
      if (luxray.style.left) {
        newPos =
          luxDirection === "right"
            ? parsePx(luxray.style.left) + 2
            : parsePx(luxray.style.left) - 2;
      }
      luxray.style.left = `${newPos}px`;

      if (Math.random() * 100 < 2) {
        clearInterval(movementInterval);
        luxray.dataset.isMoving = false;
        wait();
      }
    }, speed);
  }

  function parsePx(num) {
    return parseInt(num.split("px")[0]);
  }

  function wait() {
    let currentPos = parseInt(luxray.style.left.split("px")[0]);
    let speeds = [10, 25, 40];
    let speed = speeds[Math.floor(Math.random() * speeds.length)];
    if (luxray.dataset.isJumping == "true") {
      startMoving(currentPos, speed);
      return;
    }
    clearInterval(movementInterval);
    luxray.dataset.isMoving = false;
    setTimeout(() => {
      startMoving(currentPos, speed);
    }, 2000);
  }

  function startJumping() {
    jumpingInterval = setInterval(() => {
      if (Math.random() * 10 > 6) {
        jump();
      }
    }, 2000);
  }

  function jump() {
    if (luxray.dataset.isJumping == "true") {
      return;
    }
    luxray.dataset.isJumping = "true";
    let height = 0;
    let dir = "up";
    let jumpInterval = setInterval(() => {
      if (height > 25) {
        dir = "down";
      } else if (height == 0 && dir === "down") {
        clearInterval(jumpInterval);
        luxray.dataset.isJumping = "false";
        if (Math.random() * 10 > 7) {
          setTimeout(jump, 20);
        }
      }
      luxray.style.bottom = `${height}px`;
      height = dir === "up" ? height + 2 : height - 2;
    }, 15);
  }

  function foodExists() {
    return food.style.display && food.style.display != "none";
  }
}

function navHandler() {
  let navButton = document.getElementById("enableNav");
  let luxray = document.getElementById("luxray");

  window.onresize = () => {
    if (window.innerWidth > 699) {
      document.querySelector(".sidebar").style.display = "block";
      luxray.style.left = "50px";
    } else {
      document.querySelector(".sidebar").style.display = "none";
      luxray.style.left = "250px";
    }
  };

  navButton.addEventListener("click", () => {
    if (document.querySelector(".sidebar").style.display === "none") {
      document.querySelector(".sidebar").style.display = "block";
    } else {
      document.querySelector(".sidebar").style.display = "none";
    }
  });

  function scrollTo(div) {
    let y = div.getBoundingClientRect().top + window.scrollY;
    window.scroll(0, y);
  }

  let sidebarButtons = document.querySelectorAll(".nav_button");
  for (let btn of sidebarButtons) {
    let destination = document.querySelector(`.${btn.innerHTML.toLowerCase()}`);
    if (btn.innerHTML === "Home") {
      destination = document.querySelector("body");
    }
    btn.onclick = () => {
      scrollTo(destination);
      if (window.innerWidth < 699) {
        document.querySelector(".sidebar").style.display = "none";
      }
    };
  }

  let resume = document.querySelector(".resume");
  resume.onclick = () => {
    var link = document.createElement("a");
    link.setAttribute("download", "Resume_BrandonKinnick.docx");
    link.href = "Resume_BrandonKinnick.docx";
    document.body.appendChild(link);
    link.click();
    link.remove();
  };
}

function main() {
  luxrayHandler();
  navHandler();
}

main();
