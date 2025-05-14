// src/components/BackgroundAnimation.jsx
import React, { useEffect, useRef, useCallback } from 'react';

const BackgroundAnimation = ({ 
  type = 'particles', 
  opacity = 0.08, 
  color = '#53ba5f', 
  speed = 'slow',
  particleSize = 5,
  particleCount = 50,
  movementType = 'float',
  isMobile,
  isTablet
}) => {
  const canvasRef = useRef(null);
  
  // Déplacer ces fonctions en dehors du useEffect et les mémoriser avec useCallback
  const adaptiveParticleCount = useCallback(() => {
    if (isMobile) {
      return Math.floor(particleCount * 0.3);
    } else if (isTablet) {
      return Math.floor(particleCount * 0.6);
    } else {
      return particleCount;
    }
  }, [particleCount, isMobile, isTablet]);
  
  const adaptiveParticleSize = useCallback(() => {
    if (isMobile) {
      return Math.max(2, particleSize * 0.6);
    } else if (isTablet) {
      return Math.max(3, particleSize * 0.8);
    } else {
      return particleSize;
    }
  }, [particleSize, isMobile, isTablet]);
  
  useEffect(() => {
    if (type !== 'particles' || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Fonction pour redimensionner le canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // S'assurer que le style suit également
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
    };
    
    // Initialiser le canvas
    resizeCanvas();
    
    // Écouter les changements de taille
    window.addEventListener('resize', resizeCanvas);
    
    // Calculer le nombre de particules adapté
    const effectiveParticleCount = adaptiveParticleCount();
    const effectiveParticleSize = adaptiveParticleSize();
    
    // Création des particules
    const particles = [];
    
    for (let i = 0; i < effectiveParticleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * effectiveParticleSize + 1,
        speedX: (Math.random() - 0.5) * (speed === 'slow' ? 0.3 : speed === 'medium' ? 0.7 : 1),
        speedY: (Math.random() - 0.5) * (speed === 'slow' ? 0.3 : speed === 'medium' ? 0.7 : 1),
        opacity: Math.random() * opacity
      });
    }
    
    let animationId;
    
    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        // Déplacer la particule
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Gérer les bords
        if (movementType === 'bounce') {
          if (particle.x > canvas.width || particle.x < 0) {
            particle.speedX *= -1;
          }
          if (particle.y > canvas.height || particle.y < 0) {
            particle.speedY *= -1;
          }
        } else {
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.y > canvas.height) particle.y = 0;
          if (particle.y < 0) particle.y = canvas.height;
        }
        
        // Dessiner la particule
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = particle.opacity;
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [
    type, 
    opacity, 
    color, 
    speed, 
    movementType, 
    adaptiveParticleCount, // Ajout de la fonction comme dépendance
    adaptiveParticleSize   // Ajout de la fonction comme dépendance
  ]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="background-animation"
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  );
};

export default React.memo(BackgroundAnimation);