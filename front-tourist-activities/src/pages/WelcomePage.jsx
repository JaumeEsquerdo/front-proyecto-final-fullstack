import { Link } from "react-router";

import "@/css/pages/welcomePage.css";
import "@/css/index.css";
import { useEffect } from "react";

const Welcome = () => {
  //precarga de imagen de la página de Login para que al navegar no petardee y ya esté en caché
  useEffect(() => {
    const img = new Image();
    img.src = "/img/map.webp";
  }, []);

  return (
    <>
      <main className="WelcomePage">
        <header className="WelcomePage-header">
          <h1 className="WelcomePage-title">Turistea Villajoyosa</h1>
          <img
            className="WelcomePage-img"
            src="/img/bycicle.webp"
            alt="Mujer parada en bici viendo el móvil"
          />
          <div className="WelcomePage-description">
            <h2 className="WelcomePage-subtitle">
              Descubre los planes más típicos de 'la Vila', guárdalos en tu
              calendario y vive la experiencia
            </h2>
          </div>
        </header>

        <div className="WelcomePage-bottom">
          <svg
            className="WelcomePage-waves"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="turisteaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--grad-start)" />
                <stop offset="100%" stopColor="var(--grad-end)" />
              </linearGradient>
            </defs>

            {/* Ola grande (naranja, más alta y suave) */}
            <path
              d="M0,75
     C280,10 900,200 1440,170
     L1440,320 L0,320 Z"
              fill="url(#turisteaGrad)"
            />

            {/* Ola trasera blanca */}
            <path
              d="M0,90
     C420,300 1020,150 1440,260
     L1440,320 L0,320 Z"
              fill="#fff"
              opacity="0.35"
            />

            {/* Ola frontal blanca*/}
            <path
              d="M0,130
     C500,360 980,180 1440,300
     L1440,320 L0,320 Z"
              fill="#fff"
              opacity="0.6"
            />
          </svg>

          <div className="WelcomePage-actions">
            <Link
              className="WelcomePage-btn WelcomePage-btn--white"
              to="/registro"
            >
              Registrarse
            </Link>
            <Link
              className="WelcomePage-btn WelcomePage-btn--color"
              to="/login"
            >
              Iniciar sesión
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Welcome;

/* Apuntes svg: */

/* 
<defs> = cajita de definiciones para reusar.

<linearGradient> = gradiente lineal (puede ser horizontal, vertical o diagonal).

<stop> = punto de color dentro del gradiente.

fill="url(#id)" = aplica ese gradiente a una forma.

En el d:
M = mover,

L = línea,

C = curva,

Z = como cierra el svg
 */
