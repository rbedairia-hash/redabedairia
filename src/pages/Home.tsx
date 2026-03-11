import { motion, useScroll, useTransform, MotionValue, useSpring } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';

function CarouselCard({ project, index, progress, total }: { project: any, index: number, progress: MotionValue<number>, total: number }) {
  const center = index / (total - 1);
  const start = center - 1 / (total - 1);
  const end = center + 1 / (total - 1);

  // Clamp progress to prevent spring bounce from moving the first card up or last card down
  const clampedProgress = useTransform(progress, v => Math.max(0, Math.min(1, v)));

  // We add -1 and 2 to the ranges to prevent Framer Motion from extrapolating values outside the [start, end] range.
  // This ensures cards stay at 0vh after reaching the center, instead of flying off the top of the screen.
  const y = useTransform(clampedProgress, [-1, start, center, 2], ["120vh", "120vh", "0vh", "0vh"]);
  const scale = useTransform(clampedProgress, [-1, center, end, 2], [1, 1, 0.85, 0.85]);
  const rotateX = useTransform(clampedProgress, [-1, center, end, 2], [0, 0, 15, 15]);
  const z = useTransform(clampedProgress, [-1, center, end, 2], [0, 0, -100, -100]);
  
  // Instead of fading out the whole card (which reveals the background), we fade in a black overlay
  const overlayOpacity = useTransform(clampedProgress, [-1, center, end, 2], [0, 0, 0.6, 0.6]);

  return (
    <motion.div
      style={{
        y,
        scale,
        rotateX,
        z,
        zIndex: index,
        transformOrigin: "top center"
      }}
      className="absolute w-[calc(100%-3rem)] max-w-[calc(90rem-3rem)] aspect-[4/5] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl bg-ink border border-white/10"
    >
      <motion.div 
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 bg-black z-30 pointer-events-none" 
      />
      <div className="absolute inset-0 bg-ink/20 z-10 pointer-events-none" />
      <img 
        src={project.image} 
        alt={project.title} 
        className="object-cover w-full h-full grayscale-[20%] hover:grayscale-0 transition-all duration-1000"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent">
        <span className="text-lemon text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">{project.category}</span>
        <div className="flex justify-between items-end gap-8">
          <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">{project.title}</h3>
          <Link to="/projects" className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-lemon text-ink hover:scale-110 transition-transform duration-500 shrink-0">
            <ArrowRight size={24} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

function Carousel({ projects }: { projects: any[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
        {projects.map((project, index) => (
          <CarouselCard 
            key={project.id} 
            project={project} 
            index={index} 
            progress={smoothProgress} 
            total={projects.length} 
          />
        ))}
      </div>
    </div>
  );
}

const featuredProjects = [
  {
    id: 1,
    title: "Identité Visuelle - Maison Lumière",
    category: "Design Graphique",
    image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "Campagne Éditoriale Automne",
    category: "Photographie & Direction Artistique",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 3,
    title: "Magazine Architecture Contemporaine",
    category: "Édition & Pré-presse",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=1200",
  }
];

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 50]);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-48 pb-20 overflow-visible relative">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink to-surface z-0" />
        <div className="max-w-[90rem] mx-auto px-6 w-full grid md:grid-cols-[1.2fr_1fr] gap-12 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8 z-20 relative md:-mt-16 lg:-mt-32"
          >
            <h1 className="text-5xl md:text-[5.5rem] font-display font-bold leading-[1.05] tracking-normal text-white">
              Photographie<br/>Graphisme<br/>Web Design<span className="text-lemon">.</span>
              <span className="text-muted text-2xl md:text-3xl mt-6 block font-medium tracking-tight">Expert de l’image et de la chaîne graphique</span>
            </h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="text-lg md:text-xl text-paper/80 max-w-xl font-light leading-relaxed"
            >
              Je conçois des identités visuelles, des images et des supports imprimés en maîtrisant l’ensemble du processus, de la création à la production.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="flex flex-wrap gap-6 mt-4"
            >
              <Link 
                to="/projects" 
                className="inline-flex items-center gap-3 bg-lemon text-ink px-8 py-4 rounded-full font-semibold hover:bg-white transition-colors text-sm tracking-wide uppercase"
              >
                Voir mes projets <ArrowRight size={18} />
              </Link>
              <Link 
                to="/cv" 
                className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-semibold hover:border-lemon hover:text-lemon transition-colors text-sm tracking-wide uppercase"
              >
                Télécharger mon CV
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="relative w-[135%] lg:w-[140%] max-w-none justify-self-end translate-x-14 lg:translate-x-18 -translate-y-16 lg:-translate-y-32 mt-[50px] z-10 hidden md:block"
          >
            {/* Radial glow behind the head */}
            <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[45%] bg-zinc-400/40 blur-[70px] rounded-full z-0 mix-blend-screen pointer-events-none" />
            
            <motion.div style={{ y }} className="relative w-full">
              <img 
                src="/portrait2.png?v=4" 
                alt="Portrait professionnel" 
                className="w-full h-auto object-contain object-bottom z-10 drop-shadow-2xl relative block"
                referrerPolicy="no-referrer"
              />
              {/* Ligne à la base en green lemon avec dégradé */}
              <div className="absolute bottom-0 right-4 lg:right-8 w-[calc(100vw+2rem)] max-w-[92rem] h-[2px] bg-gradient-to-r from-transparent via-lemon to-transparent z-20 opacity-80" />
              <div className="absolute bottom-0 right-4 lg:right-8 w-[calc(100vw+2rem)] max-w-[92rem] h-[6px] bg-gradient-to-r from-transparent via-lemon to-transparent z-20 blur-sm opacity-40" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects - 3D Vertical Carousel */}
      <section className="bg-surface relative">
        <div className="max-w-[90rem] mx-auto px-6 pt-40 pb-12">
          <div className="flex justify-between items-end">
            <h2 className="text-5xl md:text-[4rem] font-display font-bold tracking-tighter">Projets Récents</h2>
            <Link to="/projects" className="hidden md:inline-flex items-center gap-3 text-sm tracking-wide uppercase font-semibold text-lemon hover:text-white transition-colors">
              Tous les projets <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <Carousel projects={featuredProjects} />
        
        <div className="pb-40 pt-12 text-center md:hidden">
          <Link to="/projects" className="inline-flex items-center gap-3 text-sm tracking-wide uppercase font-semibold text-lemon hover:text-white transition-colors">
            Tous les projets <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
