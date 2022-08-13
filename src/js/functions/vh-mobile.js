export const vhMobile = (windowInnerWidth) => {
  const currentWindowInnerWidth = window.innerWidth;
  if (currentWindowInnerWidth !== windowInnerWidth) {
    windowInnerWidth = currentWindowInnerWidth;
    const windowInnerHeight = window.innerHeight;
    document.documentElement.style.setProperty('--windowInnerHeight', `${windowInnerHeight}px`);
  }
}

