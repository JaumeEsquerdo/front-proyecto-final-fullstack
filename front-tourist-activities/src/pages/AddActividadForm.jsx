import { useState } from "react";
import { Link } from "react-router-dom";

const AddActividadForm = () => {

    const [actividad, setActividad] = useState({
        titulo: '',
        descripcion: '',
        tipo: 'cultural'
    })

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('')

    const API_URL = import.meta.env.VITE_API_URL;
    const API_ROUTER = import.meta.env.VITE_API_ROUTER;
    const API_ACTIVIDADES = import.meta.env.VITE_API_ACTIVIDADES;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setActividad((prev) => ({ ...prev, [name]: value }))
    }



    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        const token = localStorage.getItem('token');
        console.log(token)

        try {
            const res = await fetch(`${API_URL}${API_ROUTER}${API_ACTIVIDADES}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(actividad)
            })

            const data = await res.json();

            if (res.ok) {
                setSuccess('AcTividad creada correctamente');
                setActividad({ titulo: '', descripcion: '', tipo: 'cultural' }) //limpieza

            } else {
                setError(data.msg || 'Hubo un problema al crear la actividad')
            }
        } catch (e) {
            setError('error en la conexión del server')
            console.error(e)
        }
    }

    return (
        <>
            <div>
                <h1>Agregar actividad recomendada</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Título de la actividad
                            <input name="titulo" required type="text" value={actividad.titulo} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>Descripción
                            <textarea name="descripcion" required type="textarea" value={actividad.descripcion} onChange={handleChange} />
                        </label>
                    </div>
                    <div>
                        <label>Tipo
                            <select name="tipo" value={actividad.tipo} required onChange={handleChange}>
                                <option value="cultural">Cultural</option>
                                <option value="playa">Playa</option>
                                <option value="naturaleza">Naturaleza</option>
                                <option value="deporte">Deporte</option>
                                <option value="gastronomia">Gastronomía</option>
                                <option value="ocio">Ocio</option>
                            </select>
                        </label>
                    </div>
                    <button type="submit">Agregar actividad</button>
                </form>
                {success && <p style={{ color: 'green' }}>{success}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Link to="/home">Ir al home</Link>
            </div>
        </>
    );
}

export default AddActividadForm;