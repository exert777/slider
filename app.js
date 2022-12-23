"use strict";

let container = document.querySelector(".container");
let slider = document.querySelector(".slider");
let slide_item = document.querySelectorAll(".slide");
let navigation = document.querySelectorAll(".navigation");

let activeOrder = 0;

init();

function init() {
  for (let i = 0; i < slide_item.length; i++) {
    slide_item[i].dataset.order = i;
    slide_item[i].style.transform = "translate(-50%, -50%)";
    slide_item[i].addEventListener("click", clickHandler);
  }

  navigation.forEach((el) => {
    el.addEventListener("click", clickHandlerNav);
  });

  /* Активным элементом будет центральный элемент слайдера, при прокрутке слайдера
  центральным элементом будет становится следующий или предыдущий элемент */
  activeOrder = Math.floor(slide_item.length / 2);

  update();
}

function update() {
  /* .getBoundingClientRect метод, возвращающий информацию о положении элемента на
    странице(ширину, длинну, высоту и координаты и т.д.) */
  /* ниже приведен метод деструктуризации */
  const { width, height } = container.getBoundingClientRect();

  /* a и b координаты центрального слайда, от них будет производится смещение слайдов
  влево и вправо */
  const a = width / 2;
  const b = height / 2;

  /* Расчет угла между радиусами элипса, проведенными к центру каждого слайда, 
  в зависимости от количества слайдов. Чем больше слайдов - тем меньше угол,
  а значит слайды ближе друг к другу */
  const delta = Math.PI / 2 / slide_item.length;

  for (let i = 0; i < slide_item.length; i++) {
    const leftslide = document.querySelector(
      `.slide[data-order="${activeOrder - i}"]`
    );

    if (leftslide) {
      /* width / 2 - смещение слайда  x слайда в центр контейнера
          a - координата центра слайда по оси x после смещения его в центр контейнера
          a * Math.cos((Math.PI * 3) / 2 - delta * i) - координата центра каждого 
          i-того контейнера по оси x, где
           (Math.PI * 3) / 2 - означает что взят сектор либо от PI до 3/2 PI 
           (если - delta * i), либо от 3/2 PI до 2PI (если + delta * i)

         */
      leftslide.style.zIndex = slide_item.length - i;
      leftslide.style.opacity = 1 - (1.8 * i) / slide_item.length;

      leftslide.style.left = `${
        width / 2 + a * Math.cos((Math.PI * 1) / 2 - delta * i)
      }px`;
      leftslide.style.top = `${
        -b * Math.sin((Math.PI * 3) / 2 - delta * i * 1.1)
      }px`;
    }

    const rightslide = document.querySelector(
      `.slide[data-order="${activeOrder + i}"]`
    );

    if (rightslide) {
      rightslide.style.zIndex = slide_item.length - i;
      rightslide.style.opacity = 1 - (1.8 * i) / slide_item.length;

      rightslide.style.left = `${
        width / 2 + a * Math.cos((Math.PI * 1) / 2 + delta * i)
      }px`;

      rightslide.style.top = `${
        -b * Math.sin((Math.PI * 3) / 2 + delta * i * 1.1)
      }px`;
    }
  }
}

/* Функция присваевает переменной activeOrder порядковый номер слайда, на котором
сработало событие click и вызывает функцию update что бы браузер принял изменение 
и сделал новый activeOrder по центру слайда, а остальные выстроил относительного него */
function clickHandler() {
  /* ключевое слово this содержит ссылку на элемент, на котором
  сработало событие click*/
  const order = +this.dataset.order;
  activeOrder = order;
  update();
}

function clickHandlerNav(e) {
  const { dir } = this.dataset;
  e.preventDefault();
  if (dir === "prev") {
    activeOrder = Math.max(0, activeOrder - 1);
  } else if (dir === "next") {
    activeOrder = Math.min(slide_item.length - 1, activeOrder + 1);
  }
  update();
}

/* сделать перенос тап тачем */
