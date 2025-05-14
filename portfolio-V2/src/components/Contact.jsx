// src/components/Contact.jsx
import React, { useState } from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import useAnimation from '../hooks/useAnimation';
import useWindowSize from '../hooks/useWindowSize';

function Contact() {
  const { animationsEnabled } = useAnimation();
  const { isMobile, isTablet } = useWindowSize();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // État pour les erreurs de validation spécifiques à chaque champ
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // État pour le statut global du formulaire
  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: ''
  });

  // Fonction pour valider un champ spécifique
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Le nom est requis';
        } else if (!/^[a-zA-ZÀ-ÿ]+ [a-zA-ZÀ-ÿ]+$/.test(value)) {
          error = 'Format invalide. Exemple: DUBOIS Julien';
        }
        break;
        
      case 'email':
        if (!value.trim()) {
          error = 'L\'email est requis';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Format d\'email invalide';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          error = 'Le message est requis';
        } else if (value.trim().length < 30) {
          error = 'Le message doit contenir au moins 30 caractères';
        }
        break;
        
      default:
        break;
    }
    
    return error;
  };

  // Fonction pour valider le formulaire entier
  const validateForm = () => {
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };
    
    setFieldErrors(errors);
    
    // Retourne true si aucune erreur n'est présente
    return !Object.values(errors).some(error => error);
  };

  // Gestion du changement des champs
  const handleChange = (e) => {
    const { id, value } = e.target;
    
    // Mettre à jour les données du formulaire
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
    
    // Valider le champ en temps réel et mettre à jour l'erreur correspondante
    setFieldErrors(prevErrors => ({
      ...prevErrors,
      [id]: validateField(id, value)
    }));
    
    // Réinitialiser les erreurs générales si l'utilisateur commence à corriger
    if (formStatus.error) {
      setFormStatus(prev => ({ ...prev, error: false, errorMessage: '' }));
    }
  };

  // Afficher le compteur de caractères pour le message
  const getCharacterCount = () => {
    const count = formData.message.trim().length;
    const minCount = 30;
    
    return `${count}/${minCount} caractères minimum`;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Valider le formulaire avant envoi
    if (!validateForm()) {
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        errorMessage: 'Veuillez corriger les erreurs dans le formulaire'
      });
      return;
    }
    
    setFormStatus({ loading: true, success: false, error: false, errorMessage: '' });
    
    try {
      // Créer un objet FormData pour l'envoi
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('message', formData.message);
      form.append('_captcha', 'false');
      
      // Envoi à FormSubmit
      const response = await fetch('https://formsubmit.co/jeremybrunel.dev@gmail.com', {
        method: 'POST',
        body: form
      });
      
      if (!response.ok) {
        throw new Error('Erreur lors de l\'envoi du formulaire');
      }
      
      // Réinitialiser le formulaire
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      
      // Réinitialiser les erreurs
      setFieldErrors({
        name: '',
        email: '',
        message: ''
      });
      
      setFormStatus({ loading: false, success: true, error: false, errorMessage: '' });
      
      // Fermer la modale après 3 secondes
      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false }));
        window.scrollTo(0, 0);
      }, 4000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setFormStatus({ 
        loading: false, 
        success: false, 
        error: true, 
        errorMessage: error.message || 'Une erreur est survenue lors de l\'envoi'
      });
    }
  };

  return (
    <section id="contact">
      {animationsEnabled && (
        <BackgroundAnimation 
          type="particles" 
          opacity={0.8}
          color="#53ba5f" 
          speed="medium"
          particleSize={6}
          particleCount={120}  // Sera automatiquement réduit à environ 12 sur mobile
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}

      <h2>Obtenez mon CV</h2>
      <div className="cv-container">
        <a href="/assets/CV/Brunel_Jérémy_cv.pdf" download="CV-Jeremy-Brunel.pdf" className="btn">
          Cliquer pour télécharger
        </a>
      </div>
      
      <h2>Contactez-moi</h2>
      <form id="contactForm" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="name">NOM Prénom :</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            placeholder="ex: DUBOIS Julien"
            value={formData.name}
            onChange={handleChange}
            className={fieldErrors.name ? 'error' : ''}
            aria-invalid={fieldErrors.name ? 'true' : 'false'}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          />
          {fieldErrors.name && (
            <div id="name-error" className="error-message">
              {fieldErrors.name}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="ex: julien.dubois@example.com"
            value={formData.email}
            onChange={handleChange}
            className={fieldErrors.email ? 'error' : ''}
            aria-invalid={fieldErrors.email ? 'true' : 'false'}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          />
          {fieldErrors.email && (
            <div id="email-error" className="error-message">
              {fieldErrors.email}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="message">
            Message :
            <span className="character-count" style={{ marginLeft: '10px', fontSize: '0.8em', color: formData.message.trim().length < 30 ? '#ff5252' : '#53ba5f' }}>
              {getCharacterCount()}
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            minLength="10"
            placeholder="Votre message..."
            value={formData.message}
            onChange={handleChange}
            className={fieldErrors.message ? 'error' : ''}
            aria-invalid={fieldErrors.message ? 'true' : 'false'}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          ></textarea>
          {fieldErrors.message && (
            <div id="message-error" className="error-message">
              {fieldErrors.message}
            </div>
          )}
        </div>
        
        {formStatus.error && (
          <div className="global-error-message" role="alert">
            {formStatus.errorMessage}
          </div>
        )}
        
        <button 
          type="submit" 
          className="btn" 
          disabled={formStatus.loading || Object.values(fieldErrors).some(error => error)}
        >
          {formStatus.loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>
      
      <div id="success-modal" className="modal-overlay" style={{ display: formStatus.success ? 'flex' : 'none' }}>
        <div className="modal">
          <h3>Votre message a bien été envoyé !</h3>
          <p>
            Merci pour votre message.<br /> Je vous répondrai dans les plus brefs
            délais.
          </p>
          <p className="redirect-text">Redirection vers la page dans un instant...</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;