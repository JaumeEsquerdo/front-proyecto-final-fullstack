
import { Link } from "react-router";

import '@/css/pages/welcomePage.css'
import '@/css/index.css'



const Welcome = () => {



    return (
        <>

            <main className="WelcomePage">

                <header className="WelcomePage-header">
                    {/* <div className="WelcomePage-lines">
                            <span className="WelcomePage-line"></span>
                        </div> */}

                    <h1 className="WelcomePage-title">Turistea Villajoyosa</h1>
                    <div className="WelcomePage-description">

                        <h2 className="WelcomePage-subtitle">Descubre los planes más típicos de 'la Vila' y organízate a tu gusto.
                        </h2>
                        <h2 className="WelcomePage-subtitle">  Guarda las actividades que te recomendamos en el calendario, añade las tuyas propias y, sobre todo, vive la experiencia a tu manera.
                        </h2>
                        <Link className="WelcomePage-link" to={'/home'}>EMPIEZA A PLANIFICAR</Link>
                    </div>
                </header>

                <img className="WelcomePage-img" src="/img/vila-foto.jpg" alt="Imagen de la playa de Villajoyosa" />
            </main>
        </>
    );
}

export default Welcome;