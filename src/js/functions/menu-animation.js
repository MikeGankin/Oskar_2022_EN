import gsap from "gsap";

// Таймлайн
let tl = gsap.timeline();

 // Переменные
let line1 = document.querySelector('.btn__line--1');
let line2 = document.querySelector('.btn__line--2');
let line3 = document.querySelector('.btn__line--3');
let menuContent = document.querySelector('.menu__content');
let menuItems = document.querySelector('.menu__list').children;
let menuCommunication = document.querySelector('.menu__communication').children;
let communicationList = document.querySelector('.communication__list').children;




// Создание массива
// const createArray = (children) => {
//   return Array.from(children);
// }


// Объединение массивов
// const arrayConcatter = (children1, children2) => {
//   let array1 = Array.from(children1);
//   let array2 = Array.from(children2)
//   return array1.push(array2);
// }

// Разворот массива
// const createReversedArray = (array) => {
//   return array.reverse();
// }


const burgerToCross = () => {
  line1.style.transform = 'translateY(220%) rotate(45deg)';
  line2.style.transform = 'translateY(-50%) scaleX(0)';
  line3.style.transform = 'translateY(-240%) rotate(-45deg)';
}
const crossToBurger = () => {
  line1.style.transform = '';
  line2.style.transform = '';
  line3.style.transform = '';
}

const menuOpen = () => {
  setTimeout(() => {
    menuContent.style.display = 'flex';
  });

  burgerToCross();

  // Анимация задника меню
  tl.to(menuContent, { scaleY: 1});

  // Анимация ссылок
  tl.to(menuItems, {stagger: 0.1, opacity: 1, xPercent: 0}, '+=0.2');

  // Анимация контактов
  tl.to(menuCommunication, {stagger: 0.1, opacity: 1}, '+=0.2');
  tl.to(communicationList, {stagger: 0.1, opacity: 1});
}

export const menuClose = () => {
  crossToBurger();

  // Анимация контактов
  // tl.to(createReversedArray(arrayConcatter(communication, communicationList)), {stagger: 0.1, opacity: 0});

  // Анимация ссылок
  // tl.to(menuItems, {duration: 0.4, stagger: 0.1, opacity: 0, xPercent: -50}, '+=0.4');

  // Анимация задника меню
  // tl.to(menuContent, { scaleY: 0});
}

export const menuAnimation = () => {

    let menu = document.querySelector('.menu');
    menu.classList.toggle('open');
    if(menu.classList.contains('open')) {
      burgerToCross();
      menuOpen();
    } else {
      menuClose();
    }
}

