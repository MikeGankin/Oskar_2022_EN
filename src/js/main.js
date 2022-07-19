import './vendor/locomotive-scroll.js';
import {menuAnimation} from "./functions/menu-animation";
import {player} from "./functions/player";
import {bannerAnimation} from "./functions/banner-animation";

const burger = document.querySelector('.menu__btn');

burger.addEventListener('click', menuAnimation);
window.addEventListener('load', player(), bannerAnimation);



