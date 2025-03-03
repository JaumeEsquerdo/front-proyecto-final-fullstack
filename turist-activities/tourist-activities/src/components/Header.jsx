import { NavLink } from "react-router";

export const Header = () => {
    return (
        <header>
            <h2>Header</h2>
            <NavLink className="Header-link" to={"/secciones"}>Secciones</NavLink>

        </header>);
}

