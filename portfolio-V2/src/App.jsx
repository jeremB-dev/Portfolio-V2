import React, { useState } from 'react';
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
import ThemeProvider from './components/ThemeContext'; // Nouveau import

import './styles/App.css';
import './styles/theme.css'; // Import du CSS de thème

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="App">
      {isHomePage ? <Header /> : <SimpleNav />}
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

  const handleLoaderFinished = () => {
    setLoading(false);
    // Petit délai avant de montrer le contenu
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  return (
    <AnimationProvider>
      <ThemeProvider> {/* Ajout du ThemeProvider */}
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