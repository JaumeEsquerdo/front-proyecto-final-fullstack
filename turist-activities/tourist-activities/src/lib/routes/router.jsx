import {createBrowserRouter} from 'react-router'

// importe de páginas
import Home from '@/pages/Home'
import Secciones from '@/pages/Secciones'
import ErrorPage from '@/pages/ErrorPage'


// importe de páginas especiales
import  Layout from '@/Layout'


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home/>,
        index: true,// página principal sin Layout, para q no comparta header y footer
    }
    ,
    {
        element: <Layout/>,
        children:
        [
            {
                path: 'secciones',
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
