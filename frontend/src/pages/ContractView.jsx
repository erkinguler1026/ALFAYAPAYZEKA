import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Printer, ArrowLeft, ShieldCheck, Download, FileText } from 'lucide-react';
import { contractsData } from '../data/contracts';

/**
 * ContractView — Profesyonel Sözleşme Sistemi (V1.4.0)
 * 
 * Açıklama: Kurumsal hizmet sözleşmelerini (AI-Web, AI-Pentest) A4 formatında,
 * yazdırılabilir ve PDF olarak kaydedilebilir bir ara yüzle sunar.
 * 
 * Teknik Özellikler:
 *   - Statik Layout İzolasyonu (Header/Footer içermez).
 *   - @media print CSS optimizasyonları.
 *   - Dinamik veri yükleme (contracts.js).
 * 
 * © 2026 ALFA YAPAY ZEKA — Siber Tehditlere Kapalı, Müşterilere Açık.
 */
const ContractView = () => {
  const { type } = useParams();
  const contract = contractsData[type] || contractsData["ai-web"];

  useEffect(() => {
    document.title = `${contract.title} | ALFA YAPAY ZEKA`;
    window.scrollTo(0, 0);
  }, [contract]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20 print:bg-white print:pt-4 print:pb-0">
      {/* 📥 Print-Specific Styles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background: white !important; }
          @page { margin: 20mm; }
          .print-avoid-break { page-break-inside: avoid; }
          nav, footer, .print-hidden { display: none !important; }
        }
      `}} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* 🛠️ Action Toolbar (Hidden in Print) */}
        <div className="flex justify-between items-center mb-10 print:hidden">
          <Link to="/" className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors">
            <ArrowLeft size={18} /> Ana Sayfaya Dön
          </Link>
          <div className="flex gap-4">
            <button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-red-600 text-white px-8 py-3 rounded-2xl font-black shadow-2xl shadow-red-600/30 hover:bg-red-700 hover:scale-105 transition-all"
            >
              <Printer size={20} /> Yazdır / PDF Kaydet
            </button>
          </div>
        </div>

        {/* 📜 Contract Content Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white shadow-2xl rounded-3xl p-10 md:p-20 border border-gray-100 print:shadow-none print:border-none print:p-0"
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-2 border-primary pb-8 mb-12 print:mb-8">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="bg-primary p-3 rounded-2xl text-white">
                <ShieldCheck size={32} />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tighter text-gray-900 uppercase">ALFA YAPAY ZEKA</h1>
                <p className="text-xs text-primary font-bold tracking-[0.2em] uppercase">Siber Savunma & Yazılım Ajansı</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold text-gray-400 block uppercase mb-1">Sözleşme Kodu</span>
              <span className="text-lg font-black text-gray-900">{contract.code}-XXXX</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-16 print:mb-10">
            <h2 className="text-3xl font-black text-gray-900 border-b-4 border-gray-100 inline-block pb-2 mb-4 uppercase">
              {contract.title}
            </h2>
            <p className="text-gray-500 font-medium">Bu belge, Hizmet Sağlayıcı ve Müşteri arasındaki ticari şartları ve teknik kapsamı belirler.</p>
          </div>

          {/* Parties Placeholder */}
          <div className="grid grid-cols-2 gap-8 mb-16 p-8 bg-gray-50 rounded-2xl border border-gray-100 print:bg-white print:border-gray-200">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Hizmet Sağlayıcı</label>
              <p className="font-bold text-gray-900">ALFA YAPAY ZEKA TEKNOLOJİLERİ</p>
              <p className="text-sm text-gray-500">Bursa, Türkiye</p>
            </div>
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 block mb-2">Müşteri / Kurum</label>
              <div className="border-b border-gray-300 w-full h-6 mb-1"></div>
              <div className="border-b border-gray-300 w-2/3 h-6"></div>
            </div>
          </div>

          {/* Sections */}
          <div className="space-y-12 mb-20 print:space-y-8">
            {contract.sections.map((section) => (
              <div key={section.id} className="relative pl-12 print-avoid-break">
                <span className="absolute left-0 top-0 text-3xl font-black text-primary/10">0{section.id}</span>
                <h3 className="text-lg font-black text-gray-900 mb-4 flex items-center gap-3">
                  {section.title}
                </h3>
                <div className="text-gray-600 leading-relaxed text-sm space-y-4">
                  {section.content.split('\n').map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Signatures */}
          <div className="grid grid-cols-2 gap-12 pt-16 border-t font-mono text-center print-avoid-break">
            <div>
              <p className="text-xs text-gray-400 mb-16 uppercase font-bold tracking-widest">Hizmet Sağlayıcı İmza / Kaşe</p>
              <div className="h-20 flex items-center justify-center opacity-10">
                <ShieldCheck size={64} />
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-16 uppercase font-bold tracking-widest">Müşteri İmza / Kaşe</p>
              <div className="h-20 border-b border-dashed border-gray-300"></div>
            </div>
          </div>

          {/* Footer (Print only) */}
          <div className="hidden print:block mt-20 pt-8 border-t text-center text-[10px] text-gray-400 font-medium">
            <p>Bu belge elektronik ortamda oluşturulmuştur. www.alfayapayzeka.com</p>
            <p className="mt-1">ALFA YAPAY ZEKA | SİBER TEHDİTLERE KAPALI, MÜŞTERİLERE AÇIK</p>
          </div>
        </motion.div>

        {/* ⚠️ Warning (Print only) */}
        <div className="mt-8 text-center text-gray-400 text-xs hidden print:block italic">
          * Bu doküman kurumsal bir taslak olup, ıslak imza veya dijital onay sonrası resmiyet kazanır.
        </div>
      </div>
    </div>
  );
};

export default ContractView;
