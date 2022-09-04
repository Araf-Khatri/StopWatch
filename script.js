"use strict";

const startBtn = document.querySelector(".start");
const lapBtn = document.querySelector(".lap");
const pauseBtn = document.querySelector('.pause');
const resumeBtn = document.querySelector('.resume');
const resetBtn = document.querySelector('.reset');
const buttons = document.querySelectorAll('.btn')

const laps = document.querySelector('.collection');

const timerCopy = document.querySelectorAll('h3')

const minute = document.getElementById("min");
const second = document.getElementById("sec");
const miniSec = document.getElementById("ms");

let listOfLaps = []
let minis, sec, i, minutes, starting;


const lapHTML = function (num, timer, gap) {
  const omin = String(gap[0]).padStart(2, '0')
  const os = String(gap[1]).padStart(2, '0')
  const oms = String(gap[2]).padStart(2, '0')

  return `
  <li class="li">
    <div class="num">${String(num).padStart(2, '0')}</div>
    <div class="timer">${timer}</div>
    <div class="gap">+${`${omin}:${os}:${oms}`}</div>
  </li>
  `
}

const changeClass = function () {
  startBtn.classList.toggle('hidden');
  lapBtn.classList.toggle('hidden')
  pauseBtn.classList.toggle('hidden')
}

function timerStart() {
  if(!this.classList.contains('resume'))
    changeClass()
  else {
    stopTimer()
  }
  start();
}


const resetHTML = function () {
  minute.textContent = `${String(minutes).padStart(2, '0')}`
  second.textContent = `${String(sec).padStart(2, '0')}`;
  miniSec.textContent = `${String(minis).padStart(2, '0')}`;

  buttons.forEach(btn => {
    if (!btn.classList.contains('start'))
      btn.classList.add('hidden')
    else
      btn.classList.remove('hidden')
  })

  const lapsArr = Array.from(laps.children)
  lapsArr.forEach(lap => {
    lap.remove()
  })
}

const reset = function () {
  listOfLaps = []
  minis = 0;
  sec = 0;
  i = 0;
  minutes = 0;
  starting;
  resetHTML()
}

const start = () => {
  starting = setInterval(() => {
    second.textContent = `${String(sec).padStart(2, '0')}`;
    miniSec.textContent = `${String(minis).padStart(2, '0')}`;
    minis += 1;
    if (sec >= 59 && minis == 99 ) {
      minutes += 1
      sec = sec - 60
      minute.textContent = `${String(minutes).padStart(2, '0')}`
    }
    if (minis === 100) {
      sec += 1;
      minis = 0;
      i += 1;
    }
  }, 10);
};

const stopTimer = function () {
  clearInterval(starting)
  buttons.forEach(btn => {
    if (!btn.classList.contains('start')) {
      btn.classList.toggle('hidden')
    }
  })
}

const checkGap = function (arr) {
  const main = arr[arr.length - 1].split(':');
  let prev = [0, 0, 0];
  if (arr.length !== 1)
    prev = arr[arr.length - 2].split(':');
  
  const [mainm, mains, mainms] = main;
  const [prevm, prevs, prevms] = prev;
  

  const retur = [mainm - prevm, mains - prevs, mainms - prevms];
  // if (retur[2] > 99) {
  //   while (retur[2] > 99) {
  //     retur[2] -= 100
  //     retur[1] += 1
  //   }
  // }
  if (retur[1] < 0) {
    retur[0] -= 1
    retur[1] += 60
  }
  if (retur[2] < 0 && retur[1] > 0) {
    retur[1] -= 1
    retur[2] += 100
  }
  console.log(retur);
  return retur


}

const copyThat = function (e) {
  const arr = []
  // console.log(timerCopy);
  timerCopy.forEach(timer => {
    // console.log(timer.textContent);
    arr.push(timer.textContent);
  })
  listOfLaps.push(arr.join(':'));
  // console.log(listOfLaps);
  // console.log(arr);

  const gap = checkGap(listOfLaps)

  const html = lapHTML(listOfLaps.length, listOfLaps[listOfLaps.length - 1], gap)

  laps.insertAdjacentHTML('afterbegin', html)
}

reset()

startBtn.addEventListener('click', timerStart);
resumeBtn.addEventListener('click', timerStart);
pauseBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', copyThat);

