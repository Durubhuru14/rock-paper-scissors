document.querySelector('footer').innerText += new Date().getFullYear()
SELECTION = [
   {name:'rock',
    emoji:'✊',
    beats:'scissor'},
   {name:'paper',
    emoji:'✋',
    beats:'rock'},
   {name:'scissor',
    emoji:'✌️',
    beats:'paper'}
]

const clickSound = document.querySelector('.click')
const bgm = document.querySelector('.bgm')
const selectionBtn = document.querySelectorAll('[data-selection]');
const playerScoreElement = document.querySelector('[data-player-score]');
const computerScoreElement = document.querySelector('[data-computer-score]');
const playerChoiceElement = document.querySelector('.player-choice');
const computerChoiceElement = document.querySelector('.computer-choice');
const roundWonElement = document.querySelector('.round-won');
const restartWindow = document.querySelector('.restart-window');
const winner = document.querySelector('.winner');
const restartBtn = document.querySelector('.restart-btn');

selectionBtn.forEach(button => {
   button.addEventListener('click',()=> {
      const selectionName = button.dataset.selection;
      const playerSelection = SELECTION.find(selection => selection.name === selectionName)
      playRound(playerSelection)
      bgm.play()
   })
})

function playRound(playerSelection) {
   const playerChoice = playerSelection;
   const computerChoice = getComputerChoice();
   const playerWin = roundWinner(playerChoice, computerChoice)
   const computerWin = roundWinner(computerChoice, playerChoice)
   playerChoiceElement.innerText = playerChoice.emoji;
   computerChoiceElement.innerText = computerChoice.emoji;
   if (playerWin) {
      incrementScore(playerScoreElement)
      announceRoundWinner('Player',playerChoice,computerChoice)
   }
   if (computerWin) {
      incrementScore(computerScoreElement)
      announceRoundWinner('Computer',computerChoice,playerChoice)
   }
   if (!playerWin && !computerWin) {
      TieRound()
   }
   if (parseInt(playerScoreElement.innerText) == 5) {
      restart('Player')
   }
   if (parseInt(computerScoreElement.innerText) == 5) {
      restart('Computer')
   }
}

function getComputerChoice() {
   const newIndex = Math.floor(Math.random() * SELECTION.length)
   return SELECTION[newIndex]
}

function TieRound() {
   return roundWonElement.innerText = "It's Tie No one wins!"
}

function announceRoundWinner(winner,selection, enemySelection){
   roundWonElement.innerText = `${winner} win! ${selection.name} beats ${enemySelection.name}`
}

function incrementScore(scoreTXT) {
   scoreTXT.innerText = parseInt(scoreTXT.innerText) + 1;
}

function roundWinner(selection,opponentSelection){
   return selection.beats === opponentSelection.name;
}

function restart(Winner) {
   playerChoiceElement.innerText = ''
   computerChoiceElement.innerText = ''
   roundWonElement.innerText = ''
   computerScoreElement.innerText = '0'
   playerScoreElement.innerText = '0'
   restartWindow.classList.add('show-restart-window')
   winner.innerText = `${Winner} won!`
}

restartBtn.addEventListener('click',()=>{
   restartWindow.classList.remove('show-restart-window')
   clickSound.play()
})

selectionBtn.forEach(button => {
   button.addEventListener('click',()=>{
      clickSound.currentTime = 0
      clickSound.play()
      button.style.cssText = 'border:3px solid rgb(152, 88, 123);'
      setTimeout(()=>{
         button.style.cssText = 'border:none;'
      },1000)
   })
})