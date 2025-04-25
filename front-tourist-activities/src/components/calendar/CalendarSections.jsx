import Calendar from "react-calendar"; // importar calendario por defecto
import 'react-calendar/dist/Calendar.css' //css predefinido para el calendario
import { useEffect, useRef } from "react";
import { useActivity } from '@/context/ActivityContext'



/* Header del Calendario.jsx*/
export const CalendarHeader = ({ formateDate, getPendingActivities, showCalendar, setShowCalendar }) => {
    return (
        <div className='CalendarHeader'>
            <div className=''>
                <h2>Hoy es {formateDate}</h2>
                <p>Actividades pendientes: {getPendingActivities()}</p>
            </div>

            <button className='CalendarHeader-btn' onClick={() => setShowCalendar(!showCalendar)}>
                <img className='CalendarHeader-btnImg' src='/img/calendario-blanco-32px.png' alt='Calendario' />

            </button>

        </div>
    )
}



/*---MOSTRAR CALENDARIO EN VISTA AÑO PARA SELECCIONAR FECHA---
    el componente del calendario viene importado! "import Calendar from "react-calendar" "

    funcionamiento:
    - view 'year: vista de meses del año
    - onChange 'handleDateChange' : se ejecuta al seleccionar fecha exacta (actualizar fecha)
    - value 'selectedDate' : obtiene la fecha seleccionada actual
    - onclickmonth 'handledatechange' : para cambiar de mes sin seleccionar dia y actualizar

    */
export const CalendarSelector = ({ showCalendar, selectedDate, handleDateChange }) => {
    return (
        <>
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
        </>
    );
}


/* ---SLIDER DE DIAS DEL MES---

    useRef en los días del mes:
    cuando se renderiza el slider quiero q el boton del dia actual tenga una ref para que se haga un scroll a ese día y asi centrar el slider con la fecha actual
        const todayRef = useRef(null); es -> es la referencia creada
        dentro del useEffect si existe todayRef.current... scrollIntoView para el scroll hasta esa posición
        el today = new Date() lo utilizo dentro del map de los dias para comparar y descbrir cual es el dia de hoy(tanto dia como mes y año)
        y en cada button del map se pone ref={isToday ? todayRef : null} -> cada btn representa un dia y es preguntado con el ref si es hoy y si es cierto le pongo todayRef para q vaya el scroll a el
*/
export const MonthDaysSlider = ({ monthDays, selectedDay, onSelectDay }) => {

    const todayRef = useRef(null);

    useEffect(() => {
        if (todayRef.current) {
            todayRef.current.scrollIntoView({
                behavior: 'smooth',
                inline: 'center',
                block: 'nearest'
            })
        }
    }, [])

    const today = new Date()

    return (
        <>
            <div className='Slider'>
                {
                    monthDays.map((day, i) => (

                        <DayButton
                            key={i}
                            day={day}
                            today={today}
                            todayRef={todayRef}
                            selectedDay={selectedDay}
                            onSelectDay={onSelectDay}
                        />

                    ))
                }
            </div>
        </>
    );
}



const DayButton = ({ day, today, todayRef, selectedDay, onSelectDay }) => {
    const isToday =
        day.getDate() === today.getDate()
        && day.getMonth() === today.getMonth()
        && day.getFullYear() === today.getFullYear();


    return (
        <button
            ref={isToday ? todayRef : null}
            onClick={() => onSelectDay(day)}
            className={`Slider-btn ${selectedDay?.getDate() === day.getDate() ? 'Selected-day' : ""}`}
        >
            {day.getDate()}
        </button>
    );
}





/*---MOSTRAR ACTIVIDADES DEL DIA SELECCIONADO POR HORAS--- */
export const ActivityPanel = ({ setShowExtraHours, showExtraHours, selectedDay, visibleHours, dateOptions }) => {
    const now = new Date();

    return (
        <>
            <div className='Actividades'>
                <h3 className="Actividades-h3">Actividades para {selectedDay.toLocaleDateString('es-Es', dateOptions)}</h3>
                <button className="Actividades-btn" onClick={() => setShowExtraHours(!showExtraHours)}>
                    {showExtraHours ? 'Ocultar horas extra' : 'Mostrar todas las horas'}
                </button>
                {visibleHours.map((hour, i) => (
                    <BloqueHora key={i} hour={hour}
                        selectedDay={selectedDay}
                        now={now} />
                ))}
            </div>
        </>
    );
}

const BloqueHora = ({ hour, selectedDay, now }) => {
    const { activities } = useActivity();

    const actividadesDeEstaHora = activities.filter(a => a.displayHours === hour && new Date(a.time).toDateString() === selectedDay.toDateString()) //mostrar actividades por horas y q esten separadas segun la hora

    return (
        <div className={`BloqueHoras`}>
            <h4 className="BloqueHoras-h4">{hour}</h4>
            {actividadesDeEstaHora.map((a, i) => (
                <Actividad key={i} activity={a} now={now} />

            ))}
        </div>
    )
}


const Actividad = ({ activity, now }) => {
    const { setSelectedActivity } = useActivity()
    const activityDate = new Date(activity.time)
    const hasPassed = activityDate < now;

    // comprobar si la act esta dentro de la proxima hora
    const oneHourFromNow = new Date(now.getTime() + 60 * 60 * 1000)
    const isSoon = activityDate > now && activityDate <= oneHourFromNow

    let clase = 'actividad-futura'
    if (hasPassed) clase = 'actividad-pasada'
    else if (isSoon) clase = 'actividad-pronto'
    // aqui paso la actividad al selectedActivity!!!
    return (
        <p onClick={() => {

            console.log('Actividad seleccionada:', activity);
            { setSelectedActivity(activity) }

        }
        } className={`CalendarioHoras ${clase}`}>
            {activity.timeExact} - {activity.title}
        </p>
    )
}


/* form del calendario */
export const CalendarForm = ({
    preloadData,
    setPreloadData,
    handleSubmit,
    handleCloseForm,
    selectedDay,
    setSelectedActivity
}) => {
    return (

        <form
            id='CalendarForm'
            className='CalendarForm'
            onSubmit={handleSubmit}>
            <h3>El {selectedDay.toLocaleDateString('es-Es', dateOptions)}</h3>


            <input type="text" placeholder='Nombre actividad' value={preloadData?.title || ''} // si hay act seleccionada, precargar 
                onChange={(e) => setPreloadData({ ...preloadData, title: e.target.value })}
                required
                className='CalendarForm-input'
            />

            {/* select de horas */}
            <select
                className='CalendarForm-select'
                value={preloadData.hour || '10'} onChange={(e) => setPreloadData({ ...preloadData, hour: e.target.value })}>
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
                value={preloadData.minutes || '00'} onChange={(e) => setPreloadData({ ...preloadData, minutes: e.target.value })}>
                <option value="00">00</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
            </select>

            <textarea
                className='CalendarForm-textarea'
                placeholder='Descripción (opcional)'
                value={preloadData.description || ''}
                onChange={(e) => setPreloadData({ ...preloadData, description: e.target.value })}
                rows={10}
                cols={40}
            >
            </textarea>



            <button className='CalendarForm-btn CalendarForm-btn--confirm' type='submit'>
                {selectedActivity ? 'Actualizar actividad' : 'Guardar actividad'}
            </button>
            <button type='button' className='CalendarForm-btn CalendarForm-btn--cancel' onClick={handleCloseForm}>Cerrar formulario</button>
        </form>

    )
}


/* render de act. seleccionada */
export const ActivitySelected = ({ selectedActivity, handleOffSelectedActivity, handleEdit, handleDelete }) => {
    return (
        <div id='ActividadSeleccionada' className='ActividadSeleccionada'>
            <button className='ActividadSeleccionada-close' onClick={handleOffSelectedActivity}>X</button>
            <h3 className='ActividadSeleccionada-h3'>Actividad seleccionada</h3>
            <h4 className='ActividadSeleccionada-h4'>{selectedActivity.title}</h4>
            {selectedActivity.description ? (<p className='ActividadSeleccionada-p'><strong>Descripción</strong>{selectedActivity.description}</p>
            ) : ""}
            <p className='ActividadSeleccionada-p'><strong>Hora: </strong>{selectedActivity.timeExact}</p>

            <div className='ActividadSeleccionada-botones'>
                <button className='ActividadSeleccionada-btn ActividadSeleccionada-btn--edit' onClick={() => handleEdit(selectedActivity)}>Editar</button>
                <button className='ActividadSeleccionada-btn ActividadSeleccionada-btn--delete' onClick={() => {
                    console.log("Actividad seleccionada:", selectedActivity);
                    handleDelete(selectedActivity.id)
                }}>Eliminar</button>
            </div>
        </div>
    )
}
