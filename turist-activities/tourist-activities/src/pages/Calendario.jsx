import '@/css/pages/calendar.css';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar'; // importar calendario por defecto
import 'react-calendar/dist/Calendar.css' //css predefinido para el calendario

const CalendarPage = () => {


    const [selectedDate, setSelectedDate] = useState(new Date()); // almacenar la fecha seleccionada (por defecto la de hoy)
    const [showCalendar, setShowCalendar] = useState(false)

    const [selectedDay, setSelectedDay] = useState(); // para el dia seleccionado
    const [monthDays, setMonthDays] = useState([]); // array para guardar los dias del mes y q sean clickables despues

    const today = new Date(); //fecha de hoy
    const dateOptions = { month: 'long', day: 'numeric' }; /* leer la fecha solo con mes y dia */
    const formateDate = today.toLocaleDateString('es-ES', dateOptions) /* para q se lea mejor la fecha */
    const monthTitle = selectedDate.toLocaleDateString('es-Es', {month:'long', year:'numeric'}) // que se vea la fecha con el mes y el año

    const [showExtraHours, setShowExtraHours] = useState(false)

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
        console.log('daysArrays',daysArrays)
        setMonthDays(daysArrays)
    }



    const handleDateChange = (date) => {
        //cuando el usuario elegie un mes, se actualiza selectedDate
        setSelectedDate(date);
        setShowCalendar(false); // despues de seleccionar el mes se oculta
    }


    const generateHours = (startHour = 7, endHour = 25) =>{
        const hours=[];
        for(let i = startHour; i< endHour; i++){
            const hourText = (i === 24)?'00:00':`${i.toString().padStart(2, '0')}:00`;
            hours.push(hourText)
        }
        console.log(hours)
        return hours
    }

    const visibleHours = generateHours(showExtraHours ? 0 : 7,25) // si quiero mostrar todas las horas emepieza desde 0:00, si no empieza de 7:00 a 24:00, pone 25 porq el bucle funciona cuando i<25 para que llegue a 24:00 y si i=== 24 pongo 00:00



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

                        <div className='lista de horas'>
                        {
                            visibleHours.map((hour,i)=>(
                                <div key={i} className='horas'>
                                    <span>{hour}</span>
                                </div>
                            ))
                        }
                        </div>
                    
                    </div>
                )
            }

        </>
    );
}

export default CalendarPage;