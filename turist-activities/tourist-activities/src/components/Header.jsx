import { NavLink } from "react-router";

export const Header = () => {
    return (
        <header className="Header">
            <h2 className="Header-title">Header</h2>
            <NavLink className="Header-link" to={"/secciones"}>Secciones</NavLink>

        </header>);
}

