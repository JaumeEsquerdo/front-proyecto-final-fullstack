import { Link } from "react-router";
import '@/css/pages/home.css'



const Home = () => {
    return (
        <>

            <div className="Home">

                <h1>Guíate con antelación</h1>
                {/* sección act recomendadas */}
                <section className="Act-section">
                    <h2 className="Act-h2">Actividades recomendadas</h2>
                    <p className="Act-p">2 packs</p>

                    <div className="Act-cardScroll">
                        <div className="Act-card orange">
                            <h3>Día de paseos!</h3>
                            <p>un total de 4 actividades</p>
                            <div className="Act-icons">4 iconos de temas de los paseos</div>
                        </div>

                        <div className="Act-card blue">
                            <h3>Día de playa</h3>
                            <p>un total de 3 actividades</p>
                            <div className="Act-icons">3</div>
                        </div>

                        <div className="Act-card yellow">
                            <h3>Día de playa</h3>
                            <p>un total de 3 actividades</p>
                            <div className="Act-icons">3</div>
                        </div>

                    </div>
                </section>

                <section className="Pending">
                    <div>
                        <h2>Tus actividades pendientes</h2>
                        <Link to='/tareas' className="VerTodas">Ver todas</Link>
                    </div>

                    <div className="Pending-act">
                        <div className="Pending-icon">Icon</div>
                        <div className="ActPending">
                            <h3 className="ActPending-h3">Museo Chocolates Valor</h3>
                            <p className="ActPending-p">Visita al museo de chocolates Valor</p>
                            <p className="ActPending-time">11:00-12:30</p>
                            <div>
                                <Link>Actividad</Link>
                                <Link>Calendario</Link>
                                
                            </div>
                        </div>
                    </div>

                    <div className="Pending-act">
                        <div className="Pending-icon">Icon</div>
                        <div className="ActPending">
                            <h3 className="ActPending-h3">Restaurante El Pòsit</h3>
                            <p className="ActPending-p">Comida familiar en la playa centro</p>
                            <p className="ActPending-time">14:00</p>
                            <div>
                                <Link>Actividad</Link>
                                <Link>Calendario</Link>
                                
                            </div>
                        </div>
                    </div>
                    
                </section>


            </div>
        </>

    );
}

export default Home;