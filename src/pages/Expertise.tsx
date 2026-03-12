import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { throttle } from 'lodash';

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
      description: "Une sélection d'images capturées au fil de mes projets, mêlant portraits, natures mortes et reportages. Chaque image est pensée pour raconter une histoire et sublimer le réel.",
      gallery: [
        "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1554046920-90dc20696352?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=1200",
        "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=1200",
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

const ExpertiseCarousel = ({ items, activeIndex, setActiveIndex, onCardClick }) => {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const autoplay = setInterval(() => {
      if (!isHovering) {
        setActiveIndex(prev => prev + 1);
      }
    }, 4000);
    return () => clearInterval(autoplay);
  }, [isHovering, setActiveIndex]);

  const handleWheel = throttle((e) => {
    e.preventDefault();
    const newIndex = activeIndex + Math.sign(e.deltaY);
    setActiveIndex(newIndex);
  }, 100, { trailing: false });

  return (
    <div 
      className="relative w-full h-[500px] mb-8 overflow-hidden" 
      onWheel={handleWheel}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
        {items.map((item, i) => (
          <CarouselCard
            key={item.id}
            index={i}
            item={item}
            activeIndex={activeIndex}
            totalItems={items.length}
            onClick={() => onCardClick(i)}
          />
        ))}
      </div>
    </div>
  );
};

const CarouselCard = ({ index, item, activeIndex, totalItems, onClick }) => {
  const realCurrentIndex = (activeIndex % totalItems + totalItems) % totalItems;
  const relativePos = (index - realCurrentIndex + totalItems) % totalItems;
  const distanceFromActive = Math.min(relativePos, totalItems - relativePos);
  
  const isNext = relativePos > 0 && relativePos <= totalItems / 2;
  const sign = isNext ? 1 : -1;

  const y = (distanceFromActive * 120) * sign;
  const scale = 1 - distanceFromActive * 0.1;
  const rotateX = -10 * sign * distanceFromActive;
  const zIndex = totalItems - distanceFromActive;
  const isActive = index === realCurrentIndex;

  const isVisible = distanceFromActive <= 1;
  const opacity = isVisible ? 1 : 0;
  const pointerEvents = isVisible ? 'auto' : 'none';

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 w-[90vw] max-w-4xl h-[350px] -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      style={{ zIndex, transformOrigin: 'center center', pointerEvents }}
      onClick={onClick}
      initial={false}
      animate={{
        transform: `translateY(${y}px) translateZ(${distanceFromActive * -200}px) rotateX(${rotateX}deg) scale(${scale})`,
        opacity,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className={`relative w-full h-full overflow-hidden rounded-lg bg-surface shadow-2xl shadow-black/50 border border-white/5 transition-all duration-500 ${!isActive ? 'grayscale' : ''}`}>
        <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 md:p-8">
          <h3 className="text-3xl md:text-4xl font-display font-bold text-lemon tracking-tight">{item.title}</h3>
        </div>
      </div>
    </motion.div>
  );
};

const DetailedContent = ({ content }) => {
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
        </div>
      </div>
    </motion.div>
  );
};

// --- Main Page Component ---

export default function Expertise() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openedExpertiseId, setOpenedExpertiseId] = useState(null);

  const handleCardClick = (clickedIndex) => {
    const totalItems = expertisesData.length;
    const realCurrentIndex = (activeIndex % totalItems + totalItems) % totalItems;
    const isClickingActiveCard = clickedIndex === realCurrentIndex;

    if (isClickingActiveCard) {
      // Second click: toggle details panel
      const clickedId = expertisesData[clickedIndex].id;
      setOpenedExpertiseId(prevId => prevId === clickedId ? null : clickedId);
    } else {
      // First click: focus on the card
      setOpenedExpertiseId(null);
      const diff = clickedIndex - realCurrentIndex;
      let newIndex = activeIndex + diff;
      if (Math.abs(diff) > totalItems / 2) {
        newIndex += (diff > 0 ? -totalItems : totalItems);
      }
      setActiveIndex(newIndex);
    }
  };

  useEffect(() => {
    if (openedExpertiseId) {
      const realIndex = (activeIndex % expertisesData.length + expertisesData.length) % expertisesData.length;
      const activeId = expertisesData[realIndex].id;
      if(openedExpertiseId !== activeId) {
        setOpenedExpertiseId(null);
      }
    }
  }, [activeIndex, openedExpertiseId]);

  return (
    <div className="w-full min-h-screen pt-40 pb-32 bg-ink">
      <div className="max-w-[90rem] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 max-w-4xl"
        >
          <h1 className="text-6xl md:text-[5.5rem] font-display font-bold tracking-tighter mb-10 leading-[1.05] text-white">
            Expertise<span className="text-lemon">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-paper/80 font-light leading-relaxed">
            Une approche globale et transversale de l'image, alliant vision créative, exigence technique et maîtrise absolue de la production.
          </p>
        </motion.div>

        <ExpertiseCarousel 
          items={expertisesData}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onCardClick={handleCardClick}
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
