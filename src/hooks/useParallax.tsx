import type { RefObject } from 'react';
import { useEffect } from 'react';

// Hook: apply parallax transforms to elements inside a container that have a `data-parallax` attribute.
// data-parallax should be a number (e.g. 0.05, 0.2) describing movement depth.
// The hook respects `prefers-reduced-motion` and uses requestAnimationFrame for smooth updates.
export default function useParallax(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;

    if (typeof window === 'undefined') return;
    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) return; // respect user preference

    let rafId = 0;
    let mouseX = 0;
    let mouseY = 0;
    let lastScroll = window.scrollY || window.pageYOffset || 0;

    function update() {
      rafId = 0;
      const containerEl = container as HTMLElement;
      const layers = Array.from(containerEl.querySelectorAll<HTMLElement>('[data-parallax]'));
      // Use container size to normalize mouse positions
      const rect = containerEl.getBoundingClientRect();

      layers.forEach((layer) => {
        const depthAttr = layer.dataset.parallax ?? '0';
        const depth = parseFloat(depthAttr) || 0;
        // mouseX/mouseY are normalized [-0.5..0.5] relative to container center
        const moveX = mouseX * depth * rect.width * 0.08;
        const moveY = mouseY * depth * rect.height * 0.06 + (lastScroll * depth * 0.02);
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });
    }

    function scheduleUpdate() {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    }

    function onMouseMove(e: MouseEvent) {
      const containerEl = container as HTMLElement;
      const rect = containerEl.getBoundingClientRect();
      // normalized relative to center, range approx [-0.5, 0.5]
      mouseX = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      mouseY = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      scheduleUpdate();
    }

    function onScroll() {
      lastScroll = window.scrollY || window.pageYOffset || 0;
      scheduleUpdate();
    }

    container.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    // perform an initial update so elements don't all start at zero
    scheduleUpdate();

    return () => {
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [containerRef]);
}
