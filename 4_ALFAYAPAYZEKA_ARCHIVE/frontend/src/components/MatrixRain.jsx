import { useEffect, useRef } from 'react';

const CHARS =
  'ア イ ウ エ オ カ キ ク ケ コ サ シ ス セ ソ タ チ ツ テ ト ナ ニ ヌ ネ ノ' +
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>';

/**
 * MatrixRain — Tam ekran Matrix yağmuru animasyonu (canvas tabanlı).
 * Props:
 *   opacity  : 0.0 – 1.0  (varsayılan 0.18)
 *   color    : CSS renk (#00ff41 yeşil, #ff2222 kırmızı …)
 *   fontSize : piksel (varsayılan 14)
 *   speed    : çarpan (varsayılan 1 = ~50ms frame interval)
 */
const MatrixRain = ({ opacity = 0.18, color = '#00ff41', fontSize = 14, speed = 1 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const chars = CHARS.split('');

    let animId;
    let lastTime = 0;
    const frameInterval = 50 / Math.max(speed, 0.1);

    // cols/drops hesaplanacak
    let cols = 0;
    let drops = [];

    const initCanvas = () => {
      // Boyutu parent'tan al, yoksa window'dan
      const parent = canvas.parentElement;
      const w = parent ? parent.clientWidth  : window.innerWidth;
      const h = parent ? parent.clientHeight : window.innerHeight;
      if (!w || !h) return;
      canvas.width  = w;
      canvas.height = h;
      cols  = Math.floor(w / fontSize);
      drops = Array.from({ length: cols }, () => -Math.random() * 40);
      // Arka plan temizleme
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fillRect(0, 0, w, h);
    };

    initCanvas();

    // 100ms sonra tekrar dene (layout stable olsun)
    const initTimer = setTimeout(initCanvas, 100);

    const draw = (ts) => {
      animId = requestAnimationFrame(draw);
      if (ts - lastTime < frameInterval) return;
      lastTime = ts;
      if (!cols) return;

      // Iz efekti — hafif karartma
      ctx.fillStyle = 'rgba(0,0,0,0.07)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `bold ${fontSize}px monospace`;

      for (let i = 0; i < cols; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const x  = i * fontSize;
        const y  = drops[i] * fontSize;

        // Normal karakter
        ctx.fillStyle = color + 'cc';
        ctx.fillText(ch, x, y);

        // Baş nokta (parlak beyaz)
        ctx.fillStyle = '#ffffff';
        ctx.fillText(ch, x, y);

        if (y > canvas.height && Math.random() > 0.97) drops[i] = 0;
        drops[i] += 1;
      }
    };

    animId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      initCanvas();
    });
    ro.observe(canvas.parentElement || document.body);

    return () => {
      clearTimeout(initTimer);
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [color, fontSize, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity,
        pointerEvents: 'none',
        display: 'block',
        zIndex: 0,
      }}
    />
  );
};

export default MatrixRain;
