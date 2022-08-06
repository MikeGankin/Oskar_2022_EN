import LocomotiveScroll from 'locomotive-scroll';
import {menuAnimation} from "./functions/menu-animation";
import {player} from "./functions/player";
import {bannerAnimation} from "./functions/banner-animation";
import {collapseSection} from './functions/text-limiter';
import {expandSection} from './functions/text-limiter';
import { start } from '@popperjs/core';

// Управление скроллом
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});
// Обновление скрола при изменении высоты элементов на странице
new ResizeObserver(() => scroll.update()).observe(document.querySelector("[data-scroll-container]"))

//Переменные
let burger = document.querySelector('.menu__btn');
let menu = document.querySelector('.table-of-content__list');
let items = document.querySelectorAll('.table-of-content__item a');
let section = document.querySelector('section');
let line = document.querySelector('.table-of-content__line');
let main = document.querySelector('main');

//Функции

const handleClick = (e) => {
  e.preventDefault();
  let target = e.target;
  if (target.tagName !== 'A') return;
  let targetId = e.target.getAttribute('href');
  items.forEach((element)=> {
    element.classList.remove('active');
    line.style.transform = 'translateY(106px)'
  })
  target.classList.add('active');
  scroll.scrollTo(targetId, { offset: -100 })
}
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

