// src/App.jsx
import React, { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Loader from './components/Loader.jsx';
import Header from './components/Header.jsx';
import SimpleNav from './components/SimpleNav.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import TechnologiesPage from './pages/TechnologiesPage.jsx';
import ProjectsPage from './pages/ProjectsPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AnimationProvider from './components/AnimationContext';
import ThemeProvider from './components/ThemeContext';

// Composant pour choisir la navigation en fonction de la page
function NavigationWrapper() {
  const location = useLocation();
  // Simplification de la condition
  return location.pathname === '/' ? <Header /> : <SimpleNav />;
}

function AppContent() {
  // Gérer le défilement vers le haut lors des changements de page
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
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);

  // Utilisation de useCallback pour éviter de recréer la fonction à chaque rendu
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