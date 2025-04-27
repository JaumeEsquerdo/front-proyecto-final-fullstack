# Proyecto final de diseño web fullstack CEI

https://front-proyecto-final-fullstack.vercel.app/
https://github.com/JaumeEsquerdo/front-proyecto-final-fullstack
https://github.com/JaumeEsquerdo/backend-proyecto-final-fullstack.git

## Estructura y funcionamiento de la App :

### Toda la app está pensado en utilizarla cuando visitas la ciudad de Villajoyosa

1. Welcome Page

- Breve presentación de la app.

- Explicación de los packs de actividades y beneficios de organizar el viaje.

- Llamado a la acción: Empezar o algo asi.

- Cuando le das a empezar redirije a login, alli o entras con tu cuenta o clickas al link de Register


  2. Home (Pantalla de inicio)

- Packs de actividades recomendados (Ejemplo: "Ruta gastronómica", "Día de playa", "Tour histórico"). Con botón de me gusta para guardarlos en una lista de referencia.

- Actividades sueltas recomendadas, al hay un filtro para ver solo las 6 primeras, si le das a ver todas, aparecen botones filtrando por el tipo de actividades que son, cultural, ocio...

- si clickas en alguna actividad en el boton de añadir o agregar actividad, te redirije la página Calendario, donde se te abre un form abajo del calendario y del dashboard con la actividad y con la opcion para ponerle la hora y rellenar como quieras el form, incluso cambiando el titulo de esa actividad.


3. Calendario (Organización de Actividades)
 (vista diaria)

- Vista diaria de actividades programadas con posibilidad de editarlas / eliminarlas.



- Si traes la actividad recomendada desde la pagina Home se te abre directamente la actividad. Si quieres cambiarle la fecha vas arriba donde aparecen los dias del mes y le pones el dia, se mantiene el form abierto y se actualiza el dia.

- Opción de crear actividad personalizada si no está en la base de datos (ejemplo: "Visitar a un amigo").

- Campos de actividad: 
    - Nombre

    - Descripción (opcional)

    - Hora

- Puedes cambiar tambien de mes y año desde un icono de calendario, el calendario es de una libreria de react.


 4. Header

 - Logo y botón para ir al perfil (icono)


 5. Footer

 - Aqui se encuentra el nav de la app : icono de 'Home' y el icono de 'Calendario'.

 - Tambien se encuentra el botón '+' de añadir actividad, que abre un formulario en el calendario para añadir la actividad. Si estás en la página Home dándole una vez te redirije a la página 'Calendario' y si estás en 'Calendario' y de nuevo le das al boton '+' se te abre ahora si el form de agregar actividad.


6. Perfil

- Datos básicos del perfil: nombre, email, con posibilidad de actualizar
- También puedes actualizar la contraseña
- opción de logout


7. Páginas de Login y Register

- Al login entras con tu email y contraseña
- Al register le pones nombre email y contraseña, la contraseña tiene que tner 6 caracteres minimo



### Aspectos técnicos:

Front: React + CSS
Backend: Node.js con Express y MongoDB





# FIGMA DEL PROYECTO!

[FIGMA](https://www.figma.com/design/Qo6Jr7O0xUuxmZzhrlkCfL/PROYECTO-FINAL-BACKEND?node-id=0-1&p=f&t=zRk69933bAcFhLtx-0)


# Iconos de las listas de actividades y de tipo de actividades: 
iconos para actividades sueltas : https://www.flaticon.es/resultados?word=playa&type=uicon

iconos para los packs: https://www.svgrepo.com/collection/travel-theme-candy-vectors/

