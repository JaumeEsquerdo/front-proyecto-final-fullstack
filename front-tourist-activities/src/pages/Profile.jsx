import '@/css/pages/profile.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate();

    const handleBack = () => {

        const from = sessionStorage.getItem('fromPerfil')

        if (from === '/home' || from === '/calendario') {
            navigate(from)
        } else {
            navigate('/home') // ruta por defecto para evitar bucle en el botón de ir a la página anterior (podría ser Politica Priv o TyC)
        }
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