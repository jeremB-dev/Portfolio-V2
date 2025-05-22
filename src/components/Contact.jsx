import React, { useState } from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import useAnimation from '../hooks/useAnimation';
import useWindowSize from '../hooks/useWindowSize';

function Contact() {
  const MESSAGE_MIN_LENGTH = 10;
  const { animationsEnabled } = useAnimation();
  const { isMobile, isTablet } = useWindowSize();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    loading: false,
    success: false,
    error: false,
    errorMessage: ''
  });

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Le nom est requis';
        else if (!/^[a-zA-ZÀ-ÿ]+(?:[\s-][a-zA-ZÀ-ÿ]+)*$/.test(value)) error = 'Format invalide.';
        break;
      case 'email':
        if (!value.trim()) error = 'L\'email est requis';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Format d\'email invalide';
        break;
      case 'message':
        if (!value.trim()) error = 'Le message est requis';
        else if (value.trim().length < MESSAGE_MIN_LENGTH) error = `Minimum ${MESSAGE_MIN_LENGTH} caractères`;
        break;
      default:
        break;
    }
    return error;
  };

  const validateForm = () => {
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      message: validateField('message', formData.message)
    };
    setFieldErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    setFieldErrors(prev => ({ ...prev, [id]: validateField(id, value) }));
    if (formStatus.error) {
      setFormStatus(prev => ({ ...prev, error: false, errorMessage: '' }));
    }
  };

  const getCharacterCount = () => {
    const count = formData.message.trim().length;
    return `${count}/${MESSAGE_MIN_LENGTH} caractères minimum`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      // ➕ Ajoute l'heure locale au moment de l'envoi
        const localTime = new Date().toLocaleString('fr-FR', {
          timeZone: 'Europe/Paris',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        });

        const payload = {
          ...formData,
          heure_locale: localTime
        };

        const response = await fetch("https://formspree.io/f/xdkgbgpo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify(payload)
        });


      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du formulaire");
      }

      setFormData({ name: '', email: '', message: '' });
      setFieldErrors({ name: '', email: '', message: '' });
      setFormStatus({ loading: false, success: true, error: false, errorMessage: '' });

      setTimeout(() => {
        setFormStatus(prev => ({ ...prev, success: false }));
        window.scrollTo(0, 0);
      }, 4000);
    } catch (error) {
      console.error(error);
      setFormStatus({
        loading: false,
        success: false,
        error: true,
        errorMessage: error.message || 'Une erreur est survenue'
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
          particleCount={120}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}

      <h2>Obtenez mon CV</h2>
      <div className="cv-container">
        <a href="assets/CV/Brunel_Jérémy.pdf" download="CV-Jeremy-Brunel.pdf" className="btn">
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
            placeholder="ex: DUBOIS Jean"
            value={formData.name}
            onChange={handleChange}
            className={fieldErrors.name ? 'error' : ''}
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? 'name-error' : undefined}
          />
          {fieldErrors.name && (
            <div id="name-error" className="error-message">{fieldErrors.name}</div>
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
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? 'email-error' : undefined}
          />
          {fieldErrors.email && (
            <div id="email-error" className="error-message">{fieldErrors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message">
            Message :
            <span className="character-count" style={{
              marginLeft: '10px',
              fontSize: '0.8em',
              color: formData.message.trim().length < MESSAGE_MIN_LENGTH ? '#ff5252' : '#53ba5f'
            }}>
              {getCharacterCount()}
            </span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            placeholder="Votre message..."
            value={formData.message}
            onChange={handleChange}
            className={fieldErrors.message ? 'error' : ''}
            aria-invalid={!!fieldErrors.message}
            aria-describedby={fieldErrors.message ? 'message-error' : undefined}
          ></textarea>
          {fieldErrors.message && (
            <div id="message-error" className="error-message">{fieldErrors.message}</div>
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
          disabled={formStatus.loading || Object.values(fieldErrors).some(Boolean)}
        >
          {formStatus.loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
      </form>

      <div className="recaptcha-section">
        <div className="recaptcha-text">
          <span className="recaptcha-logo">
            <img
              src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
              alt="reCAPTCHA"
              width="20"
              height="20"
              loading="lazy"
            />
          </span>
          Protection par Formspree
          <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Confidentialité /</a>
          <a href="https://formspree.io/legal/terms-of-service" target="_blank" rel="noopener noreferrer">Conditions</a>
        </div>
      </div>

      <div id="success-modal" className="modal-overlay" style={{ display: formStatus.success ? 'flex' : 'none' }}>
        <div className="modal">
          <h3>Votre message a bien été envoyé !</h3>
          <p>Merci pour votre message.<br />Je vous répondrai dans les plus brefs délais.</p>
          <p className="redirect-text">Redirection vers la page dans un instant...</p>
        </div>
      </div>
    </section>
  );
}

export default Contact;