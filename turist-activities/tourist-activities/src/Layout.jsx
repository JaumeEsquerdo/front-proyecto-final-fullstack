import { Footer } from '@/components/Footer'
import { Header } from './components/Header'
import { Outlet } from 'react-router'
import '@/css/index.css'
import '@/css/components/header.css'
import '@/css/components/footer.css'

function Layout() {

  return (
    <>
      <div className='OutletWrapper'>
        <Header/>
        <Outlet />
      </div>

      <Footer />
    </>
  )
}

export default Layout;
