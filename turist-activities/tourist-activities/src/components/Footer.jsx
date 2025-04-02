import { NavLink } from "react-router";

export const Footer = () => {
    return (
        <footer className="Footer">
            <h2 className="Footer-title">+</h2>
            <NavLink className="Footer-link" to={"/secciones"}>Secciones</NavLink>

        </footer>);
}