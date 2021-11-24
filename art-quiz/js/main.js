const mainScreen = document.querySelector('.main-screen');
const artists = document.querySelector('.artists');
const pictures = document.querySelector('.pictures');

const settings = document.querySelector('.settings');
const settingsBtn = document.querySelector('.settings-btn');
const saveBtn = document.querySelector('.save-btn');

const categories = document.querySelector('.categories');


artists.addEventListener('click', event => {
	mainScreen.classList.add('hide');

})

pictures.addEventListener('click', event => {
	mainScreen.classList.add('hide');
})

settingsBtn.addEventListener('click', event => {
	mainScreen.classList.add('hide');
	settings.classList.remove('hide');
})

saveBtn.addEventListener('click', event => {
	mainScreen.classList.remove('hide');
	settings.classList.add('hide');
})