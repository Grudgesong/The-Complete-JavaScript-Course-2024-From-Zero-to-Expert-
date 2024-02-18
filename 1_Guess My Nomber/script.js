'use strict';

document.querySelector('.message');
document.querySelector('.number');
document.querySelector('.score');
document.querySelector('.guess');

const secretNumber = Math.floor(Math.random() * 20) + 1;
let score = 20;
document.querySelector('.number').textContent = secretNumber;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  !guess
    ? (document.querySelector('.message').textContent = 'No Number!!')
    : guess === secretNumber
    ? (document.querySelector('.message').textContent = 'Correct Number!!')
    : guess > secretNumber
    ? ((document.querySelector('.message').textContent = 'Too High!!'),
      score--,
      (document.querySelector('.score').textContent = score))
    : guess < secretNumber
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
