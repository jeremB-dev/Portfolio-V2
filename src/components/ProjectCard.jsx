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
        
        // NOUVELLE PARTIE: Force la position correcte sur mobile
        if (isMobile) {
          const activeCard = document.querySelector('.project-card.active');
          if (activeCard) {
            activeCard.style.position = 'fixed';
            activeCard.style.top = '0';
            activeCard.style.left = '0';
            activeCard.style.width = '100%';
            activeCard.style.height = '100%';
            activeCard.style.transform = 'none';
            activeCard.style.borderRadius = '0';
            activeCard.style.margin = '0';
            activeCard.style.zIndex = 'var(--z-index-modal-content)';
          }
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
    
    // Cas spécial pour mobile : applique les styles directement à l'élément cliqué
    if (isMobile) {
      // Appliquer les styles directement à l'élément cliqué avant de mettre à jour l'état
      const clickedCard = e.currentTarget;
      clickedCard.style.position = 'fixed';
      clickedCard.style.top = '0';
      clickedCard.style.left = '0';
      clickedCard.style.width = '100%';
      clickedCard.style.height = '100%';
      clickedCard.style.transform = 'none';
      clickedCard.style.borderRadius = '0';
      clickedCard.style.margin = '0';
      clickedCard.style.zIndex = '1000'; // utiliser une valeur numérique directe
      clickedCard.style.transition = 'none';
      
      // Forcer un repaint pour appliquer les styles immédiatement
      clickedCard.offsetHeight; // trick to force repaint
    }
    
    // Maintenant on peut mettre à jour l'état
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

  // Ouvre la galerie - CORRIGÉ pour mobile
  const handleImageClick = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    if (isOpen) {
      setCurrentImageIndex(0);
      setIsGalleryOpen(true);
      
      // Forcer un délai pour s'assurer que les événements sont bien séparés
      setTimeout(() => {
        const galleryOverlay = document.querySelector('.gallery-modal-overlay');
        if (galleryOverlay) {
          galleryOverlay.style.zIndex = '9999';
          galleryOverlay.style.position = 'fixed';
          galleryOverlay.style.top = '0';
          galleryOverlay.style.left = '0';
          galleryOverlay.style.width = '100%';
          galleryOverlay.style.height = '100%';
        }
      }, 10);
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
  
  // Bouton pour ouvrir la galerie sur mobile
  const renderGalleryButton = () => {
    if (isOpen) {  // Suppression de la condition mobile
      return (
        <button 
          className="view-gallery-button"
          onClick={handleImageClick}
          aria-label="Voir en plein écran"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"></path>
          </svg>
        </button>
      );
    }
    return null;
  };

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
        style={isOpen && isMobile ? {
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          transform: 'none',
          borderRadius: '0',
          margin: '0',
          zIndex: 'var(--z-index-modal-content)',
          pointerEvents: 'auto'
        } : isOpen ? {pointerEvents: 'auto'} : {}}
      >
        <img
          src={image}
          alt={title}
          className="project-image"
          width="400"
          height="200"
          onClick={isOpen ? handleImageClick : undefined}
          style={{ 
            cursor: isOpen ? 'zoom-in' : 'pointer',
            pointerEvents: isOpen ? 'auto' : 'auto' // Assure que l'image est toujours cliquable
          }}
          loading="lazy"
        />
        {renderGalleryButton()}
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
          style={{
            pointerEvents: 'auto',
            zIndex: 9999, // Force un z-index élevé
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
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