import gsap from "gsap";
import {debounce} from './debounce';

// Таймлайн
let tl = gsap.timeline();

 // Переменные
let line1 = document.querySelector('.btn__line--1');
let line2 = document.querySelector('.btn__line--2');
let line3 = document.querySelector('.btn__line--3');
let menuContent = document.querySelector('.navigation');
let menuItems = document.querySelector('.navigation__list').children;
let menuCommunication = document.querySelector('.menu__communication').children;

// Разворот массива
const createReversedArray = (collection) => {
  let newArray = Array.from(collection);
  let reversed = newArray.reverse();
  return Array.from(reversed);
}

// Анимация бургера в крестик
const burgerToCross = () => {
  line1.style.transform = 'translateY(220%) rotate(45deg)';
  line2.style.transform = 'translateY(-50%) scaleX(0)';
  line3.style.transform = 'translateY(-240%) rotate(-45deg)';
}

// Анимация крестика в бургер
const crossToBurger = () => {
  line1.style.transform = '';
  line2.style.transform = '';
  line3.style.transform = '';
}

// Функция открытия меню
const menuOpen = () => {
  burgerToCross();

  // Анимация задника меню
  tl.to(menuContent, {scaleY: 1});

  // Анимация ссылок
  tl.to(menuItems, {stagger: 0.1, opacity: 1, xPercent: 0}, '+=0.2');

  // Анимация контактов
  tl.to(menuCommunication, {stagger: 0.1, opacity: 1});
}

// Функция закрытия меню
const menuClose = () => {
  crossToBurger();

  // Анимация контактов
  tl.fromTo(createReversedArray(menuCommunication), {stagger: 0.1, opacity: 1}, {stagger: 0.1, opacity: 0});

  // Анимация ссылок
  tl.fromTo(createReversedArray(menuItems), {stagger: 0.1, opacity: 1, xPercent: 0}, {stagger: 0.1, opacity: 0, xPercent: -50});

  // Анимация задника меню
  tl.fromTo(menuContent, {scaleY: 1}, {scaleY: 0}, '+=0.3');
}

// Функция анимации меню
const menuAnimation = () => {
  let menu = document.querySelector('.menu');
  menu.classList.toggle('open');
  if(menu.classList.contains('open')) {
    burgerToCross();
    menuOpen();
  } else {
    menuClose();
  }
}

// Debouced
export const debouncedMenuAnimation = debounce(menuAnimation, 200);
