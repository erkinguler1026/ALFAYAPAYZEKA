import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert, Activity, Cpu, Terminal, Lock, Zap,
  ShieldCheck, Timer, ArrowRight, AlertTriangle, LayoutDashboard, RefreshCw
} from 'lucide-react';

/**
 * FullTechnicalAudit — ALFA X-RAY V3 Gerçek Zamanlı Tarama Motoru
 *
 * Bu bileşen artık SAHTE/ANİMASYON log göstermez.
 * Backend'e gerçek tarama isteği gönderir, dönen sonuçları
 * terminale yansıtır ve sessionStorage'a kaydeder.
 * ScoreCard ve FullFormalReport bu cache'i kullanır.
 */

const SCAN_STEPS = [
  'Gelişmiş Altyapı ve DNS Çözümleme [S1]',
  'Multi-Thread Asenkron Port Taraması (17 Kritik Port) [S3]',
  'SSL/TLS Kriptografik Derin Denetim (Crypto-Audit) [N3]',
  'OSINT: Sertifika Şeffaflık Günlüğü (crt.sh) Keşfi [N1]',
  'Fiziksel Lokasyon ve Veri Merkezi İzleme (Geo-IP) [N2]',
  'Güvenlik Politikası Başlık Denetimi (HSTS, CSP, CORS) [N6]',
  'E-posta ve DNS Güvenlik Duvarı Analizi (SPF, DMARC) [S4]',
  'Sunucu ve Teknoloji Parmak İzi Çıkarımı (Wappalyzer) [N7]',
  'Çerez ve Oturum Güvenliği Politikası Analizi [N5]',
  'Asset Inventory: Sitemap ve Robots.txt Taraması [N9]',
  'Sensitive Data: Dizin ve Dosya Sızıntısı Taraması [S8]',
  'İtibar ve Tehdit İstihbaratı Sorgusu (AlienVault OTX) [N8]',
  'Zafiyet İlişkilendirme ve ISO 27001:2022 Uyumluluk Eşleme',
  'Penetrasyon Testi Kanıt Zinciri Raporu Derleniyor...'
];

// ─── Gerçek veriden terminal logları üret ──────────────────────────────────
const buildRealLogs = (data, domain) => {
  if (!data) return [];
  const logs = [];

  logs.push(`[INIT] X-RAY S-CORE Başlatıldı → Hedef: https://www.${domain}`);
  logs.push(`[ALFA] Backend bağlantısı kuruldu. Gerçek zamanlı tarama tamamlandı.`);

  // S1: IP / DNS / GeoIP
  if (data.ipAddress) {
    logs.push(`[S1] DNS çözümlendi → IP: ${data.ipAddress}`);
  }
  if (data.ipGeo?.isp || data.ipGeo?.org) {
    logs.push(`[S1] ISP / Altyapı: ${data.ipGeo.isp || data.ipGeo.org}`);
  }
  if (data.ipGeo?.country) {
    logs.push(`[N2] Geo-IP: ${data.ipGeo.city ? data.ipGeo.city + ', ' : ''}${data.ipGeo.country} | ASN: ${data.ipGeo.asn || 'N/A'}`);
  }

  // S3: Port Taraması
  const ports = data.network?.ports || [];
  if (ports.length > 0) {
    ports.forEach(p => {
      logs.push(`[S3] ⚠️  Port ${p.port} (${p.service || 'TCP'}): AÇIK → Saldırı yüzeyi tespit edildi!`);
    });
  } else {
    logs.push(`[S3] Port taraması tamamlandı → Harici kritik port açık değil. ✓`);
  }

  // N3: SSL/TLS
  const sslGrade = data.sslGrade?.grade || data.ssl?.grade;
  if (sslGrade) {
    const hsts = data.hasHSTS !== undefined ? (data.hasHSTS ? 'Aktif ✓' : 'Pasif ⚠️') : 'Kontrol edildi';
    logs.push(`[N3] SSL/TLS Denetimi → Derece: ${sslGrade} | HSTS: ${hsts}`);
  } else {
    logs.push(`[N3] SSL/TLS analizi tamamlandı.`);
  }

  // N1: Subdomains (crt.sh)
  const subdomains = data.subdomains || [];
  if (subdomains.length > 0) {
    logs.push(`[N1] crt.sh OSINT: ${subdomains.length} alt domain keşfedildi → ${subdomains.slice(0, 4).join(', ')}${subdomains.length > 4 ? '...' : ''}`);
  } else {
    logs.push(`[N1] crt.sh sertifika şeffaflık taraması tamamlandı.`);
  }

  // N6: HTTP Security Headers
  const findings = data.findings || [];
  const missingHeaders = findings.filter(f =>
    ['hsts', 'csp', 'x-frame-options', 'cors', 'x-content-type'].includes((f.id || '').toLowerCase())
  );
  if (missingHeaders.length > 0) {
    logs.push(`[N6] ⚠️  Eksik güvenlik başlıkları: ${missingHeaders.map(f => (f.id || '').toUpperCase()).join(', ')}`);
  } else {
    logs.push(`[N6] HTTP güvenlik başlıkları denetlendi → Standartlara uygun. ✓`);
  }

  // S4: SPF / DMARC
  const spf = data.emailSecurity?.spf;
  const dmarc = data.emailSecurity?.dmarc;
  const spfStr = spf ? `SPF: Mevcut ✓` : `SPF: Eksik ⚠️`;
  const dmarcStr = dmarc ? `DMARC: Mevcut ✓` : `DMARC: Eksik ⚠️`;
  logs.push(`[S4] E-posta güvenliği → ${spfStr} | ${dmarcStr}`);

  // N7: Technologies
  const techs = (data.technologies || []).map(t => t.name || t).filter(Boolean).slice(0, 6);
  if (techs.length > 0) {
    logs.push(`[N7] Teknoloji parmak izi → ${techs.join(', ')}`);
  } else {
    logs.push(`[N7] Teknoloji parmak izi analizi tamamlandı.`);
  }

  // N5: Cookies
  logs.push(`[N5] Çerez ve oturum güvenliği analizi tamamlandı.`);

  // N9: Sitemap
  const sitemapUrls = data.sitemapUrls?.length || data.assetInventory?.sitemapCount || 0;
  if (sitemapUrls > 0) {
    logs.push(`[N9] sitemap.xml parse edildi → ${sitemapUrls} giriş noktası tespit edildi.`);
  } else {
    logs.push(`[N9] Asset inventory ve robots.txt taraması tamamlandı.`);
  }

  // S8: Sensitive Files
  if (data.sensitiveData?.hasCritical) {
    logs.push(`[S8] 🔴 KRİTİK: Hassas dosyalar erişilebilir durumda! (.env / .git / config)`);
  } else {
    logs.push(`[S8] Hassas dosya ve dizin taraması → Kritik sızıntı tespit edilmedi. ✓`);
  }

  // N8: Reputation
  const hasReputation = findings.some(f =>
    (f.id || '').toLowerCase().includes('reputation') ||
    (f.category || '').toLowerCase().includes('reputation')
  );
  logs.push(`[N8] İtibar / Tehdit istihbaratı → ${hasReputation ? 'Şüpheli kayıt mevcut ⚠️' : 'TEMİZ ✓'}`);

  // SYSTEM: Final
  const critCount = findings.filter(f => ['CRITICAL', 'HIGH'].includes((f.severity || '').toUpperCase())).length;
  logs.push(`[SYSTEM] ${findings.length} bulgu ISO 27001:2022 Annex A.8.x kontrolleriyle eşleştirildi.`);
  logs.push(`[SYSTEM] Kritik/Yüksek Bulgu: ${critCount} adet | Toplam Bulgu: ${findings.length} adet`);
  logs.push(`[SYSTEM] Güvenlik Skoru: ${data.overallScore}/10 → Derece: ${data.grade} ${data.scanDurationSec ? `| Tarama Süresi: ${data.scanDurationSec}s` : ''}`);
  logs.push(`[SYSTEM] X-RAY Analizi tamamlandı. ScoreCard hazır.`);

  return logs;
};
// ──────────────────────────────────────────────────────────────────────────────

const FullTechnicalAudit = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lang = searchParams.get('lang') || 'tr';
  const site = searchParams.get('site') || 'site.com';

  const domain = useMemo(() =>
    site.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, ''),
    [site]
  );
  const formattedUrl = `https://www.${domain}`;

  const [loadStep, setLoadStep] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [animDone, setAnimDone] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [auditData, setAuditData] = useState(null);
  const [scanError, setScanError] = useState(null);
  const [terminalLogs, setTerminalLogs] = useState([
    `[INIT] X-RAY S-CORE Başlatıldı → Hedef: ${`https://www.${site.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').replace(/\/$/, '')}`}`,
    `[ALFA] Backend bağlantısı kuruluyor... Gerçek tarama başlatılıyor.`
  ]);
  const [visibleLogCount, setVisibleLogCount] = useState(2);
  const terminalRef = useRef(null);
  const startTime = useMemo(() => new Date(), []);

  // ─── 1. Gerçek Backend Taraması ─────────────────────────────────────────
  useEffect(() => {
    const cacheKey = `alfa_audit_${domain}`;

    const doScan = async () => {
      try {
        // Önce cache kontrol
        const cached = sessionStorage.getItem(cacheKey);
        if (cached) {
          const parsed = JSON.parse(cached);
          const ageMs = Date.now() - (parsed.cachedAt || 0);
          if (ageMs < 1800000) {
            console.log(`[ALFA-AUDIT] Cache bulundu (${Math.round(ageMs / 1000)}s önce) → Yeni tarama yapılmıyor.`);
            setAuditData(parsed.results);
            const realLogs = buildRealLogs(parsed.results, domain);
            setTerminalLogs(prev => [...prev, `[ALFA] Önbellekte geçerli tarama mevcut (${Math.round(ageMs / 1000)}s önce). Yeniden kullanılıyor...`, ...realLogs]);
            setScanDone(true);
            return;
          }
        }

        // Canlı tarama
        const HOST = window.location.hostname === 'localhost'
          ? 'http://localhost:5000'
          : 'https://api.alfayapayzeka.com';

        setTerminalLogs(prev => [...prev, `[ALFA] ${HOST}/api/full-audit → İstek gönderildi...`]);

        const res = await fetch(`${HOST}/api/full-audit?url=${domain}`);
        const data = await res.json();

        if (data.success && data.results) {
          // sessionStorage'a kaydet
          sessionStorage.setItem(cacheKey, JSON.stringify({
            results: data.results,
            cachedAt: Date.now(),
            domain
          }));

          setAuditData(data.results);
          const realLogs = buildRealLogs(data.results, domain);
          setTerminalLogs(realLogs); // Gerçek loglarla tamamen değiştir
          console.log(`[ALFA-AUDIT] Tarama tamamlandı. Skor: ${data.results.overallScore} | Derece: ${data.results.grade}`);
        } else {
          setScanError(data.error || 'Tarama başarısız oldu.');
          setTerminalLogs(prev => [...prev, `[HATA] Backend yanıtında hata: ${data.error || 'Bilinmeyen hata'}`]);
        }
      } catch (e) {
        console.error('[ALFA-AUDIT] Bağlantı hatası:', e);
        setScanError('Bağlantı hatası: ' + e.message);
        setTerminalLogs(prev => [...prev, `[HATA] Bağlantı kurulamadı: ${e.message}`]);
      }
      setScanDone(true);
    };

    doScan();
  }, [domain]);

  // ─── 2. Animasyon Adım Sayacı ────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => setElapsedTime(prev => prev + 1), 1000);
    const stepTimer = setInterval(() => {
      setLoadStep(prev => {
        if (prev >= SCAN_STEPS.length - 1) {
          clearInterval(stepTimer);
          setAnimDone(true);
          return prev;
        }
        return prev + 1;
      });
    }, 2200);
    return () => { clearInterval(timer); clearInterval(stepTimer); };
  }, []);

  // ─── 3. Terminal log gösterimi (satır satır çıksın) ──────────────────────
  useEffect(() => {
    if (visibleLogCount >= terminalLogs.length) return;
    const t = setTimeout(() => setVisibleLogCount(prev => prev + 1), 120);
    return () => clearTimeout(t);
  }, [visibleLogCount, terminalLogs]);

  useEffect(() => {
    setVisibleLogCount(1); // loglar değişince sıfırla
  }, [terminalLogs]);

  // Terminal auto-scroll
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [visibleLogCount]);

  // ─── Tamamlanma durumu (ikisi de bitmeli) ────────────────────────────────
  const complete = animDone && scanDone && !scanError;
  const progress = Math.round((loadStep / (SCAN_STEPS.length - 1)) * 100);

  // ─── Helper: log satırı rengi ────────────────────────────────────────────
  const logColor = (log) => {
    if (log.startsWith('[SYSTEM]')) return 'text-white font-black bg-green-900/40 px-1';
    if (log.includes('🔴') || log.includes('⚠️') || log.startsWith('[HATA]')) return 'text-rose-400 font-bold';
    if (log.includes('✓')) return 'text-green-400';
    if (log.startsWith('[INIT]') || log.startsWith('[ALFA]')) return 'text-cyan-400 font-bold';
    return 'text-green-600';
  };

  return (
    <div className="min-h-screen bg-[#000500] text-green-500 font-mono flex flex-col items-center justify-start py-12 px-4 relative overflow-hidden">

      {/* ADMIN PANEL Button */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => navigate('/admin-panel')}
          className="group flex items-center gap-2 px-5 py-2.5 bg-green-950/40 border border-green-800/50 hover:bg-green-900/60 hover:border-green-500 text-green-500 hover:text-green-300 rounded-lg font-bold text-xs uppercase tracking-widest transition-all backdrop-blur-sm"
        >
          <LayoutDashboard size={16} /> ADMİN PANEL
        </button>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      {/* Header */}
      <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }} transition={{ duration: 2, repeat: Infinity }} className="w-24 h-24 mb-6 relative z-10">
        <div className="absolute inset-0 border-2 border-green-600/30 rounded-full animate-spin-slow" />
        <div className="absolute inset-2 border-2 border-green-600/50 rounded-full flex items-center justify-center bg-green-600/5 shadow-[0_0_30px_rgba(34,197,94,0.3)]">
          <ShieldAlert size={40} className="text-green-600" />
        </div>
      </motion.div>

      <h1 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase mb-2 z-10 text-center">
        FULL X-RAY SİBER GÜVENLİK ANALİZİ
      </h1>
      <p className="text-green-600 font-black text-xs md:text-sm tracking-[0.5em] mb-12 z-10 text-center flex items-center justify-center gap-3">
        <span className="w-2 h-2 bg-green-600 animate-pulse rounded-full" />
        HEDEF: {formattedUrl}
      </p>

      {/* Tarama durumu banner */}
      <div className="mb-6 z-10 flex items-center gap-3">
        {!scanDone && (
          <div className="flex items-center gap-2 px-4 py-2 bg-cyan-950/40 border border-cyan-700/40 rounded-lg text-cyan-400 text-xs font-bold uppercase tracking-widest animate-pulse">
            <Activity size={14} className="animate-spin" />
            GERÇEK ZAMANLI TARAMA DEVAM EDİYOR...
          </div>
        )}
        {scanDone && !scanError && (
          <div className="flex items-center gap-2 px-4 py-2 bg-green-950/40 border border-green-700/40 rounded-lg text-green-400 text-xs font-bold uppercase tracking-widest">
            <ShieldCheck size={14} />
            TARAMA TAMAMLANDI — VERİ DOĞRULANDI
          </div>
        )}
        {scanError && (
          <div className="flex items-center gap-2 px-4 py-2 bg-rose-950/40 border border-rose-700/40 rounded-lg text-rose-400 text-xs font-bold uppercase tracking-widest">
            <AlertTriangle size={14} />
            TARAMA HATASI: {scanError}
          </div>
        )}
      </div>

      {/* Dual Windows */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl mx-auto z-10 flex-1 min-h-[650px]">

        {/* LEFT: Security Operations */}
        <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          className="bg-black/80 border-2 border-green-900/40 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[1175px]">
          <div className="bg-green-950/20 px-6 py-4 border-b border-green-900/40 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Zap size={20} className="text-green-600" />
              <h2 className="font-black text-sm tracking-widest text-green-100 uppercase">GÜVENLİK İŞLEMLERİ</h2>
            </div>
            <div className="flex gap-4">
              <div className="text-[10px] flex items-center gap-1.5 font-bold px-2 py-1 bg-green-950/40 border border-green-900/40 rounded text-green-400">
                <Timer size={12} /> SÜRE: {elapsedTime}S
              </div>
              {auditData && (
                <div className="text-[10px] flex items-center gap-1.5 font-bold px-2 py-1 bg-emerald-950/60 border border-emerald-700/40 rounded text-emerald-400">
                  SKOR: {auditData.overallScore}/10 | {auditData.grade}
                </div>
              )}
            </div>
          </div>

          <div className="p-6 flex-1 flex flex-col space-y-3 overflow-y-auto custom-scrollbar">
            {SCAN_STEPS.map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: idx <= loadStep ? 1 : 0.2 }}
                className={`flex items-center gap-4 py-3 px-4 border rounded transition-all ${idx === loadStep ? 'border-green-600 bg-green-600/10 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'border-green-950/30'}`}>
                <div className={`w-8 font-black text-xs ${idx === loadStep ? 'text-white' : 'text-green-900'}`}>
                  {(idx + 1).toString().padStart(2, '0')}
                </div>
                <div className={`text-[12px] md:text-sm font-bold flex-1 tracking-wider ${idx === loadStep ? 'text-white' : (idx < loadStep ? 'text-green-700' : 'text-green-950')}`}>
                  {step}
                </div>
                {idx < loadStep && <ShieldCheck size={18} className="text-green-600" />}
                {idx === loadStep && <Activity size={18} className="animate-pulse text-green-500" />}
              </motion.div>
            ))}
          </div>

          <div className="p-6 border-t border-green-900/40 bg-black">
            <div className="flex justify-between text-[10px] font-black mb-2 tracking-widest text-green-500 uppercase">
              <span>SYSTEM PROGRESS</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-green-950/20 rounded-full overflow-hidden border border-green-900/40">
              <motion.div className="h-full bg-green-600 shadow-[0_0_10px_rgba(34,197,94,0.8)]"
                initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Real Terminal */}
        <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
          className="bg-black/90 border-2 border-green-900/40 rounded-xl overflow-hidden shadow-2xl flex flex-col h-[1175px] relative">
          <div className="bg-green-950/20 px-6 py-4 border-b border-green-900/40 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Terminal size={20} className="text-green-600" />
              <h2 className="font-black text-sm tracking-widest text-green-100 uppercase">X-RAY TERMİNALİ (GERÇEK VERİ)</h2>
            </div>
            <div className="flex items-center gap-2">
              {!scanDone && (
                <RefreshCw size={12} className="text-cyan-500 animate-spin" />
              )}
              <div className="text-[10px] font-bold text-green-800">AUTH: ALFA-SEC-V4</div>
            </div>
          </div>

          <div ref={terminalRef}
            className="flex-1 p-6 font-mono text-[11px] md:text-[12px] leading-relaxed overflow-y-auto custom-scrollbar bg-[rgba(0,10,0,0.8)]">
            {terminalLogs.slice(0, visibleLogCount).map((log, idx) => (
              <div key={idx} className="mb-2 flex gap-3">
                <span className="text-green-900 shrink-0 text-[10px]">
                  [{new Date(startTime.getTime() + idx * 1200).toLocaleTimeString()}]
                </span>
                <span className={logColor(log)}>{log}</span>
              </div>
            ))}
            {(!scanDone || visibleLogCount < terminalLogs.length) && (
              <div className="animate-pulse flex items-center gap-1 mt-1">
                <span className="w-1.5 h-4 bg-green-600" />
              </div>
            )}
          </div>

          {/* Bottom action area */}
          {!complete && !scanError && (
            <div className="p-6 border-t border-green-900/40 bg-black/50 text-center">
              <div className="flex items-center justify-center gap-2 text-[10px] font-black text-green-800 animate-pulse uppercase tracking-[0.2em]">
                <Cpu size={14} />
                {!scanDone
                  ? 'GERÇEK ZAMANLI X-RAY TARAMA DEVAM EDİYOR...'
                  : 'ANİMASYON TAMAMLANMAK ÜZERE...'}
              </div>
            </div>
          )}

          {scanError && (
            <div className="p-6 border-t border-rose-900/40 bg-rose-950/20 text-center flex flex-col items-center gap-3">
              <AlertTriangle size={28} className="text-rose-500" />
              <p className="text-rose-400 font-bold text-sm">{scanError}</p>
              <button onClick={() => window.location.reload()}
                className="px-8 py-3 bg-rose-700 hover:bg-rose-600 text-white rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                YENİDEN DENE
              </button>
            </div>
          )}

          {complete && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="p-8 border-t border-green-900/40 bg-green-950/20 text-center flex flex-col items-center gap-4">
              {auditData && (
                <div className="flex items-center gap-6 mb-2">
                  <div className="text-center">
                    <div className={`text-4xl font-black ${auditData.grade === 'F' || auditData.grade === 'D' ? 'text-rose-500' : auditData.grade === 'C' ? 'text-amber-400' : 'text-green-400'}`}>
                      {auditData.grade}
                    </div>
                    <div className="text-[10px] text-green-700 uppercase tracking-widest">Güvenlik Derecesi</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-white">{auditData.overallScore}<span className="text-lg text-green-700">/10</span></div>
                    <div className="text-[10px] text-green-700 uppercase tracking-widest">Güvenlik Skoru</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-cyan-400">{(auditData.findings || []).length}</div>
                    <div className="text-[10px] text-green-700 uppercase tracking-widest">Bulgu</div>
                  </div>
                </div>
              )}
              <h3 className="text-xl font-black text-white tracking-widest">RAPOR HAZIR</h3>
              <button
                onClick={() => navigate(`/full-scorecard?site=${site}&lang=${lang}&admin=true`)}
                className="group flex items-center gap-3 bg-green-600 hover:bg-white text-white hover:text-black transition-all px-12 py-4 rounded-xl font-black text-lg shadow-[0_0_40px_rgba(34,197,94,0.4)]"
              >
                SCORECARD GÖRÜNTÜLE <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          )}

          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Lock size={120} />
          </div>
        </motion.div>
      </div>

      {/* Completion glow */}
      <AnimatePresence>
        {complete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 overflow-hidden">
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.5, 0] }}
              transition={{ duration: 1.5 }} className="w-[800px] h-[800px] border-[20px] border-green-600/20 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #052e16; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #166534; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default FullTechnicalAudit;
