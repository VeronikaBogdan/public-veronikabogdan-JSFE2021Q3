"use strict";

//! Time and calendar
const timeT = document.querySelector(".time"),
      dateT = document.querySelector('.date'),
      greeting = document.querySelector('.greeting'),
			name = document.querySelector('.name'),
			slideNext = document.querySelector('.slide-next'),
			slidePrev = document.querySelector('.slide-prev');

let randomNum;

function showTime() {
  const date = new Date();
  
  timeT.textContent = date.toLocaleTimeString();
  setTimeout(showTime, 1000);

  showDate();
	showGreeting();

}

function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'/*, hour: 'numeric', minute: 'numeric'*/};
 
  // dateT.textContent = date.toLocaleDateString('ru-RU', options);
  dateT.textContent = date.toLocaleDateString('en-Br', options);
  setTimeout(showDate, 1000);
}


//! GREETING
function getHours() {
  const date = new Date();
  const hours = date.getHours();
	return hours;
}

const getTimeOfDay = () => {
  const timeOfDay = ['night', 'morning', 'day', 'evening'];
	return timeOfDay[~~(getHours()/6)];
}

function showGreeting() {
	// const timeOfDay = getTimeOfDay();
	const greetingText = `Good ${getTimeOfDay()}`;

	greeting.textContent = greetingText;
}

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);


//! Slider of images

randomNum = getRandomNum();

function getRandomNum() {
	let min = Math.ceil(1);
  let max = Math.ceil(20);
	return Math.round(Math.random() * (max - min)) + min;
}

function setBg() {
	const num = getRandomNum();
	const img = new Image();
 	const bgNum =  randomNum/10 < 1 ? String(randomNum).padStart(2, '0') : randomNum;
	
	img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg`;
	img.onload = () => {      
		document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg')`;
	}; 
	
	
	// document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg')`;
}

function getSlideNext() {
	randomNum == 20 ? randomNum = 1 : randomNum++;
	setBg();
}

function getSlidePrev() {
	randomNum == 1 ? randomNum = 20 : randomNum--;
	setBg();
}

slideNext.addEventListener('click', getSlideNext)
slidePrev.addEventListener('click', getSlidePrev)

setBg();
getRandomNum();
showTime();
