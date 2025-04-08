import { useEffect } from "react";
import { useNavigate, Link } from "react-router";

import '@/css/pages/welcomePage.css'
import '@/css/index.css'



const Welcome = () => {

    const navigate = useNavigate() //hook para navegar entre rutas y decir los movimientos

    /**  useEffect(()=>{
         // para verificar si el usuario ya ha visitado el WelcomePage y pasar directamente al '/home'
         if(localStorage.getItem('hasVisitedWelcomePage')){
             navigate('/home')
         } else{
             // en caso de ser la primera vez, marco que se ha visitado ya (el true no tiene efecto de comparación pero lo dejo para verlo mas claro)
             localStorage.setItem('hasVisitedWelcomePage', 'true')
         }
     },[navigate])
     */

    return (
        <>

            <section className="WelcomePage">
                <p className="foto" style={{ width: "100%", flex: "1", backgroundColor: "blue" }}>AQUI VA UNA IMG</p>

                <div className="WelcomePage-div">
                    <div className="WelcomePage-content">
                        <span className="WelcomePage-line"></span>
                        <h1 className="WelcomePage-title">Turistea Villajoyosa</h1>
                        <h2 className="WelcomePage-subtitle">Planifica tu estancia para aprovechar al máximo de este pequeño paraíso</h2>

                        <Link className="WelcomePage-link" to={'/home'}>Entra</Link>
                    </div>

                </div>

            </section>
        </>
    );
}

export default Welcome;