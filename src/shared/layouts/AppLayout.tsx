import { Outlet } from "@tanstack/react-router"
import Footer from "../components/Footer"
import { cn } from "../utils/cn";
import Header from "../components/header/Header";

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