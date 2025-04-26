import { Link } from "react-router";
import '@/css/pages/home.css'
import { useEffect, useState } from "react";
// import { color } from "framer-motion";
import { useActivity } from '@/context/ActivityContext'
import { useNavigate } from "react-router";
import { color } from "framer-motion";
import { ActivityCard, ActivityFilters, PackCard, PackDetails } from "@/components/home/HomeSections";
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

    const tipos = [ // para filtrar cuando esté activo verTodas
        { nombre: 'Todos', valor: '' },
        { nombre: 'Naturaleza', valor: 'naturaleza' },
        { nombre: 'Cultural', valor: 'cultural' },
        { nombre: 'Playa', valor: 'playa' },
        { nombre: 'Deporte', valor: 'deporte' },
        { nombre: 'Gastronomía', valor: 'gastronomia' },
        { nombre: 'Ocio', valor: 'ocio' },
    ]

    const [tipoSeleccionado, setTipoSeleccionado] = useState('')

    const token = localStorage.getItem('token'); // importante, ponerlo fuera para q se actualice de forma general y asi afectar a ambos useEffect


    const API_URL = import.meta.env.VITE_API_URL
    const API_ROUTER = import.meta.env.VITE_API_ROUTER
    const API_ACTIVIDADES_PUBLIC = import.meta.env.VITE_API_ACTIVIDADES_PUBLIC
    const API_PACKS = import.meta.env.VITE_API_PACKS


    const actividadesMostradas = verTodas ? actividades : actividades.slice(0, 6) // para solo ver las 6 primeras actividades recomendadas



    // handle para poner el tipo clickado
    const handleFiltroTipo = (tipo) => {
        setTipoSeleccionado(tipo)
    }

    const actividadesFiltradas = tipoSeleccionado ? actividadesMostradas.filter((act) => act.tipo === tipoSeleccionado) : actividadesMostradas;


    // useEffect para traer todas las actividades recomendadas
    useEffect(() => {
        const fetchActividades = async () => {

            if (!token) return
            try {
                const res = await fetch(`${API_URL}${API_ROUTER}${API_ACTIVIDADES_PUBLIC}`, {
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
                            <PackCard
                                i={i}
                                key={pack._id}
                                pack={pack}
                                handleAbrirPack={handleAbrirPack}
                            />
                        ))}

                        {
                            packAbierto !== null && (
                                <PackDetails
                                    listaDePacks={listaDePacks}
                                    packAbierto={packAbierto}
                                    actividades={actividades}
                                    setPackAbierto={setPackAbierto}
                                    handleAgregarACalendario={handleAgregarACalendario}
                                />
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

                    {verTodas && (
                        <ActivityFilters
                            tipos={tipos}
                            tipoSeleccionado={tipoSeleccionado}
                            handleFiltroTipo={handleFiltroTipo}
                        />
                    )}

                    <div className="Activities-layout">
                        {actividadesFiltradas.map((actividad) => (
                            < ActivityCard
                                key={actividad._id}
                                actividad={actividad}
                                handleAgregarACalendario={handleAgregarACalendario}
                            />
                        ))}

                    </div>

                </section>

            </div>
        </>

    );
}

export default Home;

