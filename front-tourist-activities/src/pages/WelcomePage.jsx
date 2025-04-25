import { useEffect } from "react";
import { useNavigate, Link } from "react-router";

import '@/css/pages/welcomePage.css'
import '@/css/index.css'



const Welcome = () => {

    const navigate = useNavigate() //hook para navegar entre rutas y decir los movimientos


    return (
        <>

            <section className="WelcomePage">
                <img className="WelcomePage-fondo" src="/img/fondo-escena.png" alt="Fondo escena" />
                <img className="WelcomePage-logo" src="/img/logo-app.png" alt="logo" />
                <div className="WelcomePage-div">
                    <div className="WelcomePage-content">
                        <span className="WelcomePage-line"></span>
                        <h1 className="WelcomePage-title">Turistea Villajoyosa</h1>
                        <h2 className="WelcomePage-subtitle">Descubre las actividades más típicas de la Vila y organízalas a tu gusto.
                        </h2>
                        <h2 className="WelcomePage-subtitle">Guarda tus planes en el calendario, añade los tuyos propios y vive la experiencia a tu manera.</h2>
                        <Link className="WelcomePage-link" to={'/home'}>Empieza a planificar</Link>
                    </div>

                </div>

            </section>
        </>
    );
}

export default Welcome;