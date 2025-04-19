import '@/css/pages/calendar.css';
import { useEffect, useState } from 'react';

import { CalendarSelector, MonthDaysSlider, ActivityPanel } from '@/components/calendar/CalendarSections';
import { useActivity } from '@/context/ActivityContext';


const CalendarPage = () => {
    const { handleDelete, setPreloadData, handleEdit, isAddFormOpen, setIsAddFormOpen, handleSaveActivity, selectedDay, setSelectedDay, activities, preloadData, selectedActivity } = useActivity()


    const [selectedDate, setSelectedDate] = useState(new Date()); // almacenar la fecha seleccionada (por defecto la de hoy)
    const [showCalendar, setShowCalendar] = useState(false)

    const [monthDays, setMonthDays] = useState([]); // array para guardar los dias del mes y q sean clickables despues

    const today = new Date(); //fecha de hoy
    const dateOptions = { month: 'long', day: 'numeric' }; /* leer la fecha solo con mes y dia */
    const formateDate = today.toLocaleDateString('es-ES', dateOptions) /* para q se lea mejor la fecha */
    const monthTitle = selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) // que se vea la fecha con el mes y el año

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

        const success = handleSaveActivity({ id: preloadData?.id, title, hour, description, minutes, date: selectedDay })

        //limpieza de inputs
        if (success) {
            setTitle("")
            setDescription("")
            setHour('10')
            setMinutes('00')
            setPreloadData(null)

        }
        setIsAddFormOpen(false)
    }


    console.log('preload de clandar', preloadData)

    /* useEffect para cargar contenido al form desde Home (btns de agregar al calendario) Y tmb para editar actividades ya existentes */
    useEffect(() => {
        if (preloadData) {
            setTitle(preloadData.title)
            setDescription(preloadData.description)
            setHour(preloadData.hour || '10')
            setMinutes(preloadData.minutes || '00')
            setIsAddFormOpen(true)
        }
    }, [preloadData])

    /* cerrar y limpiar form */
    const handleCloseForm = () => {
        setIsAddFormOpen(false)
        setPreloadData(null)
    }

    /* useEffect para q cuando abra el form de añadir actividad se redirija alli (ya q se posiciona en la zona baja y no se ve si no lo sabes) */
    useEffect(() => {
        if (isAddFormOpen) {
            const timeout = setTimeout(() => {

                const element = document.getElementById('CalendarForm')
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" })
                }
            }, 350)


            return () => clearTimeout(timeout)
        }
    }, [isAddFormOpen])

    /* useEffect para q cuando se abra la actividad, se redirija allí */
    useEffect(() => {
        if (selectedActivity) {
            const element = document.getElementById('ActividadSeleccionada')

            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
    }, [selectedActivity])


    return (
        <>
            <div className='CalendarHeader'>
                <div className=''>
                    <h2>Hoy es {formateDate}</h2>
                    <p>10 actividades pendientes</p>
                </div>

                <button className='CalendarHeader-btn' onClick={() => setShowCalendar(!showCalendar)}>
                    <img className='CalendarHeader-btnImg' src='/img/calendario-blanco-32px.png' alt='Calendario' />

                </button>

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
                            setShowExtraHours={setShowExtraHours}
                            showExtraHours={showExtraHours}
                            selectedDay={selectedDay}
                            visibleHours={visibleHours}
                            activities={activities}
                            dateOptions={dateOptions}
                        />


                        {/* formulario de las actividades */}
                        {isAddFormOpen && (

                            <form
                                id='CalendarForm'
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
                                <button className='CalendarForm-btn' onClick={handleCloseForm}>Cerrar formulario</button>
                            </form>

                        )
                        }

                        {selectedActivity && (
                            <div id='ActividadSeleccionada' className='ActividadSeleccionada'>
                                <h3 className='ActividadSeleccionada-h3'>Actividad seleccionada</h3>
                                <h4 className='ActividadSeleccionada-h4'>{selectedActivity.title}</h4>
                                {selectedActivity.description ? (<p className='ActividadSeleccionada-p'><strong>Desripción</strong>{selectedActivity.description}</p>
                                ) : ""}
                                <p className='ActividadSeleccionada-p'><strong>Hora:</strong>{selectedActivity.timeExact}</p>

                                <div className='ActividadSeleccionada-botones'>
                                    <button className='ActividadSeleccionada-btn ActividadSeleccionada-btn--edit' onClick={() => handleEdit(selectedActivity)}>Editar</button>
                                    <button className='ActividadSeleccionada-btn ActividadSeleccionada-btn--delete' onClick={() => handleDelete(selectedActivity.id)}>Eliminar</button>
                                </div>
                            </div>
                        )}

                    </>
                )
            }

        </>
    );
}

export default CalendarPage;


