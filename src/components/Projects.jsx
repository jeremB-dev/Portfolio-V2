import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import BackgroundAnimation from './BackgroundAnimation';
import useAnimation from '../hooks/useAnimation';
import useWindowSize from '../hooks/useWindowSize';
import ProjectsFilter from './ProjectsFilter';

function Projects() {
  const { animationsEnabled } = useAnimation();
  const { isMobile, isTablet } = useWindowSize();
  const [activeFilter, setActiveFilter] = useState('All');

  const projects = [
    {
      id: 1,
      title: "Projet \"Oh my food\"",
      subtitle: "Un projet HTML avec Sass.",
      image: "assets/Photo/OhMyFood/Oh my food.webp",
      images: [
        "assets/Photo/OhMyFood/Oh my food.webp"
      ],
      description: `J'ai développé la partie front-end d'un site pour une architecte d'intérieur, ce projet inclut :
       La création d'une page dynamique présentant les travaux de l'architecte. 
       La gestion des événements utilisateurs et la manipulation du DOM en JavaScript. 
       Le développement d'une page de connexion et d'une modale pour uploader des médias.
       J'ai appris à communiquer avec une API, à gérer des formulaires et à tester les fonctionnalités avec un code back-end. 
       Ce projet m'a permis de consolider mes compétences en JavaScript pour les applications web modernes.`,
      technologies: ["HTML", "Sass"],
      github: "https://github.com/jeremB-dev/Ohmyfood",
      link: "/details/ohmyfood", 
    },
    {
      id: 2,
      title: "Projet \"Sophie Bluel Portefolio\"",
      subtitle: "Un projet JavaScript avec manipulation DOM et API",
      image: "assets/Photo/SophieBluel/SophieB1.webp",
      images: [
        "assets/Photo/SophieBluel/SophieB1.webp",
        "assets/Photo/SophieBluel/SophieB2.webp",
        "assets/Photo/SophieBluel/SophieB3.webp",
        "assets/Photo/SophieBluel/SophieB4.webp",
        "assets/Photo/SophieBluel/SophieB5.webp"
      ],
      description: `J'ai développé la partie front-end d'un site pour une architecte d'intérieur, ce projet inclut :
       La création d'une page dynamique présentant les travaux de l'architecte.
       La gestion des événements utilisateurs et la manipulation du DOM en JavaScript.
       Le développement d'une page de connexion et d'une modale pour uploader des médias.
       J'ai appris à communiquer avec une API, à gérer des formulaires et à tester les fonctionnalités avec un code back-end. 
       Ce projet m'a permis de consolider mes compétences en JavaScript pour les applications web modernes.`,
      technologies: ["HTML", "CSS", "JavaScript"],
      github: "https://github.com/jeremB-dev/Portfolio-architecte-sophie-bluel-master"
    },
    {
      id: 3,
      title: "Projet \"Nina Carducci\"",
      subtitle: "Un projet d'optimisation SEO et de debug",
      image: "assets/Photo/NinaCarducci/NC1.webp",
      images: [
        "assets/Photo/NinaCarducci/NC1.webp",
        "assets/Photo/NinaCarducci/NC2.webp",
        "assets/Photo/NinaCarducci/NC3.webp",
        "assets/Photo/NinaCarducci/NC4.webp",
        "assets/Photo/NinaCarducci/NC5.webp"
      ],
      description: `J'ai optimisé le site web d'une photographe professionnelle, ce projet inclut :
       L'amélioration du référencement avec les balises méta et Schema.org.
       L'optimisation des performances avec la compression et le redimensionnement des images.
       Le débogage et la correction des erreurs dans le code JavaScript existant.
       L'amélioration de l'accessibilité selon les normes WCAG.
       J'ai appris à utiliser les outils d'audit comme Lighthouse et Wave, à optimiser les performances d'un site web, et à implémenter les bonnes pratiques SEO. 
       Ce projet m'a permis de consolider mes compétences en débogage et en optimisation web.`,
      technologies: ["HTML", "CSS", "JavaScript", "SEO"],
      github: "https://github.com/jeremB-dev/Nina-Carducci"
    },
    {
      id: 4,
      title: "Projet \"Argent Bank\"",
      subtitle: "Une application React avec Redux et gestion d'API RESTful",
      image: "assets/Photo/ArgentBanck/AB1.webp",
      images: [
        "assets/Photo/ArgentBanck/AB1.webp",
        "assets/Photo/ArgentBanck/AB2.webp",
        "assets/Photo/ArgentBanck/AB3.webp",
        "assets/Photo/ArgentBanck/AB4.webp",
        "assets/Photo/ArgentBanck/AB5.webp"
      ],
      description: `J'ai développé la partie front-end d'une application bancaire, ce projet inclut :
       L'implémentation d'un système d'authentification avec JWT.
       La création d'un tableau de bord utilisateur avec les transactions.
       La gestion du state global de l'application avec Redux.
       Le développement de fonctionnalités de mise à jour du profil utilisateur.
       J'ai appris à gérer l'état global d'une application avec Redux, à sécuriser des routes avec JWT, et à documenter une API avec Swagger. 
       Ce projet m'a permis de consolider mes compétences en React et Redux pour les applications web modernes.`,
      technologies: ["HTML", "CSS", "JavaScript", "React", "Redux"],
      github: "https://github.com/jeremB-dev/ArgentBank-Frontend"
    }
  ];

  // Filtrer les projets
  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => 
        project.technologies.includes(activeFilter)
      );

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <section id="projects">
      {animationsEnabled && (
        <BackgroundAnimation 
          type="particles" 
          opacity={0.5}
          color="#53ba5f" 
          speed="fast"
          particleSize={10}
          particleCount={120}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}

      <h2>Mes projets</h2>
      
      <ProjectsFilter 
        projects={projects} 
        onFilterChange={handleFilterChange}
      />
      
      <div className="projects-grid">
        {filteredProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export default Projects;