// src/components/ProjectCard.jsx
import React, { useState, useEffect } from 'react';

function ProjectCard({ project }) {
  const { title, subtitle, image, description, technologies, github } = project;
  const [isOpen, setIsOpen] = useState(false);

  // Gérer la touche Échap pour fermer la carte
  useEffect(() => {
    if (!isOpen) return;
    
    // Désactiver le scroll du body quand une carte est ouverte
    document.body.style.overflow = 'hidden';
    
    // Ajouter un gestionnaire pour la touche Échap
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    
    // Nettoyage lors du démontage du composant ou fermeture de la carte
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  // Fonction pour convertir les sauts de ligne en éléments <br />
  const formatDescription = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // Fonction pour gérer le clic sur la carte
  const handleCardClick = () => {
    setIsOpen(true);
  };

  // Fonction pour fermer la carte
  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Empêche la propagation du clic
    setIsOpen(false);
  };

  return (
    <>
      <div 
        className={`project-card ${isOpen ? 'active' : ''}`} 
        onClick={!isOpen ? handleCardClick : undefined}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        onKeyPress={(e) => {
          if (e.key === 'Enter' && !isOpen) {
            handleCardClick();
          }
        }}
      >
        <img
          src={image}
          alt={title}
          className="project-image"
          width="400"
          height="200"
        />
        <div className="project-info">
          <h3>{title}</h3>
          <h4>{subtitle}</h4>
          <p>{formatDescription(description)}</p>
          <div className="tech-icons-btn-container">
            <div className="tech-icons">
              {technologies.map((tech, index) => (
                <img
                  key={index}
                  src={`/assets/logos/${tech}.svg`}
                  alt={`Technologie ${tech}`}
                  width="32"
                  height="32"
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
          >
            ×
          </button>
        )}
      </div>
      
      {isOpen && (
        <div 
          className="projects-overlay active" 
          onClick={handleClose}
          role="presentation"
        ></div>
      )}
    </>
  );
}

export default ProjectCard;