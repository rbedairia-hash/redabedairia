import { motion } from 'motion/react';

const steps = [
  {
    number: "01",
    title: "Analyse",
    description: "Compréhension approfondie de vos besoins, de votre marché et de vos objectifs. Définition du cahier des charges et des contraintes techniques."
  },
  {
    number: "02",
    title: "Concept",
    description: "Recherche créative, élaboration d'axes graphiques et de moodboards. Proposition de concepts visuels forts et pertinents."
  },
  {
    number: "03",
    title: "Design",
    description: "Développement de l'identité visuelle, création des supports de communication, prises de vue photographiques et mise en page."
  },
  {
    number: "04",
    title: "Production",
    description: "Préparation rigoureuse des fichiers pour l'impression (pré-presse), gestion des profils colorimétriques et choix des matériaux."
  },
  {
    number: "05",
    title: "Optimisation",
    description: "Suivi de fabrication, contrôle qualité sur presse (BAT) et livraison finale des supports imprimés et numériques."
  }
];

export default function Process() {
  return (
    <div className="w-full min-h-screen pt-32 pb-24 bg-ink">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tighter mb-8">
            Processus<span className="text-lemon">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted max-w-3xl font-light">
            Une méthodologie rigoureuse, de l'idée initiale à la livraison finale, garantissant un résultat à la hauteur de vos exigences.
          </p>
        </motion.div>

        <div className="relative border-l border-muted ml-4 md:ml-12 pl-8 md:pl-16 flex flex-col gap-24 py-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[33px] md:-left-[65px] top-2 w-4 h-4 rounded-full bg-muted group-hover:bg-lemon transition-colors duration-300 z-10" />
              <div className="absolute -left-[37px] md:-left-[69px] top-1 w-6 h-6 rounded-full border border-muted group-hover:border-lemon/50 transition-colors duration-300 z-0" />
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
                <div className="text-5xl md:text-7xl font-display font-medium text-white group-hover:text-muted transition-colors duration-500 select-none">
                  {step.number}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="text-3xl font-display font-medium mb-6 group-hover:text-lemon transition-colors">{step.title}</h3>
                  <p className="text-lg md:text-xl text-muted font-light leading-relaxed max-w-2xl">
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
