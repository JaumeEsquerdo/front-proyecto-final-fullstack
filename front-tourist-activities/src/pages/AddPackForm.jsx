import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddPackForm = () => {

    const [pack, setPack] = useState({
        nombre: '',
        tipo: 'cultural',
        color: 'yellow',
        actividades: []
    })

    const [actividadesDisponibles, setActividadesDisponibles] = useState([]);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;
    const API_ROUTER = import.meta.env.VITE_API_ROUTER;
    const API_ACTIVIDADES = import.meta.env.VITE_API_ACTIVIDADES;
    const API_PACKS = import.meta.env.VITE_API_PACKS


    // para obtener las actividades a guardar dentro de los packs
    useEffect(() => {
        const controller = new AbortController();
        const signal = controller.signal;

        const fetchActividades = async () => {
            const token = localStorage.getItem('token');

            try {
                const res = await fetch(`${API_URL}${API_ROUTER}${API_ACTIVIDADES}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    signal: signal
                })

                const data = await res.json();

                if (res.ok) {
                    setActividadesDisponibles(data.data)
                } else {
                    setError('Error al cargar actividades')
                }
            } catch (err) {
                if (err.name === 'AbortError') return;
                console.error('error al obtener las actividades para los packs ', err)
                setError('error de conexion al servidor')
            }
        }
        fetchActividades();

        return () => {
            controller.abort(); // para cancelar la solicitud si el componente se desmonta
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPack((prev) => ({ ...prev, [name]: value }))
    };

    const handleActividadSelect = (e) => {
        const value = e.target.value;
        if (pack.actividades.includes(value)) {
            setPack((prev) => ({ //si la actividad no esta se añade al pack, si esta se quita (para un select)
                ...prev,
                actividades: prev.actividades.filter((id) => id !== value)
            }))
        } else {
            if (pack.actividades.length > 5) {
                alert("solo puedes seleccionar hasta 5 actividades por pack")
                return;
            }
            setPack((prev) => ({
                ...prev,
                actividades: [...prev.actividades, value]
            }))
        }
    }
    /* crear los packs */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        setSuccess('')

        const token = localStorage.getItem('token')

        try {
            const res = await fetch(`${API_URL}${API_ROUTER}${API_PACKS}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(pack)
            })

            const data = await res.json();

            if (res.ok) {
                setSuccess('Pack creado correctamente');
                setPack({
                    nombre: '', tipo: 'cultural', color: 'yellow', actividades: []
                })
            } else {
                setError(data.msg || 'error al crear el pack')
            }

        } catch (e) {
            if (e.name === "AbortError") return; // 👈 Silenciar abort
            console.error('error en la conexion del servidor de los packs ', e)
            setError('error de conexion al servidor')

        }
    }

    return (
        <>

            <div>
                <h1>Crear un nuevo pack de actividades recomendadas</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Nombre
                            <input name="nombre" type="text" required value={pack.nombre} onChange={handleChange} />
                        </label>
                    </div>

                    <div>
                        <label>
                            Tipo
                            <select name="tipo" value={pack.tipo} onChange={handleChange} required>
                                <option value="cultural">Cultural</option>
                                <option value="playa">Playa</option>
                                <option value="naturaleza">Naturaleza</option>
                                <option value="deporte">Deporte</option>
                                <option value="gastronomia">Gastronomía</option>
                                <option value="ocio">Ocio</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>
                            Color
                            <select name="color" value={pack.color} onChange={handleChange} required>
                                <option value="yellow">amarillo</option>
                                <option value="red">rojo</option>
                                <option value="pink">rosa</option>
                                <option value="green">verde</option>
                                <option value="brown">marron</option>
                                <option value="purple">morado</option>
                                <option value="blue">azul</option>
                                <option value="orange">naranja</option>
                            </select>
                        </label>
                    </div>

                    <div>
                        <label>Selecciona hasta 5 actividades</label>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            {actividadesDisponibles.map((actividad) => (
                                <label key={actividad._id}>
                                    <input type="checkbox" value={actividad._id}
                                        // marcar el checkbox si esta dentro del pack
                                        checked={pack.actividades.includes(actividad._id)}
                                        onChange={handleActividadSelect}
                                    />
                                    {actividad.titulo}
                                </label>
                            ))}

                        </div>
                    </div>
                    <button type="submit">Crear pack</button>
                </form>

                {success && <p style={{ color: 'green' }}>{success}</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <Link to="/perfil">Ir devuelta al perfil</Link>
            </div>

        </>);
}

export default AddPackForm;