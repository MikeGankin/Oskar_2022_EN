import LocomotiveScroll from 'locomotive-scroll';
import {debouncedMenuAnimation} from "./functions/menu-animation";
import {debouncedLangMenuAnimation} from "./functions/menu-animation";
import {langToggleScrollClose} from "./functions/menu-animation";
import {bannerAnimation} from "./functions/banner-animation";

//Переменные
const burger = document.querySelector('.menu__btn');
const footer = document.querySelector('.footer');
const langToggler = document.querySelector('.menu__lang-btn');
const langIndicator = langToggler.querySelector('span');
const scrollUp = document.querySelector('.scroll-up');
const mobileDeviceDetector = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
const macOsDetector = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform);

// Конструкторы

// Управление скроллом
const scrollManager = () => {
  if (!mobileDeviceDetector) {
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
    scrollUp.addEventListener('click', () => {
      scrollUp.classList.remove('scroll-up--active');
      scroll.scrollTo('top');
    });
  } else {
    scrollUp.addEventListener('click', () => {
      scrollUp.classList.remove('scroll-up--active');
      window.scrollTo(0, 0);
    });
  }
}
scrollManager();

// Слежка за пересечением вьюпорта для кнопки вверх
const scrollUpObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      scrollUp.classList.add('scroll-up--active')
    } else {
      scrollUp.classList.remove('scroll-up--active')
    }
  })}, {
    threshold: 0.5
});
scrollUpObserver.observe(footer);

//Функции

const macStyleFixer = () => {
  const blogLink = document.querySelector('.blog-link');
  const menuLangItem = document.querySelectorAll('.menu__lang-item');
  if (macOsDetector && blogLink) {
    blogLink.style.marginTop = '8px';
    menuLangItem.forEach((item) => {
      item.style.marginTop = '6px';
    })
  }
}
macStyleFixer();

// Функция хака VH
const vh = () => {
  let windowInnerWidth = 0;
  const handleResize = () => {
    const currentWindowInnerWidth = window.innerWidth;
    if (currentWindowInnerWidth !== windowInnerWidth) {
      windowInnerWidth = currentWindowInnerWidth;
      const windowInnerHeight = window.innerHeight;
      document.documentElement.style.setProperty('--windowInnerHeight', `${windowInnerHeight}px`)
    }
  }
  if (mobileDeviceDetector) {
    handleResize();
  }
}
vh();

// Функция индикации текущего языка
const langIndicatorToggler = () => {
  if (document.documentElement.lang === 'ru') {
    langIndicator.textContent = 'RU';
  }
  if (document.documentElement.lang === 'en') {
    langIndicator.textContent = 'EN';
  }
  if (document.documentElement.lang === 'de') {
    langIndicator.textContent = 'DE';
  }
}
langIndicatorToggler();

//События
burger.addEventListener('click', debouncedMenuAnimation);
langToggler.addEventListener('click', ()=> {
  if (mobileDeviceDetector && window.innerWidth < 1200) {
    debouncedLangMenuAnimation();
  }
});
window.addEventListener('load', ()=> {
  setTimeout(() => {
    bannerAnimation();
  }, 100);
});
window.addEventListener('scroll', langToggleScrollClose);





