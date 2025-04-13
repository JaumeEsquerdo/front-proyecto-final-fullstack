import '@/css/pages/calendar.css';
import { useEffect, useState } from 'react';

import { CalendarSelector, MonthDaysSlider, ActivityPanel } from '@/components/calendar/CalendarSections';
import { useActivity } from '@/context/ActivityContext';


const CalendarPage = () => {
    const { isAddFormOpen, setIsAddFormOpen, handleAddActivity, selectedDay, setSelectedDay, activities } = useActivity()


    const [selectedDate, setSelectedDate] = useState(new Date()); // almacenar la fecha seleccionada (por defecto la de hoy)
    const [showCalendar, setShowCalendar] = useState(false)

    const [monthDays, setMonthDays] = useState([]); // array para guardar los dias del mes y q sean clickables despues

    const today = new Date(); //fecha de hoy
    const dateOptions = { month: 'long', day: 'numeric' }; /* leer la fecha solo con mes y dia */
    const formateDate = today.toLocaleDateString('es-ES', dateOptions) /* para q se lea mejor la fecha */
    const monthTitle = selectedDate.toLocaleDateString('es-Es', { month: 'long', year: 'numeric' }) // que se vea la fecha con el mes y el año

    const [showExtraHours, setShowExtraHours] = useState(false)

    // para los inputs
    const [title, setTitle] = useState('');
    const [hour, setHour] = useState("10");
    const [minutes, setMinutes] = useState('00')
    const [description, setDescription] = useState('')


    /* cada vez que cambie 'selectedDate' generamos los dias d ese mes */
    useEffect(() => {
        if (selectedDate.getMonth() === today.getMonth() && selectedDate.getFullYear() === today.getFullYear()) {
            setSelectedDay(today) // si estamos en el mismo mes y año, por defecto que aparezca el calendario de hoy
        } else {
            setSelectedDay(null) // al no coincidir, reiniciamos el día seleccionado cuando cambia de mes

        }
        generateMonthDays(selectedDate);

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


    const handleSubmit = (e) => {
        e.preventDefault();

        const success = handleAddActivity({ title, hour, description, minutes, date: selectedDay })

        //limpieza de inputs
        if (success) {
            setTitle("")
            setDescription("")
            setHour('10')
            setMinutes('00')
        }
        setIsAddFormOpen(false)
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

                        {isAddFormOpen && (

                            <form
                                className='CalendarForm'
                                onSubmit={handleSubmit}>

                                <input type="text" placeholder='Nombre actividad' value={title} onChange={(e) => setTitle(e.target.value)}
                                    required
                                    className='CalendarForm-input'
                                />

                                <textarea
                                className='CalendarForm-textarea'
                                placeholder='Descripción (opcional)'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                rows={10}
                                cols={40}
                                >
                                </textarea>

                                {/* select de horas */}
                                <select
                                    className='CalendarForm-select'
                                    value={hour} onChange={(e) => setHour(e.target.value)}>
                                    {/* listar las horas con el indice(creo un array vacion con 24 posiciones undefined y a cada indice le asigno el valor de cada hora del 0 al 23) */}
                                    {[...Array(24)].map((_, i) => (
                                        <option key={i} value={i.toString().padStart(2, '0')}>
                                            {i.toString().padStart(2, '0')}
                                        </option>
                                    ))}
                                </select>

                                {/* select de minutos */}
                                <select
                                className='CalendarForm-select'
                                value={minutes} onChange={(e) => setMinutes(e.target.value)}>
                                    <option value="00">00</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                </select>


                                <button className='CalendarForm-btn' type='submit'>Guardar actividad</button>
                                <button className='CalendarForm-btn' onClick={() => setIsAddFormOpen(false)}>Cerrar formulario</button>
                            </form>

                        )
                        }

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