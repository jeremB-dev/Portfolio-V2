import React from 'react';
import { Link } from 'react-router-dom';

function CTAButtons() {
  return (
    <div className="cta-buttons">
      <Link to="/projects" className="cta-button cta-button-primary">
        <span>Voir mes projets</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.5 15L12.5 10L7.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
      <Link to="/contact" className="cta-button cta-button-secondary">
        <span>Me contacter</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4L10 11L17 4M3 16H17V4H3V16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Link>
    </div>
  );
}

export default CTAButtons;
