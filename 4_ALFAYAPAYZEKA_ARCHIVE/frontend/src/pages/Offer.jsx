/**
 * Offer Sayfası — Kurumsal Kampanya Modülü (V1.4.0)
 * 
 * Açıklama: Alfa Yapay Zeka'nın güncel kampanya ve indirimlerini sunan 
 * özel satış sayfasıdır.
 * 
 * Özellikler:
 *   - Geri sayım sayacı (FomO etkisi).
 *   - Kampanyalı paket karşılaştırmaları.
 *   - Hızlı kampanya katılım formu.
 * 
 * © 2026 ALFA YAPAY ZEKA — Siber Tehditlere Kapalı, Müşterilere Açık.
 */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap, Shield, ShieldCheck, CheckCircle2, Clock, Flame, ChevronRight
} from 'lucide-react';

/**
 * Offer — Kampanya Sayfası
 *
 * Geçici %20 indirim kampanyasını sunar.
 * Kapsam: "Dijital Kartvizit" ve "Satış Makinesi" paketleri
 *
 * Fiyat hesabı:
 *   Dijital Kartvizit : 8.999 → 7.199 ₺ (+KDV) | Aylık: 3.999 → 3.199 ₺
 *   Satış Makinesi    : 19.999 → 15.999 ₺ (+KDV) | Aylık: 8.999 → 7.199 ₺
 */

const CAMPAIGN_END = new Date('2026-04-30T23:59:59');

const useCountdown = () => {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calculate = () => {
      const diff = CAMPAIGN_END - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days:    Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours:   Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, []);
  return timeLeft;
};

const CountBox = ({ value, label }) => (
  <div className="flex flex-col items-center px-4 py-3 bg-white/5 border border-white/10 rounded-2xl min-w-[64px]">
    <span className="text-3xl md:text-4xl font-black text-white tabular-nums">
      {String(value ?? 0).padStart(2, '0')}
    </span>
    <span className="text-[9px] text-white/30 uppercase tracking-widest font-bold mt-1">{label}</span>
  </div>
);

const offers = [
  {
    name: 'DİJİTAL KARTVİZİT',
    badge: '🛡️ Hacker Korumalı',
    originalSetup: '8.999',
    discountedSetup: '7.199',
    originalMonthly: '3.999',
    discountedMonthly: '3.199',
    features: [
      'Zırhlı Kod Yapısı (SSL + Güvenlik Duvarı)',
      '12 Ay Teknik Garanti (Warranty)',
      'Haftalık Güvenlik Diagnostiği',
      '7/24 Uptime Monitoring',
      'Hacker Kalkanı Güncellemeleri',
      'SEO & Meta-Tag Optimizasyonu',
    ],
    color: 'from-primary/20 to-transparent',
    border: 'border-primary/30',
    popular: false,
  },
  {
    name: 'SATIŞ MAKİNESİ',
    badge: '🔥 En Çok Tercih Edilen',
    originalSetup: '19.999',
    discountedSetup: '15.999',
    originalMonthly: '8.999',
    discountedMonthly: '7.199',
    features: [
      'GPT-4 Tabanlı Satış Chatbotu',
      'Hacker Saldırısı Anlık Uyarı Sistemi',
      'Aylık Siber Risk Raporu',
      'Dijital Sigorta Poliçesi Danışmanlığı',
      'Gelişmiş Anti-Bot & CAPTCHA',
      'Aylık İş Büyüme Check-up',
    ],
    color: 'from-accent/20 to-transparent',
    border: 'border-accent/30',
    popular: true,
  },
];

const Offer = () => {
  const timeLeft = useCountdown();

  useEffect(() => {
    document.title = 'Kampanya — %20 İndirim | Alfa Yapay Zeka Dijital Kartvizit & Satış Makinesi';
  }, []);

  return (
    <div className="min-h-screen px-6 py-16 bg-[#050505] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] -z-10 rounded-full" />

      <div className="max-w-5xl mx-auto">

        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-8"
        >
          <span className="flex items-center gap-2 px-5 py-2 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-black uppercase tracking-widest animate-pulse">
            <Flame size={14} /> Sınırlı Süreli Kampanya — %20 İndirim
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-7xl font-black text-center tracking-tight mb-4 text-white"
        >
          Zırhlı Sistemi <span className="text-gradient">%20 İndirimle</span> Kazan.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center text-white/40 text-lg max-w-2xl mx-auto mb-12"
        >
          Hacker Kalkanı, Teknik Garanti ve 7/24 güvenlik koruması — kampanya sona ermeden fırsatı yakalayın.
        </motion.p>

        {/* Countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex items-center justify-center gap-3 mb-16"
        >
          <Clock size={16} className="text-white/30" />
          <span className="text-white/30 text-xs uppercase tracking-widest font-bold">Kampanya bitimine kalan:</span>
          <div className="flex gap-2">
            <CountBox value={timeLeft.days}    label="Gün" />
            <CountBox value={timeLeft.hours}   label="Saat" />
            <CountBox value={timeLeft.minutes} label="Dk" />
            <CountBox value={timeLeft.seconds} label="Sn" />
          </div>
        </motion.div>

        {/* Offer Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {offers.map((offer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              className={`relative rounded-[40px] border ${offer.border} p-10 bg-gradient-to-br ${offer.color} overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_50px_rgba(168,85,247,0.2)] transition-all duration-300`}
            >
              {offer.popular && (
                <div className="absolute top-6 right-6 px-3 py-1 bg-accent text-white text-[10px] font-black uppercase tracking-widest rounded-full">
                  🔥 Popüler
                </div>
              )}

              <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">{offer.badge}</span>
              <h2 className="text-2xl font-black text-white mb-6">{offer.name}</h2>

              {/* Pricing */}
              <div className="mb-8">
                <div className="mb-4">
                  <span className="text-white/30 text-xs uppercase tracking-widest block mb-1">Kurulum (Liste Fiyatı)</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-white/30 line-through text-xl font-bold">{offer.originalSetup} ₺</span>
                    <span className="text-4xl font-black text-white">{offer.discountedSetup} ₺</span>
                    <span className="text-white/50 text-sm font-bold">+KDV</span>
                  </div>
                </div>
                <div className="p-4 bg-primary/10 border border-primary/20 rounded-2xl">
                  <span className="text-white/40 text-[9px] uppercase tracking-widest font-bold block mb-1">
                    Aylık Kalkan & Garanti (Zorunlu)
                  </span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white/30 line-through text-sm font-bold">{offer.originalMonthly} ₺</span>
                    <span className="text-2xl font-black text-primary">{offer.discountedMonthly} ₺</span>
                    <span className="text-white/30 text-xs">+KDV / ay</span>
                  </div>
                </div>
              </div>

              {/* Discount badge */}
              <div className="flex items-center gap-2 mb-6 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl w-fit">
                <Zap size={14} className="text-red-400" />
                <span className="text-red-400 text-xs font-black">%20 Kampanya İndirimi Uygulandı</span>
              </div>

              {/* Features */}
              <div className="space-y-3 mb-8">
                {offer.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3 text-sm text-white/60">
                    <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                    {f}
                  </div>
                ))}
              </div>

              <Link
                to="/contact"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold text-sm bg-primary text-white hover:bg-white hover:text-black transition-all active:scale-95"
              >
                Kampanya Fiyatıyla Başlat <ChevronRight size={16} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Warranty strip */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 p-8 border border-white/5 rounded-[30px] bg-white/5">
          <div className="flex items-center gap-3">
            <Shield size={20} className="text-primary" />
            <span className="text-white/60 text-sm font-medium">12 Ay Teknik Garanti (Warranty) Dahil</span>
          </div>
          <div className="w-px h-6 bg-white/10 hidden md:block" />
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-accent" />
            <span className="text-white/60 text-sm font-medium">7/24 Hacker Kalkanı Aktif</span>
          </div>
          <div className="w-px h-6 bg-white/10 hidden md:block" />
          <div className="flex items-center gap-3">
            <Flame size={20} className="text-red-400" />
            <span className="text-white/60 text-sm font-medium">Kampanya 30 Nisan 2026'ya Kadar Geçerli</span>
          </div>
        </div>

        <p className="text-center text-white/20 text-xs mt-8">
          * Kampanya fiyatları KDV hariçtir. 12 aylık teknik garanti taahhüdü kapsamında geçerlidir. Kampanya paketleri stoklarla sınırlıdır.
        </p>
      </div>
    </div>
  );
};

export default Offer;
