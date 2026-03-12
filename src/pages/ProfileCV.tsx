import { motion } from 'motion/react';
import { Download } from 'lucide-react';

const experiences = [
  {
    period: "2016 - 2025",
    role: "Responsable Pré-presse",
    company: "ICS – Auraprint-x, Yssingeaux",
    description: "Pilotage des opérations de prépresse et post-fabrication (BAT, CTP, BAR). Optimisation et mise aux normes PDF/X. Automatisation, colorimétrie et imposition (PitStop, GMG, XMF). Gestion et optimisation des flux de production. Coordination technique et accompagnement des équipes. Suivi de projets, planning et archivage. Conception graphique, packaging et communication. Réalisation de packshots produits."
  },
  {
    period: "2014 - 2016",
    role: "Opérateur Pré-presse",
    company: "Philprint, Yssingeaux",
    description: "Gestion des opérations prépresse (BAT, CTP). Optimisation des fichiers d'impression. Conception et réalisation de packaging. Graphisme et communication visuelle."
  },
  {
    period: "2010 - 2013",
    role: "Chargé de communication",
    company: "Groupe Benamor, Algérie",
    description: "Conception de supports de communication. Création de packaging. Organisation d'événements. Gestion de production et contrôle qualité emballages."
  },
  {
    period: "2007 - 2010",
    role: "Chargé de communication",
    company: "Groupe CFAO Automotive (Chevrolet – Opel – Suzuki), Algérie",
    description: "Supports de communication print. Visuels points de vente & SAV. Documents internes. Organisation d'événements."
  },
  {
    period: "1996 - 2005",
    role: "Responsable labo créa & flashage",
    company: "Altitude Communication, Algérie",
    description: "Gestion du laboratoire créatif. Photocomposition (AGFA Accuset). Packaging & PLV (secteur pharmaceutique). Organisation d'événements."
  }
];

const education = [
  {
    period: "2025",
    degree: "WordPress, Web Design & Communication digitale PME",
    school: "Livementor"
  },
  {
    period: "2021 - 2022",
    degree: "Bac Pro Photographie",
    school: "Arvia, Aix-en-Provence"
  },
  {
    period: "1994 - 1996",
    degree: "Graphisme & Communication visuelle",
    school: "Top École, Alger"
  },
  {
    period: "1991 - 1995",
    degree: "Master en microbiologie marine",
    school: "ISML, Alger"
  }
];

const skills = [
  "Prépresse, normalisation PDF/X, imposition (Fuji XMF)",
  "Colorimétrie, GMG, contrôle qualité couleur",
  "Impression offset, numérique, grand format",
  "Gestion de flux de production graphique",
  "Coordination technique et planning",
  "Graphisme print & communication visuelle",
  "Packaging et prototypage",
  "Photographie packshot produits",
  "Suite Adobe CC",
  "WordPress : intégration, web design",
  "Automatisation de tâches répétitives",
  "IA appliquée à la création visuelle"
];

export default function ProfileCV() {
  return (
    <div className="w-full min-h-screen pt-40 pb-32 bg-ink">
      <div className="max-w-[90rem] mx-auto px-6">
        {/* Section Profil */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-32"
        >
          <h1 className="text-6xl md:text-[5.5rem] font-display font-bold tracking-tighter mb-10 leading-[1.05] text-white">
            Profil et CV<span className="text-lemon">.</span>
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-start mb-32">
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
              Professionnel senior de la production graphique, je cumule plus de 15 ans d'expérience en prépresse industrielle, création graphique et coordination de flux print et digitaux.
            </p>
            
            <div className="flex flex-col gap-12">
              <div className="pl-8 border-l border-white/10">
                <h3 className="text-lemon font-semibold text-xs uppercase tracking-[0.2em] mb-4">Interface Stratégique</h3>
                <p>
                  Expert de la chaîne graphique, de la conformité fichiers et de la qualité couleur, j'interviens comme interface stratégique entre création, production et contraintes techniques.
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
                  Je développe aujourd'hui une expertise en automatisation et en intelligence artificielle appliquée aux métiers créatifs, dans une logique de performance, de fiabilité et d'innovation.
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

        {/* Section CV */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-12"
        >
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-[4rem] font-display font-bold tracking-tighter mb-6 text-white">
              Parcours Professionnel<span className="text-lemon">.</span>
            </h2>
            <p className="text-xl md:text-2xl text-paper/80 font-light leading-relaxed">
              Un parcours professionnel riche, alliant créativité et expertise technique.
            </p>
          </div>
          <button className="shrink-0 inline-flex items-center gap-3 bg-lemon text-ink px-8 py-4 rounded-full font-semibold hover:bg-white transition-colors text-sm tracking-wide uppercase">
            <Download size={18} /> Télécharger le PDF
          </button>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-16 md:gap-24">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="lg:col-span-8 flex flex-col gap-32"
          >
            {/* Expérience */}
            <section>
              <h3 className="text-4xl font-display font-medium mb-16 flex items-center gap-6 text-white">
                <span className="w-12 h-[1px] bg-lemon block" /> Expérience
              </h3>
              <div className="flex flex-col gap-16">
                {experiences.map((exp, index) => (
                  <div key={index} className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-12 group">
                    <div className="text-lemon font-mono text-sm uppercase tracking-[0.2em] pt-2">
                      {exp.period}
                    </div>
                    <div className="border-l border-white/10 pl-8 md:pl-12">
                      <h4 className="text-3xl font-display font-medium mb-3 text-white group-hover:text-lemon transition-colors duration-500">{exp.role}</h4>
                      <h5 className="text-xl text-paper/60 mb-6 font-light">{exp.company}</h5>
                      <p className="text-paper/80 font-light leading-relaxed text-lg">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Formation */}
            <section>
              <h3 className="text-4xl font-display font-medium mb-16 flex items-center gap-6 text-white">
                <span className="w-12 h-[1px] bg-lemon block" /> Formation
              </h3>
              <div className="flex flex-col gap-16">
                {education.map((edu, index) => (
                  <div key={index} className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-12 group">
                    <div className="text-lemon font-mono text-sm uppercase tracking-[0.2em] pt-2">
                      {edu.period}
                    </div>
                    <div className="border-l border-white/10 pl-8 md:pl-12">
                      <h4 className="text-3xl font-display font-medium mb-3 text-white group-hover:text-lemon transition-colors duration-500">{edu.degree}</h4>
                      <h5 className="text-xl text-paper/60 font-light">{edu.school}</h5>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>

          {/* Compétences */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
            className="lg:col-span-4"
          >
            <div className="sticky top-40 p-10 rounded-2xl bg-surface border border-white/5">
              <h3 className="text-3xl font-display font-medium mb-10 text-white">Compétences</h3>
              <ul className="flex flex-col gap-6">
                {skills.map((skill, index) => (
                  <li key={index} className="flex items-start gap-4 text-paper/80 font-light text-lg">
                    <span className="text-lemon mt-2 text-xs">■</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
