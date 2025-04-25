import '@/css/pages/policy.css'
import { Link } from 'react-router-dom';

const PoliticaPriv = () => {
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
                <Link className='PoliticaPriv-link' to='/perfil'>Volver al perfil</Link>

            </div>

        </>
    );
}

export default PoliticaPriv;