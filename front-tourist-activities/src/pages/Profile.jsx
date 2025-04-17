import '@/css/pages/profile.css'

const Profile = () => {
    return (
        <>
            <div className="Profile">
                <div className="Profile-card">
                    <h2 className="Profile-title">Tu Perfil</h2>
                    img?

                    <form className="Profile-form">

                        <div className="Profile-field">
                            <label className="Profile-label">Nombre
                                <input type="text" className="Profile-input" />
                            </label>
                        </div>

                        <div className="Profile-field">
                            <label className="Profile-label">Email
                                <input type="email" className="Profile-input" />
                            </label>
                        </div>
                        <div className="Profile-field">
                            <label className="Profile-label">Contraseña
                                <input type="password" className="Profile-input" />
                            </label>
                        </div>
                        <button className="Profile-button" type="submit">Guardar cambios</button>
                    </form>



                    <button className="Profile-logout">Cerrar sesión</button>
                </div>

            </div>
        </>
    );
}

export default Profile;