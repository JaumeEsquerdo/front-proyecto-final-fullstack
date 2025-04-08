import '@/css/pages/login.css'
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <>
            <div className="Login">
                img
                <div className='Login-container'>
                    <h1 className="Login-h1">Accede a tu cuenta</h1>
                    <div className='Login-divForm'>
                        <form className="Login-form">
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
                            <span>No tienes cuenta aún? </span>
                            <Link to='/register'>Regístrate aquí</Link>
                        </div>
                    </div>

                </div>

            </div>
        </>
    );
}

export default Login;