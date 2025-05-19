import React, { useEffect, useRef } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import useAnimation from '../hooks/useAnimation';
import useWindowSize from '../hooks/useWindowSize';

function Technologies() {
  const { animationsEnabled } = useAnimation();
  const { isMobile, isTablet } = useWindowSize();

  // Définition des technologies avec leur niveau de maîtrise (pourcentage)
  const techSkills = [
    { name: "HTML", logo: "/assets/logos/html.svg", level: 90, label: "Confirmé" },
    { name: "CSS", logo: "/assets/logos/css.svg", level: 85, label: "Avancé" },
    { name: "Sass", logo: "/assets/logos/sass.svg", level: 85, label: "Avancé" },
    { name: "JavaScript", logo: "/assets/logos/javascript.svg", level: 75, label: "Compétent" },
    { name: "React", logo: "/assets/logos/react.svg", level: 65, label: "Compétent" }
  ];

  const toolSkills = [
    { name: "Visual Studio Code", logo: "/assets/logos/vscode.svg", level: 90, label: "Avancé" },
    { name: "Git", logo: "/assets/logos/Git.svg", level: 75, label: "Compétent" },
    { name: "GitHub", logo: "/assets/logos/github.svg", level: 75, label: "Compétent" },
    { name: "Google Lighthouse", logo: "/assets/logos/google-lighthouse.svg", level: 60, label: "Compétent" },
    { name: "Wave", logo: "/assets/logos/wave.svg", level: 50, label: "Compétent" }
  ];

  // Composant pour afficher une barre de progression avec vérification de null
  const SkillBar = ({ level, label }) => {
    const barRef = useRef(null);
    
    useEffect(() => {
      // Animation de la barre au chargement avec vérification de sécurité
      const animateBar = () => {
        if (barRef.current) {
          // Commence avec une largeur de 0
          barRef.current.style.width = '0%';
          
          // Déclenche l'animation après un court délai
          setTimeout(() => {
            // Vérification supplémentaire pour s'assurer que barRef.current existe toujours
            if (barRef.current) {
              barRef.current.style.width = `${level}%`;
            }
          }, 300);
        }
      };
      
      // Retarde légèrement l'animation pour s'assurer que le DOM est prêt
      const timer = setTimeout(() => {
        animateBar();
      }, 50);
      
      // Nettoyage du timer
      return () => clearTimeout(timer);
    }, [level]);

    return (
      <div className="skill-level">
        <div className="skill-bar-container">
          <div ref={barRef} className="skill-bar" style={{ width: '0%' }}></div>
        </div>
        <span className="skill-text">{label}</span>
      </div>
    );
  };

  // Composant pour afficher une compétence
  const SkillItem = ({ skill }) => (
    <li>
      <div className="skill-content">
        <img
          src={skill.logo}
          alt={`logo techno ${skill.name}`}
          className="tech-logo"
          loading="lazy"
          width="64"
          height="64"
        />
        <p>{skill.name}</p>
      </div>
      <SkillBar level={skill.level} label={skill.label} />
    </li>
  );

  return (
    <section id="technologies">
      {animationsEnabled && (
        <BackgroundAnimation 
          type="particles" 
          opacity={0.6}
          color="#53ba5f" 
          speed="fast"
          particleSize={14}
          particleCount={120}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}
      <h2>Technologies apprises</h2>
      <ul>
        {techSkills.map((skill, index) => (
          <SkillItem key={index} skill={skill} />
        ))}
      </ul>
      <h2>Outils et plateformes</h2>
      <ul>
        {toolSkills.map((skill, index) => (
          <SkillItem key={index} skill={skill} />
        ))}
      </ul>
    </section>
  );
}

export default Technologies;