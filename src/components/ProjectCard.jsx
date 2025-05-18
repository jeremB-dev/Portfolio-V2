import React, { useState, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

function ProjectCard({ project }) {
  const { title, subtitle, image, images, description, technologies, github } = project;
  const [isOpen, setIsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Utilise le hook useWindowSize
  const { isTablet, isDesktop, isMobile, isLandscape } = useWindowSize();
  
  // Prépare un tableau d'images
  const galleryImages = React.useMemo(() => 
    (images && images.length > 0) ? images : [image], 
    [images, image]
  );

  // Effet pour adapter la hauteur et éviter les scrollbars
  useEffect(() => {
    const adjustContentHeight = () => {
      if (isOpen) {
        // Détection des dimensions de l'interface
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 0;
        const navHeight = document.querySelector('.switches-bar:not(.simple-nav-switchs)') ? 
                          document.querySelector('.switches-bar:not(.simple-nav-switchs)').offsetHeight : 0;
        
        // Calcul des offsets et dimensions
        let topOffset = 0;
        if (!isTablet && !isMobile) {
          topOffset = headerHeight + navHeight + 15;
        }
        
        const windowHeight = window.innerHeight;
        const modalHeight = isTablet || isMobile ? 
                           windowHeight : 
                           windowHeight - topOffset - 30;
        
        // Hauteurs et espacements
        const imageHeight = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--modal-image-height') || '200');
        const padding = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--modal-padding') || '20');
        const paddingTotal = padding * 2;
        const buttonSpace = 50;
        
        // Calcul de la hauteur maximale du contenu
        const maxContentHeight = modalHeight - imageHeight - paddingTotal - buttonSpace;
        
        // Application des variables CSS
        document.documentElement.style.setProperty('--modal-content-max-height', `${maxContentHeight}px`);
        
        // Ajustement de la modale en mode desktop
        if (!isTablet && !isMobile) {
          document.documentElement.style.setProperty('--modal-height', `${modalHeight}px`);
          document.documentElement.style.setProperty('--modal-top', `${topOffset + 10}px`);
        }
      }
    };
    
    // Appliquer les ajustements
    if (isOpen) {
      adjustContentHeight();
      window.addEventListener('resize', adjustContentHeight);
    }
    
    return () => {
      window.removeEventListener('resize', adjustContentHeight);
      document.documentElement.style.removeProperty('--modal-content-max-height');
    };
  }, [isOpen, isTablet, isMobile, isLandscape]);

  // Effet spécial pour les tablettes - traitement du problème de largeur
  useEffect(() => {
    if (isOpen && (isTablet || isMobile)) {
      // En mode mobile ou tablette, appliquer un traitement pour éviter le débordement
      
      // Forcer le viewport à rester fixe
      const metaViewport = document.querySelector('meta[name="viewport"]');
      const originalViewport = metaViewport ? metaViewport.getAttribute('content') : '';
      
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
      }
      
      // Forcer les dimensions pour éviter le débordement
      document.documentElement.style.width = '100vw';
      document.documentElement.style.overflowX = 'hidden';
      document.body.style.width = '100vw';
      document.body.style.overflowX = 'hidden';
      
      // Ajustement de l'en-tête
      const header = document.querySelector('.header');
      if (header) {
        header.style.width = '100%';
        header.style.maxWidth = '100vw';
        header.style.left = '0';
        header.style.right = '0';
      }
      
      return () => {
        // Restaurer les styles d'origine
        if (metaViewport && originalViewport) {
          metaViewport.setAttribute('content', originalViewport);
        }
        
        document.documentElement.style.width = '';
        document.documentElement.style.overflowX = '';
        document.body.style.width = '';
        document.body.style.overflowX = '';
        
        if (header) {
          header.style.width = '';
          header.style.maxWidth = '';
          header.style.left = '';
          header.style.right = '';
        }
      };
    }
  }, [isOpen, isTablet, isMobile]);

  // Effet spécial pour positionner correctement la modale
  useEffect(() => {
    if (isOpen) {
      // Solution pour éviter le chevauchement avec la navigation
      const header = document.querySelector('.header');
      const projetsHeader = document.querySelector('h2');
      let zIndexHeader = '997';
      
      if (isTablet && isLandscape) {
        // Mode tablette paysage - mode plein écran
        zIndexHeader = 'var(--z-index-modal-content)';
        if (header) {
          header.style.position = 'relative';
          header.style.zIndex = zIndexHeader;
        }
        
        // Masquer temporairement le titre
        if (projetsHeader && projetsHeader.textContent.includes('projets')) {
          projetsHeader.style.opacity = '0';
        }
      } else if (!isTablet && !isMobile) {
        // Desktop - s'assurer que la modale ne chevauche pas l'en-tête
        if (header) {
          header.style.zIndex = 'var(--z-index-header)';
        }
      }
    }
    
    return () => {
      // Restaurer les styles
      const header = document.querySelector('.header');
      const projetsHeader = document.querySelector('h2');
      
      if (header) {
        header.style.position = '';
        header.style.zIndex = '';
      }
      
      if (projetsHeader && projetsHeader.textContent.includes('projets')) {
        projetsHeader.style.opacity = '';
      }
    };
  }, [isOpen, isTablet, isMobile, isLandscape]);

  // Gère le scroll et empêche le mouvement au survol
  useEffect(() => {
    if (isOpen) {
      // Approche simplifiée pour le mode modal
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100vw';
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.bottom = '0';
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.classList.add('modal-open');
    } else {
      // Restaurer l'état normal
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.bottom = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.classList.remove('modal-open');
    }
    
    return () => {
      // Nettoyer les styles
      document.body.style.overflow = '';
      document.body.style.width = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.bottom = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Gère la touche Échap
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isGalleryOpen) {
          setIsGalleryOpen(false);
        } else if (isOpen) {
          setIsOpen(false);
        }
      }
    };
    
    if (isOpen || isGalleryOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, isGalleryOpen]);

  // Effet pour fermer la galerie quand la carte est fermée
  useEffect(() => {
    if (!isOpen) {
      setIsGalleryOpen(false);
    }
  }, [isOpen]);

  // Précharge les images
  useEffect(() => {
    if (galleryImages && galleryImages.length > 1) {
      galleryImages.forEach((src) => {
        if (src) {
          const img = new Image();
          img.src = src;
        }
      });
    }
  }, [galleryImages]);

  // Formate la description
  const formatDescription = (text) => {
    if (!text) return null;
    
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Ouvre la carte
  const handleCardClick = (e) => {
    if (e) e.stopPropagation();
    setIsOpen(true);
  };

  // Ferme la carte
  const handleClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsOpen(false);
    setIsGalleryOpen(false);
  };

  // Ouvre la galerie
  const handleImageClick = (e) => {
    if (isOpen) {
      e.preventDefault();
      e.stopPropagation();
      setCurrentImageIndex(0);
      setIsGalleryOpen(true);
    }
  };

  // Ferme la galerie
  const handleGalleryClose = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setIsGalleryOpen(false);
  };

  // Navigation dans la galerie
  const handleNextImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = (e) => {
    if (e) e.stopPropagation();
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  // Détermine les classes CSS
  const deviceClass = isDesktop ? ' device-desktop' : isTablet ? ' device-tablet' : ' device-mobile';
  const orientationClass = isLandscape ? ' orientation-landscape' : ' orientation-portrait';
  
  return (
    <>
      <div 
        className={`project-card ${isOpen ? 'active' : ''} ${isTablet ? 'tablet' : ''} ${isLandscape ? 'landscape' : 'portrait'}`}
        onClick={!isOpen ? handleCardClick : undefined}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !isOpen) {
            handleCardClick();
          }
        }}
        style={isOpen ? {pointerEvents: 'auto'} : {}}
      >
        <img
          src={image}
          alt={title}
          className="project-image"
          width="400"
          height="200"
          onClick={isOpen ? handleImageClick : undefined}
          style={{ cursor: isOpen ? 'zoom-in' : 'pointer' }}
          loading="lazy"
        />
        <div className="project-info">
          <h3>{title}</h3>
          <h4>{subtitle}</h4>
          <p>{formatDescription(description)}</p>
          <div className="tech-icons-btn-container">
            <div className="tech-icons">
              {technologies && technologies.map((tech, index) => (
                <img
                  key={index}
                  src={`/assets/logos/${tech}.svg`}
                  alt={`Technologie ${tech}`}
                  width="32"
                  height="32"
                  loading="lazy"
                />
              ))}
            </div>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              onClick={(e) => e.stopPropagation()}
              aria-label={`Voir le projet ${title} sur GitHub`}
            >
              Voir sur GitHub
            </a>
          </div>
        </div>
        {isOpen && (
          <button 
            className="close-button" 
            onClick={handleClose}
            aria-label="Fermer les détails du projet"
          ></button>
        )}
      </div>
      
      {isOpen && (
        <div 
          className="projects-overlay active" 
          onClick={handleClose}
          role="presentation"
          style={{pointerEvents: 'auto'}}
        ></div>
      )}

      {/* Modal de galerie d'images */}
      {isOpen && isGalleryOpen && (
        <div 
          className={`gallery-modal-overlay${deviceClass}${orientationClass}`} 
          onClick={handleGalleryClose} 
          role="presentation"
          style={{pointerEvents: 'auto'}}
        >
          <div 
            className={`gallery-modal${deviceClass}${orientationClass}`} 
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="gallery-image"
            />
            
            {galleryImages.length > 1 && (
              <>
                <div className="gallery-counter">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
                
                <button 
                  className="gallery-nav prev" 
                  onClick={handlePrevImage}
                  aria-label="Image précédente"
                ></button>
                
                <button 
                  className="gallery-nav next" 
                  onClick={handleNextImage}
                  aria-label="Image suivante"
                ></button>
              </>
            )}
            
            <button 
              className="close-gallery-button" 
              onClick={handleGalleryClose}
              aria-label="Fermer la galerie"
            ></button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectCard;