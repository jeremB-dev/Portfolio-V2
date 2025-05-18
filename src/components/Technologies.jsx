import React from 'react';
import { HashLink } from 'react-router-hash-link';
import BackgroundAnimation from '../components/BackgroundAnimation';
import useAnimation from '../hooks/useAnimation';
import useWindowSize from '../hooks/useWindowSize';


function Technologies() {
  const { animationsEnabled } = useAnimation();
  const { isMobile, isTablet } = useWindowSize();

  return (
    <section id="technologies">
      {animationsEnabled && (
        <BackgroundAnimation 
          type="particles" 
          opacity={0.6}
          color="#53ba5f" 
          speed="fast"
          particleSize={14}
          particleCount={120}
          isMobile={isMobile}
          isTablet={isTablet}
        />
      )}
      <h2>Technologies apprises</h2>
      <ul>
        <li>
          <img
            src="/assets/logos/html.svg"
            alt="logo techno HTML"
            className="tech-logo"
            loading="lazy"
          />
          <p>HTML</p>
        </li>
        <li>
          <img
            src="/assets/logos/css.svg"
            alt="logo techno CSS"
            className="tech-logo"
            loading="lazy"
            width="64"
            height="64"
          />
          <p>CSS</p>
        </li>
        <li>
          <img
            src="/assets/logos/sass.svg"
            alt="logo techno SASS"
            className="tech-logo"
            loading="lazy"
            width="64"
            height="64"
          />
          <p>Sass</p>
        </li>
        <li>
          <img
            src="/assets/logos/javascript.svg"
            alt="logo techno JavaScript"
            className="tech-logo"
            loading="lazy"
            width="64"
            height="64"
          />
          <p>JavaScript</p>
        </li>
        <li>
          <img
            src="/assets/logos/react.svg"
            alt="logo techno React"
            className="tech-logo"
            loading="lazy"
            width="64"
            height="64"
          />
          <p>React</p>
        </li>
      </ul>
      <h2>Outils et plateformes</h2>
      <ul>
        <li>
          <img
            src="/assets/logos/vscode.svg"
            alt="logo platefomre GitHub"
            className="tech-logo"
            loading="lazy"
            width="64"
            height="64"
          />
          <p>Visual Studio Code</p>
        </li>
        <li>
          <img
            src="/assets/logos/Git.svg"
            alt="logo plateforme Git"
            className="tech-logo"
            loading="lazy"
            width="64"
            height="64"
          />
          <p>Git</p>
        </li>
        <li>
          <img
            src="/assets/logos/github.svg"
            alt="logo plateforme GitHub"
            className="tech-logo"
            loading="lazy"
            width="64"
            height="64"
          />
          <p>GitHub</p>
        </li>
        <li>
          <img
            src="/assets/logos/google-lighthouse.svg"
            alt="logo plateforme Google Lighthouse"
            className="tech-logo"
            loading="lazy"
            width="64"
            height="64"
          />
          <p>Google Lighthouse</p>
        </li>
        <li>
          <img
            src="/assets/logos/wave.svg"
            alt="logo plateforme Wave"
            className="tech-logo"
            loading="lazy"
            width="64"
            height="64"
          />
          <p>Wave</p>
        </li>
      </ul>
    </section>
  );
}

export default Technologies;