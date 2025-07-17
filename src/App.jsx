import React, { useState, useCallback, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Loader from "./components/Loader.jsx";
import Header from "./components/Header.jsx";
import SimpleNav from "./components/SimpleNav.jsx";
import Footer from "./components/Footer.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import AIAssistant from "./components/AIAssistant.jsx";
import Home from "./pages/Home.jsx";
import TechnologiesPage from "./pages/TechnologiesPage.jsx";
import ProjectsPage from "./pages/ProjectsPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import AnimationProvider from "./components/AnimationContext";
import ThemeProvider from "./components/ThemeContext";
import { useVisitTracker } from "./hooks/useVisitTracker";
import PrivateStats from "./components/PrivateStats";

// Composant pour choisir la navigation en fonction de la page
function NavigationWrapper() {
  const location = useLocation();
  return location.pathname === "/" ? <Header /> : <SimpleNav />;
}

function AppContent() {
  const location = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="App">
      <NavigationWrapper />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/technologies" element={<TechnologiesPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/admin-stats-jeremy-2024" element={<PrivateStats />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />

      {/* 🆕 Assistant IA disponible sur toutes les pages */}
      <AIAssistant />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // Tracking des visites
  useVisitTracker();

  // Commandes console privées pour Jérémy
  useEffect(() => {
    window.showStats = () => {
      localStorage.setItem("jeremy-portfolio-owner", "true");
      window.location.hash = "#/admin-stats-jeremy-2024";
      console.log("👑 Redirection vers tes statistiques privées...");
    };

    window.toggleOwnerMode = (mode = true) => {
      if (mode) {
        localStorage.setItem("jeremy-portfolio-owner", "true");
        console.log("👑 Mode propriétaire ACTIVÉ sur jeremy-brunel.fr");
      } else {
        localStorage.removeItem("jeremy-portfolio-owner");
        console.log("👤 Mode propriétaire DÉSACTIVÉ");
      }
    };

    window.checkOwnerStatus = () => {
      const isOwner = localStorage.getItem("jeremy-portfolio-owner") === "true";
      console.log(
        `📊 Statut sur jeremy-brunel.fr: ${
          isOwner ? "👑 Propriétaire" : "👤 Visiteur"
        }`
      );
      return isOwner;
    };

    // 🆕 Nouvelles commandes console pour l'IA
    window.aiDemo = () => {
      console.log(
        "🤖 Assistant IA intégré ! Cliquez sur l'icône en bas à droite pour tester."
      );
      console.log(
        '💡 Essayez de demander : "Quelles sont les compétences de Jérémy ?"'
      );
      console.log("📊 Commandes disponibles : aiStats(), clearAIStats()");
    };

    window.aiStats = () => {
      try {
        const analytics = JSON.parse(
          localStorage.getItem("jeremy-ai-analytics") || "[]"
        );
        console.log("🤖 Statistiques IA Assistant:");
        console.log(`📊 Total interactions: ${analytics.length}`);
        console.log(
          `💬 Messages envoyés: ${
            analytics.filter((a) => a.action === "message_sent").length
          }`
        );
        console.log(
          `🚀 Chat ouvert: ${
            analytics.filter((a) => a.action === "chat_opened").length
          } fois`
        );
        if (analytics.length > 0) {
          console.table(analytics.slice(-10)); // Dernières 10 interactions
        }
        return analytics;
      } catch {
        console.log("📊 Aucune donnée IA disponible");
        return [];
      }
    };

    window.clearAIStats = () => {
      if (window.confirm("Effacer toutes les statistiques IA ?")) {
        localStorage.removeItem("jeremy-ai-analytics");
        console.log("🤖 Statistiques IA effacées");
      }
    };

    // Message de bienvenue mis à jour pour Jérémy
    if (window.location.hostname === "jeremy-brunel.fr") {
      console.log("👋 Salut Jérémy ! Nouvelles fonctionnalités :");
      console.log("📊 showStats() - Voir tes statistiques de visite");
      console.log("🤖 aiDemo() - Infos sur l'assistant IA");
      console.log("📈 aiStats() - Analytics de l'assistant IA");
    }
  }, []);

  const handleLoaderFinished = useCallback(() => {
    setLoading(false);
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  }, []);

  return (
    <AnimationProvider>
      <ThemeProvider>
        {loading && <Loader onFinished={handleLoaderFinished} />}
        <div className={`content-container ${contentVisible ? "visible" : ""}`}>
          <Router>
            <AppContent />
          </Router>
        </div>
      </ThemeProvider>
    </AnimationProvider>
  );
}

export default App;
