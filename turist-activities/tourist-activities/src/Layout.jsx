import {Header} from '@/components/Header'
import {Outlet} from 'react-router'
import '@/css/index.css'

function Layout() {

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Layout;
