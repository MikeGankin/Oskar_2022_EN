export const spyScroll = () => {
    let scrollDistance = window.scrollY;

    if (window.innerWidth > 768) {
        sections.forEach((el, i) => {
            if (el.offsetTop - header.clientHeight <= scrollDistance) {
                tocLink.forEach((el) => {
                    if (el.classList.contains('active')) {
                        el.classList.remove('active');
                    }
                });

                document.querySelectorAll('.table-of-content__item')[i].querySelector('a').classList.add('active');
            }
        });
    }
}
