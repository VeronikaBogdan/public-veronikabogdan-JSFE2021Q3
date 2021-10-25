"use strict";

//! Time and calendar
const timeT = document.querySelector(".time"),
      dateT = document.querySelector(".date"),
      greeting = document.querySelector(".greeting"),
      name = document.querySelector(".name"),
      slideNext = document.querySelector(".slide-next"),
      slidePrev = document.querySelector(".slide-prev");
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

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
  localStorage.setItem("city", city.value);
  // city.addEventListener('change', getWeather);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    name.value = localStorage.getItem("name");
  }
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
  }
  // city.addEventListener('change', getWeather);
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
  // city.value = Moscow;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=48cf984e10a9ac711807ab631f98791d&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
}
getWeather();
city.addEventListener('change', getWeather);

// function setLocalStorage() {
//   localStorage.setItem("city", city.value);
// }
// window.addEventListener("beforeunload", setLocalStorage);

// function getLocalStorage() {
//   if (localStorage.getItem("city")) {
//     name.value = localStorage.getItem("city");
//   }
// }
// window.addEventListener("load", getLocalStorage);




setBg();
getRandomNum();
showTime();
