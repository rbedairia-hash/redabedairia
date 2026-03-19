import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface TrustCase {
  id: number;
  client: string;
  clientType: string;
  problem: string;
  solution: string;
  result: string;
  keyMetric: string;
  keyMetricValue: number | string;
  quote: string;
  contactName: string;
  contactTitle: string;
  image: string;
}

const TrustSection: React.FC = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [lightboxImage, setLightboxImage] = useState<{src: string, alt: string} | null>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);
  const lightboxImgRef = useRef<HTMLImageElement>(null);

  const openLightbox = (src: string, alt: string) => {
    setLightboxImage({ src, alt });
    requestAnimationFrame(() => {
      if (!lightboxRef.current || !lightboxImgRef.current) return;
      gsap.fromTo(lightboxRef.current,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.35, ease: 'power3.out' }
      );
      gsap.fromTo(lightboxImgRef.current,
        { scale: 0.75, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 0.45, ease: 'power3.out' }
      );
    });
  };

  const closeLightbox = () => {
    if (!lightboxRef.current || !lightboxImgRef.current) return;
    gsap.to(lightboxImgRef.current, {
      scale: 0.75,
      autoAlpha: 0,
      duration: 0.3,
      ease: 'power3.in',
    });
    gsap.to(lightboxRef.current, {
      autoAlpha: 0,
      duration: 0.35,
      delay: 0.1,
      ease: 'power3.in',
      onComplete: () => setLightboxImage(null),
    });
  };

  const trustCases: TrustCase[] = [
    {
      id: 1,
      client: "Maison Aurore",
      clientType: "boutique de mode premium à Lyon",
      problem: "Notre image en ligne ne reflétait pas la qualité de nos pièces.",
      solution: "Refonte identité visuelle complète + shooting produit",
      result: "+63% d'engagement Instagram, 2x plus de demandes de rdv en boutique",
      keyMetric: "+63%",
      keyMetricValue: 63,
      quote: "Réda a transformé notre image. Les clients nous disent qu'ils nous perçoivent enfin comme une vraie maison de mode.",
      contactName: "Sophie M.",
      contactTitle: "Directrice",
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      client: "Groupe Arcane",
      clientType: "cabinet de conseil en stratégie",
      problem: "Nos présentations clients étaient ternes. On perdait des contrats.",
      solution: "Direction artistique des supports de communication + charte graphique",
      result: "Contrat signé dès la première présentation avec la nouvelle identité",
      keyMetric: "1er contrat",
      keyMetricValue: "1er",
      quote: "La différence a été immédiate. Le client nous a dit que notre professionnalisme transparaissait dans chaque slide.",
      contactName: "Karim B.",
      contactTitle: "Associé fondateur",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 3,
      client: "Studio Noma",
      clientType: "studio de yoga & bien-être",
      problem: "Notre site était invisible. Personne ne nous trouvait en ligne.",
      solution: "Refonte web design + identité visuelle + photos professionnelles",
      result: "+180% de trafic organique en 3 mois, liste d'attente pour les cours",
      keyMetric: "+180%",
      keyMetricValue: 180,
      quote: "On a une vraie identité maintenant. Les gens nous reconnaissent et nous recommandent.",
      contactName: "Léa V.",
      contactTitle: "Fondatrice",
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 4,
      client: "Campagne Législatives 2022",
      clientType: "Communication Politique · Haute-Loire",
      problem: "Une campagne électorale se gagne aussi sur l'image. Chaque support doit inspirer confiance instantanément.",
      solution: "Conception et production complète de tous les supports visuels de campagne — affiches, brochures, tracts et professions de foi.",
      result: "Victoire électorale — candidats élus à l'Assemblée Nationale",
      keyMetric: "Élus",
      keyMetricValue: "Victoire 2022",
      quote: "Un travail remarquable, livré dans les délais impartis avec une qualité et une rigueur irréprochables.",
      contactName: "Isabelle Valentin",
      contactTitle: "Députée de Haute-Loire",
      image: '/images/trust/affiche-valentin.jpg'
    }
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && lightboxImage) closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxImage]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Titre depuis la gauche
    if (titleRef.current) {
      gsap.set(titleRef.current, { x: -200, opacity: 0 });
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 92%', end: 'top 20%', scrub: 1.2,
        animation: gsap.to(titleRef.current, { x: 0, opacity: 1 }),
      });
    }

    // Cards alternance gauche/droite
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll<HTMLElement>('.trust-case-card');
      cards.forEach((card, i) => {
        const fromX = i % 2 === 0 ? -150 : 150;
        gsap.set(card, { x: fromX, opacity: 0 });
        ScrollTrigger.create({
          trigger: card,
          start: 'top 92%', end: 'top 15%', scrub: 1.2,
          animation: gsap.to(card, { x: 0, opacity: 1, ease: 'power2.out' }),
        });
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <section className="bg-ink pt-24 pb-32 relative overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-6">
        {/* Section Header */}
        <div className="mb-20">
          <h2 ref={titleRef} className="text-5xl md:text-[4rem] font-display font-bold tracking-tighter text-white mb-6">
            Ils me font confiance<span className="text-[#CBFF00]">.</span>
          </h2>
          <p className="text-xl md:text-2xl text-paper/70 font-light leading-relaxed">
            Des résultats concrets, des clients satisfaits.
          </p>
        </div>

        {/* Trust Cases */}
        <div ref={cardsContainerRef} className="space-y-16">
          {trustCases.map((caseStudy, index) => (
            <div
              key={caseStudy.id}
              className={`trust-case-card bg-surface border border-white/5 rounded-2xl p-8 md:p-12 ${
                index % 2 === 1 ? 'md:ml-12' : ''
              }`}
            >
              <div className="grid md:grid-cols-12 gap-8 items-center">
                {/* Case Number */}
                <div className="md:col-span-2">
                  <div className="text-white/8 text-6xl md:text-8xl font-display font-bold">
                    0{caseStudy.id}
                  </div>
                </div>

                {/* Case Content */}
                <div className="md:col-span-6 space-y-6">
                  {/* Client Info */}
                  <div className="animate-element">
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2">
                      {caseStudy.client}
                    </h3>
                    <p className="text-paper/50 text-sm uppercase tracking-[0.1em]">
                      {caseStudy.clientType}
                    </p>
                  </div>

                  {/* Problem → Solution → Result */}
                  <div className="relative space-y-4">
                    {/* Vertical Line */}
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#CBFF00]"
                    />

                    {/* Problem */}
                    <div className="animate-element pl-6">
                      <div className="text-paper/50 text-sm uppercase tracking-[0.1em] mb-1">
                        Problème
                      </div>
                      <p className="text-white/90 text-lg">
                        {caseStudy.problem}
                      </p>
                    </div>

                    {/* Solution */}
                    <div className="animate-element pl-6">
                      <div className="text-paper/50 text-sm uppercase tracking-[0.1em] mb-1">
                        Solution
                      </div>
                      <p className="text-white/90 text-lg">
                        {caseStudy.solution}
                      </p>
                    </div>

                    {/* Result */}
                    <div className="animate-element pl-6">
                      <div className="text-paper/50 text-sm uppercase tracking-[0.1em] mb-1">
                        Résultat
                      </div>
                      <p className="text-white/90 text-lg">
                        {caseStudy.result}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Key Metric + Quote */}
                <div className="md:col-span-4 text-center md:text-right">
                  {/* Key Metric */}
                  <div className="mb-8">
                    <div className="text-5xl md:text-6xl font-display font-bold text-[#CBFF00] mb-2">
                      {caseStudy.keyMetric}
                    </div>
                    <div className="text-paper/50 text-sm uppercase tracking-[0.1em]">
                      {typeof caseStudy.keyMetricValue === 'number' ? 'Croissance' : 'Succès immédiat'}
                    </div>
                  </div>

                  {/* Image */}
                  {caseStudy.image && (
                    <div 
                      className="mb-6 overflow-hidden rounded-xl cursor-zoom-in group"
                      onClick={() => openLightbox(caseStudy.image, caseStudy.client)}
                    >
                      <img
                        src={caseStudy.image}
                        alt={caseStudy.client}
                        className="w-full h-48 object-cover rounded-xl shadow-lg 
                        group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="mt-2 text-center">
                        <span className="text-xs text-white/30 tracking-widest uppercase">
                          Cliquer pour agrandir
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Quote */}
                  <div className="animate-element space-y-3">
                    <blockquote className="text-white/90 text-lg italic leading-relaxed">
                      "{caseStudy.quote}"
                    </blockquote>
                    <div>
                      <div className="text-white font-semibold">
                        {caseStudy.contactName}
                      </div>
                      <div className="text-paper/50 text-sm">
                        {caseStudy.contactTitle}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxImage && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 cursor-zoom-out"
          style={{ visibility: 'hidden' }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-lemon hover:text-lemon transition-all z-10"
          >
            <X size={18} />
          </button>
          <img
            ref={lightboxImgRef}
            src={lightboxImage.src}
            alt={lightboxImage.alt}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl shadow-2xl"
            style={{ visibility: 'hidden' }}
            onClick={(e) => e.stopPropagation()}
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 text-sm tracking-widest uppercase">
            {lightboxImage.alt}
          </div>
        </div>
      )}
    </section>
  );
};

export default TrustSection;
