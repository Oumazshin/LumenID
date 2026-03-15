import { useEffect, useRef } from 'react';

export function CosmicBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const stars = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    const auroraWaves = [
      { offset: 0, speed: 0.001, amplitude: 50, baseY: 0.3, color: 'rgba(147, 51, 234, 0.3)' },
      { offset: Math.PI / 3, speed: 0.0015, amplitude: 60, baseY: 0.35, color: 'rgba(236, 72, 153, 0.25)' },
      { offset: Math.PI / 2, speed: 0.0012, amplitude: 55, baseY: 0.4, color: 'rgba(59, 130, 246, 0.3)' },
      { offset: Math.PI, speed: 0.0008, amplitude: 45, baseY: 0.45, color: 'rgba(6, 182, 212, 0.25)' },
    ];

    let animationFrame;
    let time = 0;

    const animate = () => {
      time += 1;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#030014');
      gradient.addColorStop(0.5, '#0a0428');
      gradient.addColorStop(1, '#0f172a');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.opacity += star.twinkleSpeed;
        if (star.opacity > 1 || star.opacity < 0.3) {
          star.twinkleSpeed *= -1;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      auroraWaves.forEach((wave) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height * wave.baseY);

        for (let x = 0; x < canvas.width; x += 5) {
          const y = 
            canvas.height * wave.baseY +
            Math.sin(x * 0.01 + time * wave.speed + wave.offset) * wave.amplitude +
            Math.sin(x * 0.005 + time * wave.speed * 0.5) * (wave.amplitude * 0.5);
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();

        const auroraGradient = ctx.createLinearGradient(0, canvas.height * wave.baseY - 100, 0, canvas.height);
        auroraGradient.addColorStop(0, wave.color);
        auroraGradient.addColorStop(0.5, wave.color.replace(/[\d.]+\)$/, '0.15)'));
        auroraGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = auroraGradient;
        ctx.fill();
      });

      if (Math.random() > 0.99) {
        const shootingStar = {
          x: Math.random() * canvas.width,
          y: Math.random() * (canvas.height * 0.5),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 8 + 4,
        };

        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(shootingStar.x + shootingStar.length, shootingStar.y + shootingStar.length);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-10"
        style={{ background: '#030014' }}
      />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-64"
          viewBox="0 0 1200 400"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,400 L0,250 L200,180 L400,220 L600,160 L800,200 L1000,140 L1200,180 L1200,400 Z"
            fill="rgba(15, 23, 42, 0.8)"
          />
          <path
            d="M0,400 L0,280 L150,220 L350,260 L550,200 L750,240 L950,190 L1200,230 L1200,400 Z"
            fill="rgba(30, 41, 59, 0.9)"
          />
          <path
            d="M0,400 L0,320 L250,270 L450,300 L650,260 L850,290 L1050,250 L1200,280 L1200,400 Z"
            fill="rgba(51, 65, 85, 1)"
          />
        </svg>
      </div>
    </>
  );
}