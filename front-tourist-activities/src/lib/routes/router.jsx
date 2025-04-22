import { createBrowserRouter } from 'react-router'

// importe de páginas
import Home from '@/pages/Home'
import ErrorPage from '@/pages/ErrorPage'
import WelcomePage from '@/pages/WelcomePage'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import CalendarPage from '@/pages/Calendario'
import Profile from '@/pages/Profile'
import PoliticaPriv from '@/pages/Policy'
import Terminos from '@/pages/Terminos'
import AddActividadForm from '@/pages/AddActividadForm'

// importe de páginas especiales
import Layout from '@/Layout'
import PrivateRoute from '@/components/PrivateRoute'
import AdminRoute from '@/components/AdminRoute'



const router = createBrowserRouter([
    {
        path: '/',
        element: <WelcomePage />,
        index: true,// página principal sin Layout, para q no comparta header y footer
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/registro',
        element: <Register />
    },
    {
        path: '/perfil',
        element: <Profile />,
    },
    {
        path: '/politica-privacidad',
        element: <PoliticaPriv />,
    },
    {
        path: '/terminos-condiciones',
        element: <Terminos />,
    }
    ,
    {
        element: <PrivateRoute />, // rutas protegidas!
        children: [
            {
                element: <Layout />,
                children:
                    [
                        {
                            path: '/home',
                            element: <Home />
                        },
                        {
                            path: '/calendario',
                            element: <CalendarPage />,
                        }

                    ]
            }
        ]
    },
    // rutas solo para admin
    {
        element: <AdminRoute />,
        children: [
            {
                element: <Layout />,
                children: [
                    {
                        path: '/agregar-actividad',
                        element: <AddActividadForm />
                    }
                ]
            }
        ]
    },

    {
        path: '*',
        element: <ErrorPage />
    }

])
export default router
