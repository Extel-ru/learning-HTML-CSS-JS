
let score = JSON.parse(localStorage.getItem
  ('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScoreElement();

  let isAutoPlaying = false;
  let intervalId;

  // const autoplay() => {
  // }
  function autoplay() {
    buttonElement = document.querySelector('.js-autoplay-button');
    if (!isAutoPlaying) {
      buttonElement.innerHTML = 'Остановить игру'
       intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;

    } else {
      buttonElement.innerHTML = 'Авто-игра';
      clearInterval(intervalId);
      isAutoPlaying = false;
    }
  }
  function resetScore() {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  }

  document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
      playGame('Камень');
    });

  document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
      playGame('Ножницы');
    })
  
    document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
      playGame('Бумага');
    })

    document.querySelector('.js-autoplay-button')
      .addEventListener('click', () => {
        autoplay();
      });

      
    document.querySelector('.js-reset-score-button')
      .addEventListener('click', () => {
    document.querySelector('.js-confirmation')
      .innerHTML = 
        `Вы точно хотите сбросить счёт? 
        <button class="js-confirmation-yes">Да</button>
        <button class="js-confirmation-no">Нет</button>`;

    const yesElement = document.querySelector('.js-confirmation-yes');
    const noElement = document.querySelector('.js-confirmation-no');

    yesElement.addEventListener('click', resetScore);
    noElement.addEventListener('click', () => {
      document.querySelector('.js-confirmation').innerHTML = '';
    });
  });

    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('Камень');
      } else if (event.key === 'y') {
        playGame('Ножницы') 
      } else if (event.key === ',') {
        playGame('Бумага');
      } else if (event.key === 'a') {
        autoplay();
      } else if (event.key === 'Backspace') {
        resetScore();
      }});

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