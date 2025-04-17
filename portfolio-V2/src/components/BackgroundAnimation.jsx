import React, { useEffect, useRef } from 'react';
import '../styles/BackgroundAnimation.css';

const BackgroundAnimation = ({ type = 'particles', opacity = 0.08, color = '#53ba5f', speed = 'slow' }) => {
  const canvasRef = useRef(null);
  
  // Animation des particules
  useEffect(() => {
    if (type !== 'particles' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configuration des particules
    const particles = [];
    const particleCount = 50;
    
    // Définir la taille du canvas pour remplir la fenêtre
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialiser le canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Créer les particules
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 5 + 1,
        speedX: (Math.random() - 0.5) * (speed === 'slow' ? 0.5 : 1),
        speedY: (Math.random() - 0.5) * (speed === 'slow' ? 0.5 : 1),
        opacity: Math.random() * opacity
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Déplacer la particule
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Rebond sur les bords
        if (particle.x > canvas.width || particle.x < 0) {
          particle.speedX = -particle.speedX;
        }
        if (particle.y > canvas.height || particle.y < 0) {
          particle.speedY = -particle.speedY;
        }
        
        // Dessiner la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [type, opacity, color, speed]);
  
  // Animation des lignes connectées
  useEffect(() => {
    if (type !== 'lines' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d'); // Correction: '3d' → '2d'
    
    // Configuration des points
    const points = [];
    const pointCount = 50;
    const connectionDistance = 200;
    
    // Définir la taille du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialiser le canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Créer les points
    for (let i = 0; i < pointCount; i++) {
      points.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speedX: (Math.random() - 0.5) * (speed === 'slow' ? 0.3 : 0.6),
        speedY: (Math.random() - 0.5) * (speed === 'slow' ? 0.3 : 0.6),
      });
    }
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Déplacer et dessiner les points
      points.forEach(point => {
        point.x += point.speedX;
        point.y += point.speedY;
        
        // Rebond sur les bords
        if (point.x > canvas.width || point.x < 0) {
          point.speedX = -point.speedX;
        }
        if (point.y > canvas.height || point.y < 0) {
          point.speedY = -point.speedY;
        }
      });
      
      // Connecter les points proches
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            // Opacité basée sur la distance
            const lineOpacity = opacity * (1 - distance / connectionDistance);
            
            ctx.beginPath();
            ctx.moveTo(points[i].x, points[i].y);
            ctx.lineTo(points[j].x, points[j].y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = lineOpacity;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [type, opacity, color, speed]);
  
  // Animation de gradient
  useEffect(() => {
    if (type !== 'gradient' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configuration du gradient
    let hue = 0;
    const colorSpeed = speed === 'slow' ? 0.1 : 0.3;
    
    // Définir la taille du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Initialiser le canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Animation loop pour le gradient
    const animate = () => {
      // Créer un gradient radial
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.8
      );
      
      // Couleurs du gradient avec variation légère
      hue += colorSpeed;
      if (hue >= 360) hue = 0;
      
      const baseHue = parseInt(color.slice(1), 16);
      const r = (baseHue >> 16) & 255;
      const g = (baseHue >> 8) & 255;
      const b = baseHue & 255;
      
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${opacity * 0.1})`);
      gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
      
      // Appliquer le gradient
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [type, opacity, color, speed]);

  return (
    <canvas 
      ref={canvasRef} 
      className="background-animation"
    />
  );
};

export default BackgroundAnimation;