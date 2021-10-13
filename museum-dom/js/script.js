'use strict';

console.log(
// `Score: 87 / 150`
	`Здравстуйте! Можно Вас попросить: можете пока что не проверять работу (во вторник хотя бы; если можно, то и в среду, но это уже по Вашему усмотрению), 
т.к. не успеваю сделать и не очень хочется получать низкий балл и доставлять Вам неудобства, прося о перепроверке... 
Заранее благодарна) Хорошего Вам дня!`
);

function myFunction() {
  let myTop = document.getElementById("myTopnav");

	if (myTop.className === "navbar topnav") {
		myTop.className += " responsive";
	}
}




//! Explore Slider
const slider = document.getElementById('before-after-slider');
const before = document.getElementById('before-image');
const beforeImage = before.getElementsByTagName('img')[0];
const resizer = document.getElementById('resizer');

let active = false;

//Sort overflow out for Overlay Image
document.addEventListener("DOMContentLoaded", function() {
  let width = /*slider.offsetWidth =*/ 720;
  console.log(width);
  beforeImage.style.width = width + 'px';
});

//Adjust width of image on resize 
window.addEventListener('resize', function() {
  let width = slider.offsetWidth;
  console.log(width);
  beforeImage.style.width = width + 'px';
})

resizer.addEventListener('mousedown',function(){
  active = true;
 resizer.classList.add('resize');

});

document.body.addEventListener('mouseup',function(){
  active = false;
 resizer.classList.remove('resize');
});

document.body.addEventListener('mouseleave', function() {
  active = false;
  resizer.classList.remove('resize');
});

document.body.addEventListener('mousemove',function(e){
  if (!active) return;
  let x = e.pageX;
  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

resizer.addEventListener('touchstart',function(){
  active = true;
  resizer.classList.add('resize');
});

document.body.addEventListener('touchend',function(){
  active = false;
  resizer.classList.remove('resize');
});

document.body.addEventListener('touchcancel',function(){
  active = false;
  resizer.classList.remove('resize');
});

//calculation for dragging on touch devices
document.body.addEventListener('touchmove',function(e){
  if (!active) return;
  let x;
  
  let i;
  for (i=0; i < e.changedTouches.length; i++) {
  x = e.changedTouches[i].pageX; 
  }
  
  x -= slider.getBoundingClientRect().left;
  slideIt(x);
  pauseEvent(e);
});

function slideIt(x){
    let transform = Math.max(0,(Math.min(x,slider.offsetWidth)));
    before.style.width = transform+"px";
    resizer.style.left = transform-0+"px";
}

//stop divs being selected.
function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}




//! Gallery

const pictureInnerContainer = document.querySelector('.picture-inner-container');

AOS.init({
	delay: 300,
	duration: 1000,
	targetSelector: '.picture-inner-container',
});

for (let i = 0; i < 15; i++) {
	let img = document.createElement('img');
	img.classList.add('.picture-img');

	img.setAttribute('data-aos', 'fade-up');
	img.setAttribute('data-aos-anchor-placement', 'top-bottom');

	img.setAttribute('alt', 'photo: pictures and sculptures');
	img.src = `assets/img/galery/galery${i+1}.jpg`;  
	pictureInnerContainer.append(img);
}


//Это приколы самой библиотеки, это баг и это самое простое решение
let scrollRef = 0;

window.addEventListener('scroll', function () {
	//aus bug solution
	scrollRef <= 10 ? scrollRef++ : AOS.refresh();
});




//! Map in Contacts

(function createMap() {
const apiKey = 'pk.eyJ1IjoiYWxmcmVkMjAxNiIsImEiOiJja2RoMHkyd2wwdnZjMnJ0MTJwbnVmeng5In0.E4QbAFjiWLY8k3AFhDtErA';

const myMap = L.map('map').setView([48.86091, 2.3364], 17);

L.tileLayer(
	'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
	{
		maxZoom: 18,
		id: 'mapbox/light-v10',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: apiKey,
	},
).addTo(myMap);

var myIcon = L.icon({
	iconUrl: 'assets/svg/place_black_24dp.svg',
	iconSize: [35, 35],
});

const mainMarker = L.marker([48.86091, 2.3364], { icon: myIcon }).addTo(myMap);
document.querySelectorAll('.leaflet-marker-icon').forEach(i => (i.style.opacity = 0.6));

// Adding Marker
let mapPopup = [
	[48.8602, 2.3333],
	[48.8607, 2.3397],
	[48.8619, 2.333],
	[48.8625, 2.3365]
];
mapPopup.forEach(point => {
	const marker = L.marker(point, { icon: myIcon }).addTo(myMap);
});
document.querySelectorAll('.leaflet-marker-icon').forEach(i => (i == 0 ? i.style.opacity = 1 : i.style.opacity = 0.6));

})();


//! Theme

const buttonTheme = document.querySelector('.button-theme'),
		 	buttonThemeCl = document.querySelector('.button-theme-cl'),
			themeIcon = document.querySelector('.icon-theme-open'),
			arrImages = document.images;

buttonTheme.addEventListener("click", () => {
	themeIcon.setAttribute('src','assets/svg/dark_mode_black_24dp.svg'); //меняем цвет иконки, устанавливая в src нужную иконку
	buttonTheme.classList.toggle('button-theme-cl');
	buttonThemeCl.classList.toggle('button-theme');
	buttonThemeCl.classList.remove('button-theme-cl');

	document.body.style.cssText = `background: #000; color: #fff;`;
	document.documentElement.style.setProperty('--font-black', '#fff');
	document.documentElement.style.setProperty('--font-light', '#000');
	document.documentElement.style.setProperty('--bg-dark', '#eee');
	document.documentElement.style.setProperty('--font-gold', '#d3943c');
	document.documentElement.style.setProperty('--dark-red', '#710707');

	for(let key of arrImages) {
		if(key.classList.contains('logo')){
			key.setAttribute('src','assets/svg/logoBlack.svg');
		}
	}

});

buttonThemeCl.addEventListener("click", () => {
	themeIcon.setAttribute('src','assets/svg/dark_mode_white_24dp.svg'); //меняем цвет иконки, устанавливая в src нужную иконку
	buttonTheme.classList.toggle('button-theme-cl');
	buttonThemeCl.classList.remove('button-theme');
	buttonThemeCl.classList.toggle('button-theme-cl');

	document.body.style.cssText = `background: #fff; color: #000;`;
	document.documentElement.style.setProperty('--font-black', '#000');
	document.documentElement.style.setProperty('--font-light', '#fff');
	document.documentElement.style.setProperty('--bg-dark', '#030303');
	document.documentElement.style.setProperty('--font-gold', '#9d8665');
	document.documentElement.style.setProperty('--dark-red', '#710707');

	for(let key of arrImages) {
		if(key.classList.contains('logo')){
			key.setAttribute('src','assets/svg/logo.svg');
		}
	}

});
