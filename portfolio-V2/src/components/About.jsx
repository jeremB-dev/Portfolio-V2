import React, { useContext } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import { AnimationContext } from '../components/AnimationContext';
import '../styles/toggleAnimation.css';
import { HashLink } from 'react-router-hash-link';

function About() {
  const { animationsEnabled, setAnimationsEnabled } = useContext(AnimationContext);

  return (
    <section id="about">
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
          particleSize={15} // Augmenter la taille des particules
          particleCount={500} // Augmenter le nombre de particules
          movementType="bounce"
          rotationSpeed="medium" // Ajouter une rotation si supporté
        />
      )}

      <div className="profile">
        <div className="profile-text">
          <h2 className="about-title">À propos de moi</h2>
          <p>
            Je suis diplômé de la formation <br />"Intégrateur développeur web"
            d'Openclassrooms.<br />
            Armé de nouvelles compétences et d'une motivation sans faille, je
            suis prêt à contribuer au succès d'une entreprise dynamique et
            innovante.<br />
            Mon parcours atypique et ma passion pour les technologies web me
            permettent d'apporter un regard neuf et une belle énergie à chaque
            projet.
          </p>
        </div>
        <div className="profile-photo-container">
          <img
            src="/assets/Photo/photoMoi.webp"
            alt="Jérémy Brunel"
            className="profile-photo"
          />
        </div>
      </div>
      <br />
      <div className="career-container">
        <div className="career-section">
          <h3>Mon parcours</h3>
          <br />
          <p className="career-text">
            Auparavant dans le domaine de la logistique, je souhaite m'investir
            pleinement dans un domaine qui me passionne depuis toujours.<br />
            J'ai donc décidé de me reconvertir dans le développement web.<br />
            Cette formation m'a permis d'acquérir des compétences solides en
            HTML, CSS, JavaScript et en frameworks modernes comme React.<br />
            Mon parcours professionnel m'a également permis de développer une
            grande capacité à travailler avec d'autres personnes.
          </p>
          <br />
        </div>
        <br />
        <div className="career-divider"></div>
        <div className="career-section">
          <h3>Ce que je recherche</h3>
          <br />
          <p className="career-text">
            Une opportunité en tant qu'intégrateur junior au sein d'une
            entreprise qui valorise l'innovation et la créativité.<br />
            Je suis prêt à m'impliquer pleinement et à contribuer à des projets
            stimulants, tout en continuant à développer mes compétences.<br />
            Je suis aussi ouvert à des opportunités de formation et de
            développement professionnel.
          </p>
          <br />
        </div>
      </div>
      <br />
      <h3>Pourquoi moi ?</h3>
      <br />
      <ul>
        <li className="career-text">
          <strong>Motivation :</strong> Passionné par l'intégration web, je suis
          constamment à la recherche de nouveaux défis pour améliorer mes
          compétences.
        </li>
        <li className="career-text">
          <strong>Agilité :</strong> Je m'adapte rapidement aux nouvelles
          technologies et aux exigences des projets, assurant une intégration
          fluide dans n'importe quel environnement de travail.
        </li>
        <li className="career-text">
          <strong>Esprit d'équipe :</strong> Mon expérience professionnelle m'a
          permis de développer une aptitude marquée pour le travail en
          collaboration, favorisant ainsi le succès des projets communs.
        </li>
        <li className="career-text">
          <strong>Engagement et Persévérance :</strong> Je m'investis pleinement
          dans chaque projet, avec une détermination à atteindre les objectifs
          fixés et à dépasser les attentes.
        </li>
      </ul>
    </section>
  );
}

export default About;