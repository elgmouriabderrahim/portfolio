import { onBeforeUnmount, onMounted } from 'vue';

export function useLenis() {
  let lenis;
  let rafId = 0;

  onMounted(async () => {
    const { default: Lenis } = await import('lenis');

    lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.08,
    });

    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);
  });

  onBeforeUnmount(() => {
    if (rafId) cancelAnimationFrame(rafId);
    if (lenis) lenis.destroy();
  });

  return {
    scrollTo(target) {
      if (lenis) lenis.scrollTo(target, { offset: -88 });
    },
    get instance() {
      return lenis;
    },
  };
}