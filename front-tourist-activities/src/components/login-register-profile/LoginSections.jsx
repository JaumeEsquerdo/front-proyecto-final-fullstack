import { Link } from "react-router-dom"

/* form del login */
export const LoginForm = ({ email, password, setEmail, setPassword, handleLogin }) => {
    return (

        <form onSubmit={handleLogin} className="Login-form">
            <label className="Login-label">
                <span className='Login-inputTitle'>Email</span>
                <input required value={email} onChange={(e) => setEmail(e.target.value)} className="Login-input" type="email" />
            </label>

            <label className="Login-label">
                <span className='Login-inputTitle'>Contraseña</span>
                <input required value={password} onChange={(e) => setPassword(e.target.value)} className="Login-input" type="password"></input>

            </label>
            <button className='Login-btn'>Iniciar sesión</button>
        </form>
    )
}


export const PolicyLinks = () => {
    return (
        <div className='Policy-links'>
            <Link className='Policy-link' to='/politica-privacidad'>Política de privacidad</Link>
            <Link className='Policy-link' to='/terminos-condiciones'>TyC</Link>
        </div>

    )
}