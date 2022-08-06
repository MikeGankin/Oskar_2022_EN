export const collapseSection = (element) => {
  // получаем высоту внутреннего содержимого элемента, независимо от его фактического размера
  let sectionHeight = element.scrollHeight;

  // временно отключаем CSS transitions
  let elementTransition = element.style.transition;
  element.style.transition = '';

  // на следующем кадре (как только предыдущий стиль применится),
  // возвращаем высоту элемента на изначальный размер, чтобы
  // неменялось значение 'auto'
  requestAnimationFrame(()=> {
    element.style.height = sectionHeight + 'px';
    element.style.transition = elementTransition;

    // на следующем кадре (как только предыдущий стиль применится),
    // ставим значение transition to height: 0
    requestAnimationFrame(()=> {
      element.style.height = 0 + 'px';
    });
  });
}

export const expandSection = (element) => {
  // get the height of the element's inner content, regardless of its actual size
  let sectionHeight = element.scrollHeight;

  // have the element transition to the height of its inner content
  element.style.height = sectionHeight + 'px';

  // when the next css transition finishes (which should be the one we just triggered)
  const heightNull = ()=> {
    element.style.height = null;
  }
  element.addEventListener('transitionend', heightNull);
  element.removeEventListener('transitionend', heightNull);
}

