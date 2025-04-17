import React, { useState } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { useAnimation } from '../components/AnimationContext';
import '../styles/toggleAnimation.css';

function Contact() {
  const { animationsEnabled, setAnimationsEnabled } = useAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Ici vous pouvez ajouter la logique pour envoyer le formulaire
    console.log('Formulaire soumis:', formData);
    
    // Afficher la modal de succès
    setShowSuccessModal(true);
    
    // Redirection après 3 secondes
    setTimeout(() => {
      setShowSuccessModal(false);
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Faire défiler vers le haut
      window.scrollTo(0, 0);
    }, 3000);
  };

  return (
    <section id="contact">
      {/* Bouton pour désactiver les animations */}
      <div className="animation-toggle">
        <span className="toggle-icon">🚫</span>
        <div className="animation-toggle-wrapper">
          <label className="switch">
            <input 
              type="checkbox" 
              checked={animationsEnabled}
              onChange={() => setAnimationsEnabled(!animationsEnabled)}
            />
            <span className="slider round"></span>
          </label>
          <div className="animation-toggle-tooltip">
            {animationsEnabled ? "Désactiver animations" : "Activer animations"}
          </div>
        </div>
        <span className="toggle-icon">✨</span>
      </div>

      {animationsEnabled && (
        <BackgroundAnimation 
          type="particles" 
          opacity={1} 
          color="#53ba5f" 
          speed="fast" 
        />
      )}

      <h2>Obtenez mon CV</h2>
      <div className="cv-container">
        <a href="/assets/CV/Brunel_Jérémy_cv.pdf" download="CV-Jeremy-Brunel.pdf" className="btn">
          Cliquer pour télécharger
        </a>
      </div>
      <h2>Contactez-moi</h2>
      <form id="contactForm" onSubmit={handleSubmit}>
        <label htmlFor="name">NOM Prénom :</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          pattern="^[a-zA-ZÀ-ÿ]+ [a-zA-ZÀ-ÿ]+$"
          placeholder="ex: DUBOIS Julien"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
          placeholder="ex: julien.dubois@example.com"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="message">Message :</label>
        <textarea
          id="message"
          name="message"
          rows="5"
          required
          minLength="10"
          placeholder="Votre message (minimum 10 caractères)"
          value={formData.message}
          onChange={handleChange}
        ></textarea>
        <button type="submit" className="btn">Envoyer</button>
      </form>
      <div id="success-modal" className="modal-overlay" style={{ display: showSuccessModal ? 'flex' : 'none' }}>
        <div className="modal">
          <h3>Votre message a bien été envoyé !</h3>
          <p>
            Merci pour votre message. Je vous répondrais dans les plus brefs
            delais.
          </p>
          <p className="redirect-text">Redirection vers la page dans un instant...</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;