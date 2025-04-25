import { Link } from "react-router-dom"

/* form del register */
export const RegisterForm = ({ name, setName, email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit} className="Register-form">
            <label className="Register-label">
                <span className='Register-inputTitle'>Nombre</span>
                <input value={name} onChange={(e) => setName(e.target.value)} className="Register-input" type="text" />
            </label>

            <label className="Register-label">
                <span className='Register-inputTitle'>Email</span>
                <input value={email} onChange={(e) => setEmail(e.target.value)} className="Register-input" type="text"></input>

            </label>

            <label className="Register-label">
                <span className='Register-inputTitle'>Contraseña</span>
                <input value={password} onChange={(e) => setPassword(e.target.value)} className="Register-input" type="password"></input>

            </label>

            <label className="Register-label">
                <span className='Register-inputTitle'>Confirmar contraseña</span>
                <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="Register-input" type="password"></input>

            </label>

            <button className='Register-btn'>Registrar</button>
        </form>
    )
}


/* footer del register */

export const RegisterFooter = () => {
    return (
        <div className='Register-divLogin'>
            <span className='Register-textLogin'>Ya tienes una cuenta?</span>
            <Link className='Register-linkLogin' to='/login'>Accede a ella</Link>
        </div>
    )
}