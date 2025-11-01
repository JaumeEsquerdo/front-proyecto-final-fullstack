import { Footer } from "@/components/Footer";
import { Header } from "./components/Header";
import { Outlet } from "react-router";
import "@/css/index.css";
import "@/css/components/header.css";
import "@/css/components/footer.css";
// import { useLocation } from "react-router";

import { ActivityProvider } from "./context/ActivityContext";

function Layout() {
  // const location = useLocation();
  // const locationIsCalendario = location.pathname.includes("calendario");

  return (
    <>
      <ActivityProvider>
        <div className={`OutletWrapper`}>
          <Header />
          <Outlet />
        </div>

        <Footer />
      </ActivityProvider>
    </>
  );
}

export default Layout;
