import { NavLink } from "react-router-dom";
import { motion } from 'framer-motion'
// cuando un NavLink esta activo `isActive` se genera automáticamente 

const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Calendar', path: '/secciones' }
]

export const Footer = () => {

    return (
        <footer className="Footer">
            <nav className="Footer-nav">
                <ul className="Footer-ul">

                    {navItems.map((item) => {

                        return (

                            <li key={item.path} className="Footer-li">
                                <NavLink
                                    className={({ isActive }) => `Footer-link ${isActive ? "active" : ""}`}
                                    to={item.path}
                                >
                                    {item.name}
                                </NavLink>

                            </li>
                        )
                    })}

                </ul>
            </nav>
            <div className="Footer-div">+</div>
        </footer>);
}


