// src/components/AIAssistant.jsx - Version corrigée sans erreurs de syntaxe
import React, { useState, useEffect, useRef, useCallback } from "react";
import { FaRobot, FaTimes, FaPaperPlane, FaTrash } from "react-icons/fa";
import useTheme from "../hooks/useTheme";
import useWindowSize from "../hooks/useWindowSize";

const KNOWLEDGE_BASE = {
  projets: {
    content:
      "💼 Jérémy a développé 5 projets principaux : ce portfolio (React/IA), Ohmyfood (HTML/Sass), Sophie Bluel (JS/API), Nina Carducci (SEO), et ArgentBank (React/Redux).<br />Une belle progression du HTML vers React ! Quel projet t'intéresse ?",
    keywords: [
      "projet",
      "projets",
      "réalisation",
      "réalisations",
      "développement",
      "application",
      "site",
      "app",
      "créations",
      "travaux",
      "œuvres",
      "conception",
      "création",
      "portfolio",
      "démo",
      "exemple",
    ],
    priority: 8,
  },
  portfolio: {
    content:
      "🚀 <strong>Portfolio V2</strong> - Le site que tu consultes actuellement !<br /><br />🔧 <strong>Technologies :</strong> React 18, Vite, JavaScript ES6+<br />✨ <strong>Fonctionnalités :</strong> Système de thèmes, animations, analytics, et cet assistant IA<br />🎯 <strong>Objectif :</strong> Démontrer les compétences modernes et l'innovation",
    keywords: ["portfolio", "site", "portfolio v2", "ce site", "ce portfolio"],
    priority: 8,
  },
  ohmyfood: {
    content:
      "🍽️ <strong>Ohmyfood</strong> - Site de réservation gastronomique<br /><br />🔧 <strong>Technologies :</strong> HTML5, Sass, CSS3, animations<br />📱 <strong>Features :</strong> Design responsive, animations CSS créatives, interface mobile-first<br />🎯 <strong>Challenge :</strong> Intégration fidèle des maquettes Figma avec animations fluides",
    keywords: ["ohmyfood", "oh my food", "restaurant", "gastronomique"],
    priority: 8,
  },
  "sophie-bluel": {
    content:
      "🏠 <strong>Sophie Bluel - Architecte</strong> - Portfolio d'architecte interactif<br /><br />🔧 <strong>Technologies :</strong> JavaScript vanilla, API REST, manipulation DOM<br />🔐 <strong>Features :</strong> Système d'authentification, gestion de galerie, CRUD complet<br />🎯 <strong>Challenge :</strong> Interface d'administration dynamique sans framework",
    keywords: ["sophie bluel", "sophie", "bluel", "architecte", "sophie-bluel"],
    priority: 8,
  },
  "nina-carducci": {
    content:
      "📸 <strong>Nina Carducci</strong> - Optimisation SEO d'un site de photographe<br /><br />🔧 <strong>Technologies :</strong> Lighthouse, SEO, optimisation performance<br />📊 <strong>Résultats :</strong> Score Lighthouse 95+, amélioration vitesse de chargement<br />🎯 <strong>Challenge :</strong> Optimisation complète pour le référencement et les performances",
    keywords: ["nina carducci", "nina", "carducci", "photographe", "seo"],
    priority: 8,
  },
  argentbank: {
    content:
      "🏦 <strong>ArgentBank</strong> - Application bancaire sécurisée<br /><br />🔧 <strong>Technologies :</strong> React, Redux, JWT, API REST<br />🔐 <strong>Features :</strong> Authentification sécurisée, gestion de profil, tableau de bord<br />🎯 <strong>Challenge :</strong> Architecture Redux complexe avec gestion d'état globale",
    keywords: ["argentbank", "argent bank", "banque", "bancaire"],
    priority: 8,
  },
  github: {
    content:
      '📊 Repositories GitHub de Jérémy : Portfolio-V2 (React/Vite), Ohmyfood (HTML/Sass), Sophie Bluel (JS/API), Nina Carducci (SEO), ArgentBank (React/Redux).<br /><br />🔗 Profil : <a href="https://github.com/jeremB-dev" target="_blank" rel="noopener noreferrer"><strong>github.com/jeremB-dev</strong></a>',
    keywords: [
      "github",
      "git",
      "repo",
      "repository",
      "repositories",
      "code source",
      "dépôt",
      "commit",
      "source code",
      "hub",
    ],
    priority: 9,
  },
  competences: {
    content:
      '🛠️ Tu peux découvrir toutes les technologies utilisées par Jérémy dans la <a href="/technologies" target="_blank" rel="noopener noreferrer"><strong>page Technologies</strong></a> de son portfolio.',
    keywords: [
      "compétence",
      "compétences",
      "skill",
      "skills",
      "technologie",
      "technologies",
      "stack",
      "langage",
      "langages",
      "outil",
      "outils",
      "maîtrise",
      "expertise",
      "technique",
      "react",
      "javascript",
      "css",
    ],
    priority: 7,
  },
  formation: {
    content:
      "🎓 Jérémy a un diplôme d'intégrateur web et suit actuellement une formation développeur web et IA en alternance.<br />Il combine théorie et pratique pour maîtriser les technologies modernes.",
    keywords: [
      "formation",
      "formations",
      "étude",
      "études",
      "alternance",
      "école",
      "apprentissage",
      "diplôme",
      "cursus",
      "parcours scolaire",
      "éducation",
      "certification",
    ],
    priority: 6,
  },
  contact: {
    content:
      '📩 Tu peux contacter Jérémy par <a href="mailto:jeremybrunel.dev@gmail.com" rel="noopener noreferrer"><strong>email</strong></a>, <a href="https://www.linkedin.com/in/jeremy-brunel" rel="noopener noreferrer"><strong>LinkedIn</strong></a>, ou via la page <a href="/contact" rel="noopener noreferrer"><strong>page Contact</strong></a> du site.<br />Il assure une réponse sans délai !',
    keywords: [
      "contact",
      "contacter",
      "email",
      "mail",
      "linkedin",
      "joindre",
      "écrire",
      "message",
      "formulaire",
      "appeler",
      "téléphone",
      "communication",
    ],
    priority: 9,
  },
  ia: {
    content:
      "🤖 Jérémy se forme en IA et a créé cet assistant pour montrer ses compétences.<br />Il étudie les APIs d'IA, le machine learning, et développe des projets pratiques.",
    keywords: [
      "ia",
      "intelligence artificielle",
      "ai",
      "machine learning",
      "ml",
      "assistant",
      "bot",
      "chatbot",
      "artificiel",
      "algorithme",
    ],
    priority: 8,
  },
  alternance: {
    content:
      "🔍 Jérémy cherche une alternance développeur web et IA dès octobre 2025.<br />24 mois, région <strong>Bordeaux</strong>, avec un focus sur l'innovation et l'apprentissage.",
    keywords: [
      "alternance",
      "alternances",
      "stage",
      "recherche",
      "contrat",
      "entreprise",
      "rqth",
      "apprentissage",
      "recrutement",
      "candidature",
      "embauche",
      "disponible",
      "cherche",
    ],
    priority: 9,
  },
  reconversion: {
    content:
      "🌟 Jérémy s'est reconverti de la logistique vers le développement web par passion pour la tech.<br />Il apporte une vraie maturité professionnelle et une motivation solide.",
    keywords: [
      "reconversion",
      "passion",
      "changement",
      "motivation",
      "transition",
      "pourquoi",
      "logistique",
      "ancien métier",
      "parcours",
    ],
    priority: 7,
  },
  age: {
    content:
      "🎂 Jérémy a 43 ans et assume pleinement sa reconversion.<br />Grâce à sa RQTH, il peut faire une alternance sans limite d'âge - un vrai atout !",
    keywords: ["âge", "age", "ans", "vieux", "jeune", "maturité"],
    priority: 5,
  },
  RQTH: {
    content:
      "🔍 Jérémy a une RQTH et a choisi de poursuivre son apprentissage en alternance.<br />Il est dynamique, autonome, et a une grande capacité d'apprentissage.",
    keywords: [
      "rqth",
      "RQTH",
      "handicap",
      "handicape",
      "handicaps",
      "handicapes",
    ],
    priority: 6,
  },
  metier: {
    content:
      "🎓 Jérémy est en formation développeur web et IA, développe des projets React, et cherche une alternance pour octobre 2025.<br />Il combine formation théorique et projets pratiques.",
    keywords: [
      "métier",
      "travail",
      "fait",
      "que fait",
      "profession",
      "activité",
      "occupe",
    ],
    priority: 8,
  },
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Salut ! Je suis l'assistant IA de Jérémy !<br /><br />🔍 Je peux te parler de ses projets, compétences, ou recherche d'alternance.",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastReadMessageCount, setLastReadMessageCount] = useState(1);
  const [lastTopic, setLastTopic] = useState("");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const { darkMode } = useTheme();
  const { isMobile, isTablet } = useWindowSize();

  // Fonction de normalisation du texte
  const normalizeText = useCallback((text) => {
    return (
      text
        .toLowerCase()
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/jeremy/g, "jeremy")
        .replace(/jéremy/g, "jeremy")
        .replace(/jeremie/g, "jeremy")
        .replace(/jéremie/g, "jeremy")
        .replace(/projets?/g, "projet")
        .replace(/compétences?/g, "competence")
        .replace(/competences?/g, "competence")
        .replace(/technologies?/g, "technologie")
        .replace(/alternances?/g, "alternance")
        .replace(/formations?/g, "formation")
        .replace(/habites?/g, "habite")
        .replace(/travailles?/g, "travaille")
        .replace(/cherches?/g, "cherche")
        .replace(/recherches?/g, "recherche")
        .replace(/qu'est[- ]ce/g, "quest")
        .replace(/qu'est-ce/g, "quest")
        .replace(/quest-ce/g, "quest")
        .replace(/questce/g, "quest")
        .replace(/que fait/g, "que fait")
        .replace(/quest fait/g, "que fait")
        .replace(/fait quoi/g, "fait quoi")
        // Noms de projets spécifiques
        .replace(/oh my food/g, "ohmyfood")
        .replace(/argent bank/g, "argentbank")
        .replace(/sophie-bluel/g, "sophie bluel")
        .replace(/nina-carducci/g, "nina carducci")
        .replace(/portfolio v2/g, "portfolio")
        .replace(/portfolio-v2/g, "portfolio")
        // Autres normalizations
        .replace(/d'ou/g, "dou")
        .replace(/d ou/g, "dou")
        .replace(/ou il/g, "ou")
        .replace(/il fait/g, "fait")
        .replace(/il cherche/g, "cherche")
        .replace(/il habite/g, "habite")
        .replace(/il travaille/g, "travaille")
        .replace(/il a/g, "a")
        .replace(/developement/g, "developpement")
        .replace(/dévelopement/g, "developpement")
        .replace(/dévellopement/g, "developpement")
        .replace(/programation/g, "programmation")
        .replace(/programm?ation/g, "programmation")
        .replace(/reactjs/g, "react")
        .replace(/react\.js/g, "react")
        .replace(/javascript/g, "js")
        .replace(/java script/g, "js")
        .replace(/github/g, "git")
        .replace(/git hub/g, "git")
    );
  }, []);

  // Fonction de correspondance améliorée mais simplifiée
  const findBestMatch = useCallback(
    (input) => {
      try {
        const normalizedInput = normalizeText(input);
        console.log("🔍 findBestMatch - input normalisé:", normalizedInput);

        // Correspondances simples et directes
        const simpleMatches = {
          projets: [
            "projet",
            "projets",
            "realisation",
            "creation",
            "app",
            "site",
            "portfolio general",
            "tous les projets",
          ],
          portfolio: [
            "portfolio",
            "ce site",
            "ce portfolio",
            "portfolio v2",
            "site actuel",
          ],
          ohmyfood: ["ohmyfood", "oh my food", "restaurant", "gastronomique"],
          "sophie-bluel": [
            "sophie bluel",
            "sophie",
            "bluel",
            "architecte",
            "sophie-bluel",
          ],
          "nina-carducci": [
            "nina carducci",
            "nina",
            "carducci",
            "photographe",
            "seo",
          ],
          argentbank: ["argentbank", "argent bank", "banque", "bancaire"],
          competences: [
            "competence",
            "competences",
            "skill",
            "skills",
            "technologie",
            "stack",
            "react",
            "js",
          ],
          alternance: [
            "alternance",
            "stage",
            "recherche",
            "cherche",
            "emploi",
            "job",
            "travail",
          ],
          formation: [
            "formation",
            "etude",
            "ecole",
            "diplome",
            "cursus",
            "apprentissage",
          ],
          contact: [
            "contact",
            "contacter",
            "email",
            "mail",
            "linkedin",
            "joindre",
          ],
          github: ["git", "github", "repo", "repository", "code", "source"],
          age: ["age", "ans", "vieux", "jeune", "maturite"],
          lieu: [
            "habite",
            "region",
            "ville",
            "bordeaux",
            "ou",
            "vient",
            "origine",
          ],
        };

        let bestMatch = null;
        let highestScore = 0;

        for (const [topic, keywords] of Object.entries(simpleMatches)) {
          let score = 0;

          for (const keyword of keywords) {
            if (normalizedInput.includes(keyword)) {
              score += keyword.length * 2;
            }
          }

          if (score > highestScore && score > 5) {
            highestScore = score;
            if (KNOWLEDGE_BASE[topic]) {
              bestMatch = { key: topic, score, data: KNOWLEDGE_BASE[topic] };
            }
          }
        }

        console.log("🔍 findBestMatch - meilleur match:", bestMatch);
        return bestMatch;
      } catch (error) {
        console.error("❌ Erreur dans findBestMatch:", error);
        return null;
      }
    },
    [normalizeText]
  );

  const trackAIInteraction = useCallback(
    (action, data = {}) => {
      try {
        const isOwner =
          localStorage.getItem("jeremy-portfolio-owner") === "true";
        if (!isOwner && window.sa_event) {
          window.sa_event("ai_interaction", { action, darkMode, ...data });
        }
      } catch {
        // Ignorer les erreurs d'analytics
      }
    },
    [darkMode]
  );

  const getAIResponse = useCallback(
    (userMessage) => {
      try {
        const normalizedMsg = normalizeText(userMessage);

        // Debug console pour voir ce qui se passe
        console.log("🔍 Message original:", userMessage);
        console.log("🔍 Message normalisé:", normalizedMsg);

        const match = findBestMatch(userMessage);
        console.log("🔍 Match trouvé:", match);

        if (match && match.score > 8) {
          console.log("✅ Match valide, score:", match.score);
          setLastTopic(match.key);
          return match.data.content;
        }

        // Réponses spécifiques - ordre important !
        if (
          normalizedMsg.includes("jeremy") &&
          (normalizedMsg.includes("fait") ||
            normalizedMsg.includes("fait quoi") ||
            normalizedMsg.includes("quest fait"))
        ) {
          console.log("✅ Réponse spécifique: que fait jeremy");
          setLastTopic("metier");
          return "🎓 Jérémy est en formation développeur web et IA, développe des projets React, et cherche une alternance pour octobre 2025.<br />Il combine formation théorique et projets pratiques.";
        }

        if (
          normalizedMsg.includes("jeremy") &&
          (normalizedMsg.includes("qui") || normalizedMsg.includes("quest"))
        ) {
          console.log("✅ Réponse spécifique: qui est jeremy");
          setLastTopic("");
          return "👨‍💻 Jérémy est développeur web diplômé, reconverti de la logistique par passion.<br />Il a 4 projets concrets et cherche une alternance développeur web et IA.";
        }

        if (normalizedMsg.includes("react")) {
          console.log("✅ Réponse spécifique: react");
          setLastTopic("competences");
          return "⚛️ Jérémy utilise React 18 pour construire ce portfolio. Il a aussi travaillé sur un projet complexe avec Redux (ArgentBank).";
        }

        if (
          normalizedMsg.includes("javascript") ||
          normalizedMsg.includes("js")
        ) {
          console.log("✅ Réponse spécifique: javascript");
          setLastTopic("competences");
          return "📜 Jérémy maîtrise JavaScript ES6+ et l'utilise dans plusieurs projets, notamment Sophie Bluel (manipulation DOM) et ArgentBank (React).";
        }

        if (
          lastTopic === "competences" &&
          (normalizedMsg.startsWith("et ") ||
            normalizedMsg.includes("niveau") ||
            normalizedMsg.includes("react"))
        ) {
          console.log("✅ Réponse spécifique: niveau React");
          setLastTopic("competences");
          return '⚛️ Pour en savoir plus sur les technologies de Jérémy, rends-toi sur la <a href="/technologies" target="_blank" rel="noopener noreferrer">page dédiée</a>.';
        }

        if (
          normalizedMsg.includes("projet") ||
          normalizedMsg.includes("projets") ||
          normalizedMsg.includes("realisation")
        ) {
          console.log("✅ Réponse spécifique: projets");
          setLastTopic("projets");
          return "💼 Jérémy a développé 5 projets principaux : ce portfolio (React/IA), Ohmyfood (HTML/Sass), Sophie Bluel (JS/API), Nina Carducci (SEO), et ArgentBank (React/Redux).<br />Une belle progression du HTML vers React ! Quel projet t'intéresse ?";
        }

        // Détection des projets spécifiques
        if (
          normalizedMsg.includes("portfolio") ||
          normalizedMsg.includes("ce site") ||
          normalizedMsg.includes("portfolio v2")
        ) {
          console.log("✅ Réponse spécifique: portfolio");
          setLastTopic("portfolio");
          return "🚀 <strong>Portfolio V2</strong> - Le site que tu consultes actuellement !<br /><br />🔧 <strong>Technologies :</strong> React 18, Vite, JavaScript ES6+<br />✨ <strong>Fonctionnalités :</strong> Système de thèmes, animations, analytics, et cet assistant IA<br />🎯 <strong>Objectif :</strong> Démontrer les compétences modernes et l'innovation";
        }

        if (
          normalizedMsg.includes("ohmyfood") ||
          normalizedMsg.includes("oh my food")
        ) {
          console.log("✅ Réponse spécifique: ohmyfood");
          setLastTopic("ohmyfood");
          return "🍽️ <strong>Ohmyfood</strong> - Site de réservation gastronomique<br /><br />🔧 <strong>Technologies :</strong> HTML5, Sass, CSS3, animations<br />📱 <strong>Features :</strong> Design responsive, animations CSS créatives, interface mobile-first<br />🎯 <strong>Challenge :</strong> Intégration fidèle des maquettes Figma avec animations fluides";
        }

        if (
          normalizedMsg.includes("sophie") ||
          normalizedMsg.includes("bluel") ||
          normalizedMsg.includes("architecte")
        ) {
          console.log("✅ Réponse spécifique: sophie bluel");
          setLastTopic("sophie-bluel");
          return "🏠 <strong>Sophie Bluel - Architecte</strong> - Portfolio d'architecte interactif<br /><br />🔧 <strong>Technologies :</strong> JavaScript vanilla, API REST, manipulation DOM<br />🔐 <strong>Features :</strong> Système d'authentification, gestion de galerie, CRUD complet<br />🎯 <strong>Challenge :</strong> Interface d'administration dynamique sans framework";
        }

        if (
          normalizedMsg.includes("nina") ||
          normalizedMsg.includes("carducci") ||
          normalizedMsg.includes("photographe")
        ) {
          console.log("✅ Réponse spécifique: nina carducci");
          setLastTopic("nina-carducci");
          return "📸 <strong>Nina Carducci</strong> - Optimisation SEO d'un site de photographe<br /><br />🔧 <strong>Technologies :</strong> Lighthouse, SEO, optimisation performance<br />📊 <strong>Résultats :</strong> Score Lighthouse 95+, amélioration vitesse de chargement<br />🎯 <strong>Challenge :</strong> Optimisation complète pour le référencement et les performances";
        }

        if (
          normalizedMsg.includes("argent") ||
          normalizedMsg.includes("bank") ||
          normalizedMsg.includes("bancaire")
        ) {
          console.log("✅ Réponse spécifique: argentbank");
          setLastTopic("argentbank");
          return "🏦 <strong>ArgentBank</strong> - Application bancaire sécurisée<br /><br />🔧 <strong>Technologies :</strong> React, Redux, JWT, API REST<br />🔐 <strong>Features :</strong> Authentification sécurisée, gestion de profil, tableau de bord<br />🎯 <strong>Challenge :</strong> Architecture Redux complexe avec gestion d'état globale";
        }

        if (
          normalizedMsg.includes("alternance") ||
          normalizedMsg.includes("recherche") ||
          normalizedMsg.includes("cherche")
        ) {
          console.log("✅ Réponse spécifique: alternance");
          setLastTopic("alternance");
          return "🔍 Jérémy cherche une alternance développeur web et IA dès octobre 2025.<br />12-24 mois, région Bordeaux, avec un focus sur l'innovation et l'apprentissage.";
        }

        if (
          normalizedMsg.includes("contact") ||
          normalizedMsg.includes("contacter") ||
          normalizedMsg.includes("email")
        ) {
          console.log("✅ Réponse spécifique: contact");
          setLastTopic("contact");
          return '📩 Tu peux contacter Jérémy par <a href="mailto:jeremybrunel.dev@gmail.com" target="_blank" rel="noopener noreferrer"><strong>email</strong></a>, <a href="https://www.linkedin.com/in/jeremy-brunel" target="_blank" rel="noopener noreferrer"><strong>LinkedIn</strong></a>, ou via la page Contact du site.<br />Il répond rapidement !';
        }

        if (
          normalizedMsg.includes("formation") ||
          normalizedMsg.includes("etude") ||
          normalizedMsg.includes("diplome")
        ) {
          console.log("✅ Réponse spécifique: formation");
          setLastTopic("formation");
          return "🎓 Jérémy a un diplôme d'intégrateur web et suit actuellement une formation développeur web et IA en alternance.<br />Il combine théorie et pratique pour maîtriser les technologies modernes.";
        }

        if (
          normalizedMsg.includes("github") ||
          normalizedMsg.includes("git") ||
          normalizedMsg.includes("repo")
        ) {
          console.log("✅ Réponse spécifique: github");
          setLastTopic("github");
          return '📊 Repositories GitHub de Jérémy : Portfolio-V2 (React/Vite), Ohmyfood (HTML/Sass), Sophie Bluel (JS/API), Nina Carducci (SEO), ArgentBank (React/Redux).<br /><br />🔗 Profil : <a href="https://github.com/jeremB-dev" target="_blank" rel="noopener noreferrer"><strong>github.com/jeremB-dev</strong></a>';
        }

        if (
          normalizedMsg.includes("reconversion") ||
          normalizedMsg.includes("ancien emploi") ||
          normalizedMsg.includes("précédent travail") ||
          normalizedMsg.includes("travaillait avant")
        ) {
          console.log("✅ Réponse spécifique: ancien emploi");
          setLastTopic("ancien_emploi");
          return "🏢 Avant de se reconvertir dans le développement web, Jérémy travaillait dans le domaine de la logistique. Cette expérience lui a apporté une grande rigueur et une capacité d'organisation qui sont des atouts majeurs dans son nouveau parcours professionnel.";
        }

        if (
          normalizedMsg.includes("age") ||
          normalizedMsg.includes("ans") ||
          normalizedMsg.includes("vieux") ||
          normalizedMsg.includes("jeune")
        ) {
          console.log("✅ Réponse spécifique: age");
          setLastTopic("age");
          return "🎂 Jérémy a 43 ans et assume pleinement sa reconversion.<br />Sa RQTH lui permet de faire une alternance sans limite d'âge - un vrai atout !";
        }

        if (
          normalizedMsg.includes("rqth") ||
          normalizedMsg.includes("RQTH") ||
          normalizedMsg.includes("handicap") ||
          normalizedMsg.includes("handicape") ||
          normalizedMsg.includes("handicaps") ||
          normalizedMsg.includes("handicapes")
        ) {
          console.log("✅ Réponse spécifique: RQTH");
          setLastTopic("RQTH");
          return "🔍 Jérémy bénéficie d'une RQTH (Reconnaissance de la Qualité de Travailleur Handicapé). Cela ne limite en rien ses capacités mais lui permet de bénéficier d'opportunités d'alternance sans limite d'âge, renforçant ainsi sa perspective unique dans son travail.";
        }

        if (
          normalizedMsg.includes("habite") ||
          normalizedMsg.includes("region") ||
          normalizedMsg.includes("ville") ||
          normalizedMsg.includes("bordeaux")
        ) {
          console.log("✅ Réponse spécifique: localisation");
          setLastTopic("lieu");
          return "🌍 Jérémy habite dans la région de Bordeaux et cherche une alternance localement.<br />Il est ouvert au télétravail selon l'organisation de l'entreprise.";
        }

        if (
          normalizedMsg.includes("salut") ||
          normalizedMsg.includes("bonjour") ||
          normalizedMsg.includes("hello")
        ) {
          console.log("✅ Réponse spécifique: salutation");
          setLastTopic("");
          return "👋 Salut ! Je peux te parler des projets de Jérémy, sa reconversion, ou ses compétences techniques.<br />Qu'est-ce qui t'intéresse ?";
        }

        if (
          normalizedMsg.includes("merci") ||
          normalizedMsg.includes("thank")
        ) {
          console.log("✅ Réponse spécifique: remerciement");
          setLastTopic("");
          return "😊 Avec plaisir ! Jérémy sera ravi de savoir que son portfolio t'intéresse.<br />N'hésite pas à le contacter directement !";
        }

        console.log("✅ Réponse par défaut utilisée");
        return "🤔 Je peux te parler de ses projets, son parcours, ses compétences techniques, ou sa recherche d'alternance. Une question ?";
      } catch (error) {
        console.error("❌ ERREUR dans getAIResponse:", error);
        console.error("❌ Message qui a causé l'erreur:", userMessage);
        return "🤔 Je peux te parler de ses projets, compétences, ou recherche d'alternance. Que veux-tu savoir ?";
      }
      // (Unreachable fallback removed)
    },
    [normalizeText, findBestMatch, lastTopic]
  );

  const getDynamicSuggestions = () => {
    console.log("📋 Suggestions pour le topic:", lastTopic);

    switch (lastTopic) {
      case "projets":
        return [
          { text: "ArgentBank", query: "Projet ArgentBank" },
          { text: "Ohmyfood", query: "Ohmyfood" },
          { text: "Sophie Bluel", query: "Sophie Bluel" },
          { text: "Nina Carducci", query: "Nina Carducci" },
          { text: "Portfolio", query: "Ce portfolio" },
        ];

      case "portfolio":
        return [
          { text: "Technologies", query: "Ses compétences" },
          { text: "Autres projets", query: "Ses projets" },
          { text: "GitHub", query: "GitHub" },
        ];

      case "ohmyfood":
        return [
          { text: "ArgentBank", query: "Projet ArgentBank" },
          { text: "Technologies", query: "Ses compétences" },
          { text: "Autres projets", query: "Ses projets" },
        ];

      case "sophie-bluel":
        return [
          { text: "Nina Carducci", query: "Nina Carducci" },
          { text: "Technologies", query: "Ses compétences" },
          { text: "Autres projets", query: "Ses projets" },
        ];

      case "nina-carducci":
        return [
          { text: "Portfolio", query: "Ce portfolio" },
          { text: "SEO", query: "Ses compétences" },
          { text: "Autres projets", query: "Ses projets" },
        ];

      case "argentbank":
        return [
          { text: "React/Redux", query: "Ses compétences" },
          { text: "Portfolio", query: "Ce portfolio" },
          { text: "Autres projets", query: "Ses projets" },
        ];

      case "competences":
        return [
          { text: "Projets", query: "Ses projets" },
          { text: "Formation", query: "Sa formation" },
        ];

      case "alternance":
        return [
          { text: "Localisation", query: "Où habite jeremy ?" },
          { text: "Projets", query: "Ses projets" },
          { text: "Reconversion", query: "Sa reconversion" },
          { text: "âge", query: "Quel âge a Jérémy ?" },
          { text: "RQTH", query: "rqth ?" },
        ];

      case "github":
        return [
          { text: "ArgentBank", query: "Projet ArgentBank" },
          { text: "Ohmyfood", query: "Ohmyfood" },
          { text: "Portfolio", query: "Ce portfolio" },
        ];

      default:
        return [
          { text: "Projets", query: "Ses projets" },
          { text: "Compétences", query: "Ses compétences" },
          { text: "Alternance", query: "Sa recherche" },
          { text: "Contact", query: "Le contacter" },
        ];
    }
  };

  const fillSuggestion = (query) => {
    if (isTyping) return;
    setInput(query);
  };

  const handleSend = useCallback(() => {
    if (!input.trim() || isTyping) return;

    console.log("🚀 Envoi du message:", input.trim());

    const userMessage = {
      role: "user",
      content: input.trim(),
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");
    setIsTyping(true);

    trackAIInteraction("message_sent", {
      message: currentInput,
      topic: lastTopic,
      message_length: currentInput.length,
    });

    // Délai plus court et fixe pour éviter les problèmes
    const delay = 800; // Délai fixe de 800ms

    // Une seule exécution avec un flag de protection
    let responseProcessed = false;

    setTimeout(() => {
      // Protection contre la double exécution
      if (responseProcessed) {
        console.log("⚠️ Double exécution évitée");
        return;
      }
      responseProcessed = true;

      try {
        console.log("🔄 Génération de la réponse...");
        const aiResponse = getAIResponse(currentInput);
        console.log("✅ Réponse générée:", aiResponse);

        if (!aiResponse || aiResponse.trim() === "") {
          throw new Error("Réponse vide générée");
        }

        const assistantMessage = {
          role: "assistant",
          content: aiResponse,
          timestamp: Date.now(),
        };

        setMessages((prev) => {
          // Vérifier si le dernier message n'est pas identique (éviter les doublons)
          const lastMessage = prev[prev.length - 1];
          if (
            lastMessage &&
            lastMessage.content === assistantMessage.content &&
            lastMessage.role === "assistant"
          ) {
            console.log("⚠️ Message identique détecté, évitation du doublon");
            return prev;
          }
          return [...prev, assistantMessage];
        });
        setIsTyping(false);

        trackAIInteraction("response_generated", {
          response_length: aiResponse.length,
          topic: lastTopic,
        });

        console.log("✅ Message ajouté avec succès");
      } catch (error) {
        console.error("❌ Erreur dans handleSend:", error);

        // Réponse de fallback garantie
        const fallbackMessage = {
          role: "assistant",
          content:
            "🤔 Je peux te parler des projets de Jérémy, ses compétences, ou sa recherche d'alternance. Que veux-tu savoir ?",
          timestamp: Date.now(),
        };

        setMessages((prev) => {
          // Vérifier si le dernier message n'est pas identique (éviter les doublons)
          const lastMessage = prev[prev.length - 1];
          if (
            lastMessage &&
            lastMessage.content === fallbackMessage.content &&
            lastMessage.role === "assistant"
          ) {
            console.log(
              "⚠️ Message de fallback identique détecté, évitation du doublon"
            );
            return prev;
          }
          return [...prev, fallbackMessage];
        });
        setIsTyping(false);

        console.log("🔄 Réponse de fallback utilisée");
      }
    }, delay);
  }, [input, isTyping, getAIResponse, lastTopic, trackAIInteraction]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      trackAIInteraction("chat_opened");
      setLastReadMessageCount(messages.length);
      setTimeout(() => inputRef.current?.focus(), 300);
    } else {
      trackAIInteraction("chat_closed");
    }
  };

  const clearChat = () => {
    try {
      console.log("🧹 Nettoyage du chat demandé");
      if (window.confirm("Effacer l'historique de la conversation ?")) {
        const newMessages = [
          {
            role: "assistant",
            content:
              "🌊 Chat réinitialisé !<br /><br />🔍 Je peux te parler des projets de Jérémy, ses compétences, ou sa recherche d'alternance.",
            timestamp: Date.now(),
          },
        ];
        setMessages(newMessages);
        setLastReadMessageCount(newMessages.length);
        setLastTopic("");
        setIsTyping(false); // S'assurer que l'assistant n'est pas bloqué
        console.log("✅ Chat nettoyé avec succès");
      }
    } catch (error) {
      console.error("❌ Erreur lors du nettoyage:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      const timer = setTimeout(() => {
        setLastReadMessageCount(messages.length);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [messages.length, isTyping, isOpen]);

  useEffect(() => {
    window.aiDebug = (message) => {
      console.log("=== DEBUG AI ASSISTANT ===");
      const original = message;
      const normalized = normalizeText(message);
      const match = findBestMatch(message);
      const response = getAIResponse(message);

      console.log("🔍 Message original:", original);
      console.log("📝 Texte normalisé:", normalized);
      console.log("📊 Meilleur match:", match);
      console.log("💬 Réponse finale:", response);

      return { original, normalized, match, response };
    };

    window.aiTest = () => {
      const testCases = [
        "ses projets ?",
        "ses compétences",
        "Ses compétences",
        "ses competences",
        "competences jeremy",
        "il habite ou ?",
        "jeremy age",
        "que fait jeremy ?",
        "alternance jeremy",
        "contact jeremy",
        "github jeremy",
      ];

      console.log("🧪 Test automatique du système:");
      testCases.forEach((test) => {
        console.log(`\n--- Test: "${test}" ---`);
        const result = window.aiDebug(test);
        console.log(
          `✅ Résultat: ${
            result.match
              ? `${result.match.key} (score: ${result.match.score})`
              : "Pas de match"
          }`
        );
      });
    };

    window.aiQuickTest = () => {
      console.log('🚀 Test rapide "Ses compétences":');
      return window.aiDebug("Ses compétences");
    };

    window.aiNormalize = (text) => {
      const result = normalizeText(text);
      console.log("📝 Normalisation:");
      console.log("Avant:", text);
      console.log("Après:", result);
      return result;
    };

    window.aiUnblock = () => {
      console.log("🔓 Déblocage de l'assistant forcé");
      setIsTyping(false);
    };

    window.aiClear = () => {
      console.log("🧹 Nettoyage du chat");
      setMessages([
        {
          role: "assistant",
          content:
            "👋 Salut ! Je suis l'assistant IA de Jérémy !<br /><br />🔍 Je peux te parler de ses projets, compétences, ou recherche d'alternance.",
          timestamp: Date.now(),
        },
      ]);
      setIsTyping(false);
    };

    window.aiTestProjects = () => {
      const projectTests = [
        "Ohmyfood",
        "ohmyfood",
        "Projet ArgentBank",
        "ArgentBank",
        "argent bank",
        "Sophie Bluel",
        "sophie bluel",
        "Nina Carducci",
        "nina carducci",
        "Portfolio",
        "Ce portfolio",
        "portfolio v2",
      ];

      console.log("🎯 Test spécifique des projets:");
      projectTests.forEach((test) => {
        console.log(`\n--- Test: "${test}" ---`);
        const result = window.aiDebug(test);
        console.log(
          `✅ Résultat: ${
            result.match
              ? `${result.match.key} (score: ${result.match.score})`
              : "Pas de match spécifique"
          }`
        );
      });
    };

    window.aiTestDuplication = () => {
      console.log('🔄 Test de duplication avec "Ses projets"');
      console.log("Messages avant:", messages.length);

      // Simuler l'envoi d'un message
      setInput("Ses projets");
      setTimeout(() => {
        console.log('📤 Envoi simulé de "Ses projets"');
        handleSend();
      }, 100);
    };

    console.log("🤖 Commandes debug disponibles:");
    console.log('- aiDebug("message") : debug complet');
    console.log('- aiQuickTest() : test rapide "Ses compétences"');
    console.log("- aiTest() : test automatique de plusieurs cas");
    console.log("- aiTestProjects() : test spécifique des projets");
    console.log("- aiTestDuplication() : test de duplication");
    console.log('- aiNormalize("texte") : voir la normalisation');
    console.log("- aiUnblock() : débloquer l'assistant");
    console.log("- aiClear() : nettoyer le chat");
  }, [
    findBestMatch,
    normalizeText,
    getAIResponse,
    handleSend,
    messages.length,
  ]);

  const unreadMessages = Math.max(0, messages.length - lastReadMessageCount);
  const hasUnreadMessages = unreadMessages > 0 && !isOpen;

  return (
    <>
      <button
        onClick={toggleChat}
        className={`ai-assistant-fab ${isOpen ? "active" : ""} ${
          isTyping ? "thinking" : ""
        } ${isMobile ? "mobile" : ""}`}
        aria-label={isOpen ? "Fermer l'assistant IA" : "Ouvrir l'assistant IA"}
        title={
          isOpen ? "Fermer l'assistant" : "Assistant IA - Posez vos questions !"
        }
      >
        {isOpen ? <FaTimes /> : <FaRobot />}
        {hasUnreadMessages && (
          <span className="ai-message-badge">{unreadMessages}</span>
        )}
      </button>

      {isOpen && (
        <div
          className={`ai-assistant-widget ${isMobile ? "mobile" : ""} ${
            isTablet ? "tablet" : ""
          }`}
        >
          <div className="ai-assistant-header">
            <div className="ai-assistant-title">
              <FaRobot className="ai-icon" />
              <div className="ai-title-text">
                <h3>Assistant IA</h3>
                <p>
                  {isTyping
                    ? "En train d'écrire..."
                    : "Posez vos questions sur Jérémy"}
                </p>
              </div>
            </div>
            <div className="ai-header-actions">
              <button
                onClick={clearChat}
                className="ai-clear-btn"
                aria-label="Effacer l'historique"
                title="Effacer l'historique"
              >
                <FaTrash />
              </button>
            </div>
          </div>

          <div className="ai-assistant-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.role}`}>
                <div className="ai-message-content">
                  <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                  <div className="ai-message-time">
                    {new Date(msg.timestamp).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message assistant">
                <div className="ai-message-content">
                  <div className="ai-typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                  <div className="ai-typing-text">L'assistant réfléchit...</div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="ai-assistant-input">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                isTyping ? "Patientez..." : "Tapez votre question..."
              }
              disabled={isTyping}
              maxLength={300}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              aria-label="Envoyer le message"
              className={input.trim() ? "ready" : ""}
            >
              <FaPaperPlane />
            </button>
          </div>

          <div className="ai-quick-suggestions">
            <div className="ai-suggestions-title">
              {lastTopic ? "En savoir plus :" : "Essaie ça :"}
            </div>
            <div className="ai-suggestions-list">
              {getDynamicSuggestions().map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => fillSuggestion(suggestion.query)}
                  disabled={isTyping}
                >
                  {suggestion.text}
                </button>
              ))}
            </div>
            {lastTopic && (
              <div className="ai-suggestions-reset">
                <button
                  onClick={() => {
                    setLastTopic("");
                    setInput("");
                  }}
                  className="ai-reset-suggestions"
                  disabled={isTyping}
                >
                  ↩️ Retour aux questions principales
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
