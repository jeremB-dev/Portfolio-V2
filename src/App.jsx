import React, { useState, useCallback, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/Loader.jsx';
import Header from './components/Header.jsx';
import SimpleNav from './components/SimpleNav.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import Home from './pages/Home.jsx';
import TechnologiesPage from './pages/TechnologiesPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AnimationProvider from './components/AnimationContext';
import ThemeProvider from './components/ThemeContext';
import { useVisitTracker } from './hooks/useVisitTracker';
import PrivateStats from './components/PrivateStats';

// Composant pour choisir la navigation en fonction de la page
function NavigationWrapper() {
  const location = useLocation();
  return location.pathname === '/' ? <Header /> : <SimpleNav />;
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
      localStorage.setItem('jeremy-portfolio-owner', 'true');
      window.location.hash = '#/admin-stats-jeremy-2024';
      console.log('👑 Redirection vers tes statistiques privées...');
    };
    
    window.toggleOwnerMode = (mode = true) => {
      if (mode) {
        localStorage.setItem('jeremy-portfolio-owner', 'true');
        console.log('👑 Mode propriétaire ACTIVÉ sur jeremy-brunel.fr');
      } else {
        localStorage.removeItem('jeremy-portfolio-owner');
        console.log('👤 Mode propriétaire DÉSACTIVÉ');
      }
    };
    
    window.checkOwnerStatus = () => {
      const isOwner = localStorage.getItem('jeremy-portfolio-owner') === 'true';
      console.log(`📊 Statut sur jeremy-brunel.fr: ${isOwner ? '👑 Propriétaire' : '👤 Visiteur'}`);
      return isOwner;
    };
    
    // Message de bienvenue discret pour le propriétaire
    if (window.location.hostname === 'jeremy-brunel.fr') {
      console.log('👋 Salut Jérémy ! Tape "showStats()" pour voir tes statistiques');
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
        <div className={`content-container ${contentVisible ? 'visible' : ''}`}>
          <Router>
            <AppContent />
          </Router>
        </div>
      </ThemeProvider>
    </AnimationProvider>
  );
}

export default App;