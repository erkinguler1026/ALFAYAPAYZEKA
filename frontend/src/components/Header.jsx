import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ChevronRight, Menu, X } from 'lucide-react';

/**
 * NavLink — Aktif Sayfa Farkındalıklı Navigasyon Bağlantısı
 *
 * @param {string} to    - React Router Link hedef URL'si (örn. "/about")
 * @param {string} label - Menüde görüntülenecek metin
 *
 * Özellikler:
 *   - `useLocation()` ile mevcut URL'e bakarak aktif durumu belirler.
 *   - Aktifse: Framer Motion `layoutId="nav-underline"` ile animate edilmiş
 *     mor alt çizgi görünür.
 *   - Pasifse: Hover'da genişleyen CSS geçişli alt çizgi gösterilir.
 */
const NavLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`transition-all relative group ${isActive ? 'text-white' : 'text-white/40 hover:text-white'}`}
    >
      {label}
      {isActive && (
        <motion.div 
          layoutId="nav-underline"
          className="absolute -bottom-2 left-0 right-0 h-0.5 bg-primary"
        />
      )}
      {!isActive && (
        <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
      )}
    </Link>
  );
};

/**
 * Header Bileşeni — Üst Navigasyon Menüsü
 */
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Menü açıkken sayfa kaydırmasını engelle
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const navLinks = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/portfolio", label: "Portfolyo" },
    { to: "/pricing", label: "Fiyatlandırma" },
    { to: "/about", label: "Hakkımızda" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-2xl border-b border-white/5 h-24">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-primary/50 transition-all duration-500">
               <Bot className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl tracking-[0.1em] text-white">ALFA YAPAY ZEKA</span>
              <span className="text-[10px] text-white/30 font-bold tracking-[0.3em] uppercase">STUDIO ADVISORY</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-12 font-bold tracking-widest text-[11px] uppercase">
            {navLinks.map((link) => (
              <NavLink key={link.to} to={link.to} label={link.label} />
            ))}
            <Link 
              to="/contact" 
              className="group flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-2xl font-black hover:bg-primary hover:text-white transition-all transform active:scale-95"
            >
              Başlayın
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Toggle Button */}
          <button 
            className="md:hidden p-3 bg-white/5 border border-white/10 rounded-xl text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-[#0a0a0c] pt-24 px-6 md:hidden overflow-hidden flex flex-col"
          >
            {/* Background Decorations */}
            <div className="absolute top-24 -left-20 w-80 h-80 bg-primary/10 blur-[100px] rounded-full -z-10" />
            <div className="absolute bottom-24 -right-20 w-80 h-80 bg-accent/10 blur-[100px] rounded-full -z-10" />

            <div className="flex flex-col gap-8 mt-12 overflow-y-auto pb-12">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link 
                    to={link.to} 
                    onClick={() => setIsOpen(false)}
                    className={`text-4xl font-black tracking-tighter uppercase ${location.pathname === link.to ? 'text-primary' : 'text-white'}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-6"
              >
                <Link 
                  to="/contact" 
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-3 bg-primary text-white py-6 rounded-3xl font-black text-2xl"
                >
                  Başlayın
                  <ChevronRight size={24} />
                </Link>
              </motion.div>

              <div className="mt-auto pt-12 text-center">
                <p className="text-white/20 text-xs tracking-widest uppercase font-bold">ALFA AI STUDIO ADVISORY</p>
                <p className="text-white/10 text-[10px] mt-2">© 2026 | Sürüm V1.3.1</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
