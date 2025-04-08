import {createBrowserRouter} from 'react-router'

// importe de páginas
import Home from '@/pages/Home'
import Secciones from '@/pages/Secciones'
import ErrorPage from '@/pages/ErrorPage'
import WelcomePage from '@/pages/WelcomePage'
import Login from '@/pages/Login'
import Register from '@/pages/Register'


// importe de páginas especiales
import  Layout from '@/Layout'


const router = createBrowserRouter([
    {
        path: '/',
        element: <WelcomePage/>,
        index: true,// página principal sin Layout, para q no comparta header y footer
    },
    {
        path: '/login',
        element:<Login/>
    },
    {
        path:'/register',
        element:<Register/>
    },
    ,
    {
        element: <Layout/>,
        children:
        [   
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/secciones',
                element: <Secciones/>,
            },
            // {
            //     path: 'secciones/:id',
            //     element: <SeccionDinamica/>
            // },
            
            {
                path: '*',
                element:<ErrorPage/>
            }
        ]
    }
])
export default router
