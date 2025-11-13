import { Link } from 'react-router-dom';
import { useRef } from 'react';
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
  const planetRef = useRef<HTMLDivElement | null>(null);
  const planetRef2 = useRef<HTMLDivElement | null>(null);
  const planetRef3 = useRef<HTMLDivElement | null>(null);
  // Use viewport radius so the planets can wander across the full browser width
  useWander(planetRef, { radius: 'viewport', speed: 1.6 });
  useWander(planetRef2, { radius: 'viewport', speed: 2.2 });
  useWander(planetRef3, { radius: 'viewport', speed: 1.1 });

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center bg-[linear-gradient(180deg,#071229_0%,#071229_40%,rgba(11,21,35,0.75)_80%)] text-white overflow-hidden">

        {/* Starfield SVG (subtle twinkling stars) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" aria-hidden>
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
        <circle cx="50%" cy="60%" r="2.8" fill="url(#g1)" opacity="0.06" className="animate-twinkle-slower svg-transform parallax-layer" data-parallax="0.12" />
        <circle cx="82%" cy="72%" r="1.3" fill="url(#g1)" opacity="0.07" className="animate-twinkle svg-transform parallax-layer" data-parallax="0.04" />
      </svg>

      {/* Nebula overlay (soft translucent gradient shapes) */}
      <div className="absolute inset-0 mix-blend-screen opacity-40 pointer-events-none">
        <div className="absolute -left-20 -top-24 w-96 h-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.22),transparent_30%)] blur-3xl animate-planet-float parallax-layer" data-parallax="0.04"></div>
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(244,114,182,0.14),transparent_30%)] blur-2xl animate-planet-float animate-planet-rotate parallax-layer" data-parallax="0.03"></div>
      </div>

      {/* Floating planet (now orbiting around the center of the hero) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* centered planet wrappers that will be moved via left/top by useWander */}
        <div className="planet-wander" ref={planetRef}>
          <svg className="w-44 h-44 transform-gpu rotate-6 opacity-95 svg-transform" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="planetGrad1" x1="0" x2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.9" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="40" fill="url(#planetGrad1)" />
            <g fillOpacity="0.08">
              <ellipse cx="55" cy="45" rx="28" ry="8" fill="#ffffff" />
            </g>
          </svg>
        </div>

        <div className="planet-wander" ref={planetRef2}>
          <svg className="w-32 h-32 transform-gpu rotate-12 opacity-95 svg-transform" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="planetGrad2" x1="0" x2="1">
                <stop offset="0%" stopColor="#ff7a18" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#ffb199" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="38" fill="url(#planetGrad2)" />
            <g fillOpacity="0.06">
              <ellipse cx="58" cy="44" rx="20" ry="6" fill="#ffffff" />
            </g>
          </svg>
        </div>

        <div className="planet-wander" ref={planetRef3}>
          <svg className="w-20 h-20 transform-gpu rotate-3 opacity-95 svg-transform" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <defs>
              <linearGradient id="planetGrad3" x1="0" x2="1">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.98" />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="28" fill="url(#planetGrad3)" />
            <g fillOpacity="0.06">
              <ellipse cx="56" cy="46" rx="14" ry="4" fill="#ffffff" />
            </g>
          </svg>
        </div>
      </div>
      <div className="relative z-10 hero-content text-center px-4">
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