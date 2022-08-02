let line1 = document.querySelector('.btn__line--1');
let line2 = document.querySelector('.btn__line--2');
let line3 = document.querySelector('.btn__line--3');

const burgerToCross = () => {
  line1.style.transform = 'translateY(220%) rotate(45deg)';
  line2.style.transform = 'translateY(-50%) scaleX(0)';
  line3.style.transform = 'translateY(-240%) rotate(-45deg)';
}
const crossToBurger = () => {
  line1.style.transform = '';
  line2.style.transform = '';
  line3.style.transform = '';
}

const menuOpen = () => {
  let menuContent = document.querySelector('.menu__content');
  let menuItems = document.querySelectorAll('.menu__item');
  let menuCommunication = Array.from(document.querySelector('.menu__communication').children);
  let menuSocials = Array.from(document.querySelector('.menu__socials').children);
  let menuContacts = menuCommunication.concat(menuSocials);
  burgerToCross();
  menuContent.style.transform = 'translateX(-50%) scaleY(1)';
  setTimeout(()=> {
    menuItems.forEach((element, index) => {
      element.style.animationName = 'slideIn';
      element.style.animationDelay = `${index}00ms`;
    });
  }, 500)
  setTimeout(()=> {
    menuContacts.forEach((element, index) => {
      element.style.animationName = 'fadeIn';
      element.style.animationDelay = `${index}00ms`;
    });
  }, 1000)
}

export const menuClose = () => {
  let menuContent = document.querySelector('.menu__content');
  let menuItems = document.querySelectorAll('.menu__item');
  let menuCommunication = Array.from(document.querySelector('.menu__communication').children);
  let menuSocials = Array.from(document.querySelector('.menu__socials').children);
  let menuContacts = menuCommunication.concat(menuSocials);
  menuItems.forEach((element, index) => {
    element.style.animationName = 'slideOut';
    element.style.animationDelay = `${index}00ms`;
  });
  let delayString = menuItems[menuItems.length - 1].style.animationDelay;
  let delayNumber = parseInt(delayString, 10);
  setTimeout(()=> {
    crossToBurger();
    menuContent.style.transform = '';
  }, delayNumber + 400);
  setTimeout(()=> {
    menuContacts.forEach((element, index) => {
      element.style.animationName = 'fadeOut';
      element.style.animationDelay = `${index}00ms`;
    });
  }, 600)
}

export const menuAnimation = () => {
    let menu = document.querySelector('.menu');
    menu.classList.toggle('open');
    if(menu.classList.contains('open')) {
      burgerToCross();
      menuOpen();
    } else {
      menuClose();
    }
}

