import Calendar from "react-calendar"; // importar calendario por defecto
import 'react-calendar/dist/Calendar.css' //css predefinido para el calendario
import { useEffect, useRef } from "react";

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


/* useRef en los días del mes:
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
                    monthDays.map((day, i) => {
                        const isToday =
                            day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear()


                        return (
                            <button
                                key={i}
                                ref={isToday ? todayRef : null}
                                onClick={() => onSelectDay(day)}
                                className={`Slider-btn ${selectedDay?.getDate() === day.getDate() ? 'Selected-day' : ""}`}
                            >
                                {day.getDate()}
                            </button>
                        );
                    })
                }
            </div>
        </>
    );
}



export const ActivityPanel = ({ selectedDay, visibleHours, activities, dateOptions }) => {
    let globalIndex = 0;
    return (
        <>
            <div className='Actividades'>
                <h3>Actividades para {selectedDay.toLocaleDateString('es-Es', dateOptions)}</h3>

                {visibleHours.map((hour) => {
                    const acttividadesDeEstaHora = activities.filter(a => a.displayHour === hour && new Date(a.time).toDateString() === selectedDay.toDateString())

                    /*if (acttividadesDeEstaHora.length === 0) return null */
                    return (
                        <div key={hour} className={`BloqueHoras`}>
                            <h4 className="BloqueHoras-h4">{hour}</h4>
                            {acttividadesDeEstaHora.map((a, i) => (
                                <p className={`CalendarioHoras CalendarioHoras-${globalIndex++}`} key={i}>{a.timeExact}-{a.title}</p>

                            ))}

                        </div>
                    )
                })}

            </div>
        </>
    );
}


