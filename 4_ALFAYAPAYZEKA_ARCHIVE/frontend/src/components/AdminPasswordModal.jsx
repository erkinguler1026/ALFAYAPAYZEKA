import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * AdminPasswordModal — ALFA YAPAY ZEKA Şifre Doğrulama Arayüzü
 * 
 * @param {boolean} isOpen - Modal görünürlük durumu
 * @param {function} onClose - Kapatma fonksiyonu
 */
const AdminPasswordModal = ({ isOpen, onClose }) => {
  const [password, setPassword] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Şifre kontrolü (User requirement: eg941965)
    if (password === 'eg941965') {
      toast.success('ADMIN Erişimi Onaylandı. Hoşgeldiniz Hocam.');
      sessionStorage.setItem('admin_auth', 'true'); // Geçici oturum
      onClose();
      navigate('/admin-panel');
    } else {
      setIsError(true);
      toast.error('Giriş Reddedildi: Geçersiz Kod.');
      setTimeout(() => setIsError(false), 1000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-md bg-[#0a0a0c] border-2 rounded-[32px] p-8 md:p-12 shadow-2xl overflow-hidden ${
              isError ? 'border-red-500/50 shadow-red-500/20' : 'border-white/10 shadow-primary/20'
            } transition-colors duration-300`}
          >
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-500/5 blur-3xl -z-10" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 text-white/20 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-8 border transition-all ${
              isError ? 'bg-red-500/10 border-red-500/30 text-red-500' : 'bg-white/5 border-white/10 text-white'
            }`}>
              {isError ? <ShieldAlert size={32} /> : <Lock size={32} />}
            </div>

            {/* Text */}
            <div className="text-center mb-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-2">Giriş Doğrulama</h3>
              <p className="text-white/40 text-sm font-medium">Sistem yönetimine erişmek için yönetici kodunu giriniz.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="password"
                  autoFocus
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full bg-white/5 border rounded-2xl px-6 py-4 text-center text-white text-xl font-mono tracking-[0.5em] focus:outline-none transition-all ${
                    isError ? 'border-red-500/50 focus:border-red-500 bg-red-500/5' : 'border-white/10 focus:border-primary/50'
                  }`}
                />
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:bg-primary hover:text-white transition-all transform active:scale-95 flex items-center justify-center gap-3"
              >
                Erişimi Aç <ShieldCheck size={20} />
              </button>

              <div className="text-center">
                <span className="text-[10px] text-white/10 font-bold uppercase tracking-[0.2em]">
                  ALFA YAPAY ZEKA — PROTOKOL V1.4.0
                </span>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminPasswordModal;
