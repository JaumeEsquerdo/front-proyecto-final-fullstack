import Calendar from "react-calendar"; // importar calendario por defecto
import 'react-calendar/dist/Calendar.css' //css predefinido para el calendario

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

export const MonthDaysSlider = ({ monthDays, selectedDay, onSelectDay }) => {
    return (
        <>
            <div className='Slider'>
                {
                    monthDays.map((day, i) => (
                        <button
                            key={i}
                            onClick={() => onSelectDay(day)}
                            className={`Slider-btn ${selectedDay?.getDate() === day.getDate() ? 'Selected-day' : ""}`}
                        >
                            {day.getDate()}
                        </button>
                    ))
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
                            <h4>{hour}</h4>
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


