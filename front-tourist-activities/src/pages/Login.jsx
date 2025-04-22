import '@/css/pages/login-register.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL
    const API_ROUTER = import.meta.env.VITE_API_ROUTER
    const API_AUTH_LOGIN = import.meta.env.VITE_AUTH_LOGIN

    const handleLogin = async (e) => {
        e.preventDefault();


        try {

            const res = await fetch(`${API_URL}${API_ROUTER}${API_AUTH_LOGIN}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok) {
                // si hay error mostrarlo
                setError(data.msg || "Error en el login");
                return;
            }

            if (data.token) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate("/home");
            } else {
                setError("No ha llegado el token")
            }

        } catch (e) {
            console.error("Error en el fetch del login", e);
            setError("Error en la conexión del servidor")

        }
    }

    return (
        <>
            <div className="Login">
                {/* <img className="WelcomePage-fondo" src="/img/fondo-escena.png" alt="Fondo escena" /> */}
                <div className='Login-container'>
                    <h1 className="Login-h1">Accede a tu cuenta</h1>
                    <div className='Login-divForm'>

                        <form onSubmit={handleLogin} className="Login-form">
                            <label className="Login-label">
                                <span className='Login-inputTitle'>Email</span>
                                <input required value={email} onChange={(e) => setEmail(e.target.value)} className="Login-input" type="email" />
                            </label>

                            <label className="Login-label">
                                <span className='Login-inputTitle'>Contraseña</span>
                                <input required value={password} onChange={(e) => setPassword(e.target.value)} className="Login-input" type="password"></input>

                            </label>
                            <button className='Login-btn'>Inicia sesión</button>
                        </form>

                        {error && (
                            <div className='Login-error'>{error}
                            </div>)}

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