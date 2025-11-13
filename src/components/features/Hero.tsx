import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import useParallax from '../../hooks/useParallax';
import useWander from '../../hooks/useWander';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export function Hero({ title, subtitle, ctaText, ctaLink }: HeroProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  useParallax(containerRef);
  // Prepare refs for 8 planets
  const refs = Array.from({ length: 8 }, () => useRef<HTMLDivElement | null>(null));

  // Orbit radii factors (relative to viewport half-width/half-height)
  // increase factors so orbits span more of the horizontal viewport
  const orbitFactors = [0.08, 0.18, 0.30, 0.42, 0.56, 0.70, 0.84, 0.96];
  // store radii as pairs {rx, ry} so horizontal spread can be larger than vertical
  const [orbitRadii, setOrbitRadii] = useState<{ rx: number; ry: number }[]>([]);

  useEffect(() => {
    function compute() {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      const radii = orbitFactors.map((f) => ({ rx: Math.round(halfW * f), ry: Math.round(halfH * f) }));
      setOrbitRadii(radii);
    }
    compute();
    window.addEventListener('resize', compute, { passive: true });
    return () => window.removeEventListener('resize', compute);
  }, []);

  // Seed initial positions across each ring so planets don't all start at center
  useEffect(() => {
    if (!orbitRadii || orbitRadii.length === 0) return;
    refs.forEach((rRef, i) => {
      const el = rRef.current;
      if (!el) return;
      const rxy = orbitRadii[i] || { rx: 120, ry: 86 };
      const rx = rxy.rx;
      const ry = rxy.ry;
      // random angle and larger jitter to spread horizontally
      const angle = Math.random() * Math.PI * 2;
      const jitterX = (Math.random() - 0.5) * (rx * 0.36);
      const jitterY = (Math.random() - 0.5) * (ry * 0.22);
      const x = Math.cos(angle) * rx + jitterX;
      const y = Math.sin(angle) * ry + jitterY;
      try {
        const s = el.style;
        s.left = `calc(50% + ${x.toFixed(1)}px)`;
        s.top = `calc(50% + ${y.toFixed(1)}px)`;
      } catch (e) {
        // ignore
      }
    });
  }, [orbitRadii]);

  // Wire wander for each planet using viewport radius scaled by orbit factor
  // speeds vary so motion feels organic.
  const speeds = [1.0, 1.6, 1.2, 0.9, 1.4, 0.7, 1.8, 1.1];
  refs.forEach((r, i) => {
    // call hook inside render body is fine because refs array is stable for this render
    useWander(r, { radius: 'viewport', speed: speeds[i], scale: orbitFactors[i] });
  });

  // Small occasional wiggle for Planet 1 (Mercury-like)
  useEffect(() => {
    const elContainer = refs[0]?.current;
    if (!elContainer) return;
    let cancelled = false;
    let timer: number | undefined;

    function schedule() {
      const delay = 2000 + Math.random() * 6000; // 2s - 8s
      timer = window.setTimeout(() => {
        if (cancelled) return;
        const svg = elContainer!.querySelector('svg') as HTMLElement | null;
        if (!svg) { schedule(); return; }
        const dur = 700 + Math.random() * 800; // 0.7s - 1.5s
        svg.style.setProperty('--d', `${Math.round(dur)}ms`);
        svg.classList.add('mercury-wiggle');
        window.setTimeout(() => svg.classList.remove('mercury-wiggle'), dur + 50);
        schedule();
      }, delay);
    }

    schedule();
    return () => { cancelled = true; if (timer) clearTimeout(timer); };
  }, [refs[0]]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-[linear-gradient(180deg,#071229_0%,#071229_40%,rgba(11,21,35,0.75)_80%)] text-white overflow-hidden">

        {/* Starfield SVG (subtle twinkling stars) - wrapped to prevent stars drifting outside hero */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden" aria-hidden>
        <svg className="w-full h-full block" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden>
        <defs>
          <radialGradient id="g1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* A handful of stars positioned across the canvas */}
        <circle cx="8%" cy="12%" r="1.6" fill="url(#g1)" opacity="0.12" className="animate-twinkle svg-transform parallax-layer" data-parallax="0.06" />
        <circle cx="22%" cy="30%" r="1.2" fill="url(#g1)" opacity="0.10" className="animate-twinkle-slower svg-transform parallax-layer" data-parallax="0.04" />
        <circle cx="45%" cy="18%" r="1.8" fill="url(#g1)" opacity="0.14" className="animate-twinkle svg-transform parallax-layer" data-parallax="0.08" />
        <circle cx="70%" cy="25%" r="1.1" fill="url(#g1)" opacity="0.09" className="animate-twinkle-slower svg-transform parallax-layer" data-parallax="0.03" />
        <circle cx="90%" cy="8%" r="1.4" fill="url(#g1)" opacity="0.11" className="animate-twinkle svg-transform parallax-layer" data-parallax="0.05" />
        <circle cx="15%" cy="70%" r="1.0" fill="url(#g1)" opacity="0.08" className="animate-twinkle-slower svg-transform parallax-layer" data-parallax="0.02" />
        {/* spread the previously centered bright star: move it and add two nearby dim stars */}
        <circle cx="42%" cy="54%" r="1.8" fill="url(#g1)" opacity="0.07" className="animate-twinkle-slower svg-transform parallax-layer" data-parallax="0.10" />
        <circle cx="48%" cy="44%" r="1.1" fill="url(#g1)" opacity="0.055" className="animate-twinkle svg-transform parallax-layer" data-parallax="0.06" />
        <circle cx="34%" cy="62%" r="1.2" fill="url(#g1)" opacity="0.05" className="animate-twinkle-slower svg-transform parallax-layer" data-parallax="0.04" />
        <circle cx="82%" cy="72%" r="1.3" fill="url(#g1)" opacity="0.07" className="animate-twinkle svg-transform parallax-layer" data-parallax="0.04" />
        </svg>
      </div>

      {/* Nebula overlay (soft translucent gradient shapes) */}
      <div className="absolute inset-0 mix-blend-screen opacity-40 pointer-events-none z-10">
        <div className="absolute -left-20 -top-24 w-96 h-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.22),transparent_30%)] blur-3xl animate-planet-float parallax-layer" data-parallax="0.04"></div>
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,114,182,0.14),transparent_30%)] blur-2xl animate-planet-float animate-planet-rotate parallax-layer" data-parallax="0.03"></div>
      </div>

      {/* Floating background fog (subtle drifting blobs; sits above nebula so it's visible) */}
      <div className="absolute inset-0 pointer-events-none z-15" aria-hidden>
        <style>{`
          @keyframes fog-drift-1 { 0%{ transform: translate3d(-10%,0,0) } 50%{ transform: translate3d(8%,4%,0) } 100%{ transform: translate3d(-10%,0,0) } }
          @keyframes fog-drift-2 { 0%{ transform: translate3d(6%, -6%,0) } 50%{ transform: translate3d(-6%, 8%,0) } 100%{ transform: translate3d(6%,-6%,0) } }
          @keyframes fog-fade { 0%{ opacity:0 } 10%{ opacity:0.28 } 50%{ opacity:0.64 } 90%{ opacity:0.28 } 100%{ opacity:0 } }
          .space-fog { position:absolute; border-radius:50%; filter: blur(12px); mix-blend-mode: screen; opacity:0.36; will-change: transform, opacity; }
          .space-fog--large { width: 56rem; height: 36rem; background: radial-gradient(circle at 30% 40%, rgba(124,58,237,0.36), rgba(6,182,212,0.18) 45%, transparent 55%); box-shadow: 0 40px 120px rgba(124,58,237,0.06); }
          .space-fog--mid { width: 44rem; height: 28rem; background: radial-gradient(circle at 60% 50%, rgba(244,114,182,0.30), rgba(99,102,241,0.12) 50%, transparent 62%); box-shadow: 0 24px 80px rgba(244,114,182,0.05); }
          .space-fog--small { width: 28rem; height: 18rem; background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.18), rgba(59,130,246,0.10) 40%, transparent 60%); box-shadow: 0 12px 40px rgba(255,255,255,0.04); }
          @media (prefers-reduced-motion: reduce) { .space-fog{ animation: none !important } }
        `}</style>

        <div className="space-fog space-fog--large parallax-layer" data-parallax="0.02" style={{ left: '-8%', top: '4%', animation: 'fog-drift-1 28s ease-in-out infinite, fog-fade 16s ease-in-out infinite' }} />
        <div className="space-fog space-fog--mid parallax-layer" data-parallax="0.03" style={{ right: '-12%', top: '18%', animation: 'fog-drift-2 34s ease-in-out infinite, fog-fade 20s ease-in-out infinite' }} />
        <div className="space-fog space-fog--small parallax-layer" data-parallax="0.025" style={{ left: '14%', bottom: '-2%', animation: 'fog-drift-1 24s ease-in-out infinite, fog-fade 18s ease-in-out infinite' }} />
      </div>

      {/* Big Sun (background, glowy) */}
      <div className="absolute -left-24 top-8 w-72 h-72 md:w-96 md:h-96 pointer-events-none z-0">
        <svg className="w-full h-full transform-gpu animate-planet-float" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden>
          <defs>
            <radialGradient id="sunGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd54a" />
              <stop offset="35%" stopColor="#ffc107" />
              <stop offset="70%" stopColor="#ff9800" />
              <stop offset="100%" stopColor="#ff6f00" stopOpacity="0.95" />
            </radialGradient>
            <filter id="sunGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="8" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#sunGlow)">
            <circle cx="100" cy="100" r="72" fill="url(#sunGrad)" />
          </g>
        </svg>
      </div>

      {/* Floating planet (now orbiting around the center of the hero) */}
      {/* Mercury wiggle CSS (small occasional motion) */}
      <style>{`
        @keyframes mercury-wiggle {
          0% { transform: translate3d(0,0,0) rotate(0deg); }
          25% { transform: translate3d(-6px,-3px,0) rotate(-3deg); }
          60% { transform: translate3d(4px,2px,0) rotate(2deg); }
          100% { transform: translate3d(0,0,0) rotate(0deg); }
        }
        .mercury-wiggle {
          will-change: transform;
          animation-name: mercury-wiggle;
          animation-duration: var(--d, 900ms);
          animation-timing-function: cubic-bezier(.2,.8,.2,1);
          transform-origin: center center;
        }
      `}</style>

      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Draw orbit rings */}
        {orbitRadii.map((r, i) => (
          <div
            key={`ring-${i}`}
            className="orbit-ring"
            style={{ width: `${2 * r.rx}px`, height: `${2 * r.ry}px`, marginLeft: `-${r.rx}px`, marginTop: `-${r.ry}px` }}
          />
        ))}

        {/* Planets (SVGs) — planets will be moved by useWander refs */}
        {/* Planet 1 (Mercury-like) */}
        <div className="planet-wander" ref={refs[0]}>
          <svg className="w-16 h-16 transform-gpu rotate-6 opacity-95 svg-transform" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="p1" x1="0" x2="1">
                <stop offset="0%" stopColor="#d9d9d9" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="30" fill="url(#p1)" />
          </svg>
        </div>

        {/* Planet 2 (Venus-like) */}
        <div className="planet-wander" ref={refs[1]}>
          <svg className="w-20 h-20 transform-gpu rotate-10 opacity-95 svg-transform" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="p2" x1="0" x2="1">
                <stop offset="0%" stopColor="#ffb86b" />
                <stop offset="100%" stopColor="#ff7a18" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="36" fill="url(#p2)" />
          </svg>
        </div>

        {/* Planet 3 (Earth-like) */}
        <div className="planet-wander" ref={refs[2]}>
          <svg className="w-20 h-20 transform-gpu rotate-3 opacity-95 svg-transform" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="p3" x1="0" x2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="34" fill="url(#p3)" />
          </svg>
        </div>

        {/* Planet 4 (Mars-like) */}
        <div className="planet-wander" ref={refs[3]}>
          <svg className="w-18 h-18 transform-gpu rotate-12 opacity-95 svg-transform" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="p4" x1="0" x2="1">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="30" fill="url(#p4)" />
          </svg>
        </div>

        {/* Planet 5 (Jupiter-like) */}
        <div className="planet-wander" ref={refs[4]}>
          <svg className="w-28 h-28 transform-gpu rotate-6 opacity-95 svg-transform" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="p5" x1="0" x2="1">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f97316" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="44" fill="url(#p5)" />
          </svg>
        </div>

        {/* Planet 6 (Saturn-like) with pronounced rings */}
        <div className="planet-wander" ref={refs[5]}>
          <svg className="w-36 h-36 transform-gpu rotate-3 opacity-100 svg-transform" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden overflow="visible" style={{overflow: 'visible'}}>
            <defs>
              <linearGradient id="p6" x1="0" x2="1">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <linearGradient id="ring6" x1="0" x2="1">
                <stop offset="0%" stopColor="rgba(255,240,200,0.9)" />
                <stop offset="40%" stopColor="rgba(200,160,110,0.95)" />
                <stop offset="100%" stopColor="rgba(180,140,90,0.85)" />
              </linearGradient>
              <filter id="ringBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="1.6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* Back part of ring (behind planet) */}
            <g aria-hidden>
              <ellipse cx="50" cy="50" rx="56" ry="16" fill="none" stroke="rgba(0,0,0,0.28)" strokeWidth="8" transform="rotate(-18 50 50)" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="50" cy="50" rx="56" ry="16" fill="none" stroke="rgba(200,160,110,0.16)" strokeWidth="3" transform="rotate(-18 50 50)" strokeLinecap="round" strokeLinejoin="round" />
            </g>

            {/* Planet body */}
            <circle cx="50" cy="50" r="36" fill="url(#p6)" />

            {/* Front part of ring (drawn over planet) */}
            <g aria-hidden>
              <ellipse cx="50" cy="50" rx="56" ry="16" fill="none" stroke="url(#ring6)" strokeWidth="4" transform="rotate(-18 50 50)" filter="url(#ringBlur)" strokeLinecap="round" strokeLinejoin="round" />
              <ellipse cx="50" cy="50" rx="54" ry="15" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" transform="rotate(-18 50 50)" strokeLinecap="round" strokeLinejoin="round" />
            </g>
          </svg>
        </div>

        {/* Planet 7 (Uranus-like) */}
        <div className="planet-wander" ref={refs[6]}>
          <svg className="w-24 h-24 transform-gpu rotate-9 opacity-95 svg-transform" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="p7" x1="0" x2="1">
                <stop offset="0%" stopColor="#a7f3d0" />
                <stop offset="100%" stopColor="#60a5fa" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="38" fill="url(#p7)" />
          </svg>
        </div>

        {/* Planet 8 (Neptune-like) */}
        <div className="planet-wander" ref={refs[7]}>
          <svg className="w-26 h-26 transform-gpu rotate-4 opacity-95 svg-transform" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="p8" x1="0" x2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1e3a8a" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="42" fill="url(#p8)" />
          </svg>
        </div>
      </div>
      <div className="relative z-30 hero-content text-center px-4">
        <div className="max-w-4xl mx-auto">
          {/* translucent panel to increase contrast while keeping translucency */}
          <div className="inline-block group animate-fade-up bg-white/8 backdrop-blur-md border border-white/6 rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_rgba(2,6,23,0.6)] parallax-layer" data-parallax="-0.06">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-xl mb-6 opacity-95 max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <Link
                to={ctaLink}
                className="inline-flex items-center px-6 md:px-8 py-3 bg-[linear-gradient(90deg,#7c3aed,#06b6d4)] text-white font-semibold rounded-full transform-gpu hover:scale-105 transition-transform duration-300 shadow-2xl"
              >
                {ctaText}
                {/* small rocket SVG */}
                <svg className="ml-3 w-5 h-5 transform transition-transform duration-500 group-hover:-translate-y-2 group-hover:scale-110" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                  <path d="M2 19l2-1 4 4-1 2-5-5z" fill="#fff" opacity="0.9" />
                  <path d="M14.5 3c1.5.5 2.9 1.9 3.4 3.4l1.6 5.6-9.6 9.6-5.6-1.6C3.9 18.4 2.5 17 3 15.5L9 9l5.5-5.5z" fill="#fff" opacity="0.95" />
                </svg>
              </Link>

              <a href="#knowledge" className="text-sm md:text-base text-white/90 underline-offset-2 hover:underline">ดูหัวข้อทั้งหมด</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}