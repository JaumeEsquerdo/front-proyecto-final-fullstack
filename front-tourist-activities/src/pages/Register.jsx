import '@/css/pages/login-register.css'
import { useNavigate } from 'react-router-dom';
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

    /* registro */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.includes('@') || password.length < 6) {
            setError('Introduce un email válido y una contraseña con al menos 6 carácteres');
            return;
        }

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden");
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
                setError(data.msg || "Error al registrar");
                return;
            }
            localStorage.setItem('token', data.data.token);
            localStorage.setItem('user', JSON.stringify(data.data.user))



            setError("");
            navigate('/home')

        } catch (e) {
            console.error("Erroe en el registro", e);
            setError('Error en la conexión del servidor');
        }


    }

    return (
        <>
            <div className="Register">
                <h1 className="Login-title">Turistea Villajoyosa</h1>
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
                </div>
                <PolicyLinks from="registro" />
            </div>
        </>
    );
}

export default Register;