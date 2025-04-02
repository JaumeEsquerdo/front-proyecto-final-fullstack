import { Link } from "react-router";



const Home = () => {
    return (
        <>
            
            <div className="Home">

                <h1>Guíate con antelación</h1>
                <div className="Home-links">
                    <Link className="Home-link" to={'/secciones'}>Echa un vistazo</Link>
                    <Link className="Home-link" to={'/secciones'}>Regístrate para ir directo</Link>
                </div>

            </div>
        </>

    );
}

export default Home;