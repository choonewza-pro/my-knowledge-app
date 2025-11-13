import type { RefObject } from 'react';
import { useEffect } from 'react';

type Options = {
  radius?: number | 'viewport'; // base radius in px or 'viewport' for full-browser sizing
  speed?: number; // global speed multiplier
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

    function tick(now: number) {
      const t = ((now - start) / 1000) * speed;
      // combine sines for X and Y with different phases/frequencies to make a non-repeating path
      const xNorm = (Math.sin(t * freqA + phaseA + seed) * 0.6
             + Math.sin(t * freqB + phaseB + seed * 0.5) * 0.3
             + Math.sin(t * freqC + phaseC) * 0.12);
      const yNorm = (Math.cos(t * freqA * 0.92 + phaseB - seed * 0.3) * 0.5
             + Math.cos(t * freqB * 1.05 + phaseC + seed * 0.2) * 0.35
             + Math.sin(t * freqC * 0.6 + phaseA) * 0.1);
      const x = xNorm * radiusX;
      const y = yNorm * radiusY;

      // If the element is positioned with left:50% top:50% and transform:translate(-50%,-50%),
      // setting left/top with calc keeps the centered baseline and applies offsets in px.
      try {
        const elStyle = (el as HTMLElement).style;
        elStyle.left = `calc(50% + ${x.toFixed(2)}px)`;
        elStyle.top = `calc(50% + ${y.toFixed(2)}px)`;
      } catch (e) {
        // fallback to transform if left/top cannot be set
        (el as HTMLElement).style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
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
      } catch (e) {}
    };
  }, [targetRef, options?.radius, options?.speed]);
}
