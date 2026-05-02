import { Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { useTheme } from "../../store/themeStore";
import { useEffect } from "react";

function RootComponent() {
  const isDark = useTheme((state) => state.isDark)

  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export default RootComponent