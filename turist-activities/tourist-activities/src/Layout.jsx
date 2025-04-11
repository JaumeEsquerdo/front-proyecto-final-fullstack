import { Footer } from '@/components/Footer'
import { Header } from './components/Header'
import { Outlet } from 'react-router'
import '@/css/index.css'
import '@/css/components/header.css'
import '@/css/components/footer.css'

import { ActivityProvider } from './context/ActivityContext'

function Layout() {

  return (
    <>
      <ActivityProvider>

        <div className='OutletWrapper'>
          <Header />
          <Outlet />
        </div>

        <Footer />
      </ActivityProvider>

    </>
  )
}

export default Layout;
