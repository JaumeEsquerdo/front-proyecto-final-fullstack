import '@/css/pages/login-register.css'
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();

    const API_URL = import.meta.env.VITE_API_URL;
    const API_ROUTER = import.meta.env.VITE_API_ROUTER;
    const API_AUTH_REGISTER = import.meta.env.VITE_AUTH_REGISTER;

    const handleSubmit = async (e) => {
        e.preventDefault();

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

            if (!res.ok) {
                console.error(data.msg || "Error al registrar");
                return;
            }

            const data = await res.json();

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
                        <form onSubmit={handleSubmit} className="Register-form">
                            <label className="Register-label">
                                <span className='Register-inputTitle'>Nombre</span>
                                <input className="Register-input" type="text" />
                            </label>

                            <label className="Register-label">
                                <span className='Register-inputTitle'>Email</span>
                                <input className="Register-input" type="text"></input>

                            </label>
                            <button className='Register-btn'>Registrar</button>
                        </form>
                        <div className='Register-divLogin'>
                            <span className='Register-textLogin'>Ya tienes una cuenta?</span>
                            <Link className='Register-linkLogin' to='/login'>Accede a ella</Link>
                        </div>
                    </div>

                </div>

            </div>

        </>
    );
}

export default Register;