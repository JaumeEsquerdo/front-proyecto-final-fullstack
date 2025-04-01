import { useEffect } from "react";
import { useNavigate, Link } from "react-router";


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
        <div>
            <h1>Turistea Villajoyosa</h1>
            <h2>Planifica tu estancia para aprovechar al máximo de este pequeño paraíso</h2>
            
        <Link to={'/home'}>Entra</Link>
        </div>
        </>
    );
}

export default Welcome;