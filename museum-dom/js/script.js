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




// Map in Contacts

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


// Theme

const buttonTheme = document.querySelector('.button-theme'),
		 	buttonThemeCl = document.querySelector('.button-theme-cl'),
			themeIcon = document.querySelector('.icon-theme-open');

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

});


