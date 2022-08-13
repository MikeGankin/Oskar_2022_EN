export const vhMobile = () => {
  let windowInnerWidth = 0;
  const currentWindowInnerWidth = window.innerWidth;
  if (windowInnerWidth === 0 || currentWindowInnerWidth !== windowInnerWidth) {
    windowInnerWidth = currentWindowInnerWidth;
    const windowInnerHeight = window.innerHeight;
    document.documentElement.style.setProperty('--windowInnerHeight', `${windowInnerHeight}px`);
  }
}

