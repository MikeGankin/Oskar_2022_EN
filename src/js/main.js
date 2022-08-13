import LocomotiveScroll from 'locomotive-scroll';
import MobileDetect from 'mobile-detect';
import {debouncedMenuAnimation} from "./functions/menu-animation";
import {player} from "./functions/player";
import {bannerAnimation} from "./functions/banner-animation";
import {collapseSection} from './functions/text-limiter';
import {expandSection} from './functions/text-limiter';
import {vhMobile} from './functions/vh-mobile';

//Переменные
let burger = document.querySelector('.menu__btn');
let menu = document.querySelector('.table-of-content__list');
let main = document.querySelector('main');
let sections = document.querySelectorAll('section');
let tocLinks = document.querySelectorAll('.table-of-content__link');
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

// Слежка за пересечением вьюпорта
const observer = new IntersectionObserver((entries) => {
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
  scroll.scrollTo(targetId, { offset: -25 });
}
// Функция схлопывания абзацев
const textCollapser = (e) => {
  let target = e.target;
  if (target.tagName === 'BUTTON') {
    if (target.parentNode.querySelector('.limiter').hasAttribute('data-collapsed')) {
      target.parentNode.querySelector('.limiter').removeAttribute('data-collapsed')
      expandSection(target.parentNode.querySelector('.limiter'))
      target.textContent = 'Read less';
      target.classList.remove('collapsed');
    } else {
      target.parentNode.querySelector('.limiter').setAttribute('data-collapsed', '')
      collapseSection(target.parentNode.querySelector('.limiter'))
      target.textContent = 'Read more';
      target.classList.add('collapsed');
    }
  }
}

// Функция переключения навигации по скролу
const sectionObserver = () => {
  let arr = Array.from(sections);
  let shifted = arr.slice(1, 11);
  shifted.forEach(element => {
    observer.observe(element)
  });
}
sectionObserver();

const vhFixer = () => {
  if (detect.mobile()) {
    vhMobile(windowInnerWidth);
    window.addEventListener('resize', vhMobile);
  }
}
vhFixer();

//События
menu.addEventListener('click', handleClick)
burger.addEventListener('click', debouncedMenuAnimation);
window.addEventListener('load', player, bannerAnimation, {once:true});
main.addEventListener('click', textCollapser);
