document.addEventListener("DOMContentLoaded", () => {
  if (!sessionStorage.getItem("score")) {
    sessionStorage.setItem("score", 0);
  }
  const playerScore = document.querySelector("#player_score");
  playerScore.innerHTML = sessionStorage.getItem("score");

  let rules = gameRules();

  // get all elements whith attribute choise-name
  const choises = document.querySelectorAll("[choise-name]");
  // add event listener to each element
  choises.forEach((choise) => {
    choise.addEventListener("click", (e) => {
      e.target.classList.add("selected");
      // get choise name from element attribute
      const choiseName = e.target.getAttribute("choise-name");
      // call makeChoise function from game.js
      let [playerHtml, playerChois] = playerChoise(choiseName);
      // call computerChoise function from game.js
      let [computerHtml, computerChois] = computerChoise();
      const playeOneArea = document.querySelector("#player_one_area");
      const playerTwoArea = document.querySelector("#player_two_area");
      // add player choise to player two area
      playeOneArea.innerHTML = playerHtml;
      //   pick winner
      let winner = pickWinner(playerChois, computerChois, rules);
      setTimeout(() => {
        // add computer choise to player two area
        playerTwoArea.innerHTML = computerHtml;
      }, 500);

      setTimeout(() => {
        //   show result
        if (result(winner)) {
          // get result__button
          const result__button = document.querySelectorAll(".result__button");
          result__button.forEach((button) => {
            button.addEventListener("click", (e) => {
              window.location.reload();
            });
          });
        }
        // update score

        updateScore(winner);
        // add winner class to choise wrapper
        if (winner === "player") {
          playeOneArea.classList.add("winner");
          playerTwoArea.classList.add("loser");
        } else if (winner === "computer") {
          playeOneArea.classList.add("loser");
          playerTwoArea.classList.add("winner");
        } else {
          playeOneArea.classList.add("draw");
          playerTwoArea.classList.add("draw");
        }
      }, 1500);
    });
  });
});

function playerChoise(choiseName) {
  const stepOne = document.querySelector(".step-one");
  const gameWrapper = document.querySelector(".game-wrapper");
  stepOne.classList.add("step-one-hidden");
  gameWrapper.classList.add("game-wrapper_active");
  return [choise(choiseName), choiseName];
}

// random choise for computer
function computerChoise() {
  const choises = ["rock", "paper", "scissors", "lizard", "spock"];
  const randomChoise = choises[Math.floor(Math.random() * choises.length)];
  return [choise(randomChoise), randomChoise];
}

function choise(choiseName) {
  let html = `<div class="chois-wrapper ${choiseName} ">
                <img src="./images/icon-${choiseName}.svg" alt="${choiseName}"/>
            </div>`;
  return html;
}

// pick winner function
function pickWinner(playerChois, computerChois, rules) {
  // compare choises
  if (playerChois === computerChois) return "draw";
  if (rules[playerChois][computerChois]) return "player";
  return "computer";
}

function result(winner) {
  let resWrapper = document.querySelector(".sm");
  let resWrapper1 = document.querySelector(".md");
  let result = document.createElement("div");
  let result__title = document.createElement("h2");
  let result__button = document.createElement("button");
  result.classList.add("result");
  result.classList.add("result_active");
  result__title.classList.add("result__title");
  result__button.classList.add("result__button");
  result__button.innerHTML = "Play Again";

  if (winner === "player") {
    result__title.innerHTML = "You Win";
    winnerPlaySound();
    result.appendChild(playerWinVideo());
  } else if (winner === "computer") {
    result__title.innerHTML = "You Lose";
    loserPlaySound();
  } else {
    result__title.innerHTML = "Draw";
  }
  result.appendChild(result__title);
  result.appendChild(result__button);
  resWrapper.innerHTML = result.outerHTML;
  resWrapper1.innerHTML = result.outerHTML;
  return true;
}
// create winner play sound function
function winnerPlaySound() {
  const audio = new Audio("./sounds/winner.wav");
  audio.play();
}
// create loser play sound function
function loserPlaySound() {
  const audio = new Audio("./sounds/loser.wav");
  audio.play();
}

// create win function and import vid from video folder
function playerWinVideo() {
  let win = document.createElement("video");
  win.classList.add("winVideo");
  win.setAttribute("src", "./vid/win.mp4");
  win.setAttribute("autoplay", "true");
  win.setAttribute("loop", "true");
  win.setAttribute("muted", "true");
  return win;
}
// update score function
function updateScore(winner) {
  const playerScore = document.querySelector("#player_score");
  // create loval storage for player score
  let score = JSON.parse(sessionStorage.getItem("score"));

  // const computerScore = document.querySelector("#computer_score");
  if (winner === "player") {
    playerScore.innerHTML = parseInt(score) + 1;
    sessionStorage.setItem("score", parseInt(score) + 1);
  } else if (winner === "computer") {
    playerScore.innerHTML = parseInt(score) - 1;
    sessionStorage.setItem("score", parseInt(score) - 1);
  }
}
// game rules function
function gameRules() {
  const rules = {
    rock: {
      scissors: "crushes",
      lizard: "crushes",
    },
    paper: {
      rock: "covers",
      spock: "disproves",
    },
    scissors: {
      paper: "cuts",
      lizard: "decapitates",
    },
    lizard: {
      spock: "poisons",
      paper: "eats",
    },
    spock: {
      scissors: "smashes",
      rock: "vaporizes",
    },
  };

  return rules;
}

// Path: js\game.js
