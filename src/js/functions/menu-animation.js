import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);
import { debounce } from './debounce';

// Таймлайны
let menuTl = gsap.timeline();
let langTl = gsap.timeline();
CustomEase.create('cubic', '.250, .460, .450, .940');


 // Переменные
const line1 = document.querySelector('.btn__line--1');
const line2 = document.querySelector('.btn__line--2');
const line3 = document.querySelector('.btn__line--3');
const menuContent = document.querySelector('.navigation');
const menuItems = document.querySelector('.navigation__list').children;
const menuCommunication = document.querySelector('.menu__communication').children;
const menuLangList = document.querySelector('.menu__lang-list');
const languages = document.querySelectorAll('.menu__lang-item');
const mobileDeviceDetector = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

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
  menuTl.to(menuContent, {scaleY: 1, duration: 0.4, ease: 'cubic'});

  // Анимация ссылок
  menuTl.to(menuItems, {stagger: 0.1, opacity: 1, x: 0, duration: 0.4, ease: 'cubic'});

  // Анимация контактов
  menuTl.to(menuCommunication, {stagger: 0.1, opacity: 1, duration: 0.4, ease: 'cubic'});
}

// Функция закрытия меню
const menuClose = () => {
  crossToBurger();

  // Анимация контактов
  menuTl.fromTo(createReversedArray(menuCommunication), {stagger: 0.1, opacity: 1, duration: 0.3, ease: 'cubic'}, {stagger: 0.1, opacity: 0, duration: 0.4, ease: 'cubic'});

  // Анимация ссылок
  menuTl.fromTo(createReversedArray(menuItems), {stagger: 0.1, opacity: 1, x: 0, duration: 0.3, ease: 'cubic'}, {stagger: 0.1, opacity: 0, x: 100, duration: 0.4, ease: 'cubic'});

  // Анимация задника меню
  menuTl.fromTo(menuContent, {scaleY: 1, duration: 0.4, ease: 'cubic'}, {scaleY: 0, duration: 0.3, ease: 'cubic'});
}

// Функция отключения скрола
const disableScroll = () => {
  let pagePosition = window.scrollY;
	document.body.classList.add('disable-scroll');
	document.body.dataset.position = pagePosition;
	document.body.style.top = -pagePosition + 'px';
}

// Функция включения скрола
const enableScroll = () => {
  let pagePosition = parseInt(document.body.dataset.position, 10);
	document.body.style.top = 'auto';
	document.body.classList.remove('disable-scroll');
	window.scroll({ top: pagePosition, left: 0 });
	document.body.removeAttribute('data-position');
}

// Функция анимации меню
const menuAnimation = () => {
  let menu = document.querySelector('.menu');
  menu.classList.toggle('open');
  if (menuLangList.classList.contains('open')) {
    langToggleClose();
    menuLangList.classList.remove('open');
  }
  if(menu.classList.contains('open')) {
    if (mobileDeviceDetector) {
      disableScroll();
    }
    burgerToCross();
    menuOpen();
  } else {
    menuClose();
    if (mobileDeviceDetector) {
      enableScroll();
    }
  }
}

// Функция открытия меню языков на мобильных девайсах
const langToggleOpen = () => {
  langTl.to(menuLangList, {stagger: 0.1, scaleX: 1, opacity: 1, duration: 0.4, ease: 'cubic'});
  langTl.to(createReversedArray(languages), {stagger: 0.1, opacity: 1, duration: 0.4, ease: 'cubic'}, '+=0.1');
}

// Функция закрытия меню языков на мобильных девайсах
const langToggleClose = () => {
  langTl.fromTo(languages, {stagger: 0.1, opacity: 1, duration: 0.4, ease: 'cubic'}, {stagger: 0.1, opacity: 0, duration: 0.4, ease: 'cubic'});
  langTl.fromTo(menuLangList, {stagger: 0.1, scaleX: 1, duration: 0.4, ease: 'cubic'}, {stagger: 0.1, scaleX: 0, duration: 0.4, ease: 'cubic'});
}

// Функция анимации меню языков на мобильных девайсах
const langMenuAnimation = () => {
  menuLangList.classList.toggle('open');
  if(menuLangList.classList.contains('open')) {
    langToggleOpen();
  } else {
    langToggleClose();
  }
}

// Функция закрытия меню языков при скроле на мобильных девайсах
export const langToggleScrollClose = () => {
  let prevScrollpos = window.pageYOffset;
  if (prevScrollpos > 100 && menuLangList.classList.contains('open')) {
    langToggleClose();
    menuLangList.classList.remove('open');
    window.removeEventListener('scroll', langToggleScrollClose)
  } 
}

// Debounced
export const debouncedMenuAnimation = debounce(menuAnimation, 200);
export const debouncedLangMenuAnimation = debounce(langMenuAnimation, 200);