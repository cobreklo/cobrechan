import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
    }> = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const colors = [
      'rgba(255, 107, 0, ', // Orange
      'rgba(147, 51, 234, ', // Purple
      'rgba(34, 197, 94, ',  // Green
    ];

    const createParticles = () => {
      particles = [];
      // Reduced particle density for better performance
      const particleCount = Math.floor((canvas.width * canvas.height) / 25000);
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3, // Slower movement
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.5 + 0.2,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const particleCount = particles.length;

      for (let i = 0; i < particleCount; i++) {
        const particle = particles[i];
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + particle.alpha + ')';
        ctx.fill();

        // Optimized connection drawing
        // Only check a subset of particles or use a simpler distance check
        for (let j = i + 1; j < particleCount; j++) {
          const p2 = particles[j];
          const dx = particle.x - p2.x;
          // Quick check before sqrt
          if (dx > 150 || dx < -150) continue;
          
          const dy = particle.y - p2.y;
          if (dy > 150 || dy < -150) continue;

          const distSq = dx * dx + dy * dy;
          // 150 * 150 = 22500
          if (distSq < 22500) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            const dist = Math.sqrt(distSq);
            ctx.strokeStyle = particle.color + (0.1 * (1 - dist / 150)) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    resizeCanvas();
    createParticles();
    drawParticles();

    window.addEventListener('resize', () => {
      resizeCanvas();
      createParticles();
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ opacity: 0.6 }}
      />
      {/* Gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[150px]"
          style={{ willChange: "transform" }}
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[120px]"
          style={{ willChange: "transform" }}
          animate={{
            x: [0, -80, 0],
            y: [0, -60, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px]"
          style={{ willChange: "transform" }}
          animate={{
            x: [-200, -100, -200],
            y: [-200, -150, -200],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      {/* Noise texture overlay */}
      <div className="fixed inset-0 noise-bg pointer-events-none z-0" />
    </>
  );
};

export default AnimatedBackground;
