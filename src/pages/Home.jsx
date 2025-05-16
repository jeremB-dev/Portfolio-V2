import React from 'react';
import { Link } from 'react-router-dom';
import About from '../components/About.jsx';

function Home() {
  return (
    <div className="home-page">
      <About />
      <div className="section-navigation">
        <p>Découvrez <Link to="/technologies">mes compétences techniques</Link> ou consultez <Link to="/projects">mes projets récents</Link>.</p>
      </div>
    </div>
  );
}

export default Home;