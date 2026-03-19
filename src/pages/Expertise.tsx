import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, X } from 'lucide-react';
import { throttle } from 'lodash';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// --- TYPES ---
interface PhotoProject {
  id: string;
  label: string;
  cover: string;
  photos: string[];
}

interface DetailedContentType {
  title: string;
  description: string;
  points?: string[];
  gallery?: string[];
  isPhotoGallery?: boolean;
  projects?: PhotoProject[];
}

// --- DATA ---
const expertisesData = [
  {
    id: 'design-graphique',
    title: "Design Graphique",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1600&h=900",
    detailedContent: {
      title: "Design Graphique & Identité Visuelle",
      description: "Création d'identités visuelles fortes, de logotypes et de chartes graphiques. Conception de supports de communication élégants et intemporels, pensés pour durer et marquer les esprits.",
      points: ["Stratégie de marque", "Création de logotype", "Supports imprimés et digitaux", "Direction artistique"]
    }
  },
  {
    id: 'photographie',
    title: "Photographie",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1600&h=900",
    detailedContent: {
      title: "Photographie",
      description: "Une sélection d'images capturées au fil de mes projets, mêlant reportages, nature et événements. Chaque image est pensée pour raconter une histoire.",
      isPhotoGallery: true,
      projects: [
        {
          id: 'atelier-auraprintx',
          label: 'Atelier AuraprintX',
          cover: '/images/Atelier AuraprintX/auraprintx001.WEBP',
          photos: [
            '/images/Atelier AuraprintX/auraprintx-01.webp',
            '/images/Atelier AuraprintX/auraprintx001.WEBP',
            '/images/Atelier AuraprintX/auraprintx002.WEBP',
            '/images/Atelier AuraprintX/auraprintx003.WEBP',
            '/images/Atelier AuraprintX/auraprintx004.WEBP',
            '/images/Atelier AuraprintX/auraprintx005.WEBP',
            '/images/Atelier AuraprintX/auraprintx006.WEBP',
            '/images/Atelier AuraprintX/auraprintx007.WEBP',
            '/images/Atelier AuraprintX/auraprintx008.WEBP',
            '/images/Atelier AuraprintX/auraprintx009.WEBP',
            '/images/Atelier AuraprintX/auraprintx010.WEBP',
            '/images/Atelier AuraprintX/auraprintx011.WEBP',
            '/images/Atelier AuraprintX/auraprintx012.WEBP',
            '/images/Atelier AuraprintX/auraprintx013.WEBP',
            '/images/Atelier AuraprintX/auraprintx014.WEBP',
            '/images/Atelier AuraprintX/auraprintx015.WEBP',
            '/images/Atelier AuraprintX/auraprintx016.WEBP',
            '/images/Atelier AuraprintX/auraprintx017.WEBP',
            '/images/Atelier AuraprintX/auraprintx018.WEBP',
            '/images/Atelier AuraprintX/auraprintx019.WEBP',
            '/images/Atelier AuraprintX/auraprintx020.WEBP',
            '/images/Atelier AuraprintX/auraprintx021.WEBP',
          ]
        },
        {
          id: 'auraprintx',
          label: 'AuraprintX',
          cover: '/images/AuraprintX/auraprintx001.WEBP',
          photos: [
            '/images/AuraprintX/auraprintx001.WEBP',
            '/images/AuraprintX/auraprintx002.WEBP',
            '/images/AuraprintX/auraprintx003.WEBP',
            '/images/AuraprintX/auraprintx004.WEBP',
            '/images/AuraprintX/auraprintx005.WEBP',
            '/images/AuraprintX/auraprintx006.WEBP',
            '/images/AuraprintX/auraprintx007.WEBP',
            '/images/AuraprintX/auraprintx008.WEBP',
            '/images/AuraprintX/auraprintx009.WEBP',
            '/images/AuraprintX/auraprintx010.WEBP',
            '/images/AuraprintX/auraprintx011.WEBP',
            '/images/AuraprintX/auraprintx012.WEBP',
            '/images/AuraprintX/auraprintx013.WEBP',
            '/images/AuraprintX/auraprintx014.WEBP',
            '/images/AuraprintX/auraprintx015.WEBP',
            '/images/AuraprintX/auraprintx016.WEBP',
            '/images/AuraprintX/auraprintx017.WEBP',
            '/images/AuraprintX/auraprintx018.WEBP',
            '/images/AuraprintX/auraprintx019.WEBP',
            '/images/AuraprintX/auraprintx020.WEBP',
            '/images/AuraprintX/auraprintx021.WEBP',
            '/images/AuraprintX/auraprintx022.WEBP',
            '/images/AuraprintX/auraprintx023.WEBP',
            '/images/AuraprintX/auraprintx024.WEBP',
            '/images/AuraprintX/auraprintx025.WEBP',
            '/images/AuraprintX/auraprintx026.WEBP',
            '/images/AuraprintX/auraprintx027.WEBP',
            '/images/AuraprintX/auraprintx028.WEBP',
            '/images/AuraprintX/auraprintx029.WEBP',
            '/images/AuraprintX/auraprintx030.WEBP',
            '/images/AuraprintX/auraprintx031.WEBP',
            '/images/AuraprintX/auraprintx032.WEBP',
          ]
        },
        {
          id: 'concert',
          label: 'Concert',
          cover: '/images/Concert/Concert001.WEBP',
          photos: [
            '/images/Concert/Concert001.WEBP',
            '/images/Concert/Concert002.WEBP',
            '/images/Concert/Concert003.WEBP',
          ]
        },
        {
          id: 'agility',
          label: 'Concours Agility',
          cover: '/images/Concours Agility/Agility001.WEBP',
          photos: [
            '/images/Concours Agility/Agility001.WEBP',
            '/images/Concours Agility/Agility002.WEBP',
            '/images/Concours Agility/Agility003.WEBP',
            '/images/Concours Agility/Agility004.WEBP',
            '/images/Concours Agility/Agility005.WEBP',
            '/images/Concours Agility/Agility006.WEBP',
            '/images/Concours Agility/Agility007.WEBP',
          ]
        },
        {
          id: 'jim-beam',
          label: 'Jim Beam',
          cover: '/images/Jim Beam/Jim Beam001.JPG',
          photos: [
            '/images/Jim Beam/Jim Beam001.JPG',
            '/images/Jim Beam/Jim Beam002.JPG',
          ]
        },
        {
          id: 'nature',
          label: 'Nature',
          cover: '/images/Nature/Nature001.WEBP',
          photos: [
            '/images/Nature/Nature001.WEBP',
            '/images/Nature/Nature002.WEBP',
            '/images/Nature/Nature003.WEBP',
            '/images/Nature/Nature004.WEBP',
            '/images/Nature/Nature005.WEBP',
            '/images/Nature/Nature006.WEBP',
            '/images/Nature/Nature007.WEBP',
            '/images/Nature/Nature008.WEBP',
            '/images/Nature/Nature009.WEBP',
            '/images/Nature/Nature010.WEBP',
            '/images/Nature/Nature011.WEBP',
            '/images/Nature/Nature012.WEBP',
            '/images/Nature/Nature013.WEBP',
            '/images/Nature/Nature014.WEBP',
            '/images/Nature/Nature015.WEBP',
            '/images/Nature/Nature016.WEBP',
            '/images/Nature/Nature017.WEBP',
            '/images/Nature/Nature018.WEBP',
            '/images/Nature/Nature019.WEBP',
            '/images/Nature/Nature020.WEBP',
            '/images/Nature/Nature021.WEBP',
            '/images/Nature/Nature022.WEBP',
            '/images/Nature/Nature023.WEBP',
            '/images/Nature/Nature024.WEBP',
            '/images/Nature/Nature025.WEBP',
            '/images/Nature/Nature026.WEBP',
            '/images/Nature/Nature027.WEBP',
            '/images/Nature/Nature028.WEBP',
            '/images/Nature/Nature029.WEBP',
            '/images/Nature/Nature030.WEBP',
            '/images/Nature/Nature031.WEBP',
            '/images/Nature/Nature032.WEBP',
            '/images/Nature/Nature033.WEBP',
            '/images/Nature/Nature034.WEBP',
            '/images/Nature/Nature035.WEBP',
            '/images/Nature/Nature036.WEBP',
            '/images/Nature/auraprintx037.WEBP',
          ]
        },
        {
          id: 'tour-de-france',
          label: 'Tour de France 2022',
          cover: '/images/Tour de France 2022/Tour de France 2022001.WEBP',
          photos: [
            '/images/Tour de France 2022/Tour de France 2022001.WEBP',
            '/images/Tour de France 2022/Tour de France 2022002.WEBP',
            '/images/Tour de France 2022/Tour de France 2022003.WEBP',
            '/images/Tour de France 2022/Tour de France 2022004.WEBP',
            '/images/Tour de France 2022/Tour de France 2022005.WEBP',
            '/images/Tour de France 2022/Tour de France 2022006.WEBP',
            '/images/Tour de France 2022/Tour de France 2022007.WEBP',
            '/images/Tour de France 2022/Tour de France 2022008.WEBP',
            '/images/Tour de France 2022/Tour de France 2022009.WEBP',
            '/images/Tour de France 2022/Tour de France 2022010.WEBP',
            '/images/Tour de France 2022/Tour de France 2022011.WEBP',
            '/images/Tour de France 2022/Tour de France 2022012.WEBP',
            '/images/Tour de France 2022/Tour de France 2022013.WEBP',
            '/images/Tour de France 2022/Tour de France 2022014.WEBP',
            '/images/Tour de France 2022/Tour de France 2022015.WEBP',
            '/images/Tour de France 2022/Tour de France 2022016.WEBP',
            '/images/Tour de France 2022/Tour de France 2022017.WEBP',
            '/images/Tour de France 2022/Tour de France 2022018.WEBP',
            '/images/Tour de France 2022/Tour de France 2022019.WEBP',
            '/images/Tour de France 2022/Tour de France 2022020.WEBP',
          ]
        },
      ]
    }
  },
  {
    id: 'direction-artistique',
    title: "Direction Artistique",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=1600&h=900",
    detailedContent: {
      title: "Direction Artistique Globale",
      description: "Définition de concepts visuels globaux et supervision créative de campagnes, de shootings photo et de projets éditoriaux complexes pour assurer une cohérence parfaite.",
      points: ["Concepts créatifs", "Supervision de production", "Garantie de la cohérence", "Collaboration avec les équipes"]
    }
  },
  {
    id: 'chaine-graphique',
    title: "Chaîne Graphique",
    image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&q=80&w=1600&h=900",
    detailedContent: {
      title: "Maîtrise de la Chaîne Graphique",
      description: "Une maîtrise absolue du flux de production pour une transition parfaite du digital au papier. Normalisation, gestion de la colorimétrie et préparation rigoureuse des fichiers.",
      points: ["Optimisation prépresse", "Gestion des profils ICC", "Contrôle qualité BAT", "Relation technique imprimeurs"]
    }
  },
  {
    id: 'production-imprimee',
    title: "Production Imprimée",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=1600&h=900",
    detailedContent: {
      title: "Suivi de Production Imprimée",
      description: "Accompagnement et suivi de fabrication, du choix des papiers et des ennoblissements jusqu'au contrôle qualité sur presse pour un rendu final irréprochable.",
      points: ["Sourcing de papiers et matériaux", "Conseil en ennoblissement", "Suivi de production sur site", "Gestion logistique"]
    }
  },
  {
    id: 'ia-creation',
    title: "IA & Création",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600&h=900",
    detailedContent: {
      title: "Intelligence Artificielle & Création",
      description: "Intégration stratégique des outils d'IA générative dans le processus créatif pour explorer de nouvelles esthétiques, optimiser les workflows et repousser les limites de la création.",
      points: ["Idéation assistée par IA", "Génération d'assets", "Automatisation des tâches", "Post-production et style transfer"]
    }
  }
];

// --- COMPONENTS ---

const SLIDE_W = 780;
const SLIDE_H = 500;

const getExpertiseProps = (rel: number) => {
  if (rel === 0)  return { x: 0,    rotateY: 0,   scale: 1,    opacity: 1,   blur: 0,   zIndex: 30, overlay: 0 };
  if (rel === -1) return { x: -520, rotateY: 42,  scale: 0.72, opacity: 0.45, blur: 2,  zIndex: 20, overlay: 0.6 };
  if (rel === 1)  return { x: 520,  rotateY: -42, scale: 0.72, opacity: 0.45, blur: 2,  zIndex: 20, overlay: 0.6 };
  return { x: rel < 0 ? -1200 : 1200, rotateY: rel < 0 ? 65 : -65, scale: 0.5, opacity: 0, blur: 4, zIndex: 10, overlay: 1 };
};

const ExpertiseCarousel = ({ items, activeIndex, setActiveIndex, onCardClick, isPaused }: {
  items: typeof expertisesData;
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  onCardClick: (i: number) => void;
  isPaused?: boolean;
}) => {
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isAnimating = useRef(false);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStartX = useRef(0);

  const getRelative = useCallback((i: number, active: number) => {
    const len = items.length;
    const rel = ((i - active) % len + len) % len;
    return rel > Math.floor(len / 2) ? rel - len : rel;
  }, [items.length]);

  const applySlides = useCallback((active: number, animate: boolean) => {
    slideRefs.current.forEach((slide, i) => {
      if (!slide) return;
      const rel = getRelative(i, active);
      const p = getExpertiseProps(rel);
      const overlay = slide.querySelector('.s-overlay') as HTMLDivElement;
      const duration = animate ? 0.7 : 0;
      const method = animate ? gsap.to : gsap.set;
      method(slide, { x: p.x, rotateY: p.rotateY, scale: p.scale, opacity: p.opacity, filter: `blur(${p.blur}px)`, zIndex: p.zIndex, duration, ease: 'power3.inOut' });
      if (overlay) method(overlay, { opacity: p.overlay, duration, ease: 'power3.inOut' });
    });
  }, [getRelative]);

  const realActive = ((activeIndex % items.length) + items.length) % items.length;

  useEffect(() => { applySlides(realActive, false); }, []); // eslint-disable-line

  useEffect(() => {
    applySlides(realActive, true);
    const t = setTimeout(() => { isAnimating.current = false; }, 750);
    return () => clearTimeout(t);
  }, [realActive, applySlides]);

  const goTo = useCallback((index: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setActiveIndex(index);
  }, [setActiveIndex]);

  const next = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const prev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (!isPaused) {
      autoplayRef.current = setInterval(next, 4000);
    }
  }, [next, isPaused]);

  useEffect(() => {
    startAutoplay();
    return () => { if (autoplayRef.current) clearInterval(autoplayRef.current); };
  }, [startAutoplay]);

  return (
    <div className="w-full select-none overflow-hidden mb-8">
      {/* Dots au dessus */}
      <div className="flex justify-center items-center gap-2 mb-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === realActive ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: i === realActive ? '#CBFF00' : 'rgba(255,255,255,0.25)',
              transition: 'all 0.3s ease',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label={`Expertise ${i + 1}`}
          />
        ))}
      </div>

      {/* Scène 3D */}
      <div
        className="relative w-full"
        style={{ height: `${SLIDE_H + 60}px`, perspective: '900px', perspectiveOrigin: 'center center' }}
        onMouseEnter={() => { if (autoplayRef.current) clearInterval(autoplayRef.current); }}
        onMouseLeave={startAutoplay}
        onPointerDown={(e) => { dragStartX.current = e.clientX; }}
        onPointerUp={(e) => {
          const diff = dragStartX.current - e.clientX;
          if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.id}
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
            onClick={() => onCardClick(i)}
          >
            <div className="relative w-full h-full overflow-hidden rounded-2xl shadow-2xl">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" draggable={false} />
              <div className="s-overlay absolute inset-0 bg-black rounded-2xl pointer-events-none" style={{ opacity: 0 }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              {getRelative(i, realActive) === 0 && (
                <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ boxShadow: '0 0 60px 8px rgba(203,255,0,0.15), inset 0 0 40px 0px rgba(203,255,0,0.05)' }} />
              )}
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <h3 className={`font-display font-bold text-2xl md:text-3xl lg:text-4xl leading-tight ${getRelative(i, realActive) === 0 ? 'text-lemon' : 'text-white'}`}>{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const PhotoGallery = ({ projects }: { projects: PhotoProject[] }) => {
  const [activeProject, setActiveProject] = useState<PhotoProject | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (project: PhotoProject, index: number) => {
    setActiveProject(project);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const prevPhoto = () => {
    if (!activeProject || lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + activeProject.photos.length) % activeProject.photos.length);
  };

  const nextPhoto = () => {
    if (!activeProject || lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % activeProject.photos.length);
  };

  // Navigation clavier
  React.useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, activeProject]);

  return (
    <div>
      {/* Sélecteur de projets */}
      <div className="mb-10">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase text-lemon mb-5">
          Sélectionner un projet
        </p>
        <div className="flex flex-wrap gap-3">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => setActiveProject(project)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeProject?.id === project.id
                  ? 'bg-lemon text-ink shadow-lg shadow-lemon/20'
                  : 'border border-white/10 text-white/60 hover:border-lemon/60 hover:text-white bg-white/5'
              }`}
            >
              {project.label}
              {activeProject?.id === project.id && (
                <span className="ml-2 text-xs opacity-70">
                  {project.photos.length} photos
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grille de vignettes */}
      {activeProject && (
        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3"
        >
          {activeProject.photos.map((photo, i) => (
            <div
              key={i}
              className="break-inside-avoid cursor-pointer overflow-hidden rounded-lg group"
              onClick={() => openLightbox(activeProject, i)}
            >
              <img
                src={photo}
                alt={`${activeProject.label} ${i + 1}`}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </motion.div>
      )}

      {/* Message si aucun projet sélectionné */}
      {!activeProject && (
        <p className="text-paper/50 text-center py-12">
          Sélectionne un projet pour voir les photos
        </p>
      )}

      {/* Lightbox plein écran */}
      <AnimatePresence>
        {lightboxIndex !== null && activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
            onClick={closeLightbox}
          >
            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              src={activeProject.photos[lightboxIndex]}
              alt={`${activeProject.label} ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              referrerPolicy="no-referrer"
            />

            {/* Bouton fermer */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-lemon hover:text-lemon transition-all"
            >
              <X size={18} />
            </button>

            {/* Navigation précédent */}
            <button
              onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-lemon hover:text-lemon transition-all text-xl"
            >
              <ArrowLeft size={22} />
            </button>

            {/* Navigation suivant */}
            <button
              onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:border-lemon hover:text-lemon transition-all text-xl"
            >
              <ArrowRight size={22} />
            </button>

            {/* Compteur */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest">
              {lightboxIndex + 1} / {activeProject.photos.length}
            </div>

            {/* Nom du projet */}
            <div className="absolute top-6 left-6 text-lemon text-sm font-semibold tracking-widest uppercase">
              {activeProject.label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const DetailedContent = ({ content, key }: {
  content: any;
  key: string;
}) => {
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="pt-10 border-t border-white/10"
    >
      <div className="grid md:grid-cols-12 gap-x-16 gap-y-8">
        <div className="md:col-span-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-white mb-4">
            {content.title}<span className="text-lemon">.</span>
          </h2>
          <p className="text-lg text-paper/70 font-light leading-relaxed">
            {content.description}
          </p>
        </div>
        <div className="md:col-span-8 md:pt-2">
          {content.points && (
            <ul className="space-y-3">
              {content.points.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-md">
                  <ArrowRight className="text-lemon shrink-0 mt-1.5" size={16} />
                  <span className="text-paper/90">{point}</span>
                </li>
              ))}
            </ul>
          )}
          {content.gallery && (
            <div className="columns-2 gap-4 space-y-4">
              {content.gallery.map((photo, i) => (
                <img key={i} src={photo} alt={`Galerie ${i+1}`} className="w-full h-auto object-cover rounded" referrerPolicy="no-referrer" loading="lazy" />
              ))}
            </div>
          )}
          {content.isPhotoGallery && content.projects && (
            <PhotoGallery projects={content.projects} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---

export default function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openedExpertiseId, setOpenedExpertiseId] = useState(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      gsap.set(titleRef.current, { x: -200, opacity: 0 });
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 92%', end: 'top 20%', scrub: 1.2,
        animation: gsap.to(titleRef.current, { x: 0, opacity: 1, ease: 'power2.out' }),
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === titleRef.current) t.kill();
      });
    };
  }, []);

  const handleCardClick = (clickedIndex) => {
    const realActive = ((activeIndex % expertisesData.length) + expertisesData.length) % expertisesData.length;
    const isClickingActiveCard = clickedIndex === realActive;

    if (isClickingActiveCard) {
      // Second click: toggle details panel
      const clickedId = expertisesData[clickedIndex].id;
      setOpenedExpertiseId(prevId => prevId === clickedId ? null : clickedId);
    } else {
      // First click: focus on the card
      setOpenedExpertiseId(null);
      const diff = clickedIndex - realActive;
      let newIndex = activeIndex + diff;
      if (Math.abs(diff) > expertisesData.length / 2) {
        newIndex += (diff > 0 ? -expertisesData.length : expertisesData.length);
      }
      setActiveIndex(newIndex);
    }
  };


  return (
    <div className="w-full min-h-screen pt-40 pb-32 bg-ink">
      <div className="max-w-[90rem] mx-auto px-6">
        <div className="mb-12 max-w-4xl">
          <h1 ref={titleRef} className="text-6xl md:text-[5.5rem] font-display font-bold tracking-tighter mb-10 leading-[1.05] text-white">
            Expertise<span className="text-lemon">.</span>
          </h1>
        </div>

        <ExpertiseCarousel
          items={expertisesData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onCardClick={handleCardClick}
          isPaused={!!openedExpertiseId}
        />

        <AnimatePresence mode="wait">
          {openedExpertiseId && (
            <DetailedContent
              key={openedExpertiseId}
              content={expertisesData.find(e => e.id === openedExpertiseId)?.detailedContent}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
