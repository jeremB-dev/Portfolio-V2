import React from 'react';
import BackgroundAnimation from './BackgroundAnimation';
import useAnimation from '../hooks/useAnimation';
import useWindowSize from '../hooks/useWindowSize';
import { HashLink } from 'react-router-hash-link';

function About() {
  const { animationsEnabled } = useAnimation();
  const { isMobile, isTablet } = useWindowSize();

  const qualities = [
    {
      icon: "🚀",
      title: "Motivation",
      description: "Passionné par l'intégration web, je suis constamment à la recherche de nouveaux défis pour améliorer mes compétences."
    },
    {
      icon: "⚡",
      title: "Agilité", 
      description: "Je m'adapte rapidement aux nouvelles technologies et aux exigences des projets, assurant une intégration fluide dans n'importe quel environnement de travail."
    },
    {
      icon: "🤝",
      title: "Esprit d'équipe",
      description: "Mon expérience professionnelle m'a permis de développer une aptitude marquée pour le travail en collaboration, favorisant ainsi le succès des projets communs."
    },
    {
      icon: "🎯",
      title: "Engagement et Persévérance",
      description: "Je m'investis pleinement dans chaque projet, avec une détermination à atteindre les objectifs fixés et à dépasser les attentes."
    }
  ];

  return (
    <section id="about">
      {animationsEnabled && (
          <BackgroundAnimation 
            type="particles" 
            opacity={0.5}
            color="#53ba5f" 
            speed="slow"
            particleSize={6}
            particleCount={120}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        )}

      <div className="profile">
        <div className="profile-text">
          <h2 className="about-title">À propos de moi</h2>
          <p>
            Diplomé en développement web <br /> 
            et armé de nouvelles compétences et d'une motivation sans faille, je
            suis prêt à contribuer au succès d'une entreprise dynamique et
            innovante.<br />
            Mon parcours atypique et ma passion pour les technologies web me
            permettent d'apporter un regard neuf et une belle énergie à chaque
            projet.
          </p>
        </div>
        <div className="profile-photo-container">
          <img
            src="assets/Photo/photoMoi.webp"
            alt="Jérémy Brunel"
            className="profile-photo"
            width={300}
            height={300}
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
      <h3 className='qualities-title'>Pourquoi moi ?</h3>
      <br />
      <div className="qualities-grid">
        {qualities.map((quality, index) => (
          <div key={index} className="quality-card">
            <div className="quality-icon">{quality.icon}</div>
            <h4 className="quality-title">{quality.title}</h4>
            <p className="quality-description">{quality.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default About;