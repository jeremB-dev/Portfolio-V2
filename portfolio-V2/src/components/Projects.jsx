import React from 'react';
import ProjectCard from './ProjectCard';
import BackgroundAnimation from './BackgroundAnimation';
import useAnimation from '../hooks/useAnimation';
import useWindowSize from '../hooks/useWindowSize';

function Projects() {
  const { animationsEnabled } = useAnimation();
  const { isMobile, isTablet } = useWindowSize();

  const projects = [
    {
      id: 1,
      title: "Projet \"Oh my food\"",
      subtitle: "Un projet HTML avec Sass.",
      image: "assets/Captures/ohmyfood/home.webp",
      description: `J'ai dévelopé la partie front-end d'un site pour une architecte d'intérieur.\nCe projet inclut :\n- La création d'une page dynamique présentant les travaux de l'architecte.\n- La gestion des événements utilisateurs et la manipulation du DOM en JavaScript.\n- Le développement d'une page de connexion et d'une modale pour uploader des médias.\n\nJ'ai appris à communiquer avec une API, à gérer des formulaires et à tester les fonctionnalités avec un code back-end. Ce projet m'a permis de consolider mes compétences en JavaScript pour les applications web modernes.`,
      technologies: ["html", "sass"],
      github: "https://github.com/jeremB-dev/Ohmyfood",
      link: "/details/ohmyfood", 
    },
    {
      id: 2,
      title: "Projet \"Sophie Bluel Portefolio\"",
      subtitle: "Un projet JavaScript avec manipulation DOM et API",
      image: "assets/Captures/sophieBluel/sophieBluel.webp",
      description: `J'ai développé la partie front-end d'un site pour une architecte d'intérieur.\nCe projet inclut :\n- La création d'une page dynamique présentant les travaux de l'architecte.\n- La gestion des événements utilisateurs et la manipulation du DOM en JavaScript.\n- Le développement d'une page de connexion et d'une modale pour uploader des médias.\n\nJ'ai appris à communiquer avec une API, à gérer des formulaires et à tester les fonctionnalités avec un code back-end.\nCe projet m'a permis de consolider mes compétences en JavaScript pour les applications web modernes.`,
      technologies: ["html", "css", "javascript"],
      github: "https://github.com/jeremB-dev/Portfolio-architecte-sophie-bluel-master"
    },
    {
      id: 3,
      title: "Projet \"Nina Carducci\"",
      subtitle: "Un projet d'optimisation SEO et de debug",
      image: "assets/Captures/ninaCarducci/ninaCarducci.webp",
      description: `J'ai optimisé le site web d'une photographe professionnelle.\nCe projet inclut :\n- L'amélioration du référencement avec les balises méta et Schema.org.\n- L'optimisation des performances avec la compression et le redimensionnement des images.\n- Le débogage et la correction des erreurs dans le code JavaScript existant.\n- L'amélioration de l'accessibilité selon les normes WCAG.\n\nJ'ai appris à utiliser les outils d'audit comme Lighthouse et Wave, à optimiser les performances d'un site web, et à implémenter les bonnes pratiques SEO. Ce projet m'a permis de consolider mes compétences en débogage et en optimisation web.`,
      technologies: ["html", "css", "javascript", "google-lighthouse"],
      github: "https://github.com/jeremB-dev/Nina-Carducci"
    },
    {
      id: 4,
      title: "Projet \"Argent Bank\"",
      subtitle: "Une application React avec Redux et gestion d'API RESTful",
      image: "assets/Captures/argenBank/argentBank.webp",
      description: `J'ai développé la partie front-end d'une application bancaire.\nCe projet inclut :\n- L'implémentation d'un système d'authentification avec JWT.\n- La création d'un tableau de bord utilisateur avec les transactions.\n- La gestion du state global de l'application avec Redux.\n- Le développement de fonctionnalités de mise à jour du profil utilisateur.\n\nJ'ai appris à gérer l'état global d'une application avec Redux, à sécuriser des routes avec JWT, et à documenter une API avec Swagger. Ce projet m'a permis de consolider mes compétences en React et Redux pour les applications web modernes.`,
      technologies: ["html", "css", "javascript", "react", "redux"],
      github: "https://github.com/jeremB-dev/ArgentBank-Frontend"
    }
  ];

  return (
    <section id="projects">
      {animationsEnabled && (
        <BackgroundAnimation 
          type="particles" 
          opacity={0.5}
          color="#53ba5f" 
          speed="fast"
          particleSize={10}
          particleCount={120} // Sera automatiquement réduit à environ 15 sur mobile
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}

      <h2>Mes projets</h2>
      <div className="projects-grid">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;