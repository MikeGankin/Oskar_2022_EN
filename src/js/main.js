import LocomotiveScroll from 'locomotive-scroll';
import MobileDetect from 'mobile-detect';
import {debouncedMenuAnimation} from "./functions/menu-animation";
import {player} from "./functions/player";
import {bannerAnimation} from "./functions/banner-animation";
import {debouncedTextCollapser} from './functions/text-limiter';
import {vhMobile} from './functions/vh-mobile';

//Переменные
const burger = document.querySelector('.menu__btn');
const menu = document.querySelector('.table-of-content__list');
const main = document.querySelector('main');
const sections = document.querySelectorAll('section');
const tocLinks = document.querySelectorAll('.table-of-content__link');
const scrollUp = document.querySelector('.scroll-up');
const footer = document.querySelector('.footer');
let windowInnerWidth = 0;

// Конструкторы
// Управление скроллом
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  tablet: {
    smooth: false,
  },
  smartphone: {
    smooth: false,
  }
});

// Обновление скрола при изменении высоты элементов на странице
new ResizeObserver(() => scroll.update()).observe(document.querySelector("[data-scroll-container]"))

// Слежка за пересечением вьюпорта для навигации
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      tocLinks.forEach(link => {
        if (link.getAttribute('href').replace('#', '') === entry.target.id) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  });
}, {
  threshold: 0.6
});

// Слежка за пересечением вьюпорта для кнопки вверх
const scrollUpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      scrollUp.classList.add('scroll-up--active')
    } else {
      scrollUp.classList.remove('scroll-up--active')
    }
  })}, {
    threshold: 0.9
});
scrollUpObserver.observe(footer);

// Слежка за пересечением вьюпорта для смены цвета скрол-бара
const scrollBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelector('.c-scrollbar_thumb').style.backgroundColor = '#000000';
    } else {
      document.querySelector('.c-scrollbar_thumb').style.backgroundColor = '';
    }
  })}, {
    threshold: 0.2
});
scrollBarObserver.observe(footer);

// Проверка девайса
let detect = new MobileDetect(window.navigator.userAgent);

//Функции

// Функция переключения навигации по клику
const handleClick = (e) => {
  e.preventDefault();
  let target = e.target;
  if (target.tagName !== 'A') return;
  let targetId = e.target.getAttribute('href');
  tocLinks.forEach((element)=> {
    element.classList.remove('active');
  })
  scroll.scrollTo(targetId);
}

// Функция переключения навигации по скролу
const sectionObserver = () => {
  let arr = Array.from(sections);
  let shifted = arr.slice(1, 11);
  shifted.forEach(element => {
    navObserver.observe(element)
  });
}
sectionObserver();

// Функция полноэкранного хака
const vhFixer = () => {
  if (detect.mobile()) {
    vhMobile(windowInnerWidth);
    window.addEventListener('resize', vhMobile);
  }
}
vhFixer();

// Функция скрола страницы вверх
const scrollUpper = () => {
    scrollUp.classList.remove('scroll-up--active');
    scroll.scrollTo('top');
}

//События
menu.addEventListener('click', handleClick)
burger.addEventListener('click', debouncedMenuAnimation);
window.addEventListener('load', player, bannerAnimation);
main.addEventListener('click', debouncedTextCollapser);
scrollUp.addEventListener('click', scrollUpper);
