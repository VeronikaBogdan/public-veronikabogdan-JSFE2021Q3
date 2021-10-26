"use strict";

import playList from './playList.js';

const timeT = document.querySelector(".time"),
			dateT = document.querySelector(".date"),
			greeting = document.querySelector(".greeting"),
			name = document.querySelector(".name"),
			slideNext = document.querySelector(".slide-next"),
			slidePrev = document.querySelector(".slide-prev");

const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");

const quote = document.querySelector(".quote"),
		  author = document.querySelector(".author"),
		  changeQuote = document.querySelector(".change-quote");

const playBtn = document.querySelector('.play');
const btnPlayNext = document.querySelector('.play-next');
const btnPlayPrev = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');

let randomNum;
let isPlay = false;
let playNum = 0;

//! Time and calendar
function showTime() {
  const date = new Date();

  timeT.textContent = date.toLocaleTimeString();
  setTimeout(showTime, 1000);

  showDate();
  showGreeting();
}

function showDate() {
  const date = new Date();
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric" /*, hour: 'numeric', minute: 'numeric'*/,
  };

  // dateT.textContent = date.toLocaleDateString('ru-RU', options);
  dateT.textContent = date.toLocaleDateString("en-Br", options);
  setTimeout(showDate, 1000);
}

//! GREETING
function getHours() {
  const date = new Date();
  const hours = date.getHours();
  return hours;
}

const getTimeOfDay = () => {
  const timeOfDay = ["night", "morning", "afternoon", "evening"];
  return timeOfDay[~~(getHours() / 6)];
};

function showGreeting() {
  // const timeOfDay = getTimeOfDay();
  const greetingText = `Good ${getTimeOfDay()}`;

  greeting.textContent = greetingText;
}

function setLocalStorage() {
  localStorage.setItem("name", name.value);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
}
window.addEventListener("load", getLocalStorage);

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
  const bgNum =
    randomNum / 10 < 1 ? String(randomNum).padStart(2, "0") : randomNum;

  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg`;
  img.onload = () => {
    document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg')`;
  };

  // document.body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${getTimeOfDay()}/${bgNum}.jpg')`;
}

function getSlideNext() {
  randomNum == 20 ? (randomNum = 1) : randomNum++;
  setBg();
}

function getSlidePrev() {
  randomNum == 1 ? (randomNum = 20) : randomNum--;
  setBg();
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

//! Weather widget
// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=48cf984e10a9ac711807ab631f98791d&units=metric
// https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&appid=48cf984e10a9ac711807ab631f98791d&units=metric

// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=48cf984e10a9ac711807ab631f98791d&units=metric
// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=48cf984e10a9ac711807ab631f98791d&units=imperial

async function getWeather() {
  if (city.value != "") {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=48cf984e10a9ac711807ab631f98791d&units=metric`;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=48cf984e10a9ac711807ab631f98791d&units=metric`;
    const res = await fetch(url);
    const data = await res.json();

    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `${Math.round(data.main.humidity)} %`;
  } else {
    alert("Incorrect city");
  }
}

function setLocalStorageCity() {
  localStorage.setItem("city", city.value);
}

function getLocalStorageCity() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
}

getWeather();
city.addEventListener("change", getWeather);

window.addEventListener("beforeunload", setLocalStorageCity);
window.addEventListener("load", getLocalStorageCity);


//! Quote of the Day
async function getQuotes() {  
  const quotes = 'dataEN.json';
  const res = await fetch(quotes);
  const data = await res.json(); 

	const num = getRandomNum();

	quote.textContent = data[num].text;
	author.textContent = data[num].author;
}

getQuotes();
changeQuote.addEventListener("click", getQuotes);

//! Audio player
const audio = new Audio();

// li.textContent = `${playList[0].title}`;
playList.forEach((el,item) => {
	const li = document.createElement('li');
	li.classList.add('play-item');
	li.textContent = `${el.title}`;
	playListContainer.append(li);
})

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
	isPlay = true;
	liPlay[playNum].classList.toggle('play-item-main');
}

function pauseAudio() {
  audio.pause();
	isPlay = false;
	liPlay[playNum].classList.toggle('play-item-main');
}

function startOrStopAudio(){
	!isPlay ? playAudio() : pauseAudio();
	// !isPlay ? playBtn.classList.remove('pause') : playBtn.classList.add('pause');
}
function changePlayButton(){
	!isPlay ? playBtn.classList.remove('pause') : playBtn.classList.add('pause');
}

const liPlay = document.querySelectorAll('.play-item');

function playNext() {
	if(playNum == 3) {
		playNum = 0;
		liPlay[3].classList.toggle('play-item-main');
	} else {
		playNum++;
		liPlay[playNum-1].classList.toggle('play-item-main');
	}
  // playNum == 3 ? (playNum = 0) : playNum++;
	playAudio();
	changePlayButton();
}

function playPrev() {
	if(playNum == 0) {
		playNum = 3;
		liPlay[0].classList.toggle('play-item-main');
	} else {
		playNum--;
		liPlay[playNum+1].classList.toggle('play-item-main');
	}
  // playNum == 0 ? (playNum = 3) : playNum--;
	playAudio();
	changePlayButton();
}

btnPlayNext.addEventListener("click", playNext);
btnPlayPrev.addEventListener("click", playPrev);

playBtn.addEventListener('click', startOrStopAudio);
playBtn.addEventListener('click', changePlayButton);


setBg();
getRandomNum();
showTime();
