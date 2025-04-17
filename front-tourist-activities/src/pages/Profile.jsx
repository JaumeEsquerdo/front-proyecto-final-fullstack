import '@/css/pages/profile.css'
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();
    
    const handleBack = () => {
        navigate(-1); // volver a la pagina anterior (o pagina de home o calendar)
    }

    return (
        <>
            <div className="Profile">
                <header className='Profile-header'>
                <button className="Nav-link" onClick={handleBack}>
                <img className='Nav-perfil' src="/img/icono-perfil.svg" alt="Perfil" />
                </button>
                </header>
                <div className="Profile-card">
                    <h2 className="Profile-title">Tu Perfil</h2>
                    img?

                    <form className="Profile-form">

                        <div className="Profile-field">
                            <label className="Profile-label">Nombre
                                <input type="text" className="Profile-input" />
                            </label>
                        </div>

                        <div className="Profile-field">
                            <label className="Profile-label">Email
                                <input type="email" className="Profile-input" />
                            </label>
                        </div>
                        <div className="Profile-field">
                            <label className="Profile-label">Contraseña
                                <input type="password" className="Profile-input" />
                            </label>
                        </div>
                        <button className="Profile-button" type="submit">Guardar cambios</button>
                    </form>



                    <button className="Profile-logout">Cerrar sesión</button>
                </div>

            </div>
        </>
    );
}

export default Profile;