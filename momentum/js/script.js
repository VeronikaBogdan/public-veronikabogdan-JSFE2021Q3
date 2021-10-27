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

  timeT.textContent = date.toLocaleTimeString('en-US', { hour12: false });
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
  // setBg();
	getLinkToImage(); 
	// getLinkToImageFlickr();
}

function getSlidePrev() {
  randomNum == 1 ? (randomNum = 20) : randomNum--;
  // setBg();
	getLinkToImage();
	// getLinkToImageFlickr(); 
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);

//! Unsplash API

// https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=_Rd2kPJVC2tVj9uKSeCv6gK4JjxwUFoAwWR7csOXJJI

// function getLinkToImage() {
// 	const url = 'https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=_Rd2kPJVC2tVj9uKSeCv6gK4JjxwUFoAwWR7csOXJJI';
// 	fetch(url)
// 		.then(res => res.json())
// 		.then(data => {
// 			console.log(data.urls.regular)
// 		});
// }
async function getLinkToImage() {
	const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${getTimeOfDay()}&client_id=_Rd2kPJVC2tVj9uKSeCv6gK4JjxwUFoAwWR7csOXJJI`;	
	const res = await fetch(url);
	const data = await res.json();

	console.log(data.urls.regular)

  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${data.urls.regular}')`;
  };
}

async function getLinkToImageFlickr() {
	const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f850a6092602144d18ae547b899e272e&tags=nature&extras=url_l&format=json&nojsoncallback=1`;	
	// const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f850a6092602144d18ae547b899e272e&tags=${getTimeOfDay()}&extras=url_l&format=json&nojsoncallback=1`;	
	const res = await fetch(url);
	const data = await res.json();

	console.log(data.photos.photo[randomNum].url_l)

  const img = new Image();
  img.src = data.photos.photo[randomNum].url_l;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${data.photos.photo[randomNum].url_l}')`;
  };
}


// setBg();
getLinkToImage(); 
// getLinkToImageFlickr(); 




//! Weather widget
// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=48cf984e10a9ac711807ab631f98791d&units=metric
// https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&appid=48cf984e10a9ac711807ab631f98791d&units=metric

// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=48cf984e10a9ac711807ab631f98791d&units=metric
// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=48cf984e10a9ac711807ab631f98791d&units=imperial

async function getWeather() {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=48cf984e10a9ac711807ab631f98791d&units=metric`;
	// const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=48cf984e10a9ac711807ab631f98791d&units=metric`;
	const res = await fetch(url);
	const data = await res.json();

	if(data.cod == '400' || data.cod == '404'){
		alert('Incorrect data... Error.');
	} else 	{
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)} %`;
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
	audio.classList.add('song');
	isPlay = true;
	console.log(audio);
	liPlay[playNum].classList.toggle('play-item-main');

	// automatically play the next song at the end of the audio object's duration
	audio.addEventListener('ended', function(){
		playNext();
	});
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

	// automatically play the next song at the end of the audio object's duration
	// audio.addEventListener('ended', function(){
	// 	playNext();
	// });
	
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

console.log(audio);



const audioPlayer = document.querySelector(".audio-player");



getRandomNum();
showTime();
