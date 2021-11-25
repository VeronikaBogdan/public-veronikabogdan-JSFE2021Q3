const mainScreen = document.querySelector('.main-screen');
const artists = document.querySelector('.artists');
const pictures = document.querySelector('.pictures');

const settings = document.querySelector('.settings');
const settingsBtn = document.querySelector('.settings-btn');
const saveBtn = document.querySelector('.save-btn');

const categories = document.querySelector('.categories');
const homeBtn = document.querySelector('.home-btn');
const scoreBtn = document.querySelector('.score-btn');

//! Main Screen
artists.addEventListener('click', event => {
	mainScreen.classList.add('hide');
	categories.classList.remove('hide');

})

pictures.addEventListener('click', event => {
	mainScreen.classList.add('hide');
})

settingsBtn.addEventListener('click', event => {
	mainScreen.classList.add('hide');
	settings.classList.remove('hide');
})

//! Settings
saveBtn.addEventListener('click', event => {
	mainScreen.classList.remove('hide');
	settings.classList.add('hide');
})

//! Categories 
homeBtn.addEventListener('click', event => {
	mainScreen.classList.remove('hide');
	categories.classList.add('hide');
})

