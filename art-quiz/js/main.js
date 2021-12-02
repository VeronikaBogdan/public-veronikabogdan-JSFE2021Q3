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

//! 


function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.ceil(max);
  return Math.round(Math.random() * (max - min)) + min;
}

console.log(getRandomNum(0, 9));




// const genres = ['portrait', 'landscape', 'still life'];



// const cat = document.querySelector('.cat');
// const ul = document.createElement("ul");
// const li = document.createElement("li"); 
// ul.classList.add('categories__list');
// li.classList.add('categories__item');

// cat.append(ul);
// // ul.append(li);

// genres.forEach((item, i, arr) => {
//   console.log(item);
//   console.log(li);
//   li.innerHTML = `
//   <div class="numbers">
//     <p class="number">${i+1}</p>
//     <p class="item_score"></p>
//   </div>
//   <p>${item.toUpperCase()}</p>
//   <img class="category__img" src="assets/img/${i}.jpg" alt="photo: ${item}">
//   `
//   ul.append(li);
//   console.log(li);
// });

