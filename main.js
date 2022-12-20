let rock = {
  name: 'rock',
  emoji: '🪨',
  beats: '✂️'
}
let paper = {
  name: 'paper',
  emoji: '📃',
  beats: '🪨'
}
let scissor = {
  name: 'scissor',
  emoji: '✂️',
  beats: '📃'
}

/*To select all buttons at once */
let btn = document.querySelectorAll("[data-btn=btn]")

/*To select specific selection*/
let selection = document.querySelectorAll('[data-selection]')

let playerChoice;
let computerChoice;
let compWinCount = 0;
let playerWinCount = 0;

let playerSpan = document.querySelector("#player-choice")
let compSpan = document.querySelector("#computer-choice")

let verdict = document.querySelector(".verdict")
let roundWinner = document.querySelector(".round-winner")

let restartBtn = document.querySelector('#restart-btn')
let restartP = document.getElementById('restart-p')
let restartScreen = document.querySelector(".restart-screen")

btn.forEach((e) => {
  e.addEventListener('click', () => {
    e.classList.add('click')
    setTimeout(() => {
      e.classList.remove('click')
    },2100)
  /* For player choice */  
  let player_btn = e.dataset.selection
  playerChoice = playerSelection(player_btn)

  /* For computer choice */
  computerChoice = computerSelection()
  
  playerSpan.textContent = playerChoice.emoji
  compSpan.textContent = computerChoice.emoji
  
  checkWin(computerChoice,playerChoice)
  })
})

function playerSelection(player_btn) {
  switch (player_btn) {
    case '🪨':
      return rock
      break;
    case '📃':
      return paper
      break;
    case '✂️':
      return scissor
      break;
  }
}

function computerSelection() {
  let n = Math.floor(Math.random() * (3 - 1)) + 1
  switch (n) {
    case 1:
      return rock
      break;
    case 2:
      return paper
      break;
    case 3:
      return scissor
      break;
    
  }
}

function checkWin(computerChoice,playerChoice) {
  if (computerChoice.name == playerChoice.name) {
    return roundWinner.textContent = "It's a Tie!",
    verdict.textContent = `${playerChoice.name} and ${computerChoice.name} is same!`
  } else if (playerChoice.beats == computerChoice.emoji) {
    playerWinCount += 1
    return roundWinner.textContent = "Player Won!",
    verdict.textContent = `${playerChoice.name} beats ${computerChoice.name}!`
  } else {
    compWinCount += 1
    return roundWinner.textContent = "Computer Won!",
    verdict.textContent = `${computerChoice.name} beats ${playerChoice.name}!`
  }
}

setInterval(() => {
  if (playerWinCount == 5){
    restartP.textContent = "Player Won!"
    restartScreen.classList.remove("hide")
  } else if(compWinCount == 5) {
    restartP.textContent = "Computer Won!"
    restartScreen.classList.remove("hide")
  }
},1)

restartBtn.addEventListener('click', () => {
  window.location.reload();
  restartScreen.classList.add("hide")
})
