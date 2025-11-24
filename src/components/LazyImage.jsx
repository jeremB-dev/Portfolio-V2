import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Composant d'image avec lazy loading optimisé
 * Utilise IntersectionObserver pour charger les images uniquement quand elles sont visibles
 */
function LazyImage({ 
  src, 
  alt, 
  className = '', 
  width, 
  height,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f0f0f0" width="400" height="300"/%3E%3C/svg%3E'
}) {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Vérifier si IntersectionObserver est supporté
    if (!('IntersectionObserver' in window)) {
      // Fallback : charger l'image immédiatement
      setImageSrc(src);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // L'image est visible, on la charge
            const img = new Image();
            img.src = src;
            
            img.onload = () => {
              setImageSrc(src);
              setImageLoaded(true);
            };

            // Arrêter d'observer une fois chargée
            observer.unobserve(entry.target);
          }
        });
      },
      {
        // Charger l'image 50px avant qu'elle soit visible
        rootMargin: '50px',
        threshold: 0.01
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [src]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt}
      className={`lazy-image ${imageLoaded ? 'loaded' : 'loading'} ${className}`}
      width={width}
      height={height}
      loading="lazy"
    />
  );
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string
};

export default LazyImage;
