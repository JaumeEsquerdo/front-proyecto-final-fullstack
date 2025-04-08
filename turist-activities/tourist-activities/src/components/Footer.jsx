import { NavLink, useLocation } from "react-router-dom";
import { motion } from 'framer-motion'
// cuando un NavLink esta activo `isActive` se genera automáticamente 

const navItems = [
    { name: 'Home', path: '/home' },
    { name: 'Calendar', path: '/secciones' }
]


export const Footer = () => {
    const location = useLocation();

    return (
        <footer className="Footer">
            <nav className="Footer-nav">
                <ul className="Footer-ul">

                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (

                            <li key={item.path} className="Footer-li">
                                <NavLink
                                    className={({ isActive }) => `Footer-link ${isActive ? "active" : ""}`}
                                    to={item.path}
                                >
                                    {item.name}
                                </NavLink>

                                {isActive && (
                                    <motion.div
                                    layoutId="dots"
                                    className="Footer-dots"
                                    transition={{type: "spring", stiffness: 50, damping: 25}}
                                    >
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    
                                    
                                    </motion.div>
                                )}

                            </li>
                        )
                    })}

                </ul>
            </nav>
            
            <div className="Footer-div">+</div>
        </footer>);
}

/**
 * Transición en Framer Motion para la animación en el  footer de muelle en los 3 puntos
 * type "srping": que es elástico
 * stiffness: que tan fuerte es el muelle (mas alto mas rapido)
 * dampping: cuanto rebote tiene (cuanto mas alto menos rebote)
 * 
 * 
 */



