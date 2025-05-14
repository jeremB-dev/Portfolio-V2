// src/pages/TechnologiesPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Technologies from '../components/Technologies.jsx';

function TechnologiesPage() {
  return (
    <div className="technologies-page">
      <Technologies />
      <div className="section-navigation">
        <p>Voir <Link to="/projects">comment j'utilise ces technologies dans mes projets</Link> ou <Link to="/contact">contactez-moi</Link> pour en savoir plus.</p>
      </div>
    </div>
  );
}

export default TechnologiesPage;