import '@/css/pages/policy.css'
import { Link, useLocation } from 'react-router-dom';

const PoliticaPriv = () => {
    /* lógica para volver a atrás en links de politicas privacidad */
    const location = useLocation();
    /* obtenemos de donde viene y si no se asume q es desde perfil */
    // `from` viene del state de useLocation (state={{ from }}) pasado desde el Link
    const from = location.state?.from || "perfil";
    /* fallback de perfil */

    let backLink = "/perfil";
    if (from === "login") backLink = "/login";
    if (from === "registro") backLink = "/registro";
    // if (from === "perfil") backLink = "/perfil";

    return (
        <>
            <div className="PoliticaPriv">
                <div className="PoliticaPriv-div">
                    <h1 className="PoliticaPriv-title">Politica de Privacidad</h1>
                    <p className="PoliticaPriv-text">
                        En nuestra aplicación valoramos tu privacidad. Los datos personales que compartes con nosotros se utilizan únicamente para mejorar tu experiencia.
                    </p>
                    <p className="PoliticaPriv-text">
                        No compartimos tu información con terceros sin consentimiento.
                    </p>
                    <p className="PoliticaPriv-text">
                        Puedes revisar esta política cuando lo necesites. Nuestro compromiso es cuidar tu información con responsabilidad.
                    </p>
                </div>
                <Link className='PoliticaPriv-link' to={backLink}>Volver</Link>

            </div>

        </>
    );
}

export default PoliticaPriv;