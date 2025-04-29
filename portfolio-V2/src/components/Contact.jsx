import React, { useState } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { useAnimation } from '../components/AnimationContext';


function Contact() {
  const { animationsEnabled } = useAnimation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Afficher immédiatement la modal de succès
    setShowSuccessModal(true);
    
    try {
      // Créer un objet FormData pour l'envoi
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('message', formData.message);
      form.append('_captcha', 'false'); // Désactiver le captcha de FormSubmit
      
      // Envoi à FormSubmit
      await fetch('https://formsubmit.co/jeremybrunel.dev@gmail.com', {
        method: 'POST',
        body: form
      });
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setLoading(false);
      
      // Fermer la modale après 3 secondes
      setTimeout(() => {
        setShowSuccessModal(false);
        window.scrollTo(0, 0);
      }, 3000);
    }
  };

  return (
    <section id="contact">

{animationsEnabled && (
        <BackgroundAnimation 
          type="particles" 
          opacity={1} 
          color="#53ba5f" 
          speed="fast" 
          particleSize={15} // Augmenter la taille des particules
          particleCount={500} // Augmenter le nombre de particules
          movementType="bounce"
          rotationSpeed="medium" // Ajouter une rotation si supporté
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
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
      <div id="success-modal" className="modal-overlay" style={{ display: showSuccessModal ? 'flex' : 'none' }}>
        <div className="modal">
          <h3>Votre message a bien été envoyé !</h3>
          <p>
            Merci pour votre message. Je vous répondrai dans les plus brefs
            délais.
          </p>
          <p className="redirect-text">Redirection vers la page dans un instant...</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;