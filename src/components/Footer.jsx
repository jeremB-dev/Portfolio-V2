import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="copyright">
          &copy; {new Date().getFullYear()} Réaliser par BRUNEL Jérémy - Tous droits réservés
        </p>
      </div>
    </footer>
  );
}

export default Footer;