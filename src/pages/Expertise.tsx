import { motion } from 'motion/react';

const expertises = [
  {
    title: "Design graphique",
    description: "Création d'identités visuelles fortes, de logotypes et de chartes graphiques. Conception de supports de communication élégants et intemporels.",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Photographie",
    description: "Prises de vue professionnelles, direction de modèles, photographie de produits et reportages. Sublimer le réel par la lumière et le cadrage.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Direction artistique",
    description: "Définition de concepts visuels globaux. Supervision créative de campagnes, de shootings photo et de projets éditoriaux complexes.",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Chaîne graphique & prépresse",
    description: "Maîtrise absolue du flux de production. Normalisation PDF, gestion de la colorimétrie, imposition et préparation rigoureuse des fichiers.",
    image: "https://images.unsplash.com/photo-1562564055-71e051d33c19?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Production imprimée",
    description: "Suivi de fabrication, choix des papiers et des ennoblissements. Contrôle qualité sur presse pour garantir un rendu final irréprochable.",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "IA appliquée à la création",
    description: "Intégration des outils d'intelligence artificielle générative dans le processus créatif pour explorer de nouvelles esthétiques et optimiser les workflows.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  }
];

const processSteps = [
  {
    title: "Analyse",
    description: "Compréhension des enjeux, du marché et des objectifs. Définition du cahier des charges et des contraintes techniques."
  },
  {
    title: "Concept",
    description: "Recherche d'idées, élaboration de pistes créatives et définition de la direction artistique globale."
  },
  {
    title: "Création",
    description: "Développement visuel, conception graphique, prises de vue et mise en forme des différents livrables."
  },
  {
    title: "Production",
    description: "Préparation des fichiers, normalisation prépresse, gestion de la colorimétrie et suivi de fabrication."
  },
  {
    title: "Optimisation",
    description: "Contrôle qualité, ajustements finaux et livraison des assets optimisés pour chaque canal de diffusion."
  }
];

export default function Expertise() {
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
            Expertise<span className="text-lemon">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-paper/80 font-light leading-relaxed">
            Une approche globale et transversale de l'image, alliant vision créative, exigence technique et maîtrise absolue de la production.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-24 lg:gap-y-32 mb-40">
          {expertises.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className={`group flex flex-col gap-8 ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-surface">
                <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-1000 ease-out opacity-80 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline gap-4">
                  <span className="text-lemon text-sm font-mono font-medium">0{index + 1}</span>
                  <h3 className="text-3xl md:text-4xl font-display font-medium text-white group-hover:text-lemon transition-colors duration-500">{item.title}</h3>
                </div>
                <p className="text-paper/70 leading-relaxed font-light text-lg pl-8">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Processus Créatif Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="pt-32 border-t border-white/10"
        >
          <div className="mb-24">
            <h2 className="text-5xl md:text-[4rem] font-display font-bold tracking-tighter text-white mb-8">
              Processus Créatif<span className="text-lemon">.</span>
            </h2>
            <p className="text-xl md:text-2xl text-paper/80 font-light leading-relaxed max-w-3xl">
              Une méthodologie rigoureuse pour transformer chaque idée en une réalisation visuelle percutante et techniquement parfaite.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8 lg:gap-12">
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                className="flex flex-col gap-6 relative group"
              >
                {/* Connecting line for desktop */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-12 right-[-2rem] h-[1px] bg-white/10 group-hover:bg-lemon/30 transition-colors duration-500 z-0" />
                )}
                
                <div className="w-12 h-12 rounded-full bg-surface border border-white/10 flex items-center justify-center text-lemon font-mono text-lg relative z-10 group-hover:border-lemon group-hover:bg-lemon/5 transition-all duration-500">
                  {index + 1}
                </div>
                
                <div>
                  <h3 className="text-2xl font-display font-medium text-white mb-4 group-hover:text-lemon transition-colors duration-500">{step.title}</h3>
                  <p className="text-paper/60 font-light leading-relaxed text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
