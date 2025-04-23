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
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate();

    // const actividades = [
    //     { id: 'act1', titulo: 'Museo del Chocolate Valor', descripcion: 'Visita guiada y degustación de chocolates.', tipo: 'cultural', icono: '/img/actividades-tipos/act-cultural.svg' },
    //     { id: 'act2', titulo: 'Playa Centro', descripcion: 'Relájate en la playa principal de Villajoyosa.', tipo: 'playa', icono: '/img/actividades-tipos/act-cultural.svg' },
    //     { id: 'act3', titulo: 'Casco antiguo', descripcion: 'Paseo entre casas de colores y calles históricas.', tipo: 'cultural', icono: '/img/actividades-tipos/act-cultural.svg' },
    //     { id: 'act4', titulo: 'Restaurante Ca Marta', descripcion: 'Cocina mediterránea moderna en un entorno elegante.', tipo: 'restaurante', icono: '/img/actividades-tipos/act-cultural.svg' },
    //     { id: 'act5', titulo: 'Excursión a Guadalest', descripcion: 'Descubre el castillo y el pueblo en lo alto de la montaña.', tipo: 'excursion', icono: '/img/actividades-tipos/act-cultural.svg' },
    //     { id: 'act6', titulo: 'Mirador del puerto', descripcion: 'Vistas panorámicas del mar y los barcos pesqueros.', tipo: 'cultural', icono: '/img/actividades-tipos/act-cultural.svg' },
    //     { id: 'act7', titulo: 'Paseo en kayak', descripcion: 'Explora la costa desde el agua.', tipo: 'aventura', icono: '/img/actividades-tipos/act-cultural.svg' },
    //     { id: 'act8', titulo: 'Ruta de tapas', descripcion: 'Degusta tapas en bares tradicionales.', tipo: 'restaurante', icono: '/img/actividades-tipos/act-cultural.svg' },
    //     { id: 'act9', titulo: 'Senderismo en la Malladeta', descripcion: 'Camina por senderos con vistas al mar.', tipo: 'aventura', icono: '/img/actividades-tipos/cultural.svg' },
    //     { id: 'act10', titulo: 'Tarde en Benidorm', descripcion: 'Compras, playa y ambiente turístico.', tipo: 'compras', icono: '/img/actividades-tipos/cultural.svg' },
    //     { id: 'act11', titulo: 'Paseo por la Vila Vella', descripcion: 'Antiguo barrio pesquero lleno de encanto.', tipo: 'cultural', icono: '/img/actividades-tipos/cultural.svg' },
    //     { id: 'act12', titulo: 'Excursión a Altea', descripcion: 'Visita este precioso pueblo blanco con vistas.', tipo: 'restaurante', icono: '/img/actividades-tipos/cultural.svg' },
    //     { id: 'act13', titulo: 'Paseo marítimo', descripcion: 'Camina junto al mar con restaurantes y tiendas.', tipo: 'relax', icono: '/img/actividades-tipos/cultural.svg' },
    //     { id: 'act14', titulo: 'Chiringuito al atardecer', descripcion: 'Cóctel frente al mar al caer el sol.', tipo: 'restaurante', icono: '/img/actividades-tipos/cultural.svg' },
    //     { id: 'act15', titulo: 'Museo municipal', descripcion: 'Conoce la historia local y restos arqueológicos.', tipo: 'cultural', icono: '/img/actividades-tipos/cultural.svg' },
    //     { id: 'act16', titulo: 'Puerto pesquero', descripcion: 'Observa cómo descargan el pescado fresco.', tipo: 'cultural', icono: '/img/actividades-tipos/cultural.svg' },
    //     { id: 'act17', titulo: 'Mercado de abastos', descripcion: 'Frutas, verduras y productos locales.', tipo: 'compras', icono: '/img/actividades-tipos/cultural.svg' },
    //     { id: 'act18', titulo: 'Tour fotográfico', descripcion: 'Captura los rincones más bonitos del pueblo.', tipo: 'relax', icono: '/img/actividades-tipos/cultural.svg' },
    
    // ];

    
    const actividadesMostradas = verTodas ? actividades : actividades.slice(0, 6) // para solo ver las 6 primeras actividades recomendadas


    const listaDePacks = [
        {
            nombre: 'Día de playa',
            icono: '/img/playa.svg',
            color: 'orange',
            actividades: [
                'act2',  // Playa Centro
                'act38', // Almuerzo en T-Class
                'act22', // Heladería La Jijonenca
                'act45', // Paseo Marítimo
                'act54', // Tienda de recuerdos junto a la playa
            ]
        },
        {
            nombre: 'Día cultural',
            icono: '/img/cultural.svg',
            color: 'blue',
            actividades: [
                'act1',  // Museo Chocolates Valor
                'act9',  // Casco Antiguo de Villajoyosa
                'act10', // Murallas renacentistas
                'act41', // Café en Zerca
                'act30', // Visita al Mercado Central
            ]
        },
        {
            nombre: 'Excursión a Altea',
            icono: '/img/excursion.svg',
            color: 'yellow',
            actividades: [
                'act65', // Playa de Altea
                'act66', // Casco antiguo de Altea
                'act67', // Iglesia de Nuestra Señora del Consuelo
                'act38', // Almuerzo en T-Class (de vuelta)
                'act28', // Paseo vespertino
            ]
        },
        {
            nombre: 'Día gastronómico',
            icono: '/img/gastronomia.svg',
            color: 'red',
            actividades: [
                'act31', // Restaurante El Hogar del Pescador
                'act32', // Restaurante Ca Marta
                'act33', // Bar El Tintero
                'act22', // Heladería La Jijonenca
                'act55', // Compras gourmet
            ]
        },
        {
            nombre: 'Naturaleza y relax',
            icono: '/img/naturaleza.svg',
            color: 'green',
            actividades: [
                'act12', // Ruta por el río Amadorio
                'act13', // Mirador de La Creueta
                'act14', // Parque Censal
                'act29', // Lectura en el parque
                'act44', // Té en The Garden Café
            ]
        }
    ];

    const API_URL = import.meta.env.VITE_API_URL
    const API_ROUTER = import.meta.env.VITE_API_ROUTER
    const API_ACTIVIDADES = import.meta.env.VITE_API_ACTIVIDADES

    // useEffect para traer todas las actividades recomendadas
    useEffect(()=>{
        const fetchActividades = async () => {
            const token = localStorage.getItem('token');

            try{
                const res = await fetch(`${API_URL}${API_ROUTER}${API_ACTIVIDADES}`,{
                    method:'GET',
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });

                const data = await res.json();

                if(!res.ok){
                    setError(data.msg ||' error al obtener las actividades')
                    return;
                }

                setActividades(data.data)

            }catch(e){
                console.error('error en el fetch de actividades en home', e)
                setError('error en la conexión del servidor')
            } finally{
                setLoading(false)
            }
        }
        
        fetchActividades();
        
    },[])

    useEffect(() => {
        console.log('actividades cargadas:', actividades);
      }, [actividades]);

    

    // para que al cambiar de pagina empiece la otra pagina desde arriba
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])


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

    if(loading) return <p>Cargando actividades...</p>;
    if(error) return <p>Error : {error}</p>

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
                                key={i} className={`Act-card ${pack.color}`}>
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
                                            .filter(actividad => listaDePacks[packAbierto].actividades.includes(actividad.id))
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

