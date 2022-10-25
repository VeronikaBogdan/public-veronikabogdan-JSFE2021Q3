"use strict";

import playList from "./playList.js";

const timeT = document.querySelector(".time"),
  dateT = document.querySelector(".date"),
  greeting = document.querySelector(".greeting"),
  greetingContainer = document.querySelector(".greeting-container"),
  name = document.querySelector(".name"),
  slideNext = document.querySelector(".slide-next"),
  slidePrev = document.querySelector(".slide-prev");

const weather = document.querySelector(".weather");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const city = document.querySelector(".city");

const quote = document.querySelector(".quote"),
  author = document.querySelector(".author"),
  changeQuote = document.querySelector(".change-quote");

const player = document.querySelector(".player");
const playBtn = document.querySelector(".play");
const btnPlayNext = document.querySelector(".play-next");
const btnPlayPrev = document.querySelector(".play-prev");
const playListContainer = document.querySelector(".play-list");

const settingsIcon = document.querySelector(".settings-icon");
const settings = document.querySelector(".settings");
const languageItem = document.querySelector(".language-item");
const dateItem = document.querySelector(".date-item");
const timeItem = document.querySelector(".time-item");
const greentingItem = document.querySelector(".greenting-item");
const quoteItem = document.querySelector(".quote-item");
const weatherItem = document.querySelector(".weather-item");
const audioItem = document.querySelector(".audio-item");

const ghItem = document.querySelector(".gh-item");
const unsplashItem = document.querySelector(".unsplash-item");
const flickrItem = document.querySelector(".flickr-item");

let randomNum;
let isPlay = false;
let playNum = 0;
let lang = "en";

//! Time and calendar
function showTime() {
  const date = new Date();

  timeT.textContent = date.toLocaleTimeString("en-US", { hour12: false });
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

  // dateT.textContent = l == 'en' ? date.toLocaleDateString("en", options) : date.toLocaleDateString("ru", options);
  // dateT.textContent = date.toLocaleDateString('ru-RU', options);
  // dateT.textContent = date.toLocaleDateString(['en','ru'], options);
  dateT.textContent = date.toLocaleDateString(lang, options);
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

const greetingTranslation = {
  // 'ru': `Добрый вечер`,
  ru: ["Доброй ночи", "Доброе утро", "Добрый день", "Добрый вечер"],

  en: `Good ${getTimeOfDay()}`,
};

function showGreeting() {
  greeting.textContent =
    lang == "en"
      ? greetingTranslation.en
      : greetingTranslation.ru[~~(getHours() / 6)];
  // if(language == 'en')
  //  {
  // 	const greetingText = `Good ${getTimeOfDay()}`;
  // 	// greeting.textContent = `Good ${getTimeOfDay()}`;
  // 	greeting.textContent = greetingTranslation.en;
  // } else greeting.textContent = greetingTranslation.ru[~~(getHours() / 6)];
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
}

let sun = 1;

ghItem.addEventListener("click", () => {
  setBg();
  sun = 1;
  // console.log(ghItem.classList.contains('play-item-main'));
  ghItem.classList.add("play-item-main");
  unsplashItem.classList.remove("play-item-main");
  flickrItem.classList.remove("play-item-main");
});
unsplashItem.addEventListener("click", () => {
  getLinkToImage();
  sun = 2;

  ghItem.classList.remove("play-item-main");
  unsplashItem.classList.add("play-item-main");
  flickrItem.classList.remove("play-item-main");
});
flickrItem.addEventListener("click", () => {
  getLinkToImageFlickr();
  sun = 3;

  ghItem.classList.remove("play-item-main");
  unsplashItem.classList.remove("play-item-main");
  flickrItem.classList.add("play-item-main");
});

function getSlideNext() {
  randomNum == 20 ? (randomNum = 1) : randomNum++;

  sun == 1 ? setBg() : sun == 2 ? getLinkToImage() : getLinkToImageFlickr();
}

function getSlidePrev() {
  randomNum == 1 ? (randomNum = 20) : randomNum--;
  sun == 1 ? setBg() : sun == 2 ? getLinkToImage() : getLinkToImageFlickr();
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

  console.log(data.urls.regular);

  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${data.urls.regular}')`;
  };
}

//! Flickr API

async function getLinkToImageFlickr() {
  // const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f850a6092602144d18ae547b899e272e&tags=nature&extras=url_l&format=json&nojsoncallback=1`;
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=f850a6092602144d18ae547b899e272e&tags=${getTimeOfDay()}&extras=url_l&format=json&nojsoncallback=1`;
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.photos.photo[randomNum].url_l);

  const img = new Image();
  img.src = data.photos.photo[randomNum].url_l;
  img.onload = () => {
    document.body.style.backgroundImage = `url('${data.photos.photo[randomNum].url_l}')`;
  };
}

ghItem.classList.add("play-item-main");
setBg();
// getLinkToImage();
// getLinkToImageFlickr();

//! Weather widget
// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=ru&appid=48cf984e10a9ac711807ab631f98791d&units=metric
// https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=ru&appid=48cf984e10a9ac711807ab631f98791d&units=metric

// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=48cf984e10a9ac711807ab631f98791d&units=metric
// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=48cf984e10a9ac711807ab631f98791d&units=imperial

async function getWeather() {
  if (lang == "ru") city.value == "Минск";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=48cf984e10a9ac711807ab631f98791d&units=metric`;
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=48cf984e10a9ac711807ab631f98791d&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  if (data.cod == "400" || data.cod == "404") {
    alert("Incorrect data... Error.");
  } else {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (lang == "en") {
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
      humidity.textContent = `Humidity: ${Math.round(data.main.humidity)} %`;
    } else {
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
      humidity.textContent = `Влажность: ${Math.round(data.main.humidity)} %`;
    }
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
  const quotes = lang == "en" ? "dataEN.json" : "dataRU.json";
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
playList.forEach((el, item) => {
  const li = document.createElement("li");
  li.classList.add("play-item");
  li.textContent = `${el.title}`;
  playListContainer.append(li);
});

function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  audio.play();
  audio.classList.add("song");
  isPlay = true;
  liPlay[playNum].classList.toggle("play-item-main");
}

// automatically play the next song at the end of the audio object's duration
audio.addEventListener("ended", function () {
  if (playNum == 3) {
    playNum = 0;
    liPlay[3].classList.toggle("play-item-main");
  } else {
    playNum++;
    liPlay[playNum - 1].classList.toggle("play-item-main");
  }
});

function pauseAudio() {
  audio.pause();
  isPlay = false;
  liPlay[playNum].classList.toggle("play-item-main");
}

function startOrStopAudio() {
  !isPlay ? playAudio() : pauseAudio();
  // !isPlay ? playBtn.classList.remove('pause') : playBtn.classList.add('pause');
}
function changePlayButton() {
  !isPlay ? playBtn.classList.remove("pause") : playBtn.classList.add("pause");
}

const liPlay = document.querySelectorAll(".play-item");

function playNext() {
  if (playNum == 3) {
    playNum = 0;
    liPlay[3].classList.remove("play-item-main");
  } else {
    playNum++;
    liPlay[playNum - 1].classList.remove("play-item-main");
  }
  // playNum == 3 ? (playNum = 0) : playNum++;
  playAudio();
  changePlayButton();
}

function playPrev() {
  if (playNum == 0) {
    playNum = 3;
    liPlay[0].classList.remove("play-item-main");
  } else {
    playNum--;
    liPlay[playNum + 1].classList.remove("play-item-main");
  }
  // playNum == 0 ? (playNum = 3) : playNum--;
  playAudio();
  changePlayButton();
}

btnPlayNext.addEventListener("click", playNext);
btnPlayPrev.addEventListener("click", playPrev);

playBtn.addEventListener("click", startOrStopAudio);
playBtn.addEventListener("click", changePlayButton);


//! Seetings
settingsIcon.addEventListener("click", () => {
  settings.classList.toggle("settings-open");
  settingsIcon.classList.toggle("settings-icon-close");
});

const langI = document.querySelector('.lang-i');
const imageI = document.querySelector('.image-i');
const dateI = document.querySelector('.date-i');
const timeI = document.querySelector('.time-i');
const greentingI = document.querySelector('.greenting-i');
const quoteI = document.querySelector('.quote-i');
const weatherI = document.querySelector('.weather-i');
const audioI = document.querySelector('.audio-i');


languageItem.addEventListener("click", () => {
  if(lang == 'en') {
    lang = "ru"
    name.placeholder = "[Введите имя]";
    langI.textContent = 'Язык';
    imageI.textContent = 'Фото из..';
    dateI.textContent = 'Дата';
    timeI.textContent = 'Время';
    greentingI.textContent = 'Приветствие';
    quoteI.textContent = 'Цитата дня';
    weatherI.textContent = 'Погода';
    audioI.textContent = 'Аудиоплеер';
  } else {
    lang = "en"
    name.placeholder = "[Input name]";
    langI.textContent = 'Language';
    imageI.textContent = 'Image from..';
    dateI.textContent = 'Date';
    timeI.textContent = 'Time';
    greentingI.textContent = 'Greenting';
    quoteI.textContent = 'Quote';
    audioI.textContent = 'Audio player';
  }
  getQuotes();
  getWeather();
});





dateItem.addEventListener("click", () => {
  dateT.classList.toggle("close");
  // dateItem.classList.toggle('btn-color');
});
timeItem.addEventListener("click", () => {
  timeT.classList.toggle("close");
});
greentingItem.addEventListener("click", () => {
  greetingContainer.classList.toggle("close");
});
quoteItem.addEventListener("click", () => {
  quote.classList.toggle("close");
  author.classList.toggle("close");
});
weatherItem.addEventListener("click", () => {
  weather.classList.toggle("close");
});
audioItem.addEventListener("click", () => {
  player.classList.toggle("close");
});

getRandomNum();
showTime();
