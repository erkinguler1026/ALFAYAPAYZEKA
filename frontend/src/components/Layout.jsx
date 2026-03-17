import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, ChevronRight } from 'lucide-react';

const Layout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen relative selection:bg-primary/30">
      {/* Premium Background Mesh */}
      <div className="bg-mesh" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism border-b border-white/5 h-20">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
              <Bot className="text-white w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg tracking-tight leading-none">ALFA YAPAY ZEKA</span>
              <span className="text-[10px] text-white/40 font-medium tracking-[0.2em] mt-1">STUDIO ADVISORY</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-10">
            <NavLink to="/" label="Ana Sayfa" />
            <NavLink to="/portfolio" label="Portfolyo" />
            <NavLink to="/pricing" label="Fiyatlandırma" />
            <NavLink to="/about" label="Hakkımızda" />
            <Link 
              to="/contact" 
              className="group flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full font-semibold hover:bg-white/90 transition-all text-sm active:scale-95"
            >
              Başlayın
              <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-20 min-h-[80vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Premium Footer */}
      <footer className="py-20 px-6 border-t border-white/5 relative z-10 bg-background/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-6">
                <Bot className="text-primary w-6 h-6" />
                <span className="font-bold text-lg tracking-tight">ALFA YAPAY ZEKA</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">
                Mühendislik disiplini ve yapay zekanın sınırsız potansiyelini birleştirerek geleceğin dijital dünyasını inşa ediyoruz.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-sm">
              <div className="flex flex-col gap-4">
                <span className="font-bold text-white/80">Platform</span>
                <a href="#" className="text-white/40 hover:text-white transition-colors">Portfolyo</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors">Hizmetler</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-bold text-white/80">Şirket</span>
                <a href="#" className="text-white/40 hover:text-white transition-colors">Hakkımızda</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors">İletişim</a>
              </div>
              <div className="flex flex-col gap-4">
                <span className="font-bold text-white/80">Sosyal</span>
                <a href="#" className="text-white/40 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors">Twitter</a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/20 font-medium tracking-widest uppercase">
            <span>© 2026 ALFA YAPAY ZEKA AJANSI</span>
            <div className="flex gap-8">
              <span className="hover:text-white/40 cursor-pointer transition-colors">GIZLILIK POLITIKASI</span>
              <span className="hover:text-white/40 cursor-pointer transition-colors">KULLANIM ŞARTLARI</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ to, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link 
      to={to} 
      className={`text-sm font-medium transition-all relative ${isActive ? 'text-white' : 'text-white/50 hover:text-white'}`}
    >
      {label}
      {isActive && (
        <motion.div 
          layoutId="nav-underline"
          className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
        />
      )}
    </Link>
  );
};

export default Layout;
