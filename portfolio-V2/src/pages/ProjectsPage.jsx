// src/pages/ProjectsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Projects from '../components/Projects.jsx';

function ProjectsPage() {
  return (
    <div className="projects-page">
      <Projects />
      <div className="section-navigation">
        <p>Découvrez <Link to="/technologies">les technologies que je maîtrise</Link> ou <Link to="/contact">contactez-moi</Link> pour discuter de vos projets.</p>
      </div>
    </div>
  );
}

export default ProjectsPage;