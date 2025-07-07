// hooks/useVisitTracker.js
import { useEffect } from "react";

export const useVisitTracker = () => {
  useEffect(() => {
    const trackVisit = async () => {
      // Ne tracker qu'en production (pas en développement)
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
        return;
      }

      try {
        // Éviter le double tracking avec localStorage
        const lastVisit = localStorage.getItem("jeremy-portfolio-last-visit");
        const now = Date.now();

        // Tracker seulement si pas de visite dans les 30 dernières minutes
        if (!lastVisit || now - parseInt(lastVisit) > 30 * 60 * 1000) {
          const response = await fetch(
            "https://api.countapi.xyz/hit/jeremy-brunel-portfolio/visits",
            {
              method: "GET",
            }
          );

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("jeremy-portfolio-last-visit", now.toString());

            // Log seulement pour les visiteurs normaux
            console.log(`📊 Visite trackée #${data.value}`);
          }
        }
      } catch {
        // Fail silently - ne pas casser le site si l'API est down
        console.log("📊 Tracking indisponible");
      }
    };

    // Délai pour éviter de ralentir le chargement initial
    const timer = setTimeout(trackVisit, 2000);

    return () => clearTimeout(timer);
  }, []);
};

// Fonction pour récupérer les stats (pour usage privé)
export const getVisitStats = async () => {
  try {
    const response = await fetch(
      "https://api.countapi.xyz/get/jeremy-brunel-portfolio/visits"
    );
    if (response.ok) {
      const data = await response.json();
      return {
        totalVisits: data.value,
        lastUpdated: new Date().toLocaleString("fr-FR"),
      };
    }
  } catch (error) {
    console.error("Erreur récupération stats:", error);
    return null;
  }
};
