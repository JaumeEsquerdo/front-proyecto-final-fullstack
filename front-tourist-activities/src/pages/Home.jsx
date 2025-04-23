import { Link } from "react-router";
import '@/css/pages/home.css'
import { useEffect, useState } from "react";
// import { color } from "framer-motion";
import { useActivity } from '@/context/ActivityContext'
import { useNavigate } from "react-router";
//import { preload } from "react-dom";
// import { verificarLogin } from "@/components/utiles/Auth";



const Home = () => {

    const [verTodas, setVertodas] = useState(false); //para ver solo unas pocas act recomendadas o verlas todas
    const [packAbierto, setPackAbierto] = useState(null) // para abrir el pack segun su indice
    const { setIsAddFormOpen, setPreloadData, preloadData } = useActivity();
    const [actividades, setActividades] = useState([]); // para guardar las acts que llegan d la API
    const [listaDePacks, setListaDePacks] = useState([]) // par aguardar los packs

    const [loadingAct, setLoadingAct] = useState(true) // loding para act
    const [loadingPack, setLoadingPack] = useState(true) // loading para pack
    const [errorAct, setErrorAct] = useState(null) // para errores de acts
    const [errorPack, setErrorPacks] = useState(null) // para errores de packs
    const navigate = useNavigate();

    const actividadesMostradas = verTodas ? actividades : actividades.slice(0, 6) // para solo ver las 6 primeras actividades recomendadas


    const token = localStorage.getItem('token'); // importante, ponerlo fuera para q se actualice de forma general y asi afectar a ambos useEffect


    const API_URL = import.meta.env.VITE_API_URL
    const API_ROUTER = import.meta.env.VITE_API_ROUTER
    const API_ACTIVIDADES = import.meta.env.VITE_API_ACTIVIDADES
    const API_PACKS = import.meta.env.VITE_API_PACKS

    // useEffect para traer todas las actividades recomendadas
    useEffect(() => {
        const fetchActividades = async () => {

            if (!token) return
            try {
                const res = await fetch(`${API_URL}${API_ROUTER}${API_ACTIVIDADES}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    setErrorAct(data.msg || ' error al obtener las actividades')
                    return;
                }

                setActividades(data.data)

            } catch (e) {
                console.error('error en el fetch de actividades en home', e)
                setErrorAct('error en la conexión del servidor')
            } finally {
                setLoadingAct(false)
            }
        }

        fetchActividades();

    }, [token])

    // useEffect(() => {
    //     console.log('actividades cargadas:', actividades);
    // }, [actividades]);


    //useEffect para la API de packs de acts recomendadas
    useEffect(() => {
        const fetchPacksActividades = async () => {
            if (!token) return
            try {
                const res = await fetch(`${API_URL}${API_ROUTER}${API_PACKS}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    setErrorPacks(data.msg || ' error al obtener los packs')
                    return;
                }
                setListaDePacks(data.data)
            } catch (e) {
                console.error('error en el fetch de packs en home', e)
                setErrorPacks('error en la conexión del servidor en el fetch de packs')
            } finally {
                setLoadingPack(false)
            }
        }

        fetchPacksActividades();
    }, [token])


    // para que al cambiar de pagina empiece la otra pagina desde arriba
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    /* Ver todas las actividades o una muestra */
    const handleActividades = () => {
        setVertodas(!verTodas)
    }

    /* ABRIR 1 pack / CERRAR los otros */
    const handleAbrirPack = (i) => {
        setPackAbierto(prev => prev === i ? null : i)
    }

    /* Agregar actividad al Calendario desde home*/
    const handleAgregarACalendario = (actividad) => { // IMPORTANTE!!! al tener dos maps (dos secciones de actividades), los maps tienen q pasar el mismo nombre "actividad", si no no funciona

        //verfico primero si esta logeado
        // const isLogged = verificarLogin(navigate);
        // if (!isLogged) return;

        setPreloadData({
            title: actividad.titulo,
            description: actividad.descripcion
        })
        console.log('handle preload en home', preloadData)
        setIsAddFormOpen(true) // poner en true el isAddFormOpen para que se active el useEffect en Calendario
        navigate('/calendario')
    }

    if (loadingPack) return <p>Cargando packs...</p>;
    if (loadingAct) return <p>Cargando actividades...</p>;
    if (errorAct) return <p>Error en actividades : {errorAct}</p>
    if (errorPack) return <p>Error en packs : {errorPack}</p>

    return (
        <>

            <div className="Home">

                <h1 className="Home-h1">Planifica tu visita a Villajoyosa</h1>

                {/* sección act recomendadas */}
                <section className="Act-section">
                    <h2 className="Act-h2">Packs de recomendaciones</h2>
                    <p className="Act-p">{listaDePacks.length} packs</p>

                    <div className="Act-cardScroll">
                        {listaDePacks.map((pack, i) => (
                            <div onClick={() => handleAbrirPack(i)}
                                key={pack._id} className={`Act-card ${pack.color}`}>
                                <img className="Pack-icono" src={pack.icono} alt="icono pack actividades" />
                                <h3>{pack.nombre}</h3>
                                <p>{pack.actividades.length} actividades</p>



                            </div>
                        ))}

                        {
                            packAbierto !== null && (
                                <div className="Pack-overlay" onClick={() => setPackAbierto(null)}>
                                    <span className="Pack-cerrar">X</span>
                                    <div className={`Pack-detalles ${listaDePacks[packAbierto].color}`} onClick={(e) => e.stopPropagation()}>
                                        <div className="Pack-header">
                                            <img className="Pack-icono" src={listaDePacks[packAbierto].icono} alt="Icono pack" />
                                            <h3>{listaDePacks[packAbierto].nombre}</h3>
                                        </div>

                                        {/* filter para devolver las actividades completas q estan dentro del pack concreto, segun su id */}
                                        {actividades
                                            .filter(actividad => listaDePacks[packAbierto].actividades.includes(actividad._id))
                                            .map(actividad => (
                                                <div key={actividad._id} className="Pack-activity">

                                                    <div className="Activity">
                                                        <h3 className="Activity-h3">{actividad.titulo}</h3>
                                                        <p className="Activity-p">{actividad.descripcion}</p>
                                                    </div>
                                                    <button className="Activity-link" onClick={() => handleAgregarACalendario(actividad)}>Agregar al calendario</button>


                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            )
                        }

                    </div>

                </section>

                <section className="Activities">
                    <div className="Activities-titles">
                        <h2 className="Activities-title">Más actividades recomendadas</h2>
                        <p style={{ marginLeft: "0" }} className="Act-p">{actividadesMostradas.length} actividades</p>
                        <Link className="Activities-more" onClick={handleActividades}>{verTodas ? "Ver menos" : "Ver todas"}</Link>
                    </div>

                    <div>
                        {actividadesMostradas.map((actividad) => (
                            <div className="Activities-act" key={actividad._id}>
                                <img className="Activities-img" src={actividad.icono} alt="Icono actividad" />
                                <div className="Activity">
                                    <h3 className="Activity-h3">{actividad.titulo}</h3>
                                    <p className="Activity-p">{actividad.descripcion}</p>
                                </div>
                                <button className="Activity-link" onClick={() => handleAgregarACalendario(actividad)}>Agregar al calendario</button>
                            </div>
                        ))}

                    </div>

                </section>

            </div>
        </>

    );
}

export default Home;

