import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Linkedin, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'Profil', path: '/about' },
  { name: 'Expertise', path: '/expertise' },
  { name: 'Projets', path: '/projects' },
  { name: 'Photographie', path: '/photography' },
  { name: 'CV', path: '/cv' },
  { name: 'Contact', path: '/contact' },
];

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-ink text-paper selection:bg-lemon selection:text-ink overflow-x-hidden">
      {/* Navigation */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-8 ${
          scrolled ? 'bg-ink/95 backdrop-blur-2xl shadow-2xl' : 'bg-transparent'
        }`}
      >
        <div className="max-w-[90rem] mx-auto px-6 flex justify-between items-center relative z-10">
          <Link to="/" className="text-2xl font-display font-bold tracking-tighter text-white">
            <span className="text-lemon">Réda</span> Bédaïria<span className="text-lemon">.</span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10">
            {navLinks.map((link) => (
              <Link 
                key={link.path} 
                to={link.path}
                className={`text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:text-lemon ${
                  location.pathname === link.path ? 'text-lemon' : 'text-paper/60'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-paper hover:text-lemon transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Ligne à la base du menu en green lemon avec dégradé */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100vw+2rem)] max-w-[92rem] h-[2px] bg-gradient-to-r from-transparent via-lemon to-transparent z-20 opacity-80" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[calc(100vw+2rem)] max-w-[92rem] h-[6px] bg-gradient-to-r from-transparent via-lemon to-transparent z-20 blur-sm opacity-40" />
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col gap-8 text-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`text-3xl font-display uppercase tracking-tight transition-colors hover:text-lemon ${
                    location.pathname === link.path ? 'text-lemon' : 'text-paper'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-full"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-32 bg-ink">
        <div className="max-w-[90rem] mx-auto px-6 py-16 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm text-paper/40 font-medium tracking-wide">
            © {new Date().getFullYear()} Réda Bédaïria. Tous droits réservés.
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-paper/40 hover:text-lemon transition-colors"><Instagram size={24} strokeWidth={1.5} /></a>
            <a href="#" className="text-paper/40 hover:text-lemon transition-colors"><Linkedin size={24} strokeWidth={1.5} /></a>
            <a href="#" className="text-paper/40 hover:text-lemon transition-colors"><Mail size={24} strokeWidth={1.5} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
