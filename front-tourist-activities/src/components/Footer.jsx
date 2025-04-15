import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import { useActivity } from "@/context/ActivityContext";
// cuando un NavLink esta activo `isActive` se genera automáticamente 

const navItems = [
    { src: '/img/home.svg', path: '/home' },
    { src: '/img/calendario.svg', path: '/calendar' }
]


export const Footer = () => {

    const {setIsAddFormOpen, isAddFormOpen} =useActivity(); //contexto


    const location = useLocation();
    const navigate = useNavigate();

    const handleAddClick = () =>{
        if(location.pathname ==='/calendar'){
            setIsAddFormOpen(!isAddFormOpen) //abrir el form si esta ya en calendar
        }else{
            navigate('/calendar') // si no solamente redirije a calendar, no quiero que se abra automaticamente, probablemente quiera elejir el dia antes...
        }
    }

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
                                    <img className="Footer-imgLink" src={item.src} alt="Icono de navegación" />
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
            
            <div className="Footer-div" onClick={handleAddClick}>➕</div>
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



