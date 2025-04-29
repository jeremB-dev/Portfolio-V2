import React, { useState, useEffect } from 'react';

function ProjectCard({ project }) {
  const { title, subtitle, image, description, technologies, github } = project;
  const [isOpen, setIsOpen] = useState(false);

  // Ajout d'un effet pour gérer le scroll du document
  useEffect(() => {
    if (isOpen) {
      // Désactiver le scroll du body quand une carte est ouverte
      document.body.style.overflow = 'hidden';
      
      // Nettoyage lors du démontage du composant ou fermeture de la carte
      return () => {
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  // Fonction pour convertir les sauts de ligne en éléments <br />
  const formatDescription = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
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

  // Empêche la propagation du clic dans la carte ouverte
  const handleCardContentClick = (e) => {
    if (isOpen) {
      e.stopPropagation();
    }
  };

  return (
    <>
      <div 
        className={`project-card ${isOpen ? 'active' : ''}`} 
        onClick={(e) => {
          handleCardContentClick(e);
          if (!isOpen) {
            e.preventDefault();
            handleCardClick();
          }
        }}
      >
        <img
          src={image}
          alt={title}
          className="project-image"
          loading="lazy"
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
                  alt={tech}
                  loading="lazy"
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
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              Voir sur GitHub
            </a>
          </div>
        </div>
        {isOpen && (
          <button 
            className="close-button" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleClose(e);
            }}
          >
            ×
          </button>
        )}
      </div>
      
      {isOpen && (
        <div 
          className="projects-overlay active" 
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(false);
          }}
        ></div>
      )}
    </>
  );
}

export default ProjectCard;