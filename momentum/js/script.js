"use strict";

//! Time and calendar
const timeT = document.querySelector(".time"),
      dateT = document.querySelector('.date'),
      greeting = document.querySelector('.greeting'),
			name = document.querySelector('.name');

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


showTime();
