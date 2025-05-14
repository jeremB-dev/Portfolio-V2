// src/pages/ContactPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Contact from '../components/Contact.jsx';

function ContactPage() {
  return (
    <div className="contact-page">
      <Contact />
      <div className="section-navigation">
        <p>Retournez à <Link to="/">la présentation</Link> ou consultez <Link to="/projects">mes projets</Link> pour mieux me connaître.</p>
      </div>
    </div>
  );
}

export default ContactPage;