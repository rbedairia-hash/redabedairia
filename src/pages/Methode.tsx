import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Analyse",
    description: "Compréhension approfondie de vos besoins, de votre marché et de vos objectifs. Définition du cahier des charges et des contraintes techniques."
  },
  {
    number: "02",
    title: "Direction",
    description: "Recherche créative, élaboration d'axes graphiques et de moodboards. Proposition de concepts visuels forts et pertinents."
  },
  {
    number: "03",
    title: "Conception",
    description: "Développement de l'identité visuelle, création des supports de communication, prises de vue photographiques et mise en page."
  },
  {
    number: "04",
    title: "Production",
    description: "Préparation rigoureuse des fichiers pour l'impression, suivi de fabrication, contrôle qualité et livraison finale des supports imprimés et numériques."
  }
];

export default function Methode() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Titre h1 depuis la gauche
    if (titleRef.current) {
      gsap.set(titleRef.current, { x: -200, opacity: 0 });
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 92%', end: 'top 20%', scrub: 1.2,
        animation: gsap.to(titleRef.current, { x: 0, opacity: 1, ease: 'power2.out' }),
      });
    }

    // Sous-titre depuis la droite
    if (subtitleRef.current) {
      gsap.set(subtitleRef.current, { x: 150, opacity: 0 });
      ScrollTrigger.create({
        trigger: subtitleRef.current,
        start: 'top 92%', end: 'top 20%', scrub: 1.2,
        animation: gsap.to(subtitleRef.current, { x: 0, opacity: 1, ease: 'power2.out' }),
      });
    }

    // Ligne verticale timeline : scaleY scrub
    if (timelineLineRef.current) {
      gsap.set(timelineLineRef.current, { scaleY: 0, transformOrigin: 'top center' });
      ScrollTrigger.create({
        trigger: timelineLineRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1.5,
        animation: gsap.to(timelineLineRef.current, { scaleY: 1, ease: 'none' }),
      });
    }

    // Étapes alternance gauche/droite
    if (stepsRef.current) {
      const steps = stepsRef.current.querySelectorAll<HTMLElement>('.methode-step');
      steps.forEach((step, i) => {
        const fromX = i % 2 === 0 ? -130 : 130;
        gsap.set(step, { x: fromX, opacity: 0 });
        ScrollTrigger.create({
          trigger: step,
          start: 'top 92%', end: 'top 20%', scrub: 1.2,
          animation: gsap.to(step, { x: 0, opacity: 1, ease: 'power2.out' }),
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
            Méthode<span className="text-lemon">.</span>
          </h1>
          <p ref={subtitleRef} className="text-xl md:text-2xl text-paper/80 font-light leading-relaxed">
            Une approche structurée et collaborative pour garantir des résultats qui allient pertinence stratégique et excellence créative.
          </p>
        </div>

        <div ref={stepsRef} className="relative pl-12 md:pl-20 flex flex-col gap-24 py-12">
          {/* TIMELINE AXIS */}
          <div ref={timelineLineRef} className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-[#2a2a2a] z-0" />
          <div className="absolute left-6 md:left-10 top-0 h-32 w-px bg-gradient-to-t from-[#2a2a2a] to-transparent z-0" />
          <div className="absolute left-6 md:left-10 bottom-0 h-32 w-px bg-gradient-to-b from-[#2a2a2a] to-transparent z-0" />

          {steps.map((step, index) => (
            <div
              key={index}
              className="methode-step relative group"
            >
              {/* Square Marker */}
              <div className="step-marker absolute top-9 -translate-y-1/2 left-[-1.5rem] md:left-[-2.5rem] -translate-x-1/2 w-3 h-3 rounded-[2px] bg-paper/30 group-hover:bg-lemon group-hover:scale-115 group-hover:shadow-[0_0_15px_rgba(194,255,0,0.5)] transition-all duration-200 z-20" />
              
              {/* Gap Creator (Punch-hole) */}
              <div className="absolute top-9 -translate-y-1/2 left-[-1.5rem] md:left-[-2.5rem] -translate-x-1/2 w-1 h-8 bg-ink z-10" />

              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                <div className="text-5xl md:text-7xl font-display font-bold text-white/80 group-hover:text-white transition-colors duration-500 select-none">
                  {step.number}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl font-display font-bold mb-6 text-white group-hover:text-lemon transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-lg md:text-xl text-paper/60 font-light leading-relaxed max-w-2xl">
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
