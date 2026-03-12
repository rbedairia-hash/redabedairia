import { motion } from 'motion/react';

export default function About() {
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
            Profil<span className="text-lemon">.</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-start">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-5 sticky top-40 flex justify-center"
          >
            <div className="relative aspect-[4/5] w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl bg-surface border border-white/10">
              <img 
                src="/portrait.png?v=5" 
                alt="Portrait du designer" 
                className="absolute top-0 left-0 w-full h-full object-cover z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/20 via-transparent to-transparent z-20 pointer-events-none" />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col gap-16 text-lg md:text-xl text-paper/70 font-light leading-relaxed"
          >
            <p className="text-3xl md:text-4xl text-white font-display font-medium leading-[1.2] tracking-tight">
              Professionnel senior de la production graphique, je cumule plus de 15 ans d’expérience en prépresse industrielle, création graphique et coordination de flux print et digitaux.
            </p>
            
            <div className="flex flex-col gap-12">
              <div className="pl-8 border-l border-white/10">
                <h3 className="text-lemon font-semibold text-xs uppercase tracking-[0.2em] mb-4">Interface Stratégique</h3>
                <p>
                  Expert de la chaîne graphique, de la conformité fichiers et de la qualité couleur, j’interviens comme interface stratégique entre création, production et contraintes techniques.
                </p>
              </div>

              <div className="pl-8 border-l border-white/10">
                <h3 className="text-lemon font-semibold text-xs uppercase tracking-[0.2em] mb-4">Optimisation & Fiabilité</h3>
                <p>
                  Habitué à structurer et optimiser les workflows, sécuriser les livrables et accompagner les équipes, je veille à la fluidité des opérations de la conception jusqu'à la post-fabrication.
                </p>
              </div>

              <div className="pl-8 border-l border-white/10">
                <h3 className="text-lemon font-semibold text-xs uppercase tracking-[0.2em] mb-4">Innovation & IA</h3>
                <p>
                  Je développe aujourd’hui une expertise en automatisation et en intelligence artificielle appliquée aux métiers créatifs, dans une logique de performance, de fiabilité et d’innovation.
                </p>
              </div>
            </div>

            <div className="pt-16 mt-8 border-t border-white/10 flex gap-16">
              <div>
                <span className="block text-5xl md:text-6xl font-display font-bold text-white mb-4">15+</span>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-lemon">Années d'expérience</span>
              </div>
              <div>
                <span className="block text-5xl md:text-6xl font-display font-bold text-white mb-4">360°</span>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-lemon">Maîtrise de la chaîne</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
