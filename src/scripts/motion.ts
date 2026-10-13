import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
export const finePointer = window.matchMedia('(pointer: fine)').matches;

export const EASE_DRAFT = 'expo.inOut';

/** Single smooth-scroll instance shared by every component on the page. */
export const lenis: Lenis | null = reducedMotion
  ? null
  : new Lenis({ lerp: 0.09, anchors: { offset: -64 }, autoRaf: false });

if (lenis) {
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/** Lock page scroll while a dialog is open. */
export function lockScroll(locked: boolean) {
  document.documentElement.classList.toggle('dialog-open', locked);
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  } else {
    document.documentElement.style.overflow = locked ? 'hidden' : '';
  }
}

/** Resolves when the first-visit preloader has finished (or immediately if none). */
export function afterPreloader(): Promise<void> {
  if (!document.documentElement.classList.contains('is-loading')) return Promise.resolve();
  return new Promise((resolve) => window.addEventListener('preloader:done', () => resolve(), { once: true }));
}

/** Smooth or instant scroll to a y position. */
export function scrollToY(y: number, duration = 1.1) {
  if (lenis) lenis.scrollTo(y, { duration });
  else window.scrollTo({ top: y });
}

// Generic scroll reveal: anything marked [data-sr] rises in once as it enters the viewport.
if (!reducedMotion) {
  ScrollTrigger.batch('[data-sr]', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
  });
}

// Touch screens have no hover, so plates take on colour while they sit in the middle of the screen.
if (!finePointer) {
  document.querySelectorAll('.mono-img').forEach((img) =>
    ScrollTrigger.create({ trigger: img, start: 'top 75%', end: 'bottom 25%', toggleClass: 'is-color' }),
  );
}
