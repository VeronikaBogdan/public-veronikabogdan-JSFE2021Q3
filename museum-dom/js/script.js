"use strict";

function myFunction() {
  let myTop = document.getElementById("myTopnav");

  if (myTop.className === "navbar topnav") {
    myTop.className += " responsive";
  }
}

//! Welcome Slider

var swiper = new Swiper(".mySwiper", {
  spaceBetween: 5,
  slidesPerView: 35,
  grabCursor: true,
  freeMode: false,
  watchSlidesVisibility: false,
  watchSlidesProgress: false,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // loop: true, // бесконечная прокрутка
});

// верхний
var swiper2 = new Swiper(".mySwiper2", {
  spaceBetween: 10,
  speed: 900,
  grabCursor: true,
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  thumbs: {
    swiper: swiper,
  },
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const arrSlideBtn = document.slideBtn,
  swiperSlide = document.querySelectorAll(".swiper-slide"),
  slideBtn = document.querySelectorAll(".slide-btn"),
  next = document.querySelector(".next");

let k = 0;

for (let i = 0; i < slideBtn.length; i++) {
  console.log(slideBtn[i].classList.contains("active"), (k = i));
}

// console.log(slideBtn);
// slideBtn.addEventListener('click', () => {
// 	next.classList.toggle('act');
// });

// slideBtn.addEventListener("click", () => {
// 	for(let key of slideBtn) {
// 		console.log(key);
// 		// if(key.classList.contains('logo')){
// 		// 	key.setAttribute('src','assets/svg/logoBlack.svg');
// 		// }
// 	}
// });

//! Explore Slider
const slider = document.getElementById("before-after-slider");
const before = document.getElementById("before-image");
const beforeImage = before.getElementsByTagName("img")[0];
const resizer = document.getElementById("resizer");

let active = false;

//Sort overflow out for Overlay Image
document.addEventListener("DOMContentLoaded", function () {
  let width = /*slider.offsetWidth =*/ 720;
  beforeImage.style.width = width + "px";
});

//Adjust width of image on resize
window.addEventListener("resize", function () {
  let width = slider.offsetWidth;
  beforeImage.style.width = width + "px";
});

resizer.addEventListener("mousedown", function () {
  active = true;
  resizer.classList.add("resize");
});

document.body.addEventListener("mouseup", function () {
  active = false;
  resizer.classList.remove("resize");
});

document.body.addEventListener("mouseleave", function () {
  active = false;
  resizer.classList.remove("resize");
});

document.body.addEventListener("mousemove", function (e) {
  if (!active) return;
  let x = e.pageX;
  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

resizer.addEventListener("touchstart", function () {
  active = true;
  resizer.classList.add("resize");
});

document.body.addEventListener("touchend", function () {
  active = false;
  resizer.classList.remove("resize");
});

document.body.addEventListener("touchcancel", function () {
  active = false;
  resizer.classList.remove("resize");
});

//calculation for dragging on touch devices
document.body.addEventListener("touchmove", function (e) {
  if (!active) return;
  let x;

  let i;
  for (i = 0; i < e.changedTouches.length; i++) {
    x = e.changedTouches[i].pageX;
  }

  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

function slideIt(x) {
  let transform = Math.max(0, Math.min(x, slider.offsetWidth));
  before.style.width = transform + "px";
  resizer.style.left = transform - 0 + "px";
}

//stop divs being selected.
function pauseEvent(e) {
  if (e.stopPropagation) e.stopPropagation();
  if (e.preventDefault) e.preventDefault();
  e.cancelBubble = true;
  e.returnValue = false;
  return false;
}

//! Gallery

const pictureInnerContainer = document.querySelector(
  ".picture-inner-container"
);

AOS.init({
  delay: 300,
  duration: 1000,
  targetSelector: ".picture-inner-container",
});

for (let i = 0; i < 15; i++) {
  let img = document.createElement("img");
  img.classList.add(".picture-img");

  img.setAttribute("data-aos", "fade-up");
  img.setAttribute("data-aos-anchor-placement", "top-bottom");

  img.setAttribute("alt", "photo: pictures and sculptures");
  img.src = `assets/img/galery/galery${i + 1}.jpg`;
  pictureInnerContainer.append(img);
}

let scrollRef = 0;

window.addEventListener("scroll", function () {
  //aus bug solution
  scrollRef <= 10 ? scrollRef++ : AOS.refresh();
});

//! Map in Contacts

(function createMap() {
  const apiKey =
    "pk.eyJ1IjoiYWxmcmVkMjAxNiIsImEiOiJja2RoMHkyd2wwdnZjMnJ0MTJwbnVmeng5In0.E4QbAFjiWLY8k3AFhDtErA";

  const myMap = L.map("map").setView([48.86091, 2.3364], 17);

  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    maxZoom: 18,
    id: "mapbox/light-v10",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: apiKey,
  }
  ).addTo(myMap);

  var myIcon = L.icon({
    iconUrl: "assets/svg/place_black_24dp.svg",
    iconSize: [35, 35],
  });

  const mainMarker = L.marker([48.86091, 2.3364], {
    icon: myIcon
  }).addTo(
    myMap
  );
  document
    .querySelectorAll(".leaflet-marker-icon")
    .forEach((i) => (i.style.opacity = 0.6));

  // Adding Marker
  let mapPopup = [
    [48.8602, 2.3333],
    [48.8607, 2.3397],
    [48.8619, 2.333],
    [48.8625, 2.3365],
  ];
  mapPopup.forEach((point) => {
    const marker = L.marker(point, {
      icon: myIcon
    }).addTo(myMap);
  });
  document
    .querySelectorAll(".leaflet-marker-icon")
    .forEach((i) => (i == 0 ? (i.style.opacity = 1) : (i.style.opacity = 0.6)));
})();

//! Theme

const buttonTheme = document.querySelector(".button-theme");
const buttonThemeCl = document.querySelector(".button-theme-cl");
const themeIcon = document.querySelector(".icon-theme-open");
const sections = document.querySelectorAll(".section");
const arrImages = document.images;

buttonTheme.addEventListener("click", () => {
  buttonTheme.classList.toggle("button-theme-cl");
  buttonThemeCl.classList.toggle("button-theme");
  buttonThemeCl.classList.remove("button-theme-cl");

  sections.forEach((item) => {
    item.classList.add("dark-section-cl");
    document.documentElement.style.setProperty("--font-black", "#fff");
    if (item.classList.contains("dark-section-cl")) {
      document.documentElement.style.setProperty("--font-black", "#fff");
      document.documentElement.style.setProperty("--font-gold", "#d3943c");
    }
  });
});

buttonThemeCl.addEventListener("click", () => {
  buttonTheme.classList.toggle("button-theme-cl");
  buttonThemeCl.classList.remove("button-theme");
  buttonThemeCl.classList.toggle("button-theme-cl");

  sections.forEach((item) => {
    item.classList.remove("dark-section-cl");
  });
  document.documentElement.style.setProperty("--font-black", "#000");
  document.documentElement.style.setProperty("--font-gold", "#9d8665");
});

//! Buy Tickets

const counterMinus = document.querySelectorAll(".ticket-form__counter-minus");
const counterPlus = document.querySelectorAll(".ticket-form__counter-plus");
const amountData = document.querySelector(".ticket-form__amount-data");
const currentAmountCounter = document.querySelectorAll(
  ".ticket-form__counter-text"
);

const incrementAmount = (currentAmount) => ++currentAmount;
const decrementAmount = (currentAmount) => --currentAmount;

const increaseAmount = (e, age) => {
  let current =
    age == "basic" ? currentAmountCounter[0] : currentAmountCounter[1];
  if (
    e.target.parentElement.classList.contains(age) &&
    e.target.classList.contains("ticket-form__counter-plus") &&
    current.value >= 0 &&
    current.value < 20
  ) {
    current.setAttribute("value", `${incrementAmount(current.value)}`);
  }
};

const decreaseAmount = (e, age) => {
  let current =
    age == "basic" ? currentAmountCounter[0] : currentAmountCounter[1];
  if (
    e.target.parentElement.classList.contains(age) &&
    e.target.classList.contains("ticket-form__counter-minus") &&
    current.value > 0 &&
    current.value <= 20
  ) {
    current.setAttribute("value", `${decrementAmount(current.value)}`);
  }
};

amountData.addEventListener("click", (e) => {
  increaseAmount(e, "basic");
  increaseAmount(e, "senior");
  decreaseAmount(e, "basic");
  decreaseAmount(e, "senior");
});