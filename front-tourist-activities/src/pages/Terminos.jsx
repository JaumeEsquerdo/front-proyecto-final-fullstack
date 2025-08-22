import { Link, useLocation } from "react-router-dom";
import '@/css/pages/policy.css'

const Terminos = () => {
    /* lógica para volver a atrás en links de politicas privacidad */
    const location = useLocation();
    /* obtenemos de donde viene y si no se asume q es desde perfil */
    // `from` tomado de location.state pasado en el Link
    const from = location.state?.from || "perfil";
    /* fallback de perfil */

    let backLink = "/perfil";
    if (from === "login") backLink = "/login";
    if (from === "registro") backLink = "/registro";
    // if (from === "perfil") backLink = "/perfil";

    return (
        <>
            <div className="TerminosCondiciones">
                <div className="TerminosCondiciones-div">
                    <h1 className="TerminosCondiciones-title">
                        Terminos y Condiciones
                    </h1>
                    <p className="TerminosCondiciones-text">
                        Al utilizar nuestra aplicación, aceptas los siguientes términos y condiciones.
                        Si no estás de acuerdo, te pedimos que no utilices nuestro servicio.
                    </p>
                    <p className="TerminosCondiciones-text">
                        Nos reservamos el derecho de modificar estos términos en cualquier momento. Las actualizaciones serán notificadas a través de la aplicación.
                    </p>
                    <p className="TerminosCondiciones-text">
                        El uso indebido de la aplicación, incluidos pero no limitados a actividades ilegales o perjudiciales para otros usuarios, está estrictamente prohibido.
                    </p>
                    <p className="TerminosCondiciones-text">
                        En caso de duda, puedes ponerte en contacto con nuestro soporte.
                    </p>

                </div>
                <Link className="TerminosCondiciones-link" to={backLink}>Volver</Link>
            </div>
        </>
    );
}

export default Terminos;