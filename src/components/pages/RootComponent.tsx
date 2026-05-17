import { Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { useTheme } from "../../store/themeStore";
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { supabase } from "../../lib/supabase";

function RootComponent() {
  // Manage light/dark theme
  const isDark = useTheme((state) => state.isDark)
  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  // Manage session
  const setSession = useAuthStore((state) => state.setSession)
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session?.user ?? null)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session?.user ?? null)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [setSession])

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export default RootComponent