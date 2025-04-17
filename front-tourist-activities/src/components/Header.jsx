import { useState } from 'react'
import { Link } from "react-router";

export const Header = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <header className="Header">
            <h2 className="Header-title">Turistea <hr style={{ border: "none" }} /> Villajoyosa</h2>
            <div className="Hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <nav className={`Nav-menu ${isOpen ? 'Open' : ''}`}>
                <Link className="Nav-link" to={"/profile"}>
                <img className='Nav-perfil' src="/img/icono-perfil.svg" alt="Perfil" />
                </Link>
            </nav>


        </header>);
}

