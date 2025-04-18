import { Link } from "react-router-dom";
import '@/css/pages/policy.css'

const Terminos = () => {
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
                <Link className="TerminosCondiciones-link" to='/perfil'>Volver al perfil</Link>
            </div>
        </>
    );
}

export default Terminos;