import { offset } from '@popperjs/core';
import {menuClose} from "../functions/menu-animation";
import LocomotiveScroll from 'locomotive-scroll';
const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true,

    smartphone: {smooth: true}
  }
);
new ResizeObserver(() => scroll.update()).observe(document.querySelector("[data-scroll-container]"))

// const menuLink = document.getElementById('#for-people');
// const target = document.getElementById('#for-people-link');
// menuLink.addEventListener('click', ()=> {
//   scroll.scrollTo(target, {offset: -150});
//   menuClose();
// });
