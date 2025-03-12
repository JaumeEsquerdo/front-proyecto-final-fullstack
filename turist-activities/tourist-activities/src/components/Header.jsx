import { useState } from 'react'
import { NavLink } from "react-router";

export const Header = () => {

    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }
    return (
        <header className="Header">
            <h2 className="Header-title">Header</h2>
            <div className="Hamburger" onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            <nav className={`Nav-menu ${isOpen ? 'Open' : ''}`}>
                <NavLink className="Nav-link" to={"/"}>Seccion 1</NavLink>
                <NavLink className="Nav-link" to={"/"}>sección 2</NavLink>
                <NavLink className="Nav-link" to={"/"}>Seccion 3</NavLink>
            </nav>


        </header>);
}

