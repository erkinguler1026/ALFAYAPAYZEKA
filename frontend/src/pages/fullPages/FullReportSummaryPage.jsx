import React from 'react';
import { ShieldAlert, ShieldCheck, Activity, Target } from 'lucide-react';
import { Page, CVSSBadge } from './FullReportComponents';

export const SummaryPage = ({ auditData, t, layout, totalPages }) => {
  const { score, grade, categoricalHealth, findings } = auditData;

  const getGradeColor = (g) => {
    if (g === 'A+' || g === 'A') return 'text-green-500';
    if (g === 'B') return 'text-blue-500';
    if (g === 'C') return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreColor = (s) => {
    if (s >= 9.0) return 'text-green-500';
    if (s >= 7.0) return 'text-blue-500';
    if (s >= 4.0) return 'text-yellow-500';
    return 'text-red-500';
  };

  const categories = [
    { name: 'Sistem Servisleri', val: categoricalHealth?.service ?? 100 },
    { name: 'Ağ Analizi',        val: categoricalHealth?.network ?? 100 },
    { name: 'Alan Adı ve DNS',   val: categoricalHealth?.domain ?? 100 },
    { name: 'Güvenlik Başlıkları',val: categoricalHealth?.headers ?? 100 },
    { name: 'Yazılım ve Yama',   val: categoricalHealth?.patching ?? 100 }
  ];

  return (
    <Page pageNum={layout?.summary} totalPages={totalPages} title="YÖNETİCİ ÖZETİ: RİSK SKORU & ALFA YAPAY ZEKA" t={t}>
      <div className="space-y-12">
        {/* UPPER SECTION: SCORE & GRADE */}
        <div className="flex gap-8">
          <div className="w-1/3 bg-slate-50 border-2 border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Activity size={120} className={getScoreColor((score||10))} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest relative z-10">ALFA CVSS SKORU</p>
            <div className={`text-[6rem] font-black leading-none tracking-tighter ${getScoreColor((score||10))} relative z-10`}>{(score || 10).toFixed(1)}<span className="text-3xl text-slate-300">/10</span></div>
            <div className="mt-4 relative z-10">
               <CVSSBadge score={score || 10} />
            </div>
          </div>

          <div className="w-1/3 bg-slate-50 border-2 border-slate-200 rounded-[2rem] p-8 flex flex-col items-center justify-center shadow-inner relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Target size={120} className={getGradeColor(grade || 'A')} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest relative z-10">GÜVENLİK NOTU</p>
            <div className={`text-[7rem] font-black leading-none tracking-tighter ${getGradeColor(grade || 'A')} relative z-10`}>{grade || 'A'}</div>
          </div>

           <div className="w-1/3 bg-slate-900 border-2 border-slate-800 rounded-[2rem] p-8 flex flex-col shadow-xl">
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-6 border-b border-white/10 pb-4">KATEGORİK SAĞLIK</p>
            <div className="space-y-4">
              {categories.map((cat, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-300">
                    <span className="uppercase">{cat.name}</span>
                    <span>{cat.val}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${cat.val}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LOWER SECTION: EXECUTIVE SUMMARY TEXT */}
        <div className="bg-blue-50/50 border-l-4 border-blue-500 p-8 rounded-r-[2rem]">
          <div className="flex items-center gap-4 mb-4">
            <ShieldCheck size={24} className="text-blue-600" />
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest">ALFA YAPAY ZEKA DEĞERLENDİRMESİ</h4>
          </div>
          <p className="text-xs leading-relaxed text-slate-600 font-medium text-justify">
            Hedef sistem üzerinde gerçekleştirilen geniş çaplı zafiyet tarama ve sızma testi sonuçlarına göre hesaplanan genel güvenlik durumu yukarıda özetlenmiştir. 
            Mevcut skor, dışarıdan gelebilecek karmaşık saldırılara, yapılandırma hatalarına ve teknoloji ifşalarına karşı varlıklarınızın genel direncini ifade eder. 
            Aşağıdaki "Teknik Kanıtlar ve Bulgular" listesi, müdahale gerektiren riskleri içermektedir.
          </p>
        </div>

        {/* FINDINGS LIST */}
        {findings && findings.length > 0 && (
          <div className="space-y-4">
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b-2 border-slate-200 pb-2">ÖNCELİKLİ BULGULAR LİSTESİ</h4>
            <div className="space-y-3">
              {findings.map((f, idx) => (
                <div key={idx} className="flex flex-col border border-slate-200 rounded-xl p-4 bg-white shadow-sm border-l-4 border-l-orange-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-black text-xs text-slate-800 uppercase tracking-tighter">{f.id.replace(/_/g, ' ')}</span>
                    <span className="px-2 py-0.5 rounded text-[8px] font-black bg-orange-100 text-orange-700 tracking-widest">CVSS: {f.cvss || 'N/A'}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{f.title || 'Tespit Edilen Güvenlik Konfigürasyon Hatası'} risk değerlendirmesi kapsamında tanımlanmıştır.</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Page>
  );
};
