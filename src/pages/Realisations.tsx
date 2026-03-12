import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

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
  return (
    <div className="w-full min-h-screen pt-40 pb-32 bg-ink">
      <div className="max-w-[90rem] mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32 max-w-4xl"
        >
          <h1 className="text-6xl md:text-[5.5rem] font-display font-bold tracking-tighter mb-10 leading-[1.05] text-white">
            Réalisations<span className="text-lemon">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-paper/80 font-light leading-relaxed">
            Une sélection de réalisations récentes, illustrant mon approche du design, de la photographie et de la production imprimée.
          </p>
        </motion.div>

        <div className="flex flex-col gap-32 md:gap-48">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="group cursor-pointer relative"
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
