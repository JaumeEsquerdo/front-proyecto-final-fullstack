import '@/css/pages/login-register.css'
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) =>{
        e.preventDefault();

        localStorage.setItem('user', 'true')

        navigate('/home')
    }

    return (
        <>
            <div className="Login">
            {/* <img className="WelcomePage-fondo" src="/img/fondo-escena.png" alt="Fondo escena" /> */}
            <div className='Login-container'>
                    <h1 className="Login-h1">Accede a tu cuenta</h1>
                    <div className='Login-divForm'>
                        <form onSubmit={handleSubmit} className="Login-form">
                            <label className="Login-label">
                                <span className='Login-inputTitle'>Nombre</span>
                                <input className="Login-input" type="text" />
                            </label>

                            <label className="Login-label">
                                <span className='Login-inputTitle'>Email</span>
                                <input className="Login-input" type="text"></input>

                            </label>
                            <button className='Login-btn'>Inicia sesión</button>
                        </form>
                        <div className='Login-divLogin'>
                            <span className='Login-textRegister'>No tienes cuenta aún? </span>
                            <Link className='Login-linkRegister' to='/registro'>Regístrate aquí</Link>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Login;