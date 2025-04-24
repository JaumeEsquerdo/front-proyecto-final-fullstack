import '@/css/pages/calendar.css';
import { useEffect, useState } from 'react';

import { CalendarSelector, MonthDaysSlider, ActivityPanel } from '@/components/calendar/CalendarSections';
import { useActivity } from '@/context/ActivityContext';


const CalendarPage = () => {
    const { title, description, setTitle, setDescription,hour, setHour,
        minutes, setMinutes, fetchActivities, setActivities, getPendingActivities, handleDelete, setPreloadData, handleEdit, isAddFormOpen, setIsAddFormOpen, handleSaveActivity, selectedDay, setSelectedDay, preloadData, selectedActivity, setSelectedActivity } = useActivity()


    const [selectedDate, setSelectedDate] = useState(new Date()); // almacenar la fecha seleccionada (por defecto la de hoy)
    const [showCalendar, setShowCalendar] = useState(false)

    const [monthDays, setMonthDays] = useState([]); // array para guardar los dias del mes y q sean clickables despues

    const today = new Date(); //fecha de hoy
    const dateOptions = { month: 'long', day: 'numeric' }; /* leer la fecha solo con mes y dia */
    const formateDate = today.toLocaleDateString('es-ES', dateOptions) /* para q se lea mejor la fecha */
    const monthTitle = selectedDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' }) // que se vea la fecha con el mes y el año

    const [showExtraHours, setShowExtraHours] = useState(false)

    const [toastMessage, setToastMessage] = useState(null); // para manejar texto flotante de cuando se crea o se edita con exito una act

    // para los inputs
    // title, description, hour y minutes vienen del provider
    const [displayHours, setDisplayHours] = useState('')

    const API_URL = import.meta.env.VITE_API_URL
    const API_ROUTER = import.meta.env.VITE_API_ROUTER
    const API_CALENDAR_ACTS = import.meta.env.VITE_API_CALENDAR_ACTS

    // para que al cambiar de pagina empiece la otra pagina desde arriba (es decir que el scroll empiece al inicio)
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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

    // CREAR o EDITAR ACTIVIDADES CALENDARIO!!
    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) return
        console.log('Token en el frontend:', token); // Verifica que el token esté en el frontend

        console.log('SELECTEDACTIVITY', selectedActivity)

        const horaCompleta = `${hour}:${minutes}`; //para guardarlo en time
        const fechaConHora = new Date(selectedDay);
        fechaConHora.setHours(Number(hour))
        fechaConHora.setMinutes(Number(minutes)) // para guardarlo en timeExact

        const actividad = {
            title: title,
            description: description,
            time: fechaConHora,
            timeExact: horaCompleta,
            displayHours: `${hour}:00`
        }
        console.log("Actividad que se va a enviar:", actividad);

        try {
            let res;
            let data;

            if (selectedActivity && selectedActivity.id) {
                //si la act esta seleccionada y tiene un id, la editamos
                res = await fetch(`${API_URL}${API_ROUTER}${API_CALENDAR_ACTS}/${selectedActivity.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`

                    },
                    body: JSON.stringify(actividad)
                });
                data = await res.json();

                if (res.ok) {
                    // si el EDIT es ok...
                    setActivities((prev) => prev.map((a) => (a.id ===  selectedActivity.id ? { ...a, ...actividad, id: selectedActivity.id } : a))) // aqui solo actualiza el array de actividades para reemplzara solo la actividad editaada que coincide en id, si no se mantiene igual
                    setToastMessage('Actividad EDITADA con éxito')
                } else {
                    console.error('Error editando la actividad', data.msg)
                }
            } else {
                // si la actividad no esta seleccioanda 
                res = await fetch(`${API_URL}${API_ROUTER}${API_CALENDAR_ACTS}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(actividad)
                });
                data = await res.json();

                if (res.ok) {
                    setActivities((prev) => [...prev, data]) //agregamos la act(data) al resto ya guardado
                    setToastMessage('Actividad creada con éxito')
                } else {
                    console.error('Error creando la actividad', data.msg)
                }
            }


            //ejecutar fetchActivities cuando cambie alguna actividad?
            fetchActivities();

            // limpiar campos
            setTitle('');
            setDescription('');
            setHour('10');
            setMinutes('10')
            setDisplayHours('')
            setSelectedActivity(null)
            setIsAddFormOpen(false)

            setTimeout(() => {
                setToastMessage(null)
            }, 4500)


        } catch (e) {
            console.error('error en el proceso de editar/crear actividad en el calendario', e)
        }

    };



    /* cerrar actividad seleccionada*/
    const handleOffSelectedActivity = () => {
        setSelectedActivity(null)

    }

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
        setPreloadData({title: '',
            description: '',
            hour: '10',
            minutes: '00',
            id: ''})
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
                    <p>Actividades pendientes: {getPendingActivities()}</p>
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
                            dateOptions={dateOptions}
                        />


                        {/* formulario de las actividades */}
                        {isAddFormOpen && (

                            <form
                                id='CalendarForm'
                                className='CalendarForm'
                                onSubmit={handleSubmit}>


                                <input type="text" placeholder='Nombre actividad' value={preloadData?.title ||''} // si hay act seleccionada, precargar 
                                    onChange={(e) => setPreloadData({...preloadData, title: e.target.value})}
                                    required
                                    className='CalendarForm-input'
                                />

                                {/* select de horas */}
                                <select
                                    className='CalendarForm-select'
                                    value={preloadData.hour || '10'} onChange={(e) => setPreloadData({...preloadData, hour: e.target.value})}>
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
                                    value={preloadData.minutes || '00'} onChange={(e) => setPreloadData({...preloadData, minutes: e.target.value})}>
                                    <option value="00">00</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                </select>

                                <textarea
                                    className='CalendarForm-textarea'
                                    placeholder='Descripción (opcional)'
                                    value={preloadData.description || ''}
                                    onChange={(e) => setPreloadData({...preloadData, description: e.target.value})}
                                    rows={10}
                                    cols={40}
                                >
                                </textarea>



                                <button className='CalendarForm-btn CalendarForm-btn--confirm' type='submit'>
                                    {selectedActivity ? 'Actualizar actividad' : 'Guardar actividad'}
                                </button>
                                <button className='CalendarForm-btn CalendarForm-btn--cancel' onClick={handleCloseForm}>Cerrar formulario</button>
                            </form>

                        )
                        }
                        {toastMessage &&
                            <div className='ToastMessage'>
                                {toastMessage}
                            </div>
                        }

                        {selectedActivity && (
                            <div id='ActividadSeleccionada' className='ActividadSeleccionada'>
                                <button className='ActividadSeleccionada-close' onClick={handleOffSelectedActivity}>X</button>
                                <h3 className='ActividadSeleccionada-h3'>Actividad seleccionada</h3>
                                <h4 className='ActividadSeleccionada-h4'>{selectedActivity.title}</h4>
                                {selectedActivity.description ? (<p className='ActividadSeleccionada-p'><strong>Descripción</strong>{selectedActivity.description}</p>
                                ) : ""}
                                <p className='ActividadSeleccionada-p'><strong>Hora:</strong>{selectedActivity.timeExact}</p>

                                <div className='ActividadSeleccionada-botones'>
                                    <button className='ActividadSeleccionada-btn ActividadSeleccionada-btn--edit' onClick={() => handleEdit(selectedActivity)}>Editar</button>
                                    <button className='ActividadSeleccionada-btn ActividadSeleccionada-btn--delete' onClick={() =>{    console.log("Actividad seleccionada:", selectedActivity);
handleDelete(selectedActivity.id)} }>Eliminar</button>
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


