// hooks/useVisitTracker.js
import { useEffect } from "react";

export const useVisitTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      // Ne tracker qu'en production
      const isDevelopment =
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname.includes("localhost");

      if (isDevelopment) {
        console.log("🔧 Mode développement - tracking désactivé");
        return;
      }

      // Ne pas tracker si mode propriétaire activé
      const isOwner = localStorage.getItem("jeremy-portfolio-owner") === "true";
      if (isOwner) {
        console.log("👑 Mode propriétaire - visite non comptée");

        // Désactiver Simple Analytics pour le propriétaire
        if (window.sa_event) {
          window.sa_disabled = true;
        }
        return;
      }

      // Activer Simple Analytics pour les visiteurs
      if (window.sa_event) {
        window.sa_disabled = false;
        console.log("📊 Simple Analytics actif pour visiteur");
      }

      // Tracking manuel local pour ton dashboard privé (backup)
      try {
        const lastVisit = localStorage.getItem("jeremy-portfolio-last-visit");
        const now = Date.now();

        if (!lastVisit || now - parseInt(lastVisit) > 30 * 60 * 1000) {
          // Incrémenter compteur local
          const localVisits =
            parseInt(localStorage.getItem("jeremy-local-visits") || "0") + 1;
          localStorage.setItem("jeremy-local-visits", localVisits.toString());
          localStorage.setItem("jeremy-portfolio-last-visit", now.toString());

          console.log(`📊 Visite locale trackée #${localVisits}`);
        }
      } catch {
        console.log("📊 Tracking local indisponible");
      }
    };

    // Délai pour éviter de ralentir le chargement
    const timer = setTimeout(trackVisit, 2000);
    return () => clearTimeout(timer);
  }, []);
};

// Fonction pour récupérer les stats (backup local)
export const getVisitStats = async () => {
  try {
    const localVisits = parseInt(
      localStorage.getItem("jeremy-local-visits") || "0"
    );

    return {
      totalVisits: localVisits,
      lastUpdated: new Date().toLocaleString("fr-FR"),
      source: "Compteur local (backup)",
      note: "📊 Simple Analytics fournit les vraies stats sur simpleanalytics.com",
    };
  } catch (error) {
    console.error("Erreur récupération stats:", error);
    return null;
  }
};
