import React, { useState } from 'react';
import '../styles/components/projects-filter.css';

function ProjectsFilter({ projects, onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Extraire toutes les technologies uniques
  const allTechnologies = ['All', ...new Set(
    projects.flatMap(project => project.technologies || [])
  )];
  
  const handleFilterClick = (tech) => {
    setActiveFilter(tech);
    onFilterChange(tech);
  };
  
  // Compter les projets par technologie
  const getProjectCount = (tech) => {
    if (tech === 'All') return projects.length;
    return projects.filter(project => 
      project.technologies && project.technologies.includes(tech)
    ).length;
  };
  
  return (
    <div className="projects-filter">
      <div className="filter-buttons">
        {allTechnologies.map((tech) => (
          <button
            key={tech}
            className={`filter-button ${activeFilter === tech ? 'active' : ''}`}
            onClick={() => handleFilterClick(tech)}
          >
            <span className="filter-button-text">{tech}</span>
            <span className="filter-button-count">{getProjectCount(tech)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProjectsFilter;
