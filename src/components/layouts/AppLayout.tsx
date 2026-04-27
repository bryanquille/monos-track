import { Outlet } from "@tanstack/react-router"
import Header from "../common/header/Header"
import Footer from "../common/footer/Footer"

function AppLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default AppLayout