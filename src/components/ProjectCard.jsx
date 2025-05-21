import React, { useState, useEffect, useRef, useMemo } from 'react';
import useWindowSize from '../hooks/useWindowSize';

function ProjectCard({ project }) {
  const { title, subtitle, image, images, description, technologies, github } = project;

  const [isOpen, setIsOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projectCardRef = useRef(null);
  const { isTablet, isMobile, isLandscape } = useWindowSize();

  const galleryImages = useMemo(() => (images?.length > 0 ? images : [image]), [images, image]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) setIsGalleryOpen(false);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (isGalleryOpen) setIsGalleryOpen(false);
        else if (isOpen) setIsOpen(false);
      }
    };
    if (isOpen || isGalleryOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, isGalleryOpen]);

  useEffect(() => {
    galleryImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [galleryImages]);

  const formatDescription = (text) =>
    text?.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));

  const handleCardClick = (e) => {
    e?.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    setIsOpen(false);
    setIsGalleryOpen(false);
  };

  const handleImageClick = (e) => {
    e?.stopPropagation();
    setCurrentImageIndex(0);
    setIsGalleryOpen(true);
  };

  const deviceClass = isMobile ? 'device-mobile' : isTablet ? 'device-tablet' : 'device-desktop';
  const orientationClass = isLandscape ? 'orientation-landscape' : 'orientation-portrait';

  return (
    <>
      <div
        ref={projectCardRef}
        className={`project-card ${isOpen ? 'active' : ''} ${isTablet ? 'tablet' : ''} ${isLandscape ? 'landscape' : 'portrait'}`}
        onClick={isOpen ? (e) => e.stopPropagation() : handleCardClick}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyPress={(e) => e.key === 'Enter' && !isOpen && handleCardClick()}
      >
        <img
          src={image}
          alt={title}
          className="project-image"
          width="400"
          height="200"
          onClick={isOpen ? handleImageClick : undefined}
          loading="lazy"
          style={{ cursor: 'pointer' }}
        />

        {isOpen && (
          <button
            className="view-gallery-button"
            onClick={handleImageClick}
            aria-label="Voir en plein écran"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>
        )}

        <div className="project-info">
          <h3>{title}</h3>
          <h4>{subtitle}</h4>
          <p>{formatDescription(description)}</p>
          <div className="tech-icons-btn-container">
            <div className="tech-icons">
              {technologies?.map((tech, index) => (
                <img key={index} src={`/assets/logos/${tech}.svg`} alt={`Tech ${tech}`} width="32" height="32" loading="lazy" />
              ))}
            </div>
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
              onClick={(e) => e.stopPropagation()}
            >
              Voir sur GitHub
            </a>
          </div>
        </div>

        {isOpen && (
          <button className="close-button" onClick={handleClose} aria-label="Fermer les détails du projet" />
        )}
      </div>

      {/* Overlay carte - affiché uniquement si galerie fermée */}
      {isOpen && !isGalleryOpen && (
        <div className="projects-overlay active" onClick={handleClose} role="presentation" />
      )}

      {/* Modale galerie */}
      {isOpen && isGalleryOpen && (
        <div
          className={`gallery-modal-overlay ${deviceClass} ${orientationClass}`}
          onClick={(e) => {
            e.stopPropagation(); // empêche fermeture de la carte
            setIsGalleryOpen(false);
          }}
          role="presentation"
        >
          <div
            className={`gallery-modal ${deviceClass} ${orientationClass}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[currentImageIndex]}
              alt={`${title} - ${currentImageIndex + 1}`}
              className="gallery-image"
            />
            {galleryImages.length > 1 && (
              <>
                <div className="gallery-counter">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
                <button
                  className="gallery-nav prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((currentImageIndex - 1 + galleryImages.length) % galleryImages.length);
                  }}
                  aria-label="Image précédente"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="white" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                </button>
                <button
                  className="gallery-nav next"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((currentImageIndex + 1) % galleryImages.length);
                  }}
                  aria-label="Image suivante"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="white" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                </button>
              </>
            )}
            <button
              className="close-gallery-button"
              onClick={(e) => {
                e.stopPropagation();
                setIsGalleryOpen(false);
              }}
              aria-label="Fermer la galerie"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ProjectCard;
