import React from "react";


/* packs sin abrir */
export const PackCard = ({ pack, handleAbrirPack }) => {
    return (
        <div onClick={() => handleAbrirPack(i)}
            className={`Act-card ${pack.color}`}>
            <img className="Pack-icono" src={`/img/pack-recom/${pack.tipo}.svg`} alt="icono pack actividades" />
            <h3>{pack.nombre}</h3>
            <p>{pack.actividades.length} actividades</p>

        </div>
    )
}

/* */
export const PackDetails = ({ packAbierto, actividades, setPackAbierto, handleAgregarACalendario }) => {
    return (
        <div className="Pack-overlay" onClick={() => setPackAbierto(null)}>
            <span className="Pack-cerrar">X</span>
            <div className={`Pack-detalles ${listaDePacks[packAbierto].color}`} onClick={(e) => e.stopPropagation()}>
                <div className="Pack-header">
                    <img className="Pack-icono" src={`/img/pack-recom/${listaDePacks[packAbierto].tipo}.svg`} alt="Icono pack" />
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
                            <button className="Activity-link Activity-link--pack" onClick={() => handleAgregarACalendario(actividad)}>Agregar al calendario</button>


                        </div>
                    ))
                }
            </div>
        </div>
    )
}


/* cards de las actividades de dentro de los packs */
export const ActivityCard = ({ actividad, handleAgregarACalendario }) => {
    return (
        <div className="Activities-act" key={actividad._id}>
            <div className="Activities-icondiv">
                <img className="Activities-icon" src={`/img/act-recom/${actividad.tipo}.svg`} alt="Icono actividad" />

            </div>
            <div className="Activity">
                <h3 className="Activity-h3">{actividad.titulo}</h3>
                <p className="Activity-p">{actividad.descripcion}</p>
            </div>
            <button className="Activity-link" onClick={() => handleAgregarACalendario(actividad)}>Agregar al calendario</button>
        </div>
    )
}


/* */
export const ActivityFilters = ({ tipos, tipoSeleccionado, handleFiltroTipo }) => {
    return (

        <div className="Actividades-filtros">
            {tipos.map((tipo) => (
                <button key={tipo.valor}
                    className={`Actividad-filtro ${tipoSeleccionado === tipo.valor ? `activo` : tipo.valor}`}
                    onClick={() => handleFiltroTipo(tipo.valor)}

                >
                    {tipo.nombre}
                </button>
            ))}
        </div>
    )
}