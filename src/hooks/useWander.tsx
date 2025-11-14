import type { RefObject } from 'react';
import { useEffect } from 'react';

type Options = {
  radius?: number | 'viewport'; // base radius in px or 'viewport' for full-browser sizing
  speed?: number; // global speed multiplier
  scale?: number; // multiplier applied to computed radiusX/Y (useful for relative orbit radii)
  avoid?: () => DOMRect[]; // optional function returning DOMRects to avoid
};

// useWander: animate an element along a pseudo-random smooth path using summed sine waves.
// - targetRef: ref to the element to move (will set transform)
// - options: tuning params
export default function useWander(targetRef: RefObject<HTMLElement | SVGElement | null>, options?: Options) {
  useEffect(() => {
    const el = targetRef?.current;
    if (!el) return;
    if (typeof window === 'undefined') return;

    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq && mq.matches) return; // do not animate when user prefers reduced motion

    const rawRadius = options?.radius ?? 120;
    // We'll compute horizontal and vertical radius separately if 'viewport' is requested
    let radiusX = typeof rawRadius === 'number' ? rawRadius : 120;
    let radiusY = typeof rawRadius === 'number' ? rawRadius * 0.72 : 120 * 0.72;
    if (rawRadius === 'viewport') {
      const rect = (el as HTMLElement).getBoundingClientRect();
      // allow full width spread but keep the element inside viewport
      radiusX = Math.max(0, window.innerWidth / 2 - rect.width / 2);
      radiusY = Math.max(0, window.innerHeight / 2 - rect.height / 2);
    }
    // apply optional scale multiplier (e.g. 0.3 => 30% of computed radius)
    if (typeof options?.scale === 'number') {
      radiusX = radiusX * options!.scale!;
      radiusY = radiusY * options!.scale!;
    }
    const speed = options?.speed ?? 1.0;

    // random seeds for different harmonics so motion doesn't repeat exactly
    const seed = Math.random() * 10000;
    const phaseA = Math.random() * Math.PI * 2;
    const phaseB = Math.random() * Math.PI * 2;
    const phaseC = Math.random() * Math.PI * 2;
    const freqA = 0.08 + Math.random() * 0.06; // low-frequency drift
    const freqB = 0.18 + Math.random() * 0.12; // medium frequency
    const freqC = 0.9 + Math.random() * 0.7; // small jitter

    let rafId = 0;
    const start = performance.now();
    // cache element size to avoid calling getBoundingClientRect each frame
    const elRectCache = (el as HTMLElement).getBoundingClientRect();
    // avoidRects cache + rate limit
    let avoidCache: DOMRect[] = [];
    let lastAvoidCheck = 0;

    function tick(now: number) {
      const t = ((now - start) / 1000) * speed;
      // combine sines for X and Y with different phases/frequencies to make a non-repeating path
      const xNorm = (Math.sin(t * freqA + phaseA + seed) * 0.6
             + Math.sin(t * freqB + phaseB + seed * 0.5) * 0.3
             + Math.sin(t * freqC + phaseC) * 0.12);
      const yNorm = (Math.cos(t * freqA * 0.92 + phaseB - seed * 0.3) * 0.5
             + Math.cos(t * freqB * 1.05 + phaseC + seed * 0.2) * 0.35
             + Math.sin(t * freqC * 0.6 + phaseA) * 0.1);
      let x = xNorm * radiusX;
      let y = yNorm * radiusY;

      // Candidate absolute coordinates (center of viewport + offsets)
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      let candX = centerX + x;
      let candY = centerY + y;

      // Apply avoidance if requested, but only poll avoid() at most every 250ms to avoid layout thrash
      try {
        const now = performance.now();
        if (options?.avoid && now - lastAvoidCheck > 250) {
          avoidCache = options.avoid() || [];
          lastAvoidCheck = now;
        }
        const avoidRects = avoidCache || [];
        const elRect = elRectCache;
        const margin = 18; // px margin to keep planets away from important UI
        for (const rect of avoidRects) {
          // expand rect by half the element plus margin
          const expandLeft = rect.left - (elRect.width / 2) - margin;
          const expandRight = rect.right + (elRect.width / 2) + margin;
          const expandTop = rect.top - (elRect.height / 2) - margin;
          const expandBottom = rect.bottom + (elRect.height / 2) + margin;

          if (candX >= expandLeft && candX <= expandRight && candY >= expandTop && candY <= expandBottom) {
            // push candidate away from rect center along vector
            const rx = rect.left + rect.width / 2;
            const ry = rect.top + rect.height / 2;
            let vx = candX - rx;
            let vy = candY - ry;
            const len = Math.hypot(vx, vy) || 1;
            vx /= len; vy /= len;
            // distance to move: half-diagonal of rect + margin
            const diag = Math.hypot(rect.width, rect.height) / 2;
            const push = diag + margin + 10;
            candX = rx + vx * push;
            candY = ry + vy * push;
            // update relative x/y
            x = candX - centerX;
            y = candY - centerY;
            break; // handled this rect
          }
        }
      } catch {
        // ignore avoidance errors
      }

      // Apply transform composition: keep baseline translate(-50%,-50%) and append our translate3d offsets
      try {
        const elStyle = (el as HTMLElement).style;
        elStyle.transform = `translate(-50%,-50%) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      } catch {
        // ignore
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      // clear transform / positioning on cleanup
      try {
        const s = (el as HTMLElement).style;
        s.transform = '';
        s.left = '';
        s.top = '';
      } catch { /* ignore cleanup errors */ }
    };
  }, [targetRef, options]);
}
