
let score = JSON.parse(localStorage.getItem
  ('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();

  

  function playGame(playerMove) {

    const computerMove = pickComputerMove();
    
    let result = '';

    if (playerMove === 'Бумага') {
      if (computerMove ==='Камень') {
          result = 'Вы победили.'
      } else if (computerMove ==='Ножницы') {
          result = 'Вы проиграли.'
      } else if(computerMove ==='Бумага') {
          result = 'Ничья.'
      } 
    } else if(playerMove === 'Ножницы') {
       if (computerMove === 'Камень') {
        result = 'Вы проиграли.';
      } else if (computerMove === 'Ножницы') {
          result = 'Ничья.';
      } else if (computerMove === 'Бумага') {
          result = 'Вы победили.';
      }
    } else if(playerMove === 'Камень') {
       if(computerMove === 'Камень') {
          result = 'Ничья.';
      } else if (computerMove === 'Бумага') {
          result = 'Вы проиграли.'
      } else if (computerMove === 'Ножницы') {
          result = 'Вы победили.';
      }

    }
   

   if (result === 'Вы победили.') {
    score.wins += 1;
   } else if (result === 'Вы проиграли.') {
    score.losses += 1;
   } else if (result === 'Ничья.') {
    score.ties += 1;
   }

   localStorage.setItem('score', JSON.stringify(score));

   updateScoreElement();

   document.querySelector('.js-result').
   innerHTML = result;

   document.querySelector('.js-moves')
   .innerHTML= `Вы
    <img class="move-icon" src="images/${playerMove}.png">      
    <img class="move-icon" src="images/${computerMove}.png"> Компьютер`;

  }

    function updateScoreElement() {
      document.querySelector('.js-score')
      .innerHTML = `Побед: ${score.wins}, Поражений: ${score.losses}, Ничьих: ${score.ties}`;
    }
    
  function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1/3) {
      computerMove ='Камень'
    } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
      computerMove ='Ножницы'
    } else if (randomNumber >= 2/3) {
      computerMove ='Бумага';
    }
    return computerMove;
  }