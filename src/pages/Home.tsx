import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';


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
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center pt-48 pb-0 overflow-visible relative">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink to-ink z-0" />
        <div className="absolute inset-x-0 top-0 h-[calc(100vh-70px)] bg-gradient-to-b from-ink via-ink to-surface z-0" />
        <div className="max-w-[90rem] mx-auto px-6 w-full grid md:grid-cols-[1.2fr_1fr] gap-12 items-center relative z-10 -translate-y-16">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col gap-9 z-20 relative md:-mt-24 lg:-mt-32"
          >
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-[5.5rem] font-display font-bold leading-[1.05] tracking-normal text-white whitespace-nowrap"
            >
              Des visuels qui<br/>renforcent votre<br/>crédibilité<span className="text-lemon">.</span>
              <span className="text-white text-2xl md:text-3xl mt-6 block font-medium tracking-tight">Design graphique, photographie et web design<span className="text-lemon">.</span></span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg md:text-xl text-paper/80 max-w-xl font-light leading-relaxed"
            >
              J'accompagne les entreprises, marques et entrepreneurs dans la création d'identités visuelles, de contenus photographiques et de supports de communication pensés pour être cohérents, impactants et parfaitement exécutés.
            </motion.p>
            
            <div className="flex flex-col items-start mt-4">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                className="flex flex-wrap gap-6"
              >
                <Link 
                  to="/realisations" 
                  className="inline-flex items-center gap-3 bg-lemon text-ink px-8 py-4 rounded-full font-semibold hover:bg-white transition-colors text-sm tracking-wide uppercase"
                >
                  Découvrir les réalisations <ArrowRight size={18} />
                </Link>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center gap-3 border border-white/20 px-8 py-4 rounded-full font-semibold hover:border-lemon hover:text-lemon transition-colors text-sm tracking-wide uppercase"
                >
                  Parler de votre projet
                </Link>
              </motion.div>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
                className="text-lg md:text-xl text-muted font-light tracking-[0.05em] mt-8 w-full text-center relative top-6 -left-10"
              >
                Faire de l'image un levier de croissance.
              </motion.p>
            </div>

          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="relative w-[165%] lg:w-[176%] max-w-none justify-self-end translate-x-18 lg:translate-x-22 -translate-y-28 lg:-translate-y-36 mt-[80px] z-10 hidden md:block"
          >
            {/* Radial glow behind the head */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.8, scale: 1 }}
              transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
              className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[45%] bg-zinc-400/40 blur-[70px] rounded-full z-0 mix-blend-screen pointer-events-none" 
            />
            
            <motion.div className="relative w-full">
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

      {/* Pourquoi la communication visuelle */}
      <section className="bg-ink pt-2 pb-24 md:pt-2 md:pb-28 flex items-center">
        <div className="max-w-[90rem] mx-auto px-6 w-full">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-4xl md:text-[4rem] font-display font-bold tracking-tighter text-white text-center mb-12"
          >
            L'image n'est pas un détail<span className="text-lemon">.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="text-lg md:text-xl text-paper/80 font-light leading-relaxed text-center max-w-3xl mx-auto mb-20"
          >
            Dans un environnement où tout se joue en quelques secondes,<br/>
            la perception visuelle d'une marque influence directement la confiance,<br/>
            la crédibilité et la décision.<br/>
            Une identité visuelle cohérente et des images professionnelles<br/>
            deviennent un véritable levier de développement.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
              className="bg-surface border border-white/5 rounded-2xl p-8 hover:border-lemon/20 hover:shadow-lg hover:shadow-lemon/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-lemon/10 flex items-center justify-center mb-6">
                <div className="w-6 h-6 border-2 border-lemon rounded-full"></div>
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-4">Crédibilité</h3>
              <p className="text-paper/70 font-light leading-relaxed">
                Une image maîtrisée renforce immédiatement la confiance et la perception de sérieux d'une entreprise.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="bg-surface border border-white/5 rounded-2xl p-8 hover:border-lemon/20 hover:shadow-lg hover:shadow-lemon/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-lemon/10 flex items-center justify-center mb-6">
                <div className="w-6 h-1 bg-lemon"></div>
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-4">Cohérence</h3>
              <p className="text-paper/70 font-light leading-relaxed">
                Une identité visuelle claire permet d'aligner tous les supports de communication et de structurer la présence d'une marque.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
              className="bg-surface border border-white/5 rounded-2xl p-8 hover:border-lemon/20 hover:shadow-lg hover:shadow-lemon/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-lemon/10 flex items-center justify-center mb-6">
                <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-lemon"></div>
              </div>
              <h3 className="text-2xl font-display font-semibold text-white mb-4">Impact</h3>
              <p className="text-paper/70 font-light leading-relaxed">
                Des visuels forts attirent l'attention, renforcent la mémorisation et différencient une marque de ses concurrents.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects - 3D Vertical Carousel */}
      <section className="bg-surface relative">
        <div className="max-w-[90rem] mx-auto px-6 pt-20 pb-12">
          <div className="flex justify-between items-end">
            <h2 className="text-5xl md:text-[4rem] font-display font-bold tracking-tighter">Réalisations Récentes</h2>
            <Link to="/realisations" className="hidden md:inline-flex items-center gap-3 text-sm tracking-wide uppercase font-semibold text-lemon hover:text-white transition-colors">
              Toutes les réalisations <ArrowRight size={18} />
            </Link>
          </div>
        </div>

        <div className="max-w-[90rem] mx-auto px-6">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden group"
            >
              <div className="absolute inset-0 bg-ink/20 z-10 pointer-events-none" />
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent">
                <span className="text-lemon text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4 block">{project.category}</span>
                <div className="flex justify-between items-end gap-8">
                  <h3 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight">{project.title}</h3>
                  <Link to="/realisations" className="hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-lemon text-ink hover:scale-110 transition-transform duration-500 shrink-0">
                    <ArrowRight size={24} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="pb-40 pt-12 text-center md:hidden">
          <Link to="/realisations" className="inline-flex items-center gap-3 text-sm tracking-wide uppercase font-semibold text-lemon hover:text-white transition-colors">
            Toutes les réalisations <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  );
}
