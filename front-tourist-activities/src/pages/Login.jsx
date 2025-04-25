import '@/css/pages/login-register.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoginForm, PolicyLinks } from '@/components/login-register-profile/LoginSections';

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

        if (!email.includes('@') || password.length < 6) {
            setError('Introduce un email válido y una contraseña con al menos 6 carácteres');
            return;
        }

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

            console.log("Respuesta del login:", data);

            if (data.data.token) {
                console.log("token recibido", data.data.token)
                localStorage.setItem('token', data.data.token);
                localStorage.setItem('user', JSON.stringify(data.data.user));
                console.log("redirijiendo a home")
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

                        <LoginForm
                            email={email}
                            password={password}
                            setEmail={setEmail}
                            setPassword={setPassword}
                            handleLogin={handleLogin}
                        />

                        {error && (
                            <div className='Login-error'>{error}
                            </div>)}

                        <div className='Login-divLogin'>
                            <span className='Login-textRegister'>No tienes cuenta aún? </span>
                            <Link className='Login-linkRegister' to='/registro'>Regístrate aquí</Link>
                        </div>
                    </div>

                    <PolicyLinks />

                </div>

            </div>
        </>
    );
}

export default Login;