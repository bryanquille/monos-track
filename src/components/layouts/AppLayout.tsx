import { Outlet } from "@tanstack/react-router"
import Header from "../common/header/Header"
import Footer from "../common/footer/Footer"
import { cn } from "../../utils/cn";

function AppLayout() {
  return (
    <>
      <Header />
      <main className={cn('w-full')}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default AppLayout