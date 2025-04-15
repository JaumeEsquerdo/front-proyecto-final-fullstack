# Proyecto final de backend

### Estructura de la App :

1. Welcome Page

- Breve presentación de la app.

- Explicación de los packs de actividades y beneficios de organizar el viaje.

- Llamado a la acción: "Regístrate para empezar".

- Opción de Login para usuarios ya registrados.

  2. Dashboard (Pantalla de inicio)

- Bienvenida personalizada: Si es la primera vez, pequeña explicación de la app.

- Packs de actividades recomendados (Ejemplo: "Ruta gastronómica", "Día de playa", "Tour histórico"). Con botón de me gusta para guardarlos en una lista de referencia.

- Resumen de su planificación: Si ya tiene actividades organizadas, se muestran aquí con vista rápida.

- Mapa integrado con Leaflet para ver ubicación de actividades guardadas o recomendadas.

3. Calendario (Organización de Actividades)
 (vista diaria y semanal)

- Vista diaria de actividades programadas con posibilidad de eliminarlas.

- Botón ‘+ Añadir actividad’ que abre un formulario:

- Búsqueda con autocompletado de actividades predefinidas (según dos letras introducidas).

- Opción de crear actividad personalizada si no está en la base de datos (ejemplo: "Visitar a un amigo").

- Campos de actividad: 
    - Nombre

    - Descripción

    - Imagen (opcional)

    - Precio (si aplica)

    - Horario

    - Recomendación de franja horaria (ej: "Mejor por la tarde").

    - Ubicación (marcada en el mapa).

- Asignación de hora y ubicación en el mapa.
- Posibilidad de editar/eliminar actividades programadas.



 4. Mapa interactivo? (dudas de como lo voy a poder realizar... lo veré más adelante cuando esté ya más madura la web)

- Ubicación de todas las actividades programadas en el día.

- Posibilidad de filtrar por tipo de actividad.

- Se accede desde el Dashboard o el Calendario.

5. Perfil-Login / Register

- Si no está logeado: Formulario de login/registro.

- Si está logeado:

Ver su información de usuario.

Historial de actividades guardadas.

Configuración.

### Aspectos técnicos:

Front: React + CSS
Backend: Node.js con Express y MongoDB
Mapa: Leaflet para mostrar ubicaciones


### API para poner un mapa interactivo:
Leaflet 


# FIGMA DEL PROYECTO!

[FIGMA](https://www.figma.com/design/Qo6Jr7O0xUuxmZzhrlkCfL/PROYECTO-FINAL-BACKEND?node-id=0-1&p=f&t=zRk69933bAcFhLtx-0)


# Iconos de las listas de actividades y de tipo de actividades: 
iconos para actividades sueltas : https://www.flaticon.es/resultados?word=playa&type=uicon

iconos para los packs: https://www.svgrepo.com/collection/travel-theme-candy-vectors/


# Seccion de problemas! 

1. Problema para pasar una actividad desde Home a Calendario.

Problema: consistía en que estaba generando dos maps, uno para filtrar actividades que me gustaban para hacer packs de actividades y otro para mostrar todas las actividades, y en un map pasaba 'act' y en el otro 'actividad'.

Solución: en el map de las actividades utilizar el mismo nombre 'actividad' para generar la actividad individual, y pasar el mismo nombre tanto en el handle como en el useEffect.

```js
/* Agregar actividad al Calendario desde home*/
    const handleAgregarACalendario = (actividad) => { // IMPORTANTE!!! al tener dos maps (dos secciones de actividades), los maps tienen q pasar el mismo nombre "actividad", si no no funciona
        setPreloadData({
            title: actividad.titulo,
            description: actividad.descripcion
        })
        console.log('handle preload en home', preloadData)
            navigate('/calendar')
    }
// ----------------------- //

{actividades.filter(actividad => pack.actividades.includes(actividad.id))
            .map(actividad => ())}

            //---//
            
{actividadesMostradas.map((actividad) => ())}
                            

// ----------------------- //
 <button className="Activities-link" onClick={() => handleAgregarACalendario(actividad)}>Agregar al calendario</button>

```