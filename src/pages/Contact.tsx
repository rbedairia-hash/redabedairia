import { useRef, useEffect } from 'react';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const coordsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Titre depuis la gauche
    if (titleRef.current) {
      gsap.set(titleRef.current, { x: -200, opacity: 0 });
      ScrollTrigger.create({
        trigger: titleRef.current,
        start: 'top 92%', end: 'top 20%', scrub: 1.2,
        animation: gsap.to(titleRef.current, { x: 0, opacity: 1 }),
      });
    }

    // Coordonnées depuis la gauche en stagger
    if (coordsRef.current) {
      const items = coordsRef.current.querySelectorAll<HTMLElement>('.coord-item');
      items.forEach((item, i) => {
        gsap.set(item, { x: -100 - i * 20, opacity: 0 });
        ScrollTrigger.create({
          trigger: item,
          start: 'top 92%', end: 'top 30%', scrub: 1.2,
          animation: gsap.to(item, { x: 0, opacity: 1, ease: 'power2.out' }),
        });
      });
    }

    // Formulaire depuis la droite
    if (formRef.current) {
      gsap.set(formRef.current, { x: 150, opacity: 0 });
      ScrollTrigger.create({
        trigger: formRef.current,
        start: 'top 92%', end: 'top 20%', scrub: 1.2,
        animation: gsap.to(formRef.current, { x: 0, opacity: 1, ease: 'power2.out' }),
      });
    }

    return () => ScrollTrigger.getAll().forEach(t => t.kill());
  }, []);

  return (
    <div className="w-full min-h-screen pt-40 pb-32 bg-ink">
      <div className="max-w-[90rem] mx-auto px-6">
        <div className="mb-32 max-w-4xl">
          <h1 ref={titleRef} className="text-6xl md:text-[5.5rem] font-display font-bold tracking-tighter mb-10 leading-[1.05] text-white">
            Contact<span className="text-lemon">.</span>
          </h1>
          <p className="text-xl md:text-2xl text-paper/80 font-light leading-relaxed">
            Discutons de votre prochain projet, d'une collaboration ou simplement pour échanger.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 lg:gap-32">
          <div 
            ref={coordsRef}
            className="lg:col-span-5 flex flex-col gap-12"
          >
            <div className="flex flex-col gap-8">
              <a href="mailto:r.bedairia@gmail.com" className="coord-item group flex items-center gap-8 p-10 rounded-2xl bg-surface border border-white/5 hover:border-lemon/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center group-hover:bg-lemon group-hover:text-ink transition-colors text-white">
                  <Mail size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-paper/50 font-semibold mb-2">Email</h3>
                  <p className="text-2xl font-display font-medium text-white group-hover:text-lemon transition-colors">r.bedairia@gmail.com</p>
                </div>
              </a>

              <a href="tel:+33651560460" className="coord-item group flex items-center gap-8 p-10 rounded-2xl bg-surface border border-white/5 hover:border-lemon/30 transition-colors">
                <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center group-hover:bg-lemon group-hover:text-ink transition-colors text-white">
                  <Phone size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-paper/50 font-semibold mb-2">Téléphone</h3>
                  <p className="text-2xl font-display font-medium text-white group-hover:text-lemon transition-colors">+33 6 51 56 04 60</p>
                </div>
              </a>

              <div className="coord-item flex items-center gap-8 p-10 rounded-2xl bg-surface border border-white/5">
                <div className="w-14 h-14 rounded-full bg-ink flex items-center justify-center text-paper/50">
                  <MapPin size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] text-paper/50 font-semibold mb-2">Localisation</h3>
                  <p className="text-2xl font-display font-medium text-white">Yssingeaux (43)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <form ref={formRef} className="flex flex-col gap-12" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                  <label htmlFor="name" className="text-xs uppercase tracking-[0.2em] text-paper/50 font-semibold">Nom complet</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-lemon transition-colors text-xl font-light text-white placeholder:text-paper/20"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-paper/50 font-semibold">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-lemon transition-colors text-xl font-light text-white placeholder:text-paper/20"
                    placeholder="jean@exemple.com"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-4">
                <label htmlFor="subject" className="text-xs uppercase tracking-[0.2em] text-paper/50 font-semibold">Sujet</label>
                <input 
                  type="text" 
                  id="subject" 
                  className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-lemon transition-colors text-xl font-light text-white placeholder:text-paper/20"
                  placeholder="Projet d'identité visuelle"
                />
              </div>

              <div className="flex flex-col gap-4">
                <label htmlFor="message" className="text-xs uppercase tracking-[0.2em] text-paper/50 font-semibold">Message</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-lemon transition-colors text-xl font-light text-white resize-none placeholder:text-paper/20"
                  placeholder="Parlez-moi de votre projet..."
                />
              </div>

              <button 
                type="submit" 
                className="inline-flex items-center gap-3 bg-lemon text-ink px-10 py-5 rounded-full font-semibold hover:bg-white transition-colors self-start mt-8 text-sm tracking-wide uppercase"
              >
                Envoyer le message <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
