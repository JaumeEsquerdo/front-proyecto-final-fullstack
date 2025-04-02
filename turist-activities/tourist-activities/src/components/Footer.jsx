import { NavLink } from "react-router";

export const Footer = () => {
    return (
        <footer className="Footer">
            <nav className="Footer-nav">
                <ul className="Footer-ul">
                <NavLink className="Footer-link" to={"/secciones"}>Secciones</NavLink>
                <NavLink className="Footer-link" to={"/secciones"}>Secciones</NavLink>

                </ul>
            </nav>
            <div className="Footer-div">+</div>
        </footer>);
}