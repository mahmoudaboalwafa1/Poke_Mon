let randomGrass = 50;
let grass = "grass";
let ball = "ball";
let player = document.getElementsByClassName("player")[0];
let randomBalls = 5;
const sound = new Audio("./static/coin.mp3");

console.log(player);

const playerMove = {
  x: 0,
  y: 0,
};

const playerCenter = {
  x: window.innerWidth / 2,
  y: window.innerWidth / 5,
};

let x = playerCenter.x;
let y = playerCenter.y;

function start() {
  elements(grass, randomGrass);
  elements(ball, randomBalls);
  Object.assign(playerMove, playerCenter);

  moving();
}

function elements(className, elementCount) {
  for (let i = 0; i < elementCount; i++) {
    let grass = document.createElement("img");
    grass.src = `./static/${className}.png`;
    grass.classList.add(className);
    document.body.appendChild(grass);

    grass.style.left = Math.floor(Math.random() * 100) + "%";
    grass.style.top = Math.floor(Math.random() * 100) + "%";
  }
}

// moving
function moving() {
  document.onkeydown = (e) => {
    player.style.left = playerMove.x + "px";
    player.style.top = playerMove.y + "px";

    playerMove.x = x;
    playerMove.y = y;
    if (e.key == "ArrowUp") {
      y -= 5;
      player.style.backgroundImage = `url("./static/player_front.png")`;
      player.classList.add("walk");
    }
    if (e.key == "ArrowLeft") {
      player.classList.add("walk");
      player.style.backgroundImage = `url("./static/player_left.png")`;
      x -= 5;
    } else {
      if (e.key == "ArrowRight") {
        player.classList.add("walk");
        player.style.backgroundImage = `url("./static/player_right.png")`;
        x += 5;
      } else {
        player.classList.remove("walk");
      }
      if (e.key == "ArrowDown") {
        player.style.backgroundImage = `url("./static/player_back.png")`;
        y += 5;
      }

      let playerRect = player.getBoundingClientRect();
      console.log(playerRect);
      let ballRect = document.querySelectorAll(".ball");
      ballRect.forEach((ball) => {
        ball.getBoundingClientRect();
        if (
          playerRect.x < ball.x + ball.width &&
          playerRect.x + playerRect.width > ball.x &&
          playerRect.y < ball.y + ball.height &&
          playerRect.height + playerRect.y > ball.y
        ) {
          ball.remove();
          let bal = document.createElement("img");
          document.body.appendChild(bal);
          bal.className = "ball";
          bal.src = `./static/ball.png`;
          bal.style.cssText = `left: ${Math.floor(
            Math.random() * 100
          )}%; top: ${Math.floor(Math.random)}`;
          sound.play();
        }
      });

      // Check for collision between player and ball
    }
  };
  document.onkeyup = (e) => {
    player.classList.remove("walk");
  };
}
start();
