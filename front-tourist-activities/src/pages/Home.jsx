import { Link } from "react-router";
import '@/css/pages/home.css'
import { useState } from "react";
// import { color } from "framer-motion";
import { useActivity } from '@/context/ActivityContext'
import { useNavigate } from "react-router";
//import { preload } from "react-dom";
// import { verificarLogin } from "@/components/utiles/Auth";



const Home = () => {

    const [verTodas, setVertodas] = useState(false); //para ver solo unas pocas act recomendadas o verlas todas
    const [packAbierto, setPackAbierto] = useState(null) // para abrir el pack segun su indice
    const { setIsAddFormOpen, setPreloadData, preloadData } = useActivity();
    const navigate = useNavigate();

    const actividades = [
        { id: 'act1', titulo: 'Museo del Chocolate Valor', descripcion: 'Visita guiada y degustación de chocolates.', tipo: 'cultural', icono: '/img/actividades-tipos/act-cultural.svg' },
        { id: 'act2', titulo: 'Playa Centro', descripcion: 'Relájate en la playa principal de Villajoyosa.', tipo: 'playa', icono: '/img/actividades-tipos/act-cultural.svg' },
        { id: 'act3', titulo: 'Casco antiguo', descripcion: 'Paseo entre casas de colores y calles históricas.', tipo: 'cultural', icono: '/img/actividades-tipos/act-cultural.svg' },
        { id: 'act4', titulo: 'Restaurante Ca Marta', descripcion: 'Cocina mediterránea moderna en un entorno elegante.', tipo: 'restaurante', icono: '/img/actividades-tipos/act-cultural.svg' },
        { id: 'act5', titulo: 'Excursión a Guadalest', descripcion: 'Descubre el castillo y el pueblo en lo alto de la montaña.', tipo: 'excursion', icono: '/img/actividades-tipos/act-cultural.svg' },
        { id: 'act6', titulo: 'Mirador del puerto', descripcion: 'Vistas panorámicas del mar y los barcos pesqueros.', tipo: 'cultural', icono: '/img/actividades-tipos/act-cultural.svg' },
        { id: 'act7', titulo: 'Paseo en kayak', descripcion: 'Explora la costa desde el agua.', tipo: 'aventura', icono: '/img/actividades-tipos/act-cultural.svg' },
        { id: 'act8', titulo: 'Ruta de tapas', descripcion: 'Degusta tapas en bares tradicionales.', tipo: 'restaurante', icono: '/img/actividades-tipos/act-cultural.svg' },
        { id: 'act9', titulo: 'Senderismo en la Malladeta', descripcion: 'Camina por senderos con vistas al mar.', tipo: 'aventura', icono: '/img/actividades-tipos/cultural.svg' },
        { id: 'act10', titulo: 'Tarde en Benidorm', descripcion: 'Compras, playa y ambiente turístico.', tipo: 'compras', icono: '/img/actividades-tipos/cultural.svg' },
        { id: 'act11', titulo: 'Paseo por la Vila Vella', descripcion: 'Antiguo barrio pesquero lleno de encanto.', tipo: 'cultural', icono: '/img/actividades-tipos/cultural.svg' },
        { id: 'act12', titulo: 'Excursión a Altea', descripcion: 'Visita este precioso pueblo blanco con vistas.', tipo: 'restaurante', icono: '/img/actividades-tipos/cultural.svg' },
        { id: 'act13', titulo: 'Paseo marítimo', descripcion: 'Camina junto al mar con restaurantes y tiendas.', tipo: 'relax', icono: '/img/actividades-tipos/cultural.svg' },
        { id: 'act14', titulo: 'Chiringuito al atardecer', descripcion: 'Cóctel frente al mar al caer el sol.', tipo: 'restaurante', icono: '/img/actividades-tipos/cultural.svg' },
        { id: 'act15', titulo: 'Museo municipal', descripcion: 'Conoce la historia local y restos arqueológicos.', tipo: 'cultural', icono: '/img/actividades-tipos/cultural.svg' },
        { id: 'act16', titulo: 'Puerto pesquero', descripcion: 'Observa cómo descargan el pescado fresco.', tipo: 'cultural', icono: '/img/actividades-tipos/cultural.svg' },
        { id: 'act17', titulo: 'Mercado de abastos', descripcion: 'Frutas, verduras y productos locales.', tipo: 'compras', icono: '/img/actividades-tipos/cultural.svg' },
        { id: 'act18', titulo: 'Tour fotográfico', descripcion: 'Captura los rincones más bonitos del pueblo.', tipo: 'relax', icono: '/img/actividades-tipos/cultural.svg' },
        { id: 'act19', titulo: 'Taller de cerámica', descripcion: 'Aprende a crear tus propias piezas.', tipo: 'relax' },
        { id: 'act20', titulo: 'Paseo en bici', descripcion: 'Recorre el litoral de forma divertida.', tipo: 'aventura' },
        { id: 'act21', titulo: 'Calle Arsenal', descripcion: 'Una de las calles más pintorescas.', tipo: 'cultural' },
        { id: 'act22', titulo: 'Cata de vinos en Handeland', descripcion: 'Degusta vinos alicantinos en una bodega local.', tipo: 'restaurante' },
        { id: 'act23', titulo: 'Helado artesanal', descripcion: 'Prueba los sabores típicos de la zona.', tipo: 'restaurante' },
        { id: 'act24', titulo: 'Visita al Faro', descripcion: 'Punto de referencia y vistas al horizonte.', tipo: 'paseos' },
        { id: 'act25', titulo: 'Playa El Paraíso', descripcion: 'Menos concurrida y con aguas cristalinas.', tipo: 'playa' },
        { id: 'act26', titulo: 'Paseo en barco', descripcion: 'Tour por la costa o excursión de pesca.', tipo: 'aventura' },
        { id: 'act27', titulo: 'Tour histórico', descripcion: 'Recorrido guiado sobre la historia local.', tipo: 'cultural' },
        { id: 'act28', titulo: 'Clases de paddle surf', descripcion: 'Diviértete en el mar con este deporte acuático.', tipo: 'aventura' },
        { id: 'act29', titulo: 'Mercadillo de los jueves', descripcion: 'Productos textiles, comida y más.', tipo: 'compras' },
        { id: 'act30', titulo: 'Día en Terra Mítica', descripcion: 'Parque temático en Benidorm.', tipo: 'ocio' },
        { id: 'act31', titulo: 'Spa y relajación', descripcion: 'Un rato de desconexión en un spa local.', tipo: 'relax' },
        { id: 'act32', titulo: 'Les Puntes de Gosàlvez', descripcion: 'Yacimiento arqueológico en plena naturaleza.', tipo: 'cultural' },
        { id: 'act33', titulo: 'Picnic en la playa', descripcion: 'Desayuno o merienda con vistas al mar.', tipo: 'playa' },
        { id: 'act34', titulo: 'Noche de estrellas', descripcion: 'Observación astronómica en zona oscura.', tipo: 'aventura' },
        { id: 'act35', titulo: 'Taller de cocina', descripcion: 'Aprende a hacer paella o arroces alicantinos.', tipo: 'cultural' },
        { id: 'act36', titulo: 'Galería de arte local', descripcion: 'Arte contemporáneo de artistas de la zona.', tipo: 'cultural' },
        { id: 'act37', titulo: 'Jornada de pesca', descripcion: 'Acompaña a pescadores o haz pesca recreativa.', tipo: 'aventura' },
        { id: 'act38', titulo: 'Café en Hotel Censal', descripcion: 'Tómate un café en el centro.', tipo: 'bar' },
        { id: 'act39', titulo: 'Castillo de Benidorm', descripcion: 'Restos del castillo y su mirador.', tipo: 'cultural' },
        { id: 'act40', titulo: 'Tarde en el cine', descripcion: 'Películas en versión original o dobladas.', tipo: 'relax' },
        { id: 'act41', titulo: 'Excursión a Calpe', descripcion: 'Subida al Peñón de Ifach y mariscos frescos.', tipo: 'excursion' },
        { id: 'act42', titulo: 'Atardecer desde torre Sant Josep', descripcion: 'Rincón histórico y panorámica única.', tipo: 'paseos' },
        { id: 'act43', titulo: 'Ruta en segway', descripcion: 'Descubre la ciudad de forma divertida.', tipo: 'aventura' },
        { id: 'act44', titulo: 'Taller de mosaico romano', descripcion: 'Manualidad inspirada en la historia local.', tipo: 'cultural' },
        { id: 'act45', titulo: 'Paseo con guía local', descripcion: 'Conoce curiosidades y secretos del pueblo.', tipo: 'cultural' },
        { id: 'act46', titulo: 'Día de compras', descripcion: 'Tiendas locales y souvenirs.', tipo: 'compras' },
        { id: 'act47', titulo: 'Cine de verano', descripcion: 'Películas al aire libre junto al mar.', tipo: 'relax' },
        { id: 'act48', titulo: 'Concierto en la plaza', descripcion: 'Música en vivo en noches especiales.', tipo: 'cultural' },
        { id: 'act49', titulo: 'Visita a la lonja', descripcion: 'Ver la subasta del pescado fresco.', tipo: 'cultural' },
        { id: 'act50', titulo: 'Clase de yoga en la playa', descripcion: 'Relajación y bienestar al amanecer.', tipo: 'relax' },
        { id: 'act51', titulo: 'Restaurante Hogar del Pescador', descripcion: 'Famoso por su arroz a banda y marisco fresco.', tipo: 'restaurante' },
        { id: 'act52', titulo: 'Heladería El Buen Gusto', descripcion: 'Heladería artesanal con sabores únicos.', tipo: 'restaurante' },
        { id: 'act53', titulo: 'Restaurante El Posit', descripcion: 'Cocina mediterránea con platos de autor.', tipo: 'restaurante' },
        { id: 'act54', titulo: 'T-Class', descripcion: 'Restaurante de tapas modernas junto al paseo marítimo.', tipo: 'restaurante' },
        { id: 'act55', titulo: 'Chocolatería Valor', descripcion: 'Churros con chocolate clásicos y crujientes.', tipo: 'bar' },
        { id: 'act56', titulo: 'Bar El Mercantil', descripcion: 'Ambiente local con vermuts y tapas.', tipo: 'bar' },
        { id: 'act57', titulo: 'La Cabaña Chill Out', descripcion: 'Cócteles frente al mar en ambiente relajado.', tipo: 'bar' },
        { id: 'act58', titulo: 'Bar El Tintero', descripcion: 'Bar típico con cerveza fría y vistas al puerto.', tipo: 'bar' },
        { id: 'act59', titulo: 'Café Teatret', descripcion: 'Café bohemio con libros y música en directo.', tipo: 'bar' },
        { id: 'act60', titulo: 'Café ChocoArt', descripcion: 'Especialistas en café y repostería con chocolate.', tipo: 'bar' },
        { id: 'act61', titulo: 'L’Eixida', descripcion: 'Tienda de productos artesanales y ecológicos.', tipo: 'compras' },
        { id: 'act62', titulo: 'Tienda Valor', descripcion: 'Productos de chocolate, souvenirs y regalos.', tipo: 'compras' },
        { id: 'act63', titulo: 'Boutique Maralba', descripcion: 'Ropa y accesorios con estilo mediterráneo.', tipo: 'compras' },
        { id: 'act64', titulo: 'Mercería La Moderna', descripcion: 'Tienda de toda la vida para artículos textiles.', tipo: 'compras' },
        { id: 'act65', titulo: 'Librería Espai Lector Nobel', descripcion: 'Librería con selección de libros y papelería.', tipo: 'compras' },
        { id: 'act66', titulo: 'Paseo por el Casco Antiguo', descripcion: 'Calles coloridas con historia marinera.', tipo: 'paseos' },
        { id: 'act67', titulo: 'Paseo por el Paseo Marítimo', descripcion: 'Camina junto al mar con vistas al puerto y palmeras.', tipo: 'paseos' },
        { id: 'act69', titulo: 'Paseo por la Playa del Torres', descripcion: 'Camino con vistas a calas y restos romanos.', tipo: 'paseos' },
        { id: 'act70', titulo: 'Camino a la Ermita de Sant Antoni', descripcion: 'Subida suave con vistas panorámicas del pueblo.', tipo: 'paseos' },
        { id: 'act71', titulo: 'Paseo al Faro de Villajoyosa', descripcion: 'Corto recorrido hasta el faro con vistas al Mediterráneo.', tipo: 'paseos' },
        { id: 'act72', titulo: 'Ruta de los Murales de Villajoyosa', descripcion: 'Descubre arte urbano en el centro histórico.', tipo: 'paseos' },
        { id: 'act73', titulo: 'Playa El Paraíso', descripcion: 'Amplia playa de grava y aguas cristalinas.', tipo: 'playa' },
        { id: 'act74', titulo: 'Playa del Torres', descripcion: 'Playa tranquila con restos arqueológicos romanos.', tipo: 'playa' },
        { id: 'act75', titulo: 'Playa La Caleta', descripcion: 'Cala acogedora de piedras rodeada de naturaleza.', tipo: 'playa' },
        { id: 'act76', titulo: 'Playa de los Estudiantes', descripcion: 'Pequeña cala escondida ideal para el relax.', tipo: 'playa' },
        { id: 'act77', titulo: 'Playa de Bon Nou', descripcion: 'Agua turquesa y ambiente local.', tipo: 'playa' },
        { id: 'act78', titulo: 'Playa de El Campello', descripcion: 'Larga playa con paseo marítimo y muchas opciones para comer.', tipo: 'playa' },
        { id: 'act79', titulo: 'Playa de Altea', descripcion: 'Playas de piedras con vistas preciosas y ambiente bohemio.', tipo: 'playa' },
        { id: 'act80', titulo: 'Cala del Tío Ximo (Benidorm)', descripcion: 'Cala escondida rodeada de naturaleza ideal para snorkel.', tipo: 'playa' },
        { id: 'act81', titulo: 'Playa de Levante (Benidorm)', descripcion: 'Una de las playas más famosas de la zona, con mucha vida.', tipo: 'playa' },
        { id: 'act82', titulo: 'Playa Racó del Conill', descripcion: 'Playa nudista de ambiente tranquilo y rodeada de rocas.', tipo: 'playa' },


    ];
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
                                                <div key={actividad.id} className="Pack-activity">

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
                            <div className="Activities-act" key={actividad.id}>
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

