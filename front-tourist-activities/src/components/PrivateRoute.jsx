import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const user = JSON.parse(localStorage.getItem('user')) //string a objeto
    ;
    return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;