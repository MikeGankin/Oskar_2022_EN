import {debounce} from './debounce';

const collapseSection = (element) => {
  // получаем высоту внутреннего содержимого элемента, независимо от его фактического размера
  let sectionHeight = element.scrollHeight;

  // временно отключаем CSS transitions
  let elementTransition = element.style.transition;
  element.style.transition = '';

  // на следующем кадре (как только предыдущий стиль применится),
  // возвращаем высоту элемента на изначальный размер, чтобы
  // неменялось значение 'auto'
  requestAnimationFrame(()=> {
    // element.style.height = section0Height + 'px';
    element.style.height = 'fit-content';
    element.style.transition = elementTransition;

    // на следующем кадре (как только предыдущий стиль применится),
    // ставим значение transition to height: 0
    requestAnimationFrame(()=> {
      element.style.height = 0 + 'px';
    });
  });
}

const expandSection = (element) => {
  // get the height of the element's inner content, regardless of its actual size
  let sectionHeight = element.scrollHeight;

  // have the element transition to the height of its inner content
  // element.style.height = sectionHeight + 'px';
  element.style.height = 'fit-content';

  // when the next css transition finishes (which should be the one we just triggered)
  const heightNull = ()=> {
    element.style.height = null;
  }
  element.addEventListener('transitionend', heightNull);
  element.removeEventListener('transitionend', heightNull);
}

const textCollapser = (e) => {
  let target = e.target;
  if (!target.tagName === 'button') return;
  if (target.parentElement.querySelector('.limiter').hasAttribute('data-collapsed')) {
    target.parentNode.querySelector('.limiter').removeAttribute('data-collapsed')
    expandSection(target.parentNode.querySelector('.limiter'))
    target.textContent = 'Read less';

  } else {
    target.parentNode.querySelector('.limiter').setAttribute('data-collapsed', '')
    collapseSection(target.parentNode.querySelector('.limiter'))
    target.textContent = 'Read more';
  }
}

// Debounced
export const debouncedTextCollapser = debounce(textCollapser, 200);

