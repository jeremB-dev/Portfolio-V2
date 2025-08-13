import React, { useState, useEffect } from "react";
import { getVisitStats } from "../hooks/useVisitTracker";
import "../styles/components/PrivateStats.css";

function PrivateStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(null);
  const [ownerMode, setOwnerMode] = useState(false);
  const [accessDenied, setAccessDenied] = useState(false);

  // Vérifie si le mode propriétaire est activé
  useEffect(() => {
    const currentOwnerStatus =
      localStorage.getItem("jeremy-portfolio-owner") === "true";
    setOwnerMode(currentOwnerStatus);
    if (!currentOwnerStatus) {
      setAccessDenied(true);
    }
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    const data = await getVisitStats();
    setStats(data);
    setLastRefresh(new Date().toLocaleString("fr-FR"));
    setLoading(false);
  };

  const toggleOwnerMode = () => {
    const newMode = !ownerMode;
    setOwnerMode(newMode);
    if (newMode) {
      localStorage.setItem("jeremy-portfolio-owner", "true");
      console.log("👑 Mode propriétaire ACTIVÉ");
      setAccessDenied(false);
    } else {
      localStorage.removeItem("jeremy-portfolio-owner");
      console.log("👤 Mode propriétaire DÉSACTIVÉ");
      setAccessDenied(true);
    }
  };

  useEffect(() => {
    if (!accessDenied) {
      fetchStats();
    }
  }, [accessDenied]);

  if (accessDenied) {
    return (
      <div className="private-stats-container">
        <h1 className="private-stats-header">⛔ Accès refusé</h1>
        <p>
          Vous devez activer le mode propriétaire pour voir ces statistiques.
        </p>
        <button
          className="private-stats-toggle visitor-mode"
          onClick={toggleOwnerMode}
        >
          👑 Activer Mode Propriétaire
        </button>
      </div>
    );
  }

  return (
    <div className="private-stats-container">
      <h1 className="private-stats-header">📊 Statistiques Privées</h1>

      <div
        className={`private-stats-owner-status ${
          ownerMode ? "active" : "inactive"
        }`}
      >
        {ownerMode ? "👑 Mode Propriétaire ACTIF" : "👤 Mode Visiteur Normal"}
        <br />
        <small>
          {ownerMode
            ? "Tes visites ne sont PAS comptées"
            : "Tes visites SONT comptées"}
        </small>
      </div>

      <button
        className={`private-stats-toggle ${
          ownerMode ? "owner-mode" : "visitor-mode"
        }`}
        onClick={toggleOwnerMode}
      >
        {ownerMode
          ? "🚫 Désactiver Mode Propriétaire"
          : "👑 Activer Mode Propriétaire"}
      </button>

      {loading ? (
        <div className="private-stats-loading">
          Chargement des statistiques...
        </div>
      ) : stats ? (
        <>
          <div className="private-stats-card">
            <div className="private-stats-number">{stats.totalVisits}</div>
            <div className="private-stats-label">Visites totales</div>
          </div>

          <div className="private-stats-card">
            <div className="private-stats-label">
              <strong>Dernière mise à jour :</strong>
              <br />
              {stats.lastUpdated}
            </div>
          </div>

          {lastRefresh && (
            <div className="private-stats-card">
              <div className="private-stats-label">
                <strong>Dernière actualisation :</strong>
                <br />
                {lastRefresh}
              </div>
            </div>
          )}

          <button className="private-stats-refresh-btn" onClick={fetchStats}>
            🔄 Actualiser
          </button>

          <div className="private-stats-info">
            <strong>ℹ️ Informations :</strong>
            <br />
            • Les visites sont comptées avec un délai de 30 minutes
            <br />
            • Seules les visites en production sont trackées
            <br />
            • Le mode propriétaire exclut automatiquement tes visites
            <br />
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
