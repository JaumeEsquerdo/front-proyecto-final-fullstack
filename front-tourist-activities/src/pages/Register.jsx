import '@/css/pages/register.css'
import { Link } from 'react-router-dom';
const Register = () => {
    return (
        <>
            <div className="Register">
            <img className="WelcomePage-fondo" src="/img/fondo-escena.png" alt="Fondo escena" />

                <div className='Register-container'>
                    <h1 className="Register-h1">Registro</h1>
                    <div className='Register-divForm'>
                        <form className="Register-form">
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