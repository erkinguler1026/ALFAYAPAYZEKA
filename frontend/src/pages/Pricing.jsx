import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info, LifeBuoy, ShieldCheck, CheckCircle2 } from 'lucide-react';

const FeatureItem = ({ text, description }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative flex items-center gap-3 text-[11px] text-white/70 group py-1">
      <div className="w-4 h-4 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
        <Check size={10} className="text-primary" />
      </div>
      <span className="cursor-default text-left">{text}</span>
      <div 
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="cursor-help text-white/30 hover:text-white/60 transition-colors"
      >
        <Info size={12} />
      </div>

      {showTooltip && (
        <div className="absolute z-50 bottom-full left-0 mb-2 w-48 p-3 bg-[#111111] border border-white/10 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-1">
          <p className="text-[10px] text-white/80 leading-relaxed font-medium">
            {description}
          </p>
          <div className="absolute top-full left-4 border-8 border-transparent border-t-[#111111]"></div>
        </div>
      )}
    </div>
  );
};

const Pricing = () => {
  const [isTurkish, setIsTurkish] = useState(true);

  const plans = [
    {
      name: "BAŞLANGIÇ PAKETİ",
      description: "Hızlı başlangıç yapmak isteyen küçük işletmeler için hazırlık ve kurulum.",
      price: isTurkish ? "6.999 ₺ +KDV" : "$299",
      monthlyService: isTurkish ? "999 ₺ +KDV" : "$25",
      productionTime: "4-7 İş Günü",
      launchTime: "24-48 Saat",
      features: [
        { text: "3 Adet Web Sayfası", description: "İhtiyacınıza uygun 3 adet detaylı web sayfası tasarımı." },
        { text: "SSR (Server Side Rendering)", description: "Sayfanın sunucuda hazırlanması; Google'da en üstte çıkmanızı ve sitenin anında açılmasını sağlar." },
        { text: "Meta-Tag & SEO Optimizasyonu", description: "Arama motorlarının sitenizi tam doğrulukla dizine eklemesini sağlar." },
        { text: "SSL & Güvenlik Duvarı", description: "Ziyaretçi verilerini şifreler ve sitenizi güvenli (https) hale getirir." },
        { text: "12 Ay Teknik Garanti", description: "Kod kaynaklı tüm aksaklıklarda ücretsiz destek ve düzeltme taahhüdü." },
        { text: "7/24 Uptime Monitoring", description: "Sitenizin kesintisiz erişilebilir olduğunu denetleyen otomatik takip sistemi." },
        { text: "1 Yıl Alfa Dakik Servis Garantisi", description: "Hatalara karşı 1 yıl boyunca ücretsiz onarım ve tıkır tıkır işleyen destek." },
        { text: "Haftalık Dijital Diagnostik", description: "Sistem loglarının ve güvenliğin otomotik olarak haftalık check-up'tan geçirilmesi." },
        { text: "Yedek Parça (Modüler Yapı)", description: "Şasiniz hazır; ileride yeni özellik eklemek isterseniz sadece parçayı takıyoruz." },
        { text: "Büyüme Temelleri", description: "Sitenizin büyümesi için gerekli temel analiz ve dijital ayak izi hazırlığı." }
      ],
      cta: "Planı Başlat",
      popular: false
    },
    {
      name: "STANDART PAKET",
      description: "Büyüyen firmalar için tam kapsamlı üretim ve servis paketi.",
      price: isTurkish ? "15.999 ₺ +KDV" : "$899",
      monthlyService: isTurkish ? "1.599 ₺ +KDV" : "$45",
      productionTime: "10-15 İş Günü",
      launchTime: "3-5 İş Günü",
      features: [
        { text: "5 Adet Web Sayfası", description: "Kurumsal yapınıza uygun 5 adet detaylı web sayfası tasarımı." },
        { text: "GPT-4 Tabanlı Akıllı Chatbot", description: "Müşterilerinizin sorularını anında yanıtlayan, satış odaklı yapay zeka asistanı." },
        { text: "Lighthouse 90+ Performans", description: "Dünya standartlarında hız ve erişilebilirlik puanı garantisi." },
        { text: "Detaylı Aylık Analytics Raporu", description: "Ziyaretçilerinizin davranışlarını ve performans verilerini içeren rapor." },
        { text: "5 Adet Teknik Revizyon Hakkı", description: "Her ay içerik veya görsel yapıda yapabileceğiniz 5 farklı teknik güncelleme." },
        { text: "Haftalık Sağlık Kontrolü", description: "Sitenizin tüm fonksiyonlarının stabil çalışıp çalışmadığının rutin kontrolü." },
        { text: "İçerik Yönetim Paneli (CMS)", description: "Sitenizdeki metin ve görselleri kolayca güncellemenizi sağlayan panel." },
        { text: "Hızlandırılmış CDN Servisi", description: "Sitenizin dünyanın her yerinde ışık hızında açılmasını sağlayan sunucu ağı." },
        { text: "Alfa Dakik Öncelikli Destek", description: "Küçük revizyon taleplerinizde 1 saat içinde müdahale garantisi." },
        { text: "Mini Onarım", description: "Ufak tasarım ve bug hasarları için sınırsız teknik rötüş desteği." },
        { text: "Anti-Spam & reCAPTCHA", description: "Sitenizi kötü niyetli botlara ve gereksiz e-postalara karşı koruma." },
        { text: "Premium Reklam Stratejisi", description: "Google ve Sosyal Medya reklamları için teknik altyapı ve strateji desteği." },
        { text: "Aylık Büyüme Check-up", description: "Sitenizin satış performansını artıran aylık stratejik inceleme seansı." }
      ],
      cta: "Büyümeyi Başlat",
      popular: true
    },
    {
      name: "KURUMSAL PAKET",
      description: "Büyük ölçekli projeler ve özel yazılım servis planları.",
      price: "Özel Teklif",
      monthlyService: isTurkish ? "3.699 ₺ +KDV" : "$120",
      productionTime: "20-35 İş Günü",
      launchTime: "7-10 İş Günü",
      features: [
        { text: "Özel Eğitilmiş RAG AI Modeli", description: "Yapay zekanın sizin şirketinize özel dökümanlarla (PDf, Word vb.) konuşması." },
        { text: "Dedicated Bulut Kaynakları", description: "Sadece sizin sitenize özel ayrılmış yüksek performanslı sunucu gücü." },
        { text: "%99.9 Uptime & SLA", description: "Sitenizin her zaman açık kalacağı ve sorunlara anında müdahale sözleşmesi." },
        { text: "AI Çok Dilli Lokalizasyon", description: "Yapay zeka ile tüm dillerde kusursuz içerik yönetimi ve çeviri." },
        { text: "Enterprise WAF Kalkanı", description: "En üst düzey siber saldırı koruması ve bot engelleme sistemi." },
        { text: "1 Saat İçinde Teknik Müdahale", description: "Olası teknik aksaklıklarda 1 saat içinde çözüm garantisi." },
        { text: "Yıllık Güvenlik Taraması", description: "Siber saldırılara karşı direncin ölçüledüğü profesyonel sızma testleri." },
        { text: "Ömür Boyu Servis Önceliği", description: "Kurumsal müşterilerimize özel, tüm güncellemelerde en üst sıra önceliği." },
        { text: "Yedek Parça (Sınırsız Modül)", description: "Sitenizin büyümesi için gereken tüm teknik modüllerin anında entegrasyonu." },
        { text: "Kurumsal E-posta Yönetimi", description: "Resmi şirket e-postalarınızın sorunsuz teslimat ve güvenlik ayarları." },
        { text: "Tam Kapsamlı AI Pazarlama", description: "Yapay zeka asistanınızın aktif olarak satış ve pazarlama süreçlerine dahil edilmesi." },
        { text: "Özel Veri Madenciliği", description: "Sektör verilerinizin AI ile analiz edilip stratejik kararlara dönüştürülmesi." },
        { text: "Siber Sigorta Danışmanlığı", description: "Anlaşmalı acentelerimiz üzerinden siber risklerin poliçe kapsamına alınması süreci." },
        { text: "İş Durması Teminatı", description: "Teknik kaynaklı kesintilerde operasyonel kaybı güvence altına alan özel şartlar." }
      ],
      cta: "Stratejik Teklif Al",
      popular: false
    },
    {
      name: "ÖZEL-GİRİŞİM PAKETİ",
      description: "Yeni girişimler (Start-up) için ölçeklenebilir ve esnek çözümler.",
      price: "Özel Teklif",
      monthlyService: "Değişken",
      productionTime: "15-20 Gün (MVP)",
      launchTime: "Kademeli",
      features: [
        { text: "MVP Hızlı Çıkış Stratejisi", description: "İş fikrinizin en hızlı ve en verimli şekilde hayata geçirilmesi süreci." },
        { text: "Yatırımcı Dökümantasyonu", description: "Teknolojik altyapınızı yatırımcılara anlatacak detaylı teknik rapor." },
        { text: "Mikroservis Mimarisi Planlama", description: "Dehasal kullanıcı sayılarına sorunsuz ulaşmayı sağlayan esnek yazılım yapısı." },
        { text: "Tam API Entegrasyonları", description: "CRM, ERP veya kullandığınız harici yazılımlarla tam eşzamanlı çalışma." },
        { text: "1-e-1 CTO Danışmanlığı", description: "Teknoloji stratejilerinizi belirleyen uzman mühendislik mentorluğu." },
        { text: "Ölçeklenebilir DB Kümesi", description: "İş yükünüz arttıkça otomatik genişleyen veritabanı altyapısı." },
        { text: "Biyometrik / 2FA Güvenlik", description: "Pannelleriniz için üst düzey iki aşamalı giriş güvenliği." },
        { text: "Pazar ve Rakip Analizi", description: "Sektördeki rakiplerinizin teknolojik artı ve eksilerinin raporlanması." },
        { text: "Aylık Teknik Servis Check-up", description: "Girişiminiz büyürken sistemin yorulmaması için her ay yapılan derinlemesine analiz." },
        { text: "Yedek Parça (Gelecek Vizyonu)", description: "Projenizin gelecekteki ihtiyaçları için bugünden hazırlanan esnek kod yapısı." },
        { text: "Özel Kod Denetimi", description: "Kod kalitesini ve hızını korumak için periyodik teknik revizyon." },
        { text: "Siber Risk Sigorta Analizi", description: "Girişiminizin dijital varlıkları için siber sigorta gereksinimlerinin belirlenmesi." }
      ],
      cta: "Bize Ulaşın",
      popular: false
    }
  ];

  return (
    <div className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6 text-gradient uppercase tracking-tighter"
          >
            Üretim & Dakik Servis
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-white/60 text-lg max-w-2xl mx-auto mb-10 font-light"
          >
            "Işık Hızında" teknik destek ve "Alfa Yapay Zeka" güveninde mini onarım paketleriyle dijital motorunuzu hep diri tutuyoruz.
          </motion.p>

          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm ${!isTurkish ? 'text-white' : 'text-white/40'}`}>Global ($)</span>
            <button 
              onClick={() => setIsTurkish(!isTurkish)}
              className="w-14 h-8 bg-white/10 rounded-full relative p-1 transition-colors hover:bg-white/20"
            >
              <div className={`w-6 h-6 bg-primary rounded-full transition-all duration-300 ${isTurkish ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-sm ${isTurkish ? 'text-white' : 'text-white/40'}`}>Türkiye (₺)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`pricing-card premium-card p-8 rounded-[40px] flex flex-col ${plan.popular ? 'popular border-primary/50' : ''}`}
            >
              <h3 className="text-lg font-bold mb-2 tracking-tight">{plan.name}</h3>
              <p className="text-white/40 text-[10px] mb-6 leading-relaxed min-h-[40px] uppercase tracking-wider">{plan.description}</p>
              
                <div className="flex flex-col gap-1">
                  <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold">Sistem Kurulumu</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black tracking-tighter text-white">{plan.price.split(' ')[0]} {plan.price.split(' ')[1]}</span>
                    {plan.price.includes('+KDV') && <span className="text-[18px] text-white/50 font-black ml-1">+KDV</span>}
                  </div>
                </div>
                <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-2xl">
                  <span className="block text-white/40 text-[9px] uppercase tracking-widest font-semibold mb-1">Aylık Sistem Yönetimi (Zorunlu)</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-primary">{plan.monthlyService.split(' ')[0]} {plan.monthlyService.split(' ')[1]}</span>
                    {plan.monthlyService.includes('+KDV') && <span className="text-[18px] text-primary/50 font-black ml-1">+KDV</span>}
                    <span className="text-[10px] text-white/30 font-normal">/ ay</span>
                  </div>
                </div>

              <div className="grid grid-cols-2 gap-2 mb-8 border-y border-white/5 py-4">
                <div className="flex flex-col">
                  <span className="text-[9px] text-white/30 uppercase font-black tracking-tighter">İşleme Süresi</span>
                  <span className="text-[11px] font-bold text-white/80">{plan.productionTime}</span>
                </div>
                <div className="flex flex-col border-l border-white/5 pl-3">
                  <span className="text-[9px] text-white/30 uppercase font-black tracking-tighter">Yayına Alma</span>
                  <span className="text-[11px] font-bold text-white/80">{plan.launchTime}</span>
                </div>
              </div>

              <div className="flex-grow space-y-1 mb-10">
                {plan.features.map((feature, i) => (
                  <FeatureItem key={i} text={feature.text} description={feature.description} />
                ))}
              </div>

              <div className="mb-6 pt-4 border-t border-white/5">
                <span className="text-[10px] text-accent font-black tracking-widest uppercase block mb-2">OPSİYONEL GÜVENCE</span>
                <div className="flex items-center gap-2 text-white/40 mb-4">
                  <ShieldCheck size={14} className="text-accent" />
                  <span className="text-[11px] font-medium">Siber Sigorta & Güvence Paketi</span>
                </div>
                
                <div className="space-y-3 pl-1">
                  {[
                    { title: "Siber Risk Poliçesi", desc: "Veri sızıntısı, hacking ve itibar suikastine mali teminat." },
                    { title: "İş Durması Teminatı", desc: "Teknik aksaklıktan kaynaklanan gelir kaybı koruması." },
                    { title: "Acente Danışmanlığı", desc: "Acentelerimiz kanalıyla en uygun poliçe hazırlığı." }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-2 items-start">
                      <CheckCircle2 size={10} className="text-accent/40 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="text-[10px] font-bold text-white/60 leading-tight">{item.title}</h4>
                        <p className="text-[9px] text-white/30 leading-tight font-light">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95 ${
                plan.popular 
                ? 'bg-primary text-white hover:bg-primary-dark shadow-xl shadow-primary/20' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}>
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Global Support info */}
        <div className="mt-24 flex flex-col md:flex-row items-center justify-center gap-16 border-t border-white/5 pt-16">
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <LifeBuoy size={28} />
                </div>
                <div className="text-left">
                    <h4 className="font-bold text-xl mb-1">Anlık Teknik Servis</h4>
                    <p className="text-white/50 text-base">Olası sorunlarda 1 saat içinde müdahale.</p>
                </div>
            </div>
            <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary flex-shrink-0">
                    <ShieldCheck size={28} />
                </div>
                <div className="text-left">
                    <h4 className="font-bold text-xl mb-1">Güvenli Altyapı</h4>
                    <p className="text-white/50 text-base">ISO27001:2022 ISMS kapsamında veri güvenliği ve bakım.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
