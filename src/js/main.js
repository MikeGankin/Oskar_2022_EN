import LocomotiveScroll from 'locomotive-scroll';
import {menuAnimation} from "./functions/menu-animation";
import {player} from "./functions/player";
import {bannerAnimation} from "./functions/banner-animation";
import {collapseSection} from './functions/text-limiter';
import {expandSection} from './functions/text-limiter';
import { start } from '@popperjs/core';

//Управление скроллом
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true
});
scroll.update();

//Переменные
let burger = document.querySelector('.menu__btn');
let menu = document.querySelector('.table-of-content__list');
let items = document.querySelectorAll('.table-of-content__item a');
let moreBtn = document.querySelector('.more-btn');
let section = document.querySelector('.limiter');
let line = document.querySelector('.table-of-content__line');

//Функции
collapseSection(section);

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
const textCollapser = () => {
  let isCollapsed = section.getAttribute('data-collapsed') === 'true';

  if(isCollapsed) {
    expandSection(section)
    section.setAttribute('data-collapsed', 'false')
  } else {
    collapseSection(section)
  }
}

//События
menu.addEventListener('click', handleClick)
burger.addEventListener('click', menuAnimation);
window.addEventListener('load', player, bannerAnimation, {once:true});
moreBtn.addEventListener('click', textCollapser);

