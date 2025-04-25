import { Link } from "react-router-dom";


const ErrorPage = () => {
    return (
        <div className="WelcomePage">
            <img className="WelcomePage-fondo" src="/img/fondo-escena.png" alt="Fondo escena" />

            <div className="Error">
                <h1>Error 404!!</h1>
                <h2>Te has equivocado de página...</h2>
                <Link className="Error-link" to={'/home'}>Prueba de nuevo!</Link>
            </div>


        </div>
    );
}

export default ErrorPage;