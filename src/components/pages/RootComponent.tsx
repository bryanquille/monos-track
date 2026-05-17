import { Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"
import { useTheme } from "../../store/themeStore";
import { useEffect } from "react";
import { useAuthStore } from "../../store/authStore";
import { supabase } from "../../lib/supabase";

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


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
        {/* TODO: Add an spinner here */}
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-emerald-500"></div>
        <p className="mt-4 text-sm font-medium text-zinc-500 animate-pulse">
          Sincronizando Monos Track...
        </p>
      </div>
    )
  }

  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}

export default RootComponent