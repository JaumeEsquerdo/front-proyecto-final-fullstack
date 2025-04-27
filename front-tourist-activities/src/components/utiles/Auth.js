export const verificarLogin = (navigate) => { // paso navigate en la función para poder utilizarlo aqui dentro, donde utilice esto faltaroa el ' const navigate= useNavigate() '
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
        return false; // si no tiene login return false, ya que no pasa la verificacion
    }
    return true; // si esta logeado sigue en el codigo donde esté, ya que haré la pregunta en negativo
}

/* no utilizado aun */