import React, { useEffect, useRef, useState } from 'react';
import '../styles/components/circular-progress.css';

function CircularProgress({ percentage, label, color, size = 120, strokeWidth = 10 }) {
  const [progress, setProgress] = useState(0);
  const circleRef = useRef(null);
  
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;
  
  useEffect(() => {
    // Animation de remplissage
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [percentage]);
  
  // Déterminer la couleur en fonction du niveau
  const getColor = () => {
    if (color) return color;
    if (percentage >= 80) return 'var(--color-primary)';
    if (percentage >= 70) return 'hsl(var(--primary-hue), 63%, 55%)';
    if (percentage >= 60) return 'hsl(var(--secondary-hue), 85%, 60%)';
    return 'hsl(207, 89%, 77%)';
  };
  
  return (
    <div className="circular-progress-container">
      <svg width={size} height={size} className="circular-progress-svg">
        {/* Cercle de fond */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(200, 200, 200, 0.2)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Cercle de progression */}
        <circle
          ref={circleRef}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor()}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="circular-progress-circle"
        />
      </svg>
      <div className="circular-progress-content">
        <span className="circular-progress-percentage">{Math.round(progress)}%</span>
        {label && <span className="circular-progress-label">{label}</span>}
      </div>
    </div>
  );
}

export default CircularProgress;
