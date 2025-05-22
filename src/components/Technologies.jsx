import React, { useEffect, useRef } from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import useAnimation from '../hooks/useAnimation';
import useWindowSize from '../hooks/useWindowSize';

function Technologies() {
  const { animationsEnabled } = useAnimation();
  const { isMobile, isTablet } = useWindowSize();

  // Fonction pour déterminer automatiquement le label basé sur le pourcentage
  const getSkillLabel = (level) => {
    if (level >= 80) return "Solide";
    if (level >= 70) return "Compétent";
    if (level >= 60) return "En cours";
    if (level >= 40) return "Débutant+";
    return "Découverte";
  };

  // Technologies avec une répartition plus cohérente
  const techSkills = [
    { name: "HTML", logo: "/assets/logos/html.svg", level: 80 },
    { name: "CSS", logo: "/assets/logos/css.svg", level: 75 },
    { name: "Sass", logo: "/assets/logos/sass.svg", level: 70 },
    { name: "JavaScript", logo: "/assets/logos/javascript.svg", level: 65 },
    { name: "React", logo: "/assets/logos/react.svg", level: 70 }
  ];

  const toolSkills = [
    { name: "Visual Studio Code", logo: "/assets/logos/vscode.svg", level: 80 },
    { name: "Git", logo: "/assets/logos/Git.svg", level: 70 },
    { name: "GitHub", logo: "/assets/logos/github.svg", level: 75 },
    { name: "Google Lighthouse", logo: "/assets/logos/google-lighthouse.svg", level: 80 },
    { name: "Wave", logo: "/assets/logos/wave.svg", level: 80 }
  ];

  // Composant pour afficher une barre de progression
  const SkillBar = ({ level }) => {
    const barRef = useRef(null);
    const label = getSkillLabel(level);
    
    // Fonction pour déterminer la couleur basée sur le niveau
    const getBarColor = (level) => {
      if (level >= 80) return "var(--gradient-skill-solid)";
      if (level >= 70) return "var(--gradient-skill-competent)";
      if (level >= 60) return "var(--gradient-skill-learning)";
      if (level >= 40) return "var(--gradient-skill-beginner)";
      return "var(--gradient-skill-discovery)";
    };
    
    useEffect(() => {
      const animateBar = () => {
        if (barRef.current) {
          if (animationsEnabled) {
            // Commence avec une largeur de 0
            barRef.current.style.width = '0%';
            barRef.current.style.background = getBarColor(level);
            
            // Déclenche l'animation après un court délai
            setTimeout(() => {
              if (barRef.current) {
                barRef.current.style.width = `${level}%`;
              }
            }, 300);
          } else {
            // Si animations désactivées, affiche directement la barre complète
            barRef.current.style.width = `${level}%`;
            barRef.current.style.background = getBarColor(level);
            barRef.current.style.transition = 'none';
          }
        }
      };
      
      const timer = setTimeout(() => {
        animateBar();
      }, 50);
      
      return () => clearTimeout(timer);
    }, [level]); // Suppression d'animationsEnabled des dépendances

    return (
      <div className="skill-level">
        <div className="skill-bar-container">
          <div 
            ref={barRef} 
            className="skill-bar" 
            style={{ 
              width: '0%',
              background: getBarColor(level)
            }}
          ></div>
        </div>
        <span className="skill-text">{label} ({level}%)</span>
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
      <SkillBar level={skill.level} />
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
      
      <h2>Technologies maîtrisées</h2>
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