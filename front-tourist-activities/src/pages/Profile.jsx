import '@/css/pages/profile.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("");

    const [showPasswordForm, setShowPasswordForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("")

    const API_URL = import.meta.env.VITE_API_URL
    const API_ROUTER = import.meta.env.VITE_API_ROUTER
    const API_AUTH_GET_USER = import.meta.env.VITE_AUTH_GET_USER

    useEffect(() => {
        console.log("Estado de user:", user);
    }, [user]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`${API_URL}${API_ROUTER}${API_AUTH_GET_USER}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await res.json();

                if (!res.ok) {
                    setError(data.msg || "Error al obtener los datos del usuario")
                    return;
                }

                console.log('datos del usuario', data)

                if (data.data && data.data._id) {
                    setUser(data.data);
                    setNewName(data.data.name);
                    setNewEmail(data.data.email);
                } else {
                    setError("Error: id de usuario no valido")
                }


            } catch (e) {
                console.error("Error en el fetch de usuario", e)
                setError("Error en la conexión del servidor")
            }
        }
        fetchUserData();
    }, [])


    // para volver a la página anterior
    const handleBack = () => {

        const from = sessionStorage.getItem('fromPerfil')

        if (from === '/home' || from === '/calendario') {
            navigate(from)
        } else {
            navigate('/home') // ruta por defecto para evitar bucle en el botón de ir a la página anterior (podría ser Politica Priv o TyC)
        }
    }

    //para actualizar el perfil
    const handleUpdateProfile = async (e) => {
        e.preventDefault();



        const token = localStorage.getItem('token');
        if (!token) {
            setError("No se ha encontrado el token del usuario")
            return;
        }

        console.log("ID del usuario:", user._id); // Verifica si el _id está disponible

        const updateData = {
            name: newName || user.name,
            email: newEmail || user.email // mantener valores actuales si no se modifican
        };


        try {
            const res = await fetch(`${API_URL}${API_ROUTER}/usuarios/${user._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(updateData)
            });

            const data = await res.json();

            console.log("Respuesta de la API al actualizar:", data); // Verifica la respuesta


            if (!res.ok) {
                setError(data.msg || "Error al actualizar los datos");
                return;
            }

            setUser(data.data);
            setError('');
            setIsEditing(false) // al final volver al modo solo lectura


        } catch (e) {
            console.error('Error en el fetch para actualizar perfil', e);
            setError("Error en la conexión del servidor en actualizar perfil")

        }
    }

    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setError("No se ha encontrado el token del usuario");
            return;
        }

        const updateData = {
            oldPassword: currentPassword, //contraseña actual
            newPassword: newPassword //nueva contrasña
        }

        try {
            const res = await fetch(`${API_URL}${API_ROUTER}/usuarios/${user._id}/contraseña`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(updateData)
            });

            const data = await res.json();

            console.log("Respuesta de la API al actualizar conrtaseña", data)
            if (!res.ok) {
                setError(data.msg || "Error al actualizar contraseña")
                return;
            }

            setError("")
            setShowPasswordForm(false)
        } catch (e) {
            console.error("Error en el fetch para actualizar contraseña", e)

        }
    }

    const handleTogglePasswordForm = () => {
        setShowPasswordForm(!showPasswordForm)
    }

    if (!user) {
        return <div>Cargando...</div>; // Mostrar mientras los datos del usuario no se han cargado
    }


    

    return (
        <>

            <div className="Profile">
                <img className='Profile-bg' src="/img/fondo-escena.png" alt="img de fondo" />
                <nav className="Profile-nav" >
                    <img onClick={handleBack} className='Profile-link' src="/img/flecha-atras.svg" alt="Perfil" />
                </nav>
                <div className="Profile-card">
                    <h2 className="Profile-title">Tu Perfil</h2>

                    {isEditing ? (

                        <form onSubmit={handleUpdateProfile} className="Profile-form">
                            <label className="Profile-label">Nombre
                                <input value={newName} onChange={(e) => setNewName(e.target.value)} type="text" className="Profile-input" />
                            </label>

                            <label className="Profile-label">Email
                                <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="email" className="Profile-input" />
                            </label>
                            <div>
                                <button className="Profile-button" type="submit">Guardar cambios</button>
                                <button type='button' onClick={() => {
                                    setIsEditing(false);
                                }
                                } className='Profile-button Profile-button--cancel'>Cancelar</button>
                            </div>
                        </form>



                    ) : (
                        <div>
                            <p><strong>Nombre:</strong>{user.name}</p>
                            <p><strong>Email:</strong>{user.email}</p>
                            <button className='Profile-button' onClick={() => setIsEditing(true)}>Editar perfil</button>

                        </div>
                    )}
                    <button onClick={handleTogglePasswordForm}>{showPasswordForm ? "Cancelar cambio de contraseña" : "Cambiar contraseña"}</button>

                    {showPasswordForm && (
                        <form onSubmit={handleUpdatePassword}>
                            <label className="Profile-label">Contraseña antigua
                                <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" className="Profile-input" />
                            </label>
                            <label className="Profile-label">Nueva contraseña
                                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="Profile-input" />
                            </label>
                            <button type='submit'>Actualizar contraseña</button>
                        </form>
                    )}



                    {error && <div className='Profile-error'>{error}</div>}

                    <button className="Profile-logout">Cerrar sesión</button>

                    <div className='Policy-links'>
                        <Link className='Policy-link' to='/politica-privacidad'>Política de privacidad</Link>
                        <Link className='Policy-link' to='/terminos-condiciones'>TyC</Link>
                    </div>
                </div>

            </div>
        </>
    );
}

export default Profile;