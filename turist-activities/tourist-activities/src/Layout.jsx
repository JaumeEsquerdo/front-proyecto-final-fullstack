import {Header} from '@/components/Header'
import { Footer } from '@/components/Footer'
import {Outlet} from 'react-router'
import '@/css/index.css'
import '@/css/components/header.css'
import '@/css/components/footer.css'

function Layout() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout;
