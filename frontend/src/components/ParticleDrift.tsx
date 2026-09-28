import React, { useEffect, useRef } from 'react';

export interface ParticleDriftProps {
  background?: string;
  baseColor?: string;
  accentColor?: string;
  density?: number;
  dotSize?: number;
  speed?: number;
  direction?: 'none' | 'up' | 'down' | 'left' | 'right' | 'random';
  hoverInteraction?: boolean;
  linkDistance?: number;
  linkThickness?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  isAccent: boolean;
}

export const ParticleDrift: React.FC<ParticleDriftProps> = ({
  background = 'transparent',
  baseColor = 'rgba(148, 163, 184, 0.4)',
  accentColor = 'rgba(99, 102, 241, 0.7)',
  density = 55,
  dotSize = 1.8,
  speed = 0.6,
  direction = 'random',
  hoverInteraction = true,
  linkDistance = 110,
  linkThickness = 0.6,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const mouse = { x: -1000, y: -1000, radius: 140 };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('resize', handleResize);
    if (hoverInteraction && canvas.parentElement) {
      canvas.parentElement.addEventListener('mousemove', handleMouseMove);
      canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Initialize Particles
    const particles: Particle[] = [];
    const count = Math.min(density, Math.floor((width * height) / 14000));

    for (let i = 0; i < count; i++) {
      const isAccent = i % 5 === 0;
      let vx = (Math.random() - 0.5) * speed;
      let vy = (Math.random() - 0.5) * speed;

      if (direction === 'up') vy = -Math.abs(vy);
      else if (direction === 'down') vy = Math.abs(vy);
      else if (direction === 'left') vx = -Math.abs(vx);
      else if (direction === 'right') vx = Math.abs(vx);

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        radius: (Math.random() * 0.8 + 0.6) * dotSize,
        color: isAccent ? accentColor : baseColor,
        isAccent
      });
    }

    // Animation Loop
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (background && background !== 'transparent') {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }

      // Update & Draw Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off bounds
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Hover interaction
        if (hoverInteraction && mouse.x > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }
        }

        // Render dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.35;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = p.isAccent || p2.isAccent ? accentColor : baseColor;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = linkThickness;
            ctx.stroke();
            ctx.globalAlpha = 1.0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, [background, baseColor, accentColor, density, dotSize, speed, direction, hoverInteraction, linkDistance, linkThickness]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
    />
  );
};

export default ParticleDrift;
