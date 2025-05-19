import React, { useState, useRef, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

// Composant d'image zoomable pour mobile
const ZoomableImage = ({ src, alt, className = '', width, height }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const zoomedImageRef = useRef(null);
  const containerRef = useRef(null);
  
  // Détection de l'appareil
  const { isMobile, isTablet } = useWindowSize();
  const isTouch = isMobile || isTablet;
  
  // États pour la gestion des gestes tactiles
  const [touchStarted, setTouchStarted] = useState(false);
  const [lastTouch, setLastTouch] = useState({ x: 0, y: 0 });
  const [lastDistance, setLastDistance] = useState(null);
  
  // Ouvre la vue zoomée
  const openZoom = () => {
    setIsZoomed(true);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    document.body.style.overflow = 'hidden'; // Empêcher le défilement du body
  };
  
  // Ferme la vue zoomée
  const closeZoom = () => {
    setIsZoomed(false);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    document.body.style.overflow = ''; // Restaurer le défilement
  };
  
  // Fonctions de zoom
  const zoomIn = () => {
    if (zoomLevel < 3) {
      setZoomLevel(prevLevel => Math.min(prevLevel + 0.5, 3));
    }
  };
  
  const zoomOut = () => {
    if (zoomLevel > 1) {
      setZoomLevel(prevLevel => Math.max(prevLevel - 0.5, 1));
      
      // Si on revient au niveau 1, réinitialise la position
      if (zoomLevel <= 1.5) {
        setPanPosition({ x: 0, y: 0 });
      }
    }
  };
  
  // Gestionnaires d'événements tactiles
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setTouchStarted(true);
      setLastTouch({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    } else if (e.touches.length === 2) {
      // Gestion du pinch zoom
      const dist = getDistanceBetweenTouches(e);
      setLastDistance(dist);
    }
  };
  
  const handleTouchMove = (e) => {
    if (!isZoomed || !touchStarted) return;
    
    e.preventDefault(); // Empêcher le défilement pendant le déplacement
    
    if (e.touches.length === 1 && zoomLevel > 1) {
      // Déplacement (pan)
      const deltaX = e.touches[0].clientX - lastTouch.x;
      const deltaY = e.touches[0].clientY - lastTouch.y;
      
      setPanPosition(prev => {
        // Calculer les limites de déplacement basées sur le niveau de zoom
        const maxX = (zoomLevel - 1) * 100;
        const maxY = (zoomLevel - 1) * 100;
        
        return {
          x: Math.min(Math.max(prev.x + deltaX, -maxX), maxX),
          y: Math.min(Math.max(prev.y + deltaY, -maxY), maxY)
        };
      });
      
      setLastTouch({
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      });
    } else if (e.touches.length === 2) {
      // Pinch zoom
      const currentDistance = getDistanceBetweenTouches(e);
      
      if (lastDistance && currentDistance) {
        const ratio = currentDistance / lastDistance;
        const newZoomLevel = Math.min(Math.max(zoomLevel * ratio, 1), 3);
        setZoomLevel(newZoomLevel);
        setLastDistance(currentDistance);
      }
    }
  };
  
  const handleTouchEnd = () => {
    setTouchStarted(false);
    setLastDistance(null);
  };
  
  // Calcul de la distance entre deux points de touche
  const getDistanceBetweenTouches = (e) => {
    if (e.touches.length < 2) return null;
    
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };
  
  // Nettoyage lors du démontage du composant
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''; // Restaure le défilement
    };
  }, []);
  
  // Gére touche Échap pour fermer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isZoomed && e.key === 'Escape') {
        closeZoom();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isZoomed]);
  
  // Blocage du double-tap zoom natif sur mobile
  useEffect(() => {
    const handleTouchMove = (e) => {
      if (isZoomed && e.touches.length > 1) {
        e.preventDefault();
      }
    };
    
    const currentContainer = containerRef.current;
    
    if (isTouch && currentContainer) {
      currentContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    }
    
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('touchmove', handleTouchMove);
      }
    };
  }, [isTouch, isZoomed]);
  
  return (
    <>
      {/* Image normale avec bouton de zoom */}
      <div ref={containerRef} className={`zoomable-image-container ${className}`}>
        <img 
          ref={imageRef}
          src={src} 
          alt={alt} 
          className="zoomable-image"
          width={width}
          height={height}
          onClick={isTouch ? openZoom : undefined}
          loading="lazy"
        />
        {isTouch && (
          <button 
            className="mobile-zoom-button" 
            onClick={openZoom}
            aria-label="Zoomer l'image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Modal de zoom plein écran */}
      <div 
        className={`zoom-modal ${isZoomed ? 'active' : ''}`}
        onClick={closeZoom}
      >
        <div 
          className="zoomed-image-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={e => e.stopPropagation()} // Empêche la fermeture au clic sur l'image
        >
          <img 
            ref={zoomedImageRef}
            src={src} 
            alt={alt} 
            className="zoomed-image"
            style={{
              transform: `scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`,
            }}
            draggable="false"
          />
        </div>
        
        {/* Bouton de fermeture */}
        <button 
          className="zoom-close-button" 
          onClick={closeZoom}
          aria-label="Fermer le zoom"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        {/* Contrôles de zoom */}
        <div className="zoom-controls">
          <button 
            className="zoom-button" 
            onClick={zoomOut}
            disabled={zoomLevel <= 1}
            aria-label="Zoom arrière"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
          
          <div className="zoom-level">
            {Math.round(zoomLevel * 100)}%
          </div>
          
          <button 
            className="zoom-button" 
            onClick={zoomIn}
            disabled={zoomLevel >= 3}
            aria-label="Zoom avant"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default ZoomableImage;