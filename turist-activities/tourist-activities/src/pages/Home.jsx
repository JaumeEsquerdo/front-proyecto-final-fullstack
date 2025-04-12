import { Link } from "react-router";
import '@/css/pages/home.css'
import { useState } from "react";



const Home = () => {
    return (
        <>

            <div className="Home">

                <h1>Aún te preguntas que puedes hacer en la vila?</h1>
                {/* sección act recomendadas */}
                <section className="Act-section">
                    <h2 className="Act-h2">Packs de actividades</h2>
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
                    <div className="Pending-titles">
                        <h2 className="Pending-title">Más actividades recomendadas</h2>
                        <Link className="Pending-all" to='/tareas'>Ver todas</Link>
                    </div>

                    <div className="Pending-act">
                        <div className="Pending-icon">Icon</div>
                        <div className="ActPending">
                            <h3 className="ActPending-h3">Museo Chocolates Valor</h3>
                            <p className="ActPending-p">Visita al museo de chocolates Valor</p>
                            <p className="ActPending-time">11:00-12:30</p>
                            <div className="Pending-links">
                                <Link className="Pending-link">Actividad</Link>
                                <Link className="Pending-link--violet" to='/secciones'>Calendario</Link>
                                
                            </div>
                        </div>
                    </div>

                    <div className="Pending-act">
                        <div className="Pending-icon">Icon</div>
                        <div className="ActPending">
                            <h3 className="ActPending-h3">Restaurante El Pòsit</h3>
                            <p className="ActPending-p">Comida familiar en la playa centro</p>
                            <p className="ActPending-time">14:00</p>
                            <div  className="Pending-links">
                                <Link className="Pending-link">Actividad</Link>
                                <Link className="Pending-link--violet">Calendario</Link>
                                
                            </div>
                        </div>
                    </div>
                    <div className="Pending-act">
                        <div className="Pending-icon">Icon</div>
                        <div className="ActPending">
                            <h3 className="ActPending-h3">Restaurante El Pòsit</h3>
                            <p className="ActPending-p">Comida familiar en la playa centro</p>
                            <p className="ActPending-time">14:00</p>
                            <div  className="Pending-links">
                                <Link className="Pending-link">Actividad</Link>
                                <Link className="Pending-link--violet">Calendario</Link>
                                
                            </div>
                        </div>
                    </div>
                    <div className="Pending-act">
                        <div className="Pending-icon">Icon</div>
                        <div className="ActPending">
                            <h3 className="ActPending-h3">Restaurante El Pòsit</h3>
                            <p className="ActPending-p">Comida familiar en la playa centro</p>
                            <p className="ActPending-time">14:00</p>
                            <div  className="Pending-links">
                                <Link className="Pending-link">Actividad</Link>
                                <Link className="Pending-link--violet">Calendario</Link>
                                
                            </div>
                        </div>
                    </div>
                    
                </section>


            </div>
        </>

    );
}

export default Home;