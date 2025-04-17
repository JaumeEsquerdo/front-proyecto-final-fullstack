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
                <img className='Profile-bg' src="/img/fondo-escena.png" alt="img de fondo" />
                <button className="Profile-nav" onClick={handleBack}>
                    <img className='Profile-link' src="/img/flecha-atras.svg" alt="Perfil" />
                </button>
                <div className="Profile-card">
                    <h2 className="Profile-title">Tu Perfil</h2>

                    <form className="Profile-form">


                        <label className="Profile-label">Nombre
                            <input type="text" className="Profile-input" />
                        </label>



                        <label className="Profile-label">Email
                            <input type="email" className="Profile-input" />
                        </label>


                        <label className="Profile-label">Contraseña
                            <input type="password" className="Profile-input" />
                        </label>

                        <button className="Profile-button" type="submit">Guardar cambios</button>
                    </form>



                    <button className="Profile-logout">Cerrar sesión</button>
                </div>

            </div>
        </>
    );
}

export default Profile;