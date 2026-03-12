import { motion } from 'motion/react';

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
            Méthode<span className="text-lemon">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-paper/80 font-light leading-relaxed">
            Une approche structurée et collaborative pour garantir des résultats qui allient pertinence stratégique et excellence créative.
          </p>
        </motion.div>

        <div className="relative pl-12 md:pl-20 flex flex-col gap-24 py-12">
          {/* TIMELINE AXIS */}
          <div className="absolute left-6 md:left-10 top-0 bottom-0 w-px bg-[#2a2a2a] z-0" />
          <div className="absolute left-6 md:left-10 top-0 h-32 w-px bg-gradient-to-t from-[#2a2a2a] to-transparent z-0" />
          <div className="absolute left-6 md:left-10 bottom-0 h-32 w-px bg-gradient-to-b from-[#2a2a2a] to-transparent z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
              className="relative group"
            >
              {/* Square Marker */}
              <div className="absolute top-9 -translate-y-1/2 left-[-1.5rem] md:left-[-2.5rem] -translate-x-1/2 w-3 h-3 rounded-[2px] bg-paper/30 group-hover:bg-lemon group-hover:scale-115 group-hover:shadow-[0_0_15px_rgba(194,255,0,0.5)] transition-all duration-200 z-20" />
              
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
