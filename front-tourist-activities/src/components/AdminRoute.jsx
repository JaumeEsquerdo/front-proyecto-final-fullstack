import { Navigate, Outlet } from "react-router-dom";


const AdminRoute = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user && user.role === 'admin' ? <Outlet /> : <Navigate to='/home' />
}

export default AdminRoute