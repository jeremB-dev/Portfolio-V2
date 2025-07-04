import React, { useState } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaShare, FaFacebook, FaEnvelope, FaLink } from 'react-icons/fa';
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

  // État pour les boutons de partage
  const [showShareOptions, setShowShareOptions] = useState(false);

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

  // Fonctions de partage
  const shareUrl = window.location.href;
  const shareTitle = "Portfolio de Jérémy Brunel - Développeur Web";
  
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        setShowShareOptions(false);
        alert('Lien copié dans le presse-papier!');
      })
      .catch(err => {
        console.error('Impossible de copier le lien: ', err);
      });
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

      {/* Section CV */}
      <div className="cv-section">
        <h3>Obtenez mon CV</h3>
        <p>Téléchargez mon curriculum vitae au format PDF</p>
        <div className="cv-container">
          <a href="assets/CV/Brunel_Jérémy.pdf" download="CV-Jeremy-Brunel.pdf" className="btn btn-with-icon">
            <span className="cv-icon">📄</span>
            <span>Télécharger mon CV</span>
          </a>
        </div>
      </div>

      {/* Section Réseaux Sociaux */}
      <div className="social-section">
        <h3>Mes réseaux sociaux</h3>
        <p>Retrouvez-moi sur mes différentes plateformes</p>
        <div className="social-links">
          <div className="social-item">
            <a 
              href="https://github.com/jeremB-dev" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub" 
              className="github"
            >
              <FaGithub />
              <span className="tooltip">GitHub</span>
            </a>
          </div>
          
          <div className="social-item">
            <a 
              href="https://www.linkedin.com/in/jeremy-brunel-1a80b1340/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn" 
              className="linkedin"
            >
              <FaLinkedin />
              <span className="tooltip">LinkedIn</span>
            </a>
          </div>
          
          <div className="social-item">
            <a 
              href="https://x.com/brunel_jerem" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Twitter" 
              className="twitter"
            >
              <FaTwitter />
              <span className="tooltip">Twitter</span>
            </a>
          </div>
        </div>
      </div>

      {/* Section Partage */}
      <div className="share-section">
        <h3>Partager ce portfolio</h3>
        <p>Ce portfolio vous plaît ? Partagez-le !</p>
        <div className="share-container">
          <button 
            className="btn btn-with-icon"
            onClick={toggleShareOptions}
            aria-label="Afficher les options de partage"
          >
            <FaShare />
            <span>Partager</span>
          </button>
          
          {showShareOptions && (
            <div className="share-options">
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-option twitter"
                aria-label="Partager sur Twitter"
              >
                <FaTwitter />
                <span>Twitter</span>
              </a>
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-option facebook"
                aria-label="Partager sur Facebook"
              >
                <FaFacebook />
                <span>Facebook</span>
              </a>
              <a 
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="share-option linkedin"
                aria-label="Partager sur LinkedIn"
              >
                <FaLinkedin />
                <span>LinkedIn</span>
              </a>
              <a 
                href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent('Découvrez ce portfolio: ' + shareUrl)}`}
                className="share-option email"
                aria-label="Partager par email"
              >
                <FaEnvelope />
                <span>Email</span>
              </a>
              <button 
                onClick={copyToClipboard}
                className="share-option copy"
                aria-label="Copier le lien"
              >
                <FaLink />
                <span>Copier</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Section Formulaire */}
      <div className="form-section">
        <h3>Contactez-moi</h3>
        <p>Envoyez-moi un message, je vous répondrai rapidement</p>
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
          className="btn btn-with-icon"
          disabled={formStatus.loading || Object.values(fieldErrors).some(Boolean)}
        >
          {formStatus.loading ? 'Envoi en cours...' : 'Envoyer'}
        </button>
              </form>
      </div>

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