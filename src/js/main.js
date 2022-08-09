import LocomotiveScroll from 'locomotive-scroll';
import {menuAnimation} from "./functions/menu-animation";
import {player} from "./functions/player";
import {bannerAnimation} from "./functions/banner-animation";
import {collapseSection} from './functions/text-limiter';
import {expandSection} from './functions/text-limiter';

//Переменные
let burger = document.querySelector('.menu__btn');
let menu = document.querySelector('.table-of-content__list');
let main = document.querySelector('main');
let sections = document.querySelectorAll('section');
let tocLinks = document.querySelectorAll('.table-of-content__link');

// Управление скроллом
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});

// Обновление скрола при изменении высоты элементов на странице
new ResizeObserver(() => scroll.update()).observe(document.querySelector("[data-scroll-container]"))

// Переключение навигации по скролу
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
  threshold: 0.7
});
const sectionObserver = () => {
  let arr = Array.from(sections);
  let shifted = arr.slice(1, 11);
  shifted.forEach(element => {
    observer.observe(element)
  });
}
sectionObserver();

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
      target.textContent = 'Read less'
    } else {
      target.parentNode.querySelector('.limiter').setAttribute('data-collapsed', '')
      collapseSection(target.parentNode.querySelector('.limiter'))
      target.textContent = 'Read more'
    }
  }
}

//События
menu.addEventListener('click', handleClick)
burger.addEventListener('click', menuAnimation);
window.addEventListener('load', player, bannerAnimation, {once:true});
main.addEventListener('click', textCollapser);
