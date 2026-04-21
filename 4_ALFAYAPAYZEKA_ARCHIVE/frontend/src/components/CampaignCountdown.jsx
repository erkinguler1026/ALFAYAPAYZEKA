import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CampaignCountdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 60, hours: 21, minutes: 53, seconds: 1 });

  useEffect(() => {
    // 27 Mayıs 2026 (Bugünden itibaren tam 60 gün sonrasına sabitlendi)
    const target = targetDate ? new Date(targetDate).getTime() : new Date('2026-05-27T00:00:00Z').getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-col items-center justify-center mb-8 mt-2 relative z-20 w-full border-b border-white/5 pb-6">
      <p className="text-white/40 text-[11px] sm:text-xs font-medium mb-5 text-center leading-relaxed">
        Hacker Kalkanı, Teknik Garanti ve 7/24 güvenlik koruması — <span className="text-white/60">kampanya bitmeden fırsatı yakalayın.</span>
      </p>
      
      <div className="flex flex-col items-center gap-3 w-full">
        <div className="flex items-center gap-2 text-white/40 uppercase tracking-widest text-[9px] font-bold">
          <Clock size={12} />
          KAMPANYA BİTİMİNE KALAN:
        </div>
        
        <div className="flex items-center gap-2">
          {[
            { label: 'GÜN', value: timeLeft.days },
            { label: 'SAAT', value: timeLeft.hours },
            { label: 'DK', value: timeLeft.minutes },
            { label: 'SN', value: timeLeft.seconds }
          ].map((item, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center justify-center bg-[#0a0a0c]/80 backdrop-blur-md border border-white/5 rounded-2xl w-[60px] h-[65px] shadow-[0_8px_30px_rgba(0,0,0,0.5)] group hover:border-white/20 transition-all duration-300"
            >
              <span className="text-2xl font-black text-white leading-none tracking-tighter mb-1 font-mono">
                {item.value.toString().padStart(2, '0')}
              </span>
              <span className="text-[8px] text-white/30 uppercase font-black tracking-widest">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CampaignCountdown;
