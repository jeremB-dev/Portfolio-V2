// components/PrivateStats.jsx
import React, { useState, useEffect } from 'react';
import { getVisitStats } from '../hooks/useVisitTracker';
import '../styles/components/PrivateStats.css';

function PrivateStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [ownerMode, setOwnerMode] = useState(false);

  // Auto-détecter le propriétaire quand il visite cette page
  useEffect(() => {
    const currentOwnerStatus = localStorage.getItem('jeremy-portfolio-owner') === 'true';
    
    if (!currentOwnerStatus) {
      localStorage.setItem('jeremy-portfolio-owner', 'true');
      console.log('👑 Propriétaire auto-détecté via page de stats - Mode propriétaire activé');
    }
    
    setOwnerMode(true);
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const data = await getVisitStats();
    setStats(data);
    setLastRefresh(new Date().toLocaleString('fr-FR'));
    setLoading(false);
  };

  const toggleOwnerMode = () => {
    const newMode = !ownerMode;
    setOwnerMode(newMode);
    
    if (newMode) {
      localStorage.setItem('jeremy-portfolio-owner', 'true');
      console.log('👑 Mode propriétaire ACTIVÉ');
    } else {
      localStorage.removeItem('jeremy-portfolio-owner');
      console.log('👤 Mode propriétaire DÉSACTIVÉ');
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="private-stats-container">
      <h1 className="private-stats-header">📊 Statistiques Privées</h1>
      
      {/* Statut du mode propriétaire */}
      <div className={`private-stats-owner-status ${ownerMode ? 'active' : 'inactive'}`}>
        {ownerMode ? '👑 Mode Propriétaire ACTIF' : '👤 Mode Visiteur Normal'}
        <br />
        <small>
          {ownerMode ? 'Tes visites ne sont PAS comptées' : 'Tes visites SONT comptées'}
        </small>
      </div>

      {/* Toggle du mode propriétaire */}
      <button 
        className={`private-stats-toggle ${ownerMode ? 'owner-mode' : 'visitor-mode'}`}
        onClick={toggleOwnerMode}
      >
        {ownerMode ? '🚫 Désactiver Mode Propriétaire' : '👑 Activer Mode Propriétaire'}
      </button>
      
      {loading ? (
        <div className="private-stats-loading">
          Chargement des statistiques...
        </div>
      ) : stats ? (
        <>
          <div className="private-stats-card">
            <div className="private-stats-number">{stats.totalVisits}</div>
            <div className="private-stats-label">Visites totales (hors propriétaire)</div>
          </div>
          
          <div className="private-stats-card">
            <div className="private-stats-label">
              <strong>Dernière mise à jour :</strong><br />
              {stats.lastUpdated}
            </div>
          </div>
          
          {lastRefresh && (
            <div className="private-stats-card">
              <div className="private-stats-label">
                <strong>Dernière actualisation :</strong><br />
                {lastRefresh}
              </div>
            </div>
          )}
          
          <button 
            className="private-stats-refresh-btn"
            onClick={fetchStats}
          >
            🔄 Actualiser
          </button>
          
          <div className="private-stats-info">
            <strong>ℹ️ Informations :</strong><br />
            • Les visites sont comptées avec un délai de 30 minutes<br />
            • Seules les visites en production sont trackées<br />
            • Le mode propriétaire exclut automatiquement tes visites<br />
            • Commandes console : showStats(), toggleOwnerMode(), checkOwnerStatus()
          </div>
        </>
      ) : (
        <div className="private-stats-card">
          <div className="private-stats-label">
            ❌ Erreur lors du chargement des statistiques
          </div>
        </div>
      )}
    </div>
  );
}

export default PrivateStats;