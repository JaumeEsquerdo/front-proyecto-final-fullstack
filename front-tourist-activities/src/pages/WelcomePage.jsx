
import { Link } from "react-router";

import '@/css/pages/welcomePage.css'
import '@/css/index.css'



const Welcome = () => {



    return (
        <>

            <section className="WelcomePage">
                <img className="WelcomePage-fondo" src="/img/fondo-escena.png" alt="Fondo escena" />
                <div className="WelcomePage-div">
                    <div className="WelcomePage-content">
                        <div className="WelcomePage-lines">
                            <span className="WelcomePage-line"></span>
                            <span className="WelcomePage-line"></span>

                            <span className="WelcomePage-line"></span>
                        </div>

                        
                        <h1 className="WelcomePage-title">Turistea Villajoyosa</h1>
                        <div className="WelcomePage-description">

                            <h2 className="WelcomePage-subtitle">Descubre los planes más típicos de 'la Vila' y organízate a tu gusto.
                            </h2>
                            <h2 className="WelcomePage-subtitle">  Guarda las actividades que te recomendamos en el calendario, añade las tuyas propias y, sobre todo, vive la experiencia a tu manera.
                            </h2>
                        </div>
                        <Link className="WelcomePage-link" to={'/home'}>Empieza a planificar</Link>
                    </div>

                </div>

            </section>
        </>
    );
}

export default Welcome;