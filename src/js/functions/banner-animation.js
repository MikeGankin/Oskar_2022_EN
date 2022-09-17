import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(CustomEase);

export const bannerAnimation = () => {
    let oskar = document.querySelector('.oskar');
    let hartmann = document.querySelector('.hartmann');
    let unicorn = document.querySelector('.unicorn');
    
    let tl = gsap.timeline();
    CustomEase.create('cubic', '.250, .460, .450, .940');

    tl.to(oskar, {y: 0, opacity: 1, duration: 0.4, ease: 'cubic'}, '+=0.1');
    tl.to(hartmann, {y: 0, opacity: 1, duration: 0.4, ease: 'cubic'});
    tl.to(unicorn, {y: 0, opacity: 1, duration: 0.4, ease: 'cubic'});
}

