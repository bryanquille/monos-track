import { Outlet } from "@tanstack/react-router"
import { useTheme } from "../shared/stores/themeStore";
import { useEffect } from "react";
import { useAuthStore } from "../shared/stores/authStore";
import { supabase } from "../shared/lib/supabase";
import LoaderPage from "../shared/components/LoaderPage";

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