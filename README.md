# Proyecto final de backend

### Estructura de la App :

1. Landing Page (onboarding)

- Breve presentación de la app.

- Explicación de los packs de actividades y beneficios de organizar el viaje.

- Llamado a la acción: "Regístrate para empezar".

- Opción de Login para usuarios ya registrados.

  2. Dashboard (Pantalla de inicio)

- Bienvenida personalizada: Si es la primera vez, pequeña explicación de la app.

- Packs de actividades recomendados (Ejemplo: "Ruta gastronómica", "Día de playa", "Tour histórico"). Con botón de me gusta para guardarlos en una lista de referencia.

- Resumen de su planificación: Si ya tiene actividades organizadas, se muestran aquí con vista rápida.

- Mapa integrado con Leaflet para ver ubicación de actividades guardadas o recomendadas.

3. Calendario (Organización de Actividades)
 (vista diaria y semanal)

- Vista diaria de actividades programadas con posibilidad de eliminarlas.

- Botón ‘+ Añadir actividad’ que abre un formulario:

- Búsqueda con autocompletado de actividades predefinidas (según dos letras introducidas).

- Opción de crear actividad personalizada si no está en la base de datos (ejemplo: "Visitar a un amigo").

- Campos de actividad: 
    - Nombre

    - Descripción

    - Imagen (opcional)

    - Precio (si aplica)

    - Horario

    - Recomendación de franja horaria (ej: "Mejor por la tarde").

    - Ubicación (marcada en el mapa).

- Asignación de hora y ubicación en el mapa.
- Posibilidad de editar/eliminar actividades programadas.



 4. Mapa interactivo? (dudas de como lo voy a poder realizar... lo veré más adelante cuando esté ya más madura la web)

- Ubicación de todas las actividades programadas en el día.

- Posibilidad de filtrar por tipo de actividad.

- Se accede desde el Dashboard o el Calendario.

5. Perfil-Login / Register

- Si no está logeado: Formulario de login/registro.

- Si está logeado:

Ver su información de usuario.

Historial de actividades guardadas.

Configuración.

### Aspectos técnicos:

Front: React + CSS
Backend: Node.js con Express y MongoDB
Mapa: Leaflet para mostrar ubicaciones


### API para poner un mapa interactivo:
Leaflet 
