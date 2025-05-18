import React, { useState, useRef, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaShare, FaFacebook, FaEnvelope, FaLink } from 'react-icons/fa';

function Footer() {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const shareButtonRef = useRef(null);
  const dropdownRef = useRef(null);
  
  // Ferme le dropdown quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        showShareOptions && 
        shareButtonRef.current && 
        !shareButtonRef.current.contains(event.target) &&
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target)
      ) {
        setShowShareOptions(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showShareOptions]);
  
  const toggleShareOptions = () => {
    setShowShareOptions(!showShareOptions);
  };
  
  const shareUrl = window.location.href;
  const shareTitle = document.title;
  
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

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Zone gauche - Réseaux sociaux avec séparateur */}
        <div className="social-links">
          {/* Groupe des réseaux sociaux */}
          <div className="social-networks">
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
          
          {/* Séparateur vertical */}
          <div className="separator"></div>
          
          {/* Bouton de partage */}
          <div className="social-item">
            <div className="share-container">
              <button 
                ref={shareButtonRef}
                className="share-button"
                onClick={toggleShareOptions}
                aria-label="Partager cette page"
              >
                <FaShare />
                <span className="tooltip">Partager</span>
              </button>
              
              {/* Options de partage */}
              {showShareOptions && (
                <div className="share-dropdown" ref={dropdownRef}>
                  <a 
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-option twitter"
                    aria-label="Partager sur Twitter"
                  >
                    <FaTwitter />
                    <span className="tooltip">Twitter</span>
                  </a>
                  <a 
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-option facebook"
                    aria-label="Partager sur Facebook"
                  >
                    <FaFacebook />
                    <span className="tooltip">Facebook</span>
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="share-option linkedin"
                    aria-label="Partager sur LinkedIn"
                  >
                    <FaLinkedin />
                    <span className="tooltip">LinkedIn</span>
                  </a>
                  <a 
                    href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent('Découvrez cette page: ' + shareUrl)}`}
                    className="share-option email"
                    aria-label="Partager par email"
                  >
                    <FaEnvelope />
                    <span className="tooltip">Email</span>
                  </a>
                  <button 
                    onClick={copyToClipboard}
                    className="share-option copy"
                    aria-label="Copier le lien"
                  >
                    <FaLink />
                    <span className="tooltip">Copier</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Zone droite - Copyright */}
        <p className="copyright">&copy; {new Date().getFullYear()} Réaliser par BRUNEL Jérémy - Tous droits réservés</p>
      </div>
    </footer>
  );
}

export default Footer;