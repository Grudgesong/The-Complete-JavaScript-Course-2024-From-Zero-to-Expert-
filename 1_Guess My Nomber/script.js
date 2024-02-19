'use strict';

let secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  //When there is no input
  !guess
    ? (document.querySelector('.message').textContent = 'No Number!!')
    : //When player wins
    guess === secretNumber
    ? ((document.querySelector('.message').textContent = 'Correct Number!!'),
      (document.querySelector('body').style.backgroundColor = '#60b347'),
      (document.querySelector('.number').style.width = '30rem'),
      (document.querySelector('.number').textContent = secretNumber),
      score > highScore
        ? ((highScore = score),
          (document.querySelector('.highscore').textContent = highScore))
        : null)
    : //When guess is too high
    guess > secretNumber
    ? ((document.querySelector('.message').textContent = 'Too High!!'),
      score--,
      (document.querySelector('.score').textContent = score))
    : //When guess is too low
    guess < secretNumber
    ? ((document.querySelector('.message').textContent = 'Too Low!!'),
      score--,
      (document.querySelector('.score').textContent = score))
    : '';

  score <= 0
    ? (document.querySelector('.message').textContent = 'You lost the game!!')
    : '';

  //   if (!guess) {
  //     document.querySelector('.message').textContent = 'No Number!!';
  //   } else if (guess === secretNumber) {
  //     document.querySelector('.message').textContent = 'Correct Number!!';
  //   }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.floor(Math.random() * 20) + 1;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
});
