import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useActivity } from "@/context/ActivityContext";
import { memo, useMemo } from "react";
//import { useState, useEffect } from "react";
// cuando un NavLink esta activo `isActive` se genera automáticamente

const navItems = [
  { src: "/img/home.svg", path: "/home" },
  { src: "/img/calendario.svg", path: "/calendario" },
];

export const Footer = memo(() => {
  //const[disableDotsAnim, setDisableDotsAnim] = useState();
  const { setIsAddFormOpen } = useActivity(); //contexto

  const location = useLocation();
  const navigate = useNavigate();

  const handleAddClick = () => {
    if (location.pathname === "/calendario") {
      setIsAddFormOpen((prev) => !prev); //abrir el form si esta ya en calendar
    } else {
      navigate("/calendario"); // si no solamente redirije a calendar, no quiero que se abra automaticamente, probablemente quiera elejir el dia antes...
    }
  };

  const dots = useMemo(() => {
    return (
      <motion.div
        layoutId="dots"
        className="Footer-dots"
        transition={{ type: "spring", stiffness: 50, damping: 25 }}
      >
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </motion.div>
    );
  }, [location.pathname]); // solo se recalcula si cambia

  return (
    <footer className="Footer">
      <nav className="Footer-nav">
        <ul className="Footer-ul">
          <FooterNavItem navItems={navItems} location={location} dots={dots} />
        </ul>
      </nav>

      <div className="Footer-divBtn" onClick={handleAddClick}>
        <span className="material-symbols-rounded Add-symbol">add</span>
      </div>
    </footer>
  );
});

const FooterNavItem = ({ navItems, location, dots }) => (
  <>
    {navItems.map((item) => {
      const isActive = location.pathname === item.path;
      return (
        <li key={item.path} className="Footer-li">
          <NavLink
            className={({ isActive }) =>
              `Footer-link ${isActive ? "active" : ""}`
            }
            to={item.path}
          >
            <img
              className="Footer-imgLink"
              src={item.src}
              alt="Icono de navegación"
            />
          </NavLink>

          {isActive && dots}
        </li>
      );
    })}
  </>
);

/**
 * Transición en Framer Motion para la animación en el  footer de muelle en los 3 puntos
 * type "srping": que es elástico
 * stiffness: que tan fuerte es el muelle (mas alto mas rapido)
 * dampping: cuanto rebote tiene (cuanto mas alto menos rebote)
 *
 *
 */
