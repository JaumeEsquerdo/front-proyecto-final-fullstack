import '@/css/pages/calendar.css';
import { useEffect, useState } from 'react';

import { CalendarSelector, MonthDaysSlider, ActivityPanel } from '@/components/calendar/CalendarSections';


const CalendarPage = () => {


    const [selectedDate, setSelectedDate] = useState(new Date()); // almacenar la fecha seleccionada (por defecto la de hoy)
    const [showCalendar, setShowCalendar] = useState(false)

    const [selectedDay, setSelectedDay] = useState(); // para el dia seleccionado
    const [monthDays, setMonthDays] = useState([]); // array para guardar los dias del mes y q sean clickables despues

    const today = new Date(); //fecha de hoy
    const dateOptions = { month: 'long', day: 'numeric' }; /* leer la fecha solo con mes y dia */
    const formateDate = today.toLocaleDateString('es-ES', dateOptions) /* para q se lea mejor la fecha */
    const monthTitle = selectedDate.toLocaleDateString('es-Es', { month: 'long', year: 'numeric' }) // que se vea la fecha con el mes y el año

    const [showExtraHours, setShowExtraHours] = useState(false)

    /*import Actividades con los horarios, hay puestos unos d ej antes de tener la base de datos */
    const [activities, setActivities] = useState([{
        title: "Reunión de equipo",
        time: new Date("2025-04-10T10:30:00"),
        timeExact: "10:30",
        displayHour: "10:00",
        description: "Reunion de equipo de volley"
    },
    {
        title: "Clase de yoga",
        time: new Date("2025-04-10T08:00:00"),
        timeExact: "08:00",
        displayHour: "08:00"
    },
    {
        title: "Café con Ana",
        time: new Date("2025-04-10T17:15:00"),
        timeExact: "17:15",
        displayHour: "17:00"
    },
    {
        title: "Comida con familia",
        time: new Date("2025-04-10T14:00:00"),
        timeExact: "14:00",
        displayHour: "14:00"
    },
    {
        title: "Tarea frontend",
        time: new Date("2025-04-10T10:45:00"),
        timeExact: "10:45",
        displayHour: "10:00"
    },
    {
        title: "Salir a correr",
        time: new Date("2025-04-10T07:30:00"),
        timeExact: "07:30",
        displayHour: "07:00"
    }
        ,
    {
        title: "Salir a pasear",
        time: new Date("2025-05-12T07:30:00"),
        timeExact: "07:30",
        displayHour: "07:00"
    }
    ]);

    // para los inputs
    const [title, setTitle] = useState('');
    const [hour, setHour] = useState("10");
    const [minutes, setMinutes] = useState('00')
    const [description, setDescription] = useState('')


    /* cada vez que cambie 'selectedDate' generamos los dias d ese mes */
    useEffect(() => {
        generateMonthDays(selectedDate);
        setSelectedDay(null) // reiniciamos el día seleccionado cuando cambia de mes
    }, [selectedDate])

    const generateMonthDays = (date) => {
        //obtener el año y el mes de la fecha seleccionada
        const year = date.getFullYear();
        const month = date.getMonth();

        // obtener el ultimo dia del mes (para poder cambiarlo segun el mes)
        const lastDay = new Date(year, month + 1, 0).getDate();

        // obtener un array de los dias del mes 
        const daysArrays = [];
        for (let day = 1; day <= lastDay; day++) {
            daysArrays.push(new Date(year, month, day))
        }
        console.log('daysArrays', daysArrays)
        setMonthDays(daysArrays)
    }



    const handleDateChange = (date) => {
        //cuando el usuario elegie un mes, se actualiza selectedDate
        setSelectedDate(date);
        setShowCalendar(false); // despues de seleccionar el mes se oculta
    }


    const generateHours = (startHour = 7, endHour = 25) => {
        const hours = [];
        for (let i = startHour; i < endHour; i++) {
            const hourText = (i === 24) ? '00:00' : `${i.toString().padStart(2, '0')}:00`;
            hours.push(hourText)
        }
        console.log(hours)
        return hours
    }

    const visibleHours = generateHours(showExtraHours ? 0 : 7, 25) // si quiero mostrar todas las horas emepieza desde 0:00, si no empieza de 7:00 a 24:00, pone 25 porq el bucle funciona cuando i<25 para que llegue a 24:00 y si i=== 24 pongo 00:00

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

        //limpieza de inputs
        setTitle("")
        setDescription("")
        setHour('10')
        setMinutes('00')

    }

    return (
        <>
            <div>
                <div>
                    <button onClick={() => setShowCalendar(!showCalendar)}>Calendar</button>
                </div>
                <div>
                    {formateDate}
                    <p>10 actividades pendientes</p>
                </div>
            </div>



            <CalendarSelector
                showCalendar={showCalendar}
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
            />



            <h2>{monthTitle}</h2>

            {
                monthDays.length > 0 && (
                    <MonthDaysSlider
                        monthDays={monthDays}
                        selectedDay={selectedDay}
                        onSelectDay={setSelectedDay}
                    />
                )
            }

            {
                selectedDay && (
                    <>
                        <ActivityPanel
                            selectedDay={selectedDay}
                            visibleHours={visibleHours}
                            activities={activities}
                            dateOptions={dateOptions}
                        />

                        {/* formulario de las actividades */}
                        <form
                            onSubmit={(e => {
                                e.preventDefault();
                                handleAddActivity({title, minutes,hour,description})
                            })}>
                                <input type="text" placeholder='Nombre actividad' value={title} onChange={(e)=>setTitle(e.target.value)}
                                required
                                />

                                <textarea placeholder='Descripción (opcional)'
                                value={description}
                                onChange={(e)=>setDescription(e.target.value)}
                                >
                                </textarea>

                                {/* select de horas */}
                                <select value={hour} onChange={(e)=> setHour(e.target.value)}>
                                    {/* listar las horas con el indice(creo un array vacion con 24 posiciones undefined y a cada indice le asigno el valor de cada hora del 0 al 23) */}
                                    {[...Array(24)].map((_,i)=>(
                                        <option key={i} value={i.toString().padStart(2,'0')}>
                                            {i.toString().padStart(2,'0')}
                                        </option>
                                    ))}
                                </select>

                                {/* select de minutos */}
                                <select value={minutes} onChange={(e)=> setMinutes(e.target.value)}>
                                    <option value="00">00</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                </select>


                            <button type='submit'>Guardar actividad</button>
                        </form>
                    </>
                )
            }

        </>
    );
}

export default CalendarPage;


/* { <div className='lista de horas'>
{
    visibleHours.map((hour,i)=>(
        <div key={i} className='horas'>
            <span>{hour}</span>
        </div>
    ))
}
</div> }*/

/*
 {
                showCalendar && (
                    <Calendar
                        view='year'
                        onChange={handleDateChange}
                        value={selectedDate}
                        onClickMonth={handleDateChange}
                    />
                )
            }
            <h2>{monthTitle}</h2>

            {
                monthDays.length > 0 && (
                    <div className='Slider'>
                        {
                            monthDays.map((day, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedDay(day)}
                                    className={selectedDay?.getDate() === day.getDate() ? 'selected-day' : ""}
                                >
                                    {day.getDate()}
                                </button>
                            ))
                        }
                    </div>
                )
            }

            {
                selectedDay && (
                    <div className='actividades'>
                        <h3>Actividades para {selectedDay.toLocaleDateString('es-Es', dateOptions)}</h3>

                        {visibleHours.map((hour) => {
                            const acttividadesDeEstaHora = activities.filter(a => a.displayHour === hour && new Date(a.time).toDateString() === selectedDay.toDateString())

                            /*if (acttividadesDeEstaHora.length === 0) return null */
/*            return (
                 <div key={hour} className='bloque-hora'>
                     <h4>{hour}</h4>
                     {acttividadesDeEstaHora.map((a, i) => (
                         <p key={i}>{a.timeExact}-{a.title}</p>
                     ))}
                 </div>
             )
         })}

     </div>
 )
}

*/