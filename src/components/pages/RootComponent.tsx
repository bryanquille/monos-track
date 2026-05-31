import { Outlet } from "@tanstack/react-router"
import { useTheme } from "../../store/themeStore";
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { supabase } from "../../lib/supabase";
import LoaderPage from "./LoaderPage";

function RootComponent() {
  const isDark = useTheme((state) => state.isDark)

  const isLoading = useAuthStore((state) => state.isLoading)
  const setSession = useAuthStore((state) => state.setSession)

  // Manage light/dark theme
  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  // Manage session
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

  if (isLoading) return <LoaderPage text="Sincronizando Monos Track..." />

  return (
    <>
      <Outlet />
    </>
  )
}

export default RootComponent