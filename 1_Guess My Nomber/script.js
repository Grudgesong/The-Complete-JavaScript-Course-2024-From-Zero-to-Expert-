'use strict';

document.querySelector('.message');
document.querySelector('.number');
document.querySelector('.score');
document.querySelector('.guess');

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  !guess
    ? (document.querySelector('.message').textContent = 'No Number!!')
    : '';
});
