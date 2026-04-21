import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export function useRevealTimeline(scope, options = {}) {
  const { start = 'top 80%', once = true, stagger = 0.12 } = options;

  const context = gsap.context(() => {
    const targets = scope.querySelectorAll('[data-reveal]');

    if (!targets.length) return;

    gsap.fromTo(
      targets,
      { y: 28, opacity: 0, filter: 'blur(12px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        ease: 'power3.out',
        stagger,
        scrollTrigger: {
          trigger: scope,
          start,
          once,
        },
      },
    );
  }, scope);

  return () => context.revert();
}

export function useSectionLines(scope) {
  const context = gsap.context(() => {
    const lines = scope.querySelectorAll('[data-line]');
    lines.forEach((line, index) => {
      gsap.fromTo(
        line,
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 0.9,
          ease: 'power3.out',
          delay: index * 0.05,
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            once: true,
          },
        },
      );
    });
  }, scope);

  return () => context.revert();
}