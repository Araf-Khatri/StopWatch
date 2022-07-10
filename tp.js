"use strict";

const startBtn = document.querySelector(".start");
const lapBtn = document.querySelector(".lap");
const pauseBtn = document.querySelector('.pause');


const minute = document.getElementById("min");
const second = document.getElementById("sec");
const miniSec = document.getElementById("ms");

const changeClass = function () {
  startBtn.classList.toggle('hidden');
  lapBtn.classList.toggle('hidden')
  pauseBtn.classList.toggle('hidden')
}
function timerStart() {
  changeClass()
  start();
}

let minis, sec, i, starting;
const reset = function () {
  minis = 0;
  sec = 0;
  i = 0;
  starting;
}
reset()
const start = () => {
  starting = setInterval(() => {
    minis += 1;
    if (minis === 100) {
      sec += 1;
      minis = 0;
      i += 1;
      second.textContent = `${String(sec).padStart(2, '0')}`;
    }
    miniSec.textContent = `${String(minis).padStart(2, '0')}`;
  }, 10);
};

const makeCopy = function () {
  if (lapBtn.textContent === 'Lap') {
    makingCopy()
  }
  else {
    console.log(this);
    reset()
  }
}

const changeTwoButton = function () {
  let text = pauseBtn.textContent
  if (text === 'Resume') {
    start()
    pauseBtn.textContent = 'Pause';
    lapBtn.textContent = 'Lap';
  }
  else {
    pauseBtn.textContent = 'Resume';
    lapBtn.textContent = 'Reset';
    clearInterval(starting);
  }

}

const stopTimer = function () {
  changeTwoButton()
}

startBtn.addEventListener('click', timerStart);
lapBtn.addEventListener('click', makeCopy)
pauseBtn.addEventListener('click', stopTimer);

