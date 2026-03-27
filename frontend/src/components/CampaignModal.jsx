import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Flame, ShieldCheck, Zap, ChevronRight } from 'lucide-react';
import MatrixRain from './MatrixRain';

const SESSION_KEY = 'snap_popup_shown';

const CampaignModal = () => {
  const [visible, setVisible] = useState(false);
  const [countdown, setCountdown] = useState(7);
  const navigate = useNavigate();
  const location = useLocation();

  const dismiss = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setVisible(false);
  }, []);

  const goToPage = useCallback(() => {
    dismiss();
    navigate('/snap-report');
  }, [dismiss, navigate]);

  // Popup'u 0.8 sn sonra göster (oturum başında 1 kez)
  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    // Scorecard (Özel Gizli Rapor) ve Kampanya sayfasının kendisinde OTOMATİK ÇIKMASIN!
    // Aksi halde direkt Snap-Report'a zorla yönlendirir ve raporu okutmaz.
    if (location.pathname === '/scorecard' || location.pathname === '/snap-report') {
      sessionStorage.setItem(SESSION_KEY, '1'); // Bir daha rahatsız etmemesi için oturumda görüldü işaretle
      return;
    }

    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, [location.pathname]);

  // Özel event ile tetikleme
  useEffect(() => {
    const handleOpen = () => {
      setVisible(true);
      setCountdown(7);
    };
    window.addEventListener('open-campaign-modal', handleOpen);
    return () => window.removeEventListener('open-campaign-modal', handleOpen);
  }, []);

  // Geri sayim azalt
  useEffect(() => {
    if (!visible || countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [visible, countdown]);

  // Geri sayim bitti -> sayfaya geçiş yap
  useEffect(() => {
    if (visible && countdown === 0) {
      const t = setTimeout(goToPage, 0);
      return () => clearTimeout(t);
    }
  }, [visible, countdown, goToPage]);

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Overlay — Matrix rain arka planı */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            onClick={dismiss}
            className="fixed inset-0 z-[9998] bg-[#050505]/60 overflow-hidden"
          >
            <MatrixRain opacity={0.65} color="#00ff41" fontSize={14} speed={0.7} />
          </motion.div>

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center px-4 pointer-events-none"
          >
            <div className="pointer-events-auto w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl shadow-red-600/10 relative">

              {/* Flash stripe dekorasyonu */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-400 to-red-600" />

              {/* Kapat + Geri sayım */}
              <div className="flex items-center justify-between px-6 pt-5 pb-0">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-black uppercase tracking-widest">
                  <Flame size={12} className="animate-pulse" />
                  DİJİTAL ZIRH 60
                </div>
                <button
                  onClick={dismiss}
                  className="flex items-center gap-1.5 text-white/30 hover:text-white transition-colors text-[11px]"
                >
                  <span className="font-mono bg-white/5 px-2 py-0.5 rounded-lg">{countdown}s</span>
                  <X size={16} />
                </button>
              </div>

              {/* İçerik */}
              <div className="px-6 py-6">
                <h2 className="text-3xl font-black leading-tight mb-1">
                  Sitenizin Güvenlik<br />
                  <span className="text-red-500">Karnesini Alın —</span>{' '}
                  <span className="text-white">Ücretsiz.</span>
                </h2>
                <p className="text-white/40 text-sm leading-relaxed mt-3">
                  Normal değeri <span className="text-white font-semibold">19.999 TL</span> olan kurumsal
                  Web-Risk Check-Up hizmetimiz, 60 gün boyunca sınırlı sayıda işletme için{' '}
                  <span className="text-white font-semibold">ücretsiz</span> sunuluyor.
                </p>

                {/* Feature satırı */}
                <div className="grid grid-cols-3 gap-2 mt-5">
                  {[
                    { icon: <ShieldCheck size={14} />, label: 'Altyapı Skoru' },
                    { icon: <Zap size={14} />,         label: '3 Zafiyet'      },
                    { icon: <ChevronRight size={14} />,label: 'Eylem Planı'    },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-1.5 bg-white/5 rounded-xl px-3 py-2">
                      <span className="text-red-500">{f.icon}</span>
                      <span className="text-[11px] text-white/60 font-semibold">{f.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button
                  onClick={goToPage}
                  className="w-full mt-5 py-4 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-red-600/20"
                >
                  ÜCRETSİZ SNAP REPORT BAŞVUR <ChevronRight size={18} />
                </button>

                {/* Alt not */}
                <p className="text-center text-[10px] text-white/20 mt-3 uppercase tracking-widest">
                  alfayapayzeka.com · Hackerlara Kapalı, Müşterilere Açık
                </p>
              </div>

              {/* Countdown progress bar */}
              <motion.div
                className="h-1 bg-red-600/60 origin-left"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 7, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CampaignModal;
