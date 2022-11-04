"use strict";

const pictureInnerContainer = document.querySelector(
  ".picture-inner-container"
);
const img = document.createElement("img");
img.classList.add("gallery-img");
// img.src = `assets/img/galery/galery1.jpg`;
// img.alt = `galery1`;
// pictureInnerContainer.append(img);

// Чтобы добавить все изображения, создайте массив с их адресами,
// рандомно перемешайте его функцией shuffle(array)
// и используя метод .map() пройдитесь по массиву,
// добавляя каждое изображение в контейнер.

// Объедините весь код в одну функцию и вызовите её.
// Теперь каждый раз при перезагрузке страницы у вас будет
// новое рандомное расположение изображений в галерее.

const arrImg = [];

arrImg.forEach(function (item, i, arrImg) {
  // item
  console.log(item);
  item.img.src = `assets/img/galery/galery${++i}.jpg`;
  item.img.alt = `galery${++i}`;
  pictureInnerContainer.append(img);
});

console.log(arrImg);
