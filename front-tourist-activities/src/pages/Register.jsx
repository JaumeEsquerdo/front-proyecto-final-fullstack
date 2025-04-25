import '@/css/pages/login-register.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { PolicyLinks } from '@/components/login-register-profile/LoginSections';
import { RegisterFooter, RegisterForm } from '@/components/login-register-profile/RegisterSections';
const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState('')


    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;
    const API_ROUTER = import.meta.env.VITE_API_ROUTER;
    const API_AUTH_REGISTER = import.meta.env.VITE_AUTH_REGISTER;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes('@') || password.length < 6) {
            setError('Introduce un email válido y una contraseña con al menos 6 carácteres');
            return;
        }

        if (password !== confirmPassword) {
            console.error("Las contraseñas no coinciden");
            return;
        }
        try {
            const res = await fetch(`${API_URL}${API_ROUTER}${API_AUTH_REGISTER}`, {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password })
            })

            const data = await res.json();

            if (!res.ok) {
                console.error(data.msg || "Error al registrar");
                return;
            }
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user))




            navigate('/home')

        } catch (e) {
            console.error("Erroe en el registro", e)
        }



    }
    return (
        <>
            <div className="Register">
                <img className="WelcomePage-fondo" src="/img/fondo-escena.png" alt="Fondo escena" />

                <div className='Register-container'>
                    <h1 className="Register-h1">Registro</h1>
                    <div className='Register-divForm'>

                        <RegisterForm
                            name={name}
                            setName={setName}
                            email={email}
                            setEmail={setEmail}
                            password={password}
                            setPassword={setPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                            handleSubmit={handleSubmit}
                        />
                        {error && (
                            <div className='Login-error'>{error}
                            </div>)}

                        <RegisterFooter />
                    </div>
                    <PolicyLinks />

                </div>

            </div>

        </>
    );
}

export default Register;