import React from 'react';

function ProjectCard({ project }) {
  const { title, subtitle, image, description, technologies, github } = project;

  // Fonction pour convertir les sauts de ligne en éléments <br />
  const formatDescription = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <div className="project-card">
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
          >
            Voir sur GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;