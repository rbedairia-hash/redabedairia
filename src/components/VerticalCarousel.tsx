import React, { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';

interface Project {
  id: number | string;
  title: string;
  category?: string;
  image: string;
  detailedContent?: any;
}

interface VerticalCarouselProps {
  projects: Project[];
  onProjectClick?: (project: Project, index: number) => void;
  expandedProjectId?: string | number | null;
}

const SLIDE_W = 780;
const SLIDE_H = 500;

const getProps = (rel: number) => {
  if (rel === 0)  return { x: 0,    rotateY: 0,   scale: 1,    opacity: 1,   blur: 0,   zIndex: 30, overlay: 0 };
  if (rel === -1) return { x: -520, rotateY: 42,  scale: 0.72, opacity: 0.45, blur: 2,  zIndex: 20, overlay: 0.6 };
  if (rel === 1)  return { x: 520,  rotateY: -42, scale: 0.72, opacity: 0.45, blur: 2,  zIndex: 20, overlay: 0.6 };
  return { x: rel < 0 ? -1200 : 1200, rotateY: rel < 0 ? 65 : -65, scale: 0.5, opacity: 0, blur: 4, zIndex: 10, overlay: 1 };
};

const VerticalCarousel: React.FC<VerticalCarouselProps> = ({ projects, onProjectClick }) => {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const isAnimating = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartXVal = useRef(0);

  const getRelative = useCallback((i: number, active: number) => {
    const len = projects.length;
    const rel = ((i - active) % len + len) % len;
    return rel > Math.floor(len / 2) ? rel - len : rel;
  }, [projects.length]);

  const applySlides = useCallback((active: number, animate: boolean) => {
    slideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      const rel = getRelative(i, active);
      const p = getProps(rel);
      const overlay = slide.querySelector('.s-overlay') as HTMLDivElement;
      const method = animate ? gsap.to : gsap.set;
      const duration = animate ? 0.7 : 0;

      method(slide, {
        x: p.x,
        rotateY: p.rotateY,
        scale: p.scale,
        opacity: p.opacity,
        filter: `blur(${p.blur}px)`,
        zIndex: p.zIndex,
        duration,
        ease: 'power3.inOut',
      });

      if (overlay) {
        method(overlay, { opacity: p.overlay, duration, ease: 'power3.inOut' });
      }
    });
  }, [getRelative]);

  // Init positions sans animation
  useEffect(() => {
    applySlides(0, false);
  }, []); // eslint-disable-line

  // Anime quand activeIndex change
  useEffect(() => {
    applySlides(activeIndex, true);
    const t = setTimeout(() => { isAnimating.current = false; }, 750);
    return () => clearTimeout(t);
  }, [activeIndex, applySlides]);

  const goTo = useCallback((index: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    const len = projects.length;
    setActiveIndex(((index % len) + len) % len);
  }, [projects.length]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Autoplay
  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    autoplayRef.current = setInterval(next, 4000);
  }, [next]);

  useEffect(() => {
    startAutoplay();
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [startAutoplay]);

  return (
    <div className="w-full select-none overflow-hidden">
      {/* Navigation */}
      <div className="flex justify-center items-center gap-6 mt-8">
        <div className="flex gap-2 items-center">
          {projects.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === activeIndex ? '24px' : '8px', height: '8px', borderRadius: '4px', background: i === activeIndex ? '#CBFF00' : 'rgba(255,255,255,0.25)', transition: 'all 0.3s ease', border: 'none', cursor: 'pointer', padding: 0 }} aria-label={`Slide ${i + 1}`} />
          ))}
        </div>
      </div>

      {/* Scène 3D */}
      <div
        className="relative w-full"
        style={{ height: `${SLIDE_H + 60}px`, perspective: '900px', perspectiveOrigin: 'center center' }}
        onMouseEnter={() => { if (autoplayRef.current) clearInterval(autoplayRef.current); }}
        onMouseLeave={startAutoplay}
        onPointerDown={(e) => { dragStartXVal.current = e.clientX; }}
        onPointerUp={(e) => {
          const diff = dragStartXVal.current - e.clientX;
          if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        }}
      >
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => { slideRefs.current[i] = el; }}
            className="absolute cursor-pointer"
            style={{
              width: `${SLIDE_W}px`,
              height: `${SLIDE_H}px`,
              left: '50%',
              top: '50%',
              marginLeft: `-${SLIDE_W / 2}px`,
              marginTop: `-${SLIDE_H / 2}px`,
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity',
            }}
            onClick={() => {
              const rel = getRelative(i, activeIndex);
              if (rel === 0 && onProjectClick) onProjectClick(project, i);
              else goTo(i);
            }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                draggable={false}
              />

              {/* Overlay sombre slides inactives */}
              <div
                className="s-overlay absolute inset-0 bg-black rounded-2xl pointer-events-none"
                style={{ opacity: 0 }}
              />

              {/* Gradient bas permanent */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Lueur lemon slide active */}
              {getRelative(i, activeIndex) === 0 && (
                <div
                  className="absolute inset-0 pointer-events-none rounded-2xl"
                  style={{ boxShadow: '0 0 60px 8px rgba(203,255,0,0.15), inset 0 0 40px 0px rgba(203,255,0,0.05)' }}
                />
              )}

              {/* Texte */}
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                {project.category && (
                  <span className="block text-xs font-semibold tracking-[0.28em] uppercase text-lemon mb-3">
                    {project.category}
                  </span>
                )}
                <h3 className={`font-display font-bold text-2xl md:text-3xl lg:text-4xl leading-tight ${getRelative(i, activeIndex) === 0 ? 'text-lemon' : 'text-white'}`}>{project.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VerticalCarousel;