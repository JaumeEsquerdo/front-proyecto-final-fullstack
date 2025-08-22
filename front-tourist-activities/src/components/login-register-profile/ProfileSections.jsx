
/* header del perfil */
export const ProfileHeader = ({ handleBack }) => {
    return (
        <nav className="Profile-nav" >
            <img onClick={handleBack} className='Profile-link' src="/img/flecha-atras.svg" alt="Perfil" />
        </nav>
    )
}

/* form del edit d perfil */
export const ProfileForm = ({ newName, newEmail, setNewName, setNewEmail, handleUpdateProfile, setIsEditing }) => {
    return (
        <form onSubmit={handleUpdateProfile} className="Profile-form">
            <label className="Profile-label">Nombre
                <input value={newName} onChange={(e) => setNewName(e.target.value)} type="text" className="Profile-input" />
            </label>

            <label className="Profile-label">Email
                <input value={newEmail} onChange={(e) => setNewEmail(e.target.value)} type="email" className="Profile-input" />
            </label>

            <div className='Profile-btnsChange'>
                <button className="Profile-button" type="submit">Guardar cambios</button>
                <button type='button' onClick={() => {
                    setIsEditing(false);
                }
                } className='Profile-button Profile-button--cancel'>Cancelar</button>
            </div>
        </form>
    )
}


/* cambio de la contraseña */

export const PasswordChangeForm = ({ currentPassword, setCurrentPassword, newPassword, setNewPassword, handleUpdatePassword }) => {
    return (

        <form className="Profile-form" onSubmit={handleUpdatePassword}>
            <label className="Profile-label">Contraseña antigua
                <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" className="Profile-input" />
            </label>
            <label className="Profile-label">Nueva contraseña
                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" className="Profile-input" />
            </label>
            <button className='Profile-button Profile-button--passConfirm' type='submit'>Actualizar contraseña</button>
        </form>
    )
}

/* info perfil */
export const ProfileInfo = ({ user, setIsEditing }) => {
    return (
        <div className='Profile-info'>
            <p className='Profile-name'><strong>Nombre:</strong>{user.name}</p>
            <p className='Profile-email'><strong>Email:</strong>{user.email}</p>
            <button className='Profile-button' onClick={() => setIsEditing(true)}>Editar perfil</button>

        </div>
    )
}