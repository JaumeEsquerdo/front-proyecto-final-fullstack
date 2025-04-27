import { PolicyLinks } from '@/components/login-register-profile/LoginSections';
import { PasswordChangeForm, ProfileForm, ProfileHeader, ProfileInfo } from '@/components/login-register-profile/ProfileSections';
import '@/css/pages/profile.css'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


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

    // useEffect(() => {
    //     console.log("Estado de user:", user);
    // }, [user]);

    /* obtener perfil */
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

                // console.log('datos del usuario', data)

                if (data.data && data.data._id) {
                    setUser({ ...data.data, id: data.data._id }); // renombro id porq me da error si pongo user._id en el fetch de update
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


        if (!user || !user.id) {
            setError("ID de usuario no encontrado");
            return; // Evita hacer la petición si el ID no está disponible
        }
        const updateData = {
            name: newName || user.name,
            email: newEmail || user.email // mantener valores actuales si no se modifican
        };


        try {
            const res = await fetch(`${API_URL}${API_ROUTER}/usuarios/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(updateData)
            });

            const data = await res.json();

            // console.log("Respuesta de la API al actualizar:", data); // Verifica la respuesta


            if (!res.ok) {
                setError(data.msg || "Error al actualizar los datos");
                return;
            }

            setUser(data.data);

            localStorage.setItem('user', JSON.stringify(data.data))
            setError('');
            setIsEditing(false) // al final volver al modo solo lectura


        } catch (e) {
            console.error('Error en el fetch para actualizar perfil', e);
            setError("Error en la conexión del servidor en actualizar perfil")

        }
    }
    /* actualizar pass */
    const handleUpdatePassword = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setError("No se ha encontrado el token del usuario");
            return;
        }

        // console.log("User object:", user); // Verifica el objeto completo del usuario
        // console.log("User ID:", user.id); // Verifica el _id del usuarios

        const updateData = {
            oldPassword: currentPassword, //contraseña actual
            newPassword: newPassword //nueva contrasña
        }

        try {
            const res = await fetch(`${API_URL}${API_ROUTER}/usuarios/${user.id}/password`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'

                },
                body: JSON.stringify(updateData)
            });

            const data = await res.json();

            // console.log("Respuesta de la API al actualizar conrtaseña", data)
            if (!res.ok) {
                setError(data.msg || "Error al actualizar contraseña")
                return;
            }

            setError("")
            setShowPasswordForm(false)
        } catch (e) {
            console.error("Error en el fetch para actualizar contraseña", e);
            setError("Error en la conexión del servidor al actualizar contraseña");

        }
    }

    const handleTogglePasswordForm = () => {
        setShowPasswordForm(!showPasswordForm)
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login")
    }

    if (!user) {
        return <div>Cargando...</div>; // Mostrar mientras los datos del usuario no se han cargado
    }




    return (
        <>

            <div className="Profile">
                <img className='Profile-bg' src="/img/fondo-escena.png" alt="img de fondo" />
                <ProfileHeader
                    handleBack={handleBack}
                />
                <div className="Profile-card">
                    <h2 className="Profile-title">Tu Perfil</h2>

                    {isEditing ? (

                        <ProfileForm
                            newName={newName}
                            newEmail={newEmail}
                            setNewEmail={setNewEmail}
                            setNewName={setNewName}
                            handleUpdateProfile={handleUpdateProfile}
                            setIsEditing={setIsEditing}
                        />



                    ) : (
                        <ProfileInfo
                            user={user}
                            setIsEditing={setIsEditing}
                        />
                    )}
                    <button className='Profile-button Profile-button--pass' onClick={handleTogglePasswordForm}>{showPasswordForm ? "Cancelar cambio de contraseña" : "Cambiar contraseña"}</button>

                    {showPasswordForm && (
                        <PasswordChangeForm
                            currentPassword={currentPassword}
                            setCurrentPassword={setCurrentPassword}
                            newPassword={newPassword}
                            setNewPassword={setNewPassword}
                            handleUpdatePassword={handleUpdatePassword}
                        />
                    )}



                    {error && <div className='Profile-error'>{error}</div>}

                    <button onClick={handleLogout} className="Profile-logout">Cerrar sesión</button>

                    <PolicyLinks />
                </div>

            </div>
        </>
    );
}

export default Profile;