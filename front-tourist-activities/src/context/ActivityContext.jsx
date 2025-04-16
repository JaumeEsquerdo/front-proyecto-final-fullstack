import { createContext, useContext, useState } from "react";

const ActivityContext = createContext();

export const useActivity = () => useContext(ActivityContext)

export const ActivityProvider = ({ children }) => {
    /* ej de activities: dejarlo vacio cuando lo ponga con base de datos*/
    const [activities, setActivities] = useState([{
        title: "Reunión de equipo",
        time: new Date("2025-04-16T10:30:00"),
        timeExact: "10:30",
        displayHour: "10:00",
        description: "Reunion de equipo de volley"
    },
    {
        title: "Clase de yoga",
        time: new Date("2025-04-16T08:00:00"),
        timeExact: "08:00",
        displayHour: "08:00"
    },
    {
        title: "Café con Ana",
        time: new Date("2025-04-16T17:15:00"),
        timeExact: "17:15",
        displayHour: "17:00"
    },
    {
        title: "Comida con familia",
        time: new Date("2025-04-16T14:00:00"),
        timeExact: "21:00",
        displayHour: "14:00"
    },
    {
        title: "Tarea frontend",
        time: new Date("2025-04-16T18:45:00"),
        timeExact: "18:45",
        displayHour: "18:00"
    },
    {
        title: "Salir a correr",
        time: new Date("2025-04-16T23:30:00"),
        timeExact: "23:30",
        displayHour: "23:00"
    }
        ,
    {
        title: "Salir a pasear",
        time: new Date("2025-05-16T07:30:00"),
        timeExact: "07:30",
        displayHour: "07:00"
    }
    ]);
    const [selectedDay, setSelectedDay] = useState(new Date());  // para el dia seleccionado
    const [isAddFormOpen, setIsAddFormOpen] = useState(false)
    const [preloadData, setPreloadData] = useState(null); // para cargar contenido desde Home a Calendario

    const [selectedActivity, setSelectedActivity] = useState(null) // para abrir-cerrar la actividad clickada en el calendar


    //para el form de las actividades
    const handleAddActivity = ({ title, hour, description, minutes }) => {

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

        setActivities((prev) => [...prev, newActivity])
        console.log('añadiendo actividad,', newActivity)
        return true;
    }

    return (
        <ActivityContext.Provider
            value={{
                activities, setActivities, setSelectedDay, selectedDay,
                handleAddActivity, isAddFormOpen,
                setIsAddFormOpen, preloadData, setPreloadData,
                selectedActivity, setSelectedActivity
            }}
        >
            {children}
        </ActivityContext.Provider>
    )
}