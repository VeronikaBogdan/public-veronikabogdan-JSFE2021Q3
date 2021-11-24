const mainScreen = document.querySelector('.main-screen');
const artists = document.querySelector('.artists');
const pictures = document.querySelector('.pictures');
const settings = document.querySelector('.settings');


artists.addEventListener('click', event => {
	mainScreen.classList.add('hide');

})

pictures.addEventListener('click', event => {
	mainScreen.classList.add('hide');
})


