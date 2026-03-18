import { Link, useLocation, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bot, ChevronRight, Zap } from 'lucide-react';

const Layout = () => {
  return (
    <div className="min-h-screen relative selection:bg-primary/30 bg-[#0a0a0c]">
      {/* Premium Background Mesh */}
      <div className="bg-mesh" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-xl border-b border-white/5 h-24">
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

          <div className="hidden md:flex items-center gap-12 font-bold tracking-widest text-[11px] uppercase">
            <NavLink to="/" label="Ana Sayfa" />
            <NavLink to="/portfolio" label="Portfolyo" />
            <NavLink to="/pricing" label="Fiyatlandırma" />
            <NavLink to="/about" label="Hakkımızda" />
            <Link 
              to="/contact" 
              className="group flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-2xl font-black hover:bg-primary hover:text-white transition-all transform active:scale-95"
            >
              Başlayın
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 pt-24">
        <Outlet />
      </main>

      {/* Premium Footer (PIXEL PERFECT TO 3097) */}
      <footer className="py-32 px-6 border-t border-white/5 relative z-10 bg-[#0a0a0c] overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-24 mb-32">
            <div className="max-w-sm">
              <div className="flex items-center gap-4 mb-8">
                <Bot className="text-primary w-8 h-8" />
                <span className="font-black text-2xl tracking-tighter uppercase text-white">ALFA YAPAY ZEKA</span>
              </div>
              <p className="text-white/30 text-lg leading-relaxed font-light">
                Mühendislik disiplini ve yapay zekanın sınırsız potansiyelini birleştirerek geleceğin dijital dünyasını inşa ediyoruz.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-24 text-[13px] font-bold tracking-widest uppercase text-white/40">
              <div className="flex flex-col gap-6">
                <span className="text-white text-[11px] tracking-[0.4em] mb-2">Platform</span>
                <a href="#" className="hover:text-primary transition-colors">Portfolyo</a>
                <a href="#" className="hover:text-primary transition-colors">Hizmetler</a>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-white text-[11px] tracking-[0.4em] mb-2">Şirket</span>
                <a href="#" className="hover:text-primary transition-colors">Hakkımızda</a>
                <Link to="/contact" className="hover:text-primary transition-colors">İletişim</Link>
              </div>
              <div className="flex flex-col gap-6">
                <span className="text-white text-[11px] tracking-[0.4em] mb-2">Sosyal</span>
                <a href="#" className="hover:text-primary transition-colors uppercase tracking-widest">LinkedIn</a>
                <a href="#" className="hover:text-primary transition-colors uppercase tracking-widest">Twitter</a>
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-bold tracking-[0.3em] text-white/20 uppercase">
            <span>© 2026 ALFA YAPAY ZEKA AJANSI</span>
            <div className="flex gap-12">
              <span className="hover:text-white transition-colors cursor-pointer">GİZLİLİK POLİTİKASI</span>
              <span className="hover:text-white transition-colors cursor-pointer">KULLANIM ŞARTLARI</span>
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

export default Layout;
