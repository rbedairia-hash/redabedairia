import { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Maison Lumière",
    category: "Identité Visuelle",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 2,
    title: "Campagne Automne",
    category: "Direction Artistique",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 3,
    title: "Architecture Contemporaine",
    category: "Édition & Pré-presse",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 4,
    title: "Cosmétiques Naturels",
    category: "Packaging",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=1600",
  }
];

export default function Realisations() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Titre depuis la gauche
    if (titleRef.current) {
      gsap.set(titleRef.current, { x: -200, opacity: 0 });
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 92%', end: 'top 20%', scrub: 1.2,
        animation: gsap.to(titleRef.current, { x: 0, opacity: 1, ease: 'power2.out' }),
      });
    }

    // Cards alternance gauche/droite
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll<HTMLElement>('.project-card');
      cards.forEach((card, i) => {
        const fromX = i % 2 === 0 ? -130 : 130;
        gsap.set(card, { x: fromX, opacity: 0 });
        ScrollTrigger.create({
          trigger: card,
          start: 'top 92%', end: 'top 20%', scrub: 1.2,
          animation: gsap.to(card, { x: 0, opacity: 1, ease: 'power2.out' }),
        });
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="w-full min-h-screen pt-40 pb-32 bg-ink">
      <div className="max-w-[90rem] mx-auto px-6">
        <div className="mb-32 max-w-4xl">
          <h1 ref={titleRef} className="text-6xl md:text-[5.5rem] font-display font-bold tracking-tighter mb-10 leading-[1.05] text-white">
            Réalisations<span className="text-lemon">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-paper/80 font-light leading-relaxed">
            Une sélection de réalisations récentes, illustrant mon approche du design, de la photographie et de la production imprimée.
          </p>
        </div>

        <div ref={gridRef} className="flex flex-col gap-32 md:gap-48" style={{ transformStyle: 'preserve-3d' }}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card group cursor-pointer relative"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="relative aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-surface shadow-2xl group-hover:shadow-lemon/5 transition-shadow duration-700">
                <div className="absolute inset-0 bg-ink/30 group-hover:bg-ink/10 transition-colors duration-700 z-10 pointer-events-none" />
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[20%] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                
                {/* Overlay Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <span className="text-lemon text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">{project.category}</span>
                    <div className="flex justify-between items-end gap-8">
                      <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">{project.title}</h2>
                      <div className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-lemon text-ink opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 ease-out">
                        <ArrowRight size={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
