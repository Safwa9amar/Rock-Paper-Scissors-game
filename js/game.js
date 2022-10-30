document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("score")) {
    localStorage.setItem("score", 0);
  }
  const playerScore = document.querySelector("#player_score");
  playerScore.innerHTML = localStorage.getItem("score");

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
        //   show result
        result(winner);
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
      }, 1000);
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
  const result = document.querySelector(".result");
  const result__title = document.querySelector(".result__title");
  const result__button = document.querySelector(".result__button");
  result.classList.add("result_active");
  if (winner === "player") {
    result__title.innerHTML = "You Win";
  } else if (winner === "computer") {
    result__title.innerHTML = "You Lose";
  } else {
    result__title.innerHTML = "Draw";
  }
}

// update score function
function updateScore(winner) {
  const playerScore = document.querySelector("#player_score");
  // create loval storage for player score
  let score = JSON.parse(localStorage.getItem("score"));

  // const computerScore = document.querySelector("#computer_score");
  if (winner === "player") {
    playerScore.innerHTML = parseInt(score) + 1;
    localStorage.setItem("score", parseInt(score) + 1);
  } else if (winner === "computer") {
    playerScore.innerHTML = parseInt(score) - 1;
    localStorage.setItem("score", parseInt(score) - 1);
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
