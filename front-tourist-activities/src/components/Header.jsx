import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // para saber la ruta actual

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handlePerfilClick = () => {
    const currentPath = location.pathname;

    if (currentPath === "/home" || currentPath === "/calendario") {
      sessionStorage.setItem("fromPerfil", currentPath);
    } else {
      sessionStorage.removeItem("fromPerfil");
    }
  };
  return (
    <header className="Header">
      <h2 className="Header-title">
        Turistea <hr style={{ border: "none" }} /> Villajoyosa
      </h2>
      <div className="Hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <nav className={`Nav-menu ${isOpen ? "Open" : ""}`}>
        <Link className="Nav-link" to={"/perfil"} onClick={handlePerfilClick}>
          <img
            className="Nav-perfil"
            src="/img/icono-perfil.svg"
            alt="Perfil"
          />
        </Link>
      </nav>
    </header>
  );
};
