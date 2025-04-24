import { Navigate, Outlet } from "react-router-dom";

const isTokenExpired = (token) =>{
    try{
        const decoded  = JSON.parse(atob(token.split('.')[1])); // Decodificar el token JWT
        const expDate = decoded.exp * 1000; // Convertir la fecha de expiración a milisegundos
        return expDate < Date.now(); // Verificar si el token ha expirado
    } catch(error){
        return true; // si hay error (token expirado)
    }
}

const PrivateRoute = () => {
    const token = localStorage.getItem('token');

    // si el token no existe o ha expirado
    if(!token || isTokenExpired(token)){
        localStorage.removeItem('token'); //eliminar token caducado

        return <Navigate to="/login" />;
    }

    return  <Outlet />; // si el token es valido, se deja pasar
}

export default PrivateRoute;

/* comprobar si esta el token, si no redirijir al login */