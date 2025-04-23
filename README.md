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

Problema: consistía en que estaba generando dos maps, uno para filtrar actividades que me gustaban (dentro de todas las actividades) para hacer packs de actividades y otro para mostrar todas las actividades, y en un map pasaba 'act' y en el otro 'actividad'.

Solución: en el map de las actividades utilizar el mismo nombre 'actividad' para generar la actividad individual, y pasar el mismo nombre tanto en el handle como en el useEffect.

```js
/* Agregar actividad al Calendario desde Home*/
    const handleAgregarACalendario = (actividad) => { // IMPORTANTE!!! al tener dos maps (dos secciones de actividades), los maps tienen q pasar el mismo nombre "actividad", si no no funciona
        setPreloadData({
            title: actividad.titulo,
            description: actividad.descripcion
        })
        console.log('handle preload en home', preloadData)
            navigate('/calendar')
    }
// ----------------------- //
 // 1.MAP
{actividades.filter(actividad => pack.actividades.includes(actividad.id))
            .map(actividad => ())}

            //---//
  // 2.MAP
{actividadesMostradas.map((actividad) => ())}
                            

// ----------------------- //
 <button className="Activities-link" onClick={() => handleAgregarACalendario(actividad)}>Agregar al calendario</button>

```



# Comentarios del front

## Dependencias
- framer-motion para hacer aniamaciones con el cambio de NavLinks del control que hay en el footer.

1. Significado del TRANSITION del motion en el footer:
```js
                                <motion.div
                                    layoutId="dots"
                                    className="Footer-dots"
                                    transition={{type: "spring", stiffness: 140, damping: 15}}
                                    >
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>

                                    
                                </motion.div>

                                
/**
 * Transición en Framer Motion para la animación en el  footer de muelle en los 3 puntos
 * type "srping": que es elástico
 * stiffness: que tan fuerte es el muelle (mas alto mas rapido)
 * dampping: cuanto rebote tiene (cuanto mas alto menos rebote)
 * 
 * 
 */
```
cuando se navega entre rutas `/home` y `/calendar` los dos puntos se mueven entre ellos gracias a la referencia que tienen  `layoutId="dots"`, que le dice al framer que es el mismo elemento pero que se active una animación al cambiar de posición.

y la lógica de la posición:

```js
const navItems = [
    { src: '/img/home.svg', path: '/home' },
    { src: '/img/calendario.svg', path: '/calendario' }
]

// y

{navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (

                            <li key={item.path} className="Footer-li">
                                <NavLink
                                    className={({ isActive }) => `Footer-link ${isActive ? "active" : ""}`}
                                    to={item.path}
                                >
                                    <img className="Footer-imgLink" src={item.src} alt="Icono de navegación" />
                                </NavLink>

                                {isActive && dots}

                            </li>
                        )
                    })}

```


## useMemo

- Tenia un problema con

```js
                                <motion.div
                                    layoutId="dots"
                                    className="Footer-dots"
                                    transition={{type: "spring", stiffness: 140, damping: 15}}
                                    >
                                    <span className="dot"></span>
                                    <span className="dot"></span>
                                    <span className="dot"></span>

                                    
                                </motion.div>
```

 , que son los 3 puntos que se situan bajo del nav del footer, y que al cambiar de location se van cambiando entre ellos. Bien el problema es que en el mismo footer hay un botón para abrir/cerrar el form del calendario o redirijir al calendario si no estás situado en esa página. Y por alguna razón, al abrir el form se re-renderizaba toda la pagina de nuevo y hacia que el footer entonces cambiara a una posición más baja, ya que entendía que cambiaba de pestaña, aunque fuera la misma.

 - Solución: investigué un poco y vi que existia la opción de React Portal o el hook memo. Decidí hacerlo con memo, ya que me parecía más simple y utilizaba una estructura similar al useEffect.

 ```js
const dots = useMemo(() => {
        return (
            <motion.div

                layoutId="dots"
                className="Footer-dots"
                transition={{ type: "spring", stiffness: 50, damping: 25 }}
            >
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>


            </motion.div>
        )
    }, [location.pathname]) // solo se recalcula si cambia

 ```
 Así es como queda, dots se memoriza con useMemo, haciendo que solo se ejecute de nuevo si cambia la ruta.


## useNavigate

- En primer lugar, he utilizado el useNavigate para navegar al final de alguna función de una manera sencilla, por ejemplo para agregar una actividad al calendario desde 'Home':

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
```

- En otra ocasión, investigando un poco y aplicando la misma estructura, utilicé useNavigate para implementar un botón "Volver" en la página de perfil. La idea es que si el usuario accede desde la página Home, al pulsar el botón vuelve a Home, y si accede desde Calendar, vuelve a Calendar.

Esto lo he logrado con:

```js

    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate(-1); // volver a la pagina anterior (o pagina de home o calendar)
    }

```
- Esto último de la función `handleBack` finalmente me genero un problema al introducir las paginas de Politica de Privacidad y TyC en la página de Perfil, entonces cuando llegaban a Perfil y le daban a una de estas dos páginas, al volver a Perfil y darle al botón de atrás volvían a una de estas dos páginas y no había de volver al Layout principal.

Solución: 
La solución encontrada ha sido jugar con el path, guardarlo en `sessionStorage` gracias al useLocation en el Header y poder preguntar una vez en la página de Perfil por donde ha llegado, y dejar una vuelva atrás por defecto a `/home` para evitar fallos.


```js
/*en el HEADER */
const handlePerfilClick = () =>{
        const currentPath = location.pathname;

        if(currentPath === '/home'  || currentPath === '/calendario'){
            sessionStorage.setItem('fromPerfil', currentPath)
        } else{
            sessionStorage.removeItem('fromPerfil')
        }
    }


/*en PERFIL */
 const handleBack = () => {

        const from = sessionStorage.getItem('fromPerfil')

        if(from === '/home' || from === '/calendario'){
            navigate(from)
        }else{
            navigate('/home') // ruta por defecto para evitar bucle en el botón de ir a la página anterior (podría ser Politica Priv o TyC)
        }
    }
```


## scrollIntoView

Para redirijir un scroll a una posición del mismo componente he utilizado scrollIntoView.
No lo había utilizado mucho anteriormente, ya que antes esto lo hacía con JS vanilla y por lo tanto hacia un redirect con un id y con un link hacia el id con `#`

ej. para hacer esta función en React con scrollIntoView:

```js
 /* useEffect para q cuando abra el form de añadir actividad se redirija alli (ya q se posiciona en la zona baja y no se ve si no lo sabes) */
    useEffect(() => {
        if (isAddFormOpen) {
            const element = document.getElementById('CalendarForm')
            if (element) {
                element.scrollIntoView({ behavior: "smooth" })
            }
        }
    }, [isAddFormOpen])

/*otro ejemplo, esta vez con la actividad seleccionada del calendario */

/* useEffect para q cuando se abra la actividad, se redirija allí */
    useEffect(()=>{
        if(selectedActivity){
            const element = document.getElementById('ActividadSeleccionada')

            if(element){
                element.scrollIntoView({behavior:'smooth'})
            }
        }
    },[selectedActivity])
```

## useLocation

Para gestionar ciertos comportamientos durante la navegación, he utilizado el hook `useLocation`.

En uno de los casos, lo uso dentro del context (donde está el estado global `selectedActivity`) para que, cuando el usuario navegue fuera de la sección del calendario, se cierre automáticamente cualquier actividad que estuviera seleccionada. Esto evita que, al volver, todo siga abierto innecesariamente.
ej 
```js
/* useEffect con useLocation para decidir cuando se tiene que cerrar la actividad seleccionada (para evitar irse a otra sección de la web, y al volver tener todo abierto) */
    useEffect(()=>{
        if(!location.pathname.includes('/calendario')){
            setSelectedActivity(null)
        }
    },[location.pathname])
```
De esta forma, cuando la ruta ya no incluye `/calendario`, se deselecciona la actividad.

Además, aunque no lo he explicado en detalle anteriormente, también utilizo `useLocation` en el `Header`, como parte de la lógica del botón de volver atrás desde la página de perfil. Lo uso para guardar desde qué página se accedió al perfil, y así poder volver correctamente al pulsar “volver”.


## useEffect

1. Tengo un useEffect importante, ya que al moverme entre las paginas `Home` y `Calendario`, si en una de ellas mi scroll no estaba al inicio (es decir no estaba arriba de toda la página), y cambiaba a la otra página, no iniciaba la página desde arriba.

En este caso he investigado como podía arreglar este pequeño fallo y he encontrado esta solución, que he puesto arriba de todos los useEffects en estas dos páginas, para que no pueda chocar con otros useEffect como en el que tengo `scrollIntoView` que me redirije el scroll (con un pequeño retardo) al form donde guarda las actividades en el calendario.

```js

// para que al cambiar de pagina empiece la otra pagina desde arriba (es decir que el scroll empiece al inicio)
    useEffect(()=>{
        window.scrollTo(0,0)
    },[])

```