import { Link } from "react-router";
import '@/css/pages/home.css'
import { useState } from "react";
import { color } from "framer-motion";



const Home = () => {

    const [verTodas, setVertodas] = useState(false); //para ver solo unas pocas act recomendadas o verlas todas
    const [packAbierto, setPackAbierto] = useState(null) // para abrir el pack segun su indice


    const actividades = [
        { id: 'act1', titulo: 'Museo del Chocolate Valor', descripcion: 'Visita guiada y degustación de chocolates.', icono: '🍫', tipo: 'cultural' },
        { id: 'act2', titulo: 'Playa Centro', descripcion: 'Relájate en la playa principal de Villajoyosa.', icono: '🏖️', tipo: 'playa' },
        { id: 'act3', titulo: 'Casco antiguo', descripcion: 'Paseo entre casas de colores y calles históricas.', icono: '🏘️', tipo: 'cultural' },
        { id: 'act4', titulo: 'Restaurante Ca Marta', descripcion: 'Cocina mediterránea moderna en un entorno elegante.', icono: '🍽️', tipo: 'restaurante' },
        { id: 'act5', titulo: 'Excursión a Guadalest', descripcion: 'Descubre el castillo y el pueblo en lo alto de la montaña.', icono: '🏰', tipo: 'excursion' },
        { id: 'act6', titulo: 'Mirador del puerto', descripcion: 'Vistas panorámicas del mar y los barcos pesqueros.', icono: '🌅', tipo: 'cultural' },
        { id: 'act7', titulo: 'Paseo en kayak', descripcion: 'Explora la costa desde el agua.', icono: '🛶', tipo: 'aventura' },
        { id: 'act8', titulo: 'Ruta de tapas', descripcion: 'Degusta tapas en bares tradicionales.', icono: '🍢', tipo: 'gastronomia' },
        { id: 'act9', titulo: 'Senderismo en la Malladeta', descripcion: 'Camina por senderos con vistas al mar.', icono: '🥾', tipo: 'aventura' },
        { id: 'act10', titulo: 'Tarde en Benidorm', descripcion: 'Compras, playa y ambiente turístico.', icono: '🌇', tipo: 'compras' },
        { id: 'act11', titulo: 'Paseo por la Vila Vella', descripcion: 'Antiguo barrio pesquero lleno de encanto.', icono: '🏚️', tipo: 'cultural' },
        { id: 'act12', titulo: 'Excursión a Altea', descripcion: 'Visita este precioso pueblo blanco con vistas.', icono: '🏞️', tipo: 'excursion' },
        { id: 'act13', titulo: 'Paseo marítimo', descripcion: 'Camina junto al mar con restaurantes y tiendas.', icono: '🚶‍♀️', tipo: 'relax' },
        { id: 'act14', titulo: 'Chiringuito al atardecer', descripcion: 'Cóctel frente al mar al caer el sol.', icono: '🍹', tipo: 'restaurante' },
        { id: 'act15', titulo: 'Museo municipal', descripcion: 'Conoce la historia local y restos arqueológicos.', icono: '🏺', tipo: 'cultural' },
        { id: 'act16', titulo: 'Puerto pesquero', descripcion: 'Observa cómo descargan el pescado fresco.', icono: '⚓', tipo: 'cultural' },
        { id: 'act17', titulo: 'Mercado de abastos', descripcion: 'Frutas, verduras y productos locales.', icono: '🛒', tipo: 'compras' },
        { id: 'act18', titulo: 'Tour fotográfico', descripcion: 'Captura los rincones más bonitos del pueblo.', icono: '📷', tipo: 'relax' },
        { id: 'act19', titulo: 'Taller de cerámica', descripcion: 'Aprende a crear tus propias piezas.', icono: '🎨', tipo: 'taller' },
        { id: 'act20', titulo: 'Paseo en bici', descripcion: 'Recorre el litoral de forma divertida.', icono: '🚴', tipo: 'aventura' },
        { id: 'act21', titulo: 'Calle Arsenal', descripcion: 'Una de las calles más pintorescas.', icono: '🏘️', tipo: 'cultural' },
        { id: 'act22', titulo: 'Cata de vinos', descripcion: 'Degusta vinos alicantinos en una bodega local.', icono: '🍷', tipo: 'gastronomia' },
        { id: 'act23', titulo: 'Helado artesanal', descripcion: 'Prueba los sabores típicos de la zona.', icono: '🍦', tipo: 'gastronomia' },
        { id: 'act24', titulo: 'Visita al Faro', descripcion: 'Punto de referencia y vistas al horizonte.', icono: '🔦', tipo: 'mirador' },
        { id: 'act25', titulo: 'Playa El Paraíso', descripcion: 'Menos concurrida y con aguas cristalinas.', icono: '🏖️', tipo: 'playa' },
        { id: 'act26', titulo: 'Paseo en barco', descripcion: 'Tour por la costa o excursión de pesca.', icono: '🚤', tipo: 'aventura' },
        { id: 'act27', titulo: 'Tour histórico', descripcion: 'Recorrido guiado sobre la historia local.', icono: '📖', tipo: 'cultural' },
        { id: 'act28', titulo: 'Clases de paddle surf', descripcion: 'Diviértete en el mar con este deporte acuático.', icono: '🏄', tipo: 'aventura' },
        { id: 'act29', titulo: 'Mercadillo de los jueves', descripcion: 'Productos textiles, comida y más.', icono: '🧺', tipo: 'compras' },
        { id: 'act30', titulo: 'Día en Terra Mítica', descripcion: 'Parque temático en Benidorm.', icono: '🎢', tipo: 'ocio' },
        { id: 'act31', titulo: 'Spa y relajación', descripcion: 'Un rato de desconexión en un spa local.', icono: '💆‍♂️', tipo: 'relax' },
        { id: 'act32', titulo: 'Les Puntes de Gosàlvez', descripcion: 'Yacimiento arqueológico en plena naturaleza.', icono: '🗿', tipo: 'cultural' },
        { id: 'act33', titulo: 'Picnic en la playa', descripcion: 'Desayuno o merienda con vistas al mar.', icono: '🧺', tipo: 'playa' },
        { id: 'act34', titulo: 'Noche de estrellas', descripcion: 'Observación astronómica en zona oscura.', icono: '🌌', tipo: 'aventura' },
        { id: 'act35', titulo: 'Taller de cocina', descripcion: 'Aprende a hacer paella o arroces alicantinos.', icono: '👨‍🍳', tipo: 'cultural' },
        { id: 'act36', titulo: 'Galería de arte local', descripcion: 'Arte contemporáneo de artistas de la zona.', icono: '🖼️', tipo: 'cultural' },
        { id: 'act37', titulo: 'Jornada de pesca', descripcion: 'Acompaña a pescadores o haz pesca recreativa.', icono: '🎣', tipo: 'aventura' },
        { id: 'act38', titulo: 'Café con vistas', descripcion: 'Tómate un café mirando al mar.', icono: '☕', tipo: 'relax' },
        { id: 'act39', titulo: 'Castillo de Benidorm', descripcion: 'Restos del castillo y su mirador.', icono: '🏯', tipo: 'cultural' },
        { id: 'act40', titulo: 'Tarde en el cine', descripcion: 'Películas en versión original o dobladas.', icono: '🎬', tipo: 'ocio' },
        { id: 'act41', titulo: 'Excursión a Calpe', descripcion: 'Subida al Peñón de Ifach y mariscos frescos.', icono: '🪨', tipo: 'excursion' },
        { id: 'act42', titulo: 'Atardecer desde torre Sant Josep', descripcion: 'Rincón histórico y panorámica única.', icono: '🏛️', tipo: 'mirador' },
        { id: 'act43', titulo: 'Ruta en segway', descripcion: 'Descubre la ciudad de forma divertida.', icono: '🛴', tipo: 'aventura' },
        { id: 'act44', titulo: 'Taller de mosaico romano', descripcion: 'Manualidad inspirada en la historia local.', icono: '🔶', tipo: 'cultural' },
        { id: 'act45', titulo: 'Paseo con guía local', descripcion: 'Conoce curiosidades y secretos del pueblo.', icono: '🗺️', tipo: 'cultural' },
        { id: 'act46', titulo: 'Día de compras', descripcion: 'Tiendas locales y souvenirs.', icono: '🛍️', tipo: 'compras' },
        { id: 'act47', titulo: 'Cine de verano', descripcion: 'Películas al aire libre junto al mar.', icono: '📽️', tipo: 'ocio' },
        { id: 'act48', titulo: 'Concierto en la plaza', descripcion: 'Música en vivo en noches especiales.', icono: '🎶', tipo: 'ocio' },
        { id: 'act49', titulo: 'Visita a la lonja', descripcion: 'Ver la subasta del pescado fresco.', icono: '🐟', tipo: 'cultural' },
        { id: 'act50', titulo: 'Clase de yoga en la playa', descripcion: 'Relajación y bienestar al amanecer.', icono: '🧘‍♀️', tipo: 'relax' },
        { id: 'act51', titulo: 'Restaurante Hogar del Pescador', descripcion: 'Famoso por su arroz a banda y marisco fresco.', icono: '🍤', tipo: 'restaurante' },
        { id: 'act52', titulo: 'Heladería El Buen Gusto', descripcion: 'Heladería artesanal con sabores únicos.', icono: '🍨', tipo: 'restaurante' },
        { id: 'act53', titulo: 'Restaurante El Posit', descripcion: 'Cocina mediterránea con platos de autor.', icono: '🥘', tipo: 'restaurante' },
        { id: 'act54', titulo: 'T-Class', descripcion: 'Restaurante de tapas modernas junto al paseo marítimo.', icono: '🍷', tipo: 'restaurante' },
        { id: 'act55', titulo: 'Chocolatería Valor', descripcion: 'Churros con chocolate clásicos y crujientes.', icono: '🥖', tipo: 'bar' },
        { id: 'act56', titulo: 'Bar El Mercantil', descripcion: 'Ambiente local con vermuts y tapas.', icono: '🍻', tipo: 'bar' },
        { id: 'act57', titulo: 'La Cabaña Chill Out', descripcion: 'Cócteles frente al mar en ambiente relajado.', icono: '🍸', tipo: 'bar' },
        { id: 'act58', titulo: 'Bar El Tintero', descripcion: 'Bar típico con cerveza fría y vistas al puerto.', icono: '🍺', tipo: 'bar' },
        { id: 'act59', titulo: 'Café Teatret', descripcion: 'Café bohemio con libros y música en directo.', icono: '☕', tipo: 'bar' },
        { id: 'act60', titulo: 'Café ChocoArt', descripcion: 'Especialistas en café y repostería con chocolate.', icono: '🍫', tipo: 'bar' },
        { id: 'act61', titulo: 'L’Eixida', descripcion: 'Tienda de productos artesanales y ecológicos.', icono: '🧺', tipo: 'compras' },
        { id: 'act62', titulo: 'Tienda Valor', descripcion: 'Productos de chocolate, souvenirs y regalos.', icono: '🍬', tipo: 'compras' },
        { id: 'act63', titulo: 'Boutique Maralba', descripcion: 'Ropa y accesorios con estilo mediterráneo.', icono: '👗', tipo: 'compras' },
        { id: 'act64', titulo: 'Mercería La Moderna', descripcion: 'Tienda de toda la vida para artículos textiles.', icono: '🧵', tipo: 'compras' },
        { id: 'act65', titulo: 'Librería Espai Lector Nobel', descripcion: 'Librería con selección de libros y papelería.', icono: '📚', tipo: 'compras' },
        { id: 'act66', titulo: 'Paseo por el Casco Antiguo', descripcion: 'Calles coloridas con historia marinera.', icono: '🏘️', tipo: 'paseos' },
        { id: 'act67', titulo: 'Paseo por el Paseo Marítimo', descripcion: 'Camina junto al mar con vistas al puerto y palmeras.', icono: '🌴', tipo: 'paseos' },
        { id: 'act69', titulo: 'Paseo por la Playa del Torres', descripcion: 'Camino con vistas a calas y restos romanos.', icono: '🌊', tipo: 'paseos' },
        { id: 'act70', titulo: 'Camino a la Ermita de Sant Antoni', descripcion: 'Subida suave con vistas panorámicas del pueblo.', icono: '⛪', tipo: 'paseos' },
        { id: 'act71', titulo: 'Paseo al Faro de Villajoyosa', descripcion: 'Corto recorrido hasta el faro con vistas al Mediterráneo.', icono: '🚶‍♂️', tipo: 'paseos' },
        { id: 'act72', titulo: 'Ruta de los Murales de Villajoyosa', descripcion: 'Descubre arte urbano en el centro histórico.', icono: '🎨', tipo: 'paseos' },
        { id: 'act73', titulo: 'Playa El Paraíso', descripcion: 'Amplia playa de grava y aguas cristalinas.', icono: '🏝️', tipo: 'playa' },
        { id: 'act74', titulo: 'Playa del Torres', descripcion: 'Playa tranquila con restos arqueológicos romanos.', icono: '🏖️', tipo: 'playa' },
        { id: 'act75', titulo: 'Playa La Caleta', descripcion: 'Cala acogedora de piedras rodeada de naturaleza.', icono: '🌅', tipo: 'playa' },
        { id: 'act76', titulo: 'Playa de los Estudiantes', descripcion: 'Pequeña cala escondida ideal para el relax.', icono: '🌊', tipo: 'playa' },
        { id: 'act77', titulo: 'Playa de Bon Nou', descripcion: 'Agua turquesa y ambiente local.', icono: '🏄‍♀️', tipo: 'playa' },
        { id: 'act78', titulo: 'Playa de El Campello', descripcion: 'Larga playa con paseo marítimo y muchas opciones para comer.', icono: '⛱️', tipo: 'playa' },
        { id: 'act79', titulo: 'Playa de Altea', descripcion: 'Playas de piedras con vistas preciosas y ambiente bohemio.', icono: '🏖️', tipo: 'playa' },
        { id: 'act80', titulo: 'Cala del Tío Ximo (Benidorm)', descripcion: 'Cala escondida rodeada de naturaleza ideal para snorkel.', icono: '🤿', tipo: 'playa' },
        { id: 'act81', titulo: 'Playa de Levante (Benidorm)', descripcion: 'Una de las playas más famosas de la zona, con mucha vida.', icono: '🌞', tipo: 'playa' },
        { id: 'act82', titulo: 'Playa Racó del Conill', descripcion: 'Playa nudista de ambiente tranquilo y rodeada de rocas.', icono: '🏜️', tipo: 'playa' },


    ];
    const actividadesMostradas = verTodas ? actividades : actividades.slice(0, 6) // para solo ver las 6 primeras actividades recomendadas


    const listaDePacks = [
        {
            nombre: 'Día de playa',
            icono: '🏖️',
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
            icono: '🏛️',
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
            icono: '🚗',
            color: 'teal',
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
            icono: '🍽️',
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
            icono: '🌿',
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






    /* ver todas las actividades o una muestra */
    const handleActividades = () => {
        setVertodas(!verTodas)
    }

    /* ABRIR 1 pack / CERRAR los otros */
    const handleAbrirPack = (i) => {
        setPackAbierto(prev => prev === i ? null : i)
    }
    return (
        <>

            <div className="Home">

                <h1>Aún te preguntas que puedes hacer en "la Vila" ?</h1>
                {/* sección act recomendadas */}
                <section className="Act-section">
                    <h2 className="Act-h2">Packs de actividades</h2>
                    <p className="Act-p">2 packs</p>

                    <div className="Act-cardScroll">
                        {listaDePacks.map((pack, i) => (
                            <div onClick={() => handleAbrirPack(i)}
                                key={i} className={`Act-card ${color}`}>
                                <span>{pack.icono}</span>
                                <p>{pack.nombre}</p>
                                <h3>{pack.actividades.length} actividades</h3>

                                {
                                    packAbierto === i && (
                                        <div className="Pack-detalle">
                                            {/* filter para devolver las actividades completas q estan dentro del pack concreto, segun su id */}
                                            {actividades
                                                .filter(act => pack.actividades.includes(act.id))
                                                .map(act => (
                                                    <div key={act.id} className="Pending-activities">
                                                        <div>{act.icono}</div>
                                                        <div className="ActPending">
                                                            <h3 className="ActPending-h3">{act.titulo}</h3>
                                                            <p className="ActPending-p">{act.descripcion}</p>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }



                            </div>
                        ))}


                    </div>
                </section>

                <section className="Pending">
                    <div className="Pending-titles">
                        <h2 className="Pending-title">Más actividades recomendadas</h2>
                        <p>{actividadesMostradas.length} actividades</p>
                        <button className="Pending-more" onClick={handleActividades}>{verTodas ? "Ver menos" : "Ver todas"}</button>
                    </div>

                    <div>
                        {actividadesMostradas.map((actividad) => (
                            <div className="Pending-activities" key={actividad.id}>
                                <div className="Pending-act">
                                    <div>
                                        {actividad.icono}
                                    </div>
                                    <div className="ActPending">
                                        <h3 className="ActPending-h3">{actividad.titulo}</h3>
                                        <p className="ActPending-p">{actividad.descripcion}</p>
                                    </div>
                                    <div className="Pending-links">
                                        <Link className="Pending-link" to='#'>Agregar al calendario</Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>





                </section>


            </div>
        </>

    );
}

export default Home;

