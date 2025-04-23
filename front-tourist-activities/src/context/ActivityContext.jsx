import { createContext, useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
const ActivityContext = createContext();

export const useActivity = () => useContext(ActivityContext)

export const ActivityProvider = ({ children }) => {
    /* ej de activities: dejarlo vacio cuando lo ponga con base de datos*/


    const [activities, setActivities] = useState(
        [
            {
                title: "Reunión de equipo",
                time: new Date("2025-04-16T10:30:00"),
                timeExact: "10:30",
                displayHour: "10:00",
                description: "Reunion de equipo de volley",
                id: '1'
            },
            {
                title: "Clase de yoga",
                time: new Date("2025-04-16T08:00:00"),
                timeExact: "08:00",
                displayHour: "08:00",
                id: '2'
            },
            {
                title: "Café con Ana",
                time: new Date("2025-04-16T17:15:00"),
                timeExact: "17:15",
                displayHour: "17:00",
                id: '3'
            },
            {
                title: "Comida con familia",
                time: new Date("2025-04-16T14:00:00"),
                timeExact: "21:00",
                displayHour: "14:00",
                id: '4'
            },
            {
                title: "Tarea frontend",
                time: new Date("2025-04-16T18:45:00"),
                timeExact: "18:45",
                displayHour: "18:00",
                id: '5'
            },
            {
                title: "Salir a correr",
                time: new Date("2025-04-16T23:30:00"),
                timeExact: "23:30",
                displayHour: "23:00",
                id: '6'
            }
            ,
            {
                title: "Salir a pasear",
                time: new Date("2025-05-16T07:30:00"),
                timeExact: "07:30",
                displayHour: "07:00",
                id: '7'
            }
        ]);
    const [selectedDay, setSelectedDay] = useState(new Date());  // para el dia seleccionado
    const [isAddFormOpen, setIsAddFormOpen] = useState(false)
    const [preloadData, setPreloadData] = useState(null); // para cargar contenido desde Home a Calendario
       // const[pendingCount, setPendingCount] = useState(0); // contar las actividades pendientes de hoy!

    const [selectedActivity, setSelectedActivity] = useState(null) // para abrir-cerrar la actividad clickada en el calendar

    const location = useLocation()

    //para el form de las actividades
    const handleSaveActivity = ({ title, hour, description, minutes, id }) => {

        const date = new Date(selectedDay) // no se ve bien para el usuario asi que creo un displa del tiempo para que sea mas legible...
        // const [h, m] = hour.split(':')
        date.setHours(parseInt(hour))
        date.setMinutes(parseInt(minutes))

        const timeExact = `${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}` // padStart asegura que tenga bien las horas(2 digitoss, si no añade un 0 para tener 2 digitos)
        const displayHour = `${hour.padStart(2, '0')}:00`; // padStart asegura q tenga dos digitos  (7 -> 07) y luego añado ':00' =  (07:00)

        const newActivity = {
            title,
            description,
            time: date,
            timeExact,
            displayHour // este es para poder agrupar las horas segun si ej. es a las 10:40 la actividad agruparla con las actividaes de las 10:00
        }

        //diferenciar entre editar(pasa id) o crear nueva actividad
        if (id) {
            //editando
            setActivities(prev =>
                prev.map(act => act.id === id ? { ...act, ...newActivity, id } : act)
            )
            console.log('activvidad editada:', newActivity)
            return 'editado'
        }

        else {
            //creando act
            const newWidthId = { ...newActivity, id: Math.floor(Math.random()) }
            setActivities((prev) => [...prev, newWidthId])
            console.log('añadiendo actividad,', newWidthId)
            return 'creado'
        }
    }

    //para editar la actividad del calendario
    const handleEdit = (actividad) => {
        const [hour, minutes] = actividad.timeExact.split(':') // descomponer la hora en dos partes para ponerlo en el form y poder editarlo
        setPreloadData({
            title: actividad.title,
            description: actividad.description || '',
            hour,
            minutes,
            id: actividad.id
        })
        setIsAddFormOpen(true)
        setSelectedDay(new Date(actividad.time))
        console.log(handleEdit)
    }
    //para eliminar la actividad del calendario
    const handleDelete = (id) => {
        console.log('eliminar actividad con id', id)
    }

    // para filtrar y mostrar en el inicio de la pagina 'Calendario' las actividades q tienes pendientes hoy
    
    const getPendingActivities = () => {
        const currentTime = new Date(); //obtener fecha y hora
        const currentDate = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate()) //obtener la fecha sin la hora
        
        const pendingActivities = activities.filter(activity =>{

            const activityDate = new Date(activity.time);
            const activityStartOfDay = new Date(activityDate.getFullYear(), activityDate.getMonth(), activityDate.getDate()); // obtener las fechas de las actividades (año,mes y dia, sin las horas)

            return activityStartOfDay.getTime() === currentDate.getTime() && activity.time > currentTime
        })
        
        
        return pendingActivities.length;
    }

    // para actualizar las el num. de actividades pendientes cuando se cambian las actividades
    // useEffect(()=>{
    //     setPendingCount(getPendingActivities())
    // },[activities])

    /* useEffect con useLocation para decidir cuando se tiene que cerrar la actividad seleccionada (para evitar irse a otra sección de la web, y al volver tener todo abierto) */
    useEffect(() => {
        if (!location.pathname.includes('/calendario')) {
            setSelectedActivity(null)
        }
    }, [location.pathname])

    return (
        <ActivityContext.Provider
            value={{
                activities, setActivities, setSelectedDay, selectedDay,
                handleSaveActivity, isAddFormOpen,
                setIsAddFormOpen, preloadData, setPreloadData,
                selectedActivity, setSelectedActivity, handleEdit, handleDelete, getPendingActivities
            }}
        >
            {children}
        </ActivityContext.Provider>
    )
}