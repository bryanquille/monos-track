import { Sun, Moon } from "lucide-react"
import { useElementHeight } from "../../hooks/useElementWidthHeight"
import { cn } from "../../utils/cn"
import { useTheme } from "../../store/themeStore"

interface DarkThemeButtonProps {
  className?: string
}

function DarkThemeButton({ className }: DarkThemeButtonProps) {
  const { elementHeight, elementRef } = useElementHeight()
  const isDark = useTheme((state) => state.isDark)
  const toggleTheme = useTheme((state) => state.toggleTheme)

  return (
    <button
      type="button"
      ref={elementRef as React.Ref<HTMLButtonElement>}
      className={cn("relative cursor-pointer p-0.5 flex justify-evenly items-center gap-1 border-2 rounded-4xl border-primary", className)}
      onClick={toggleTheme}
    >
      <div
        style={{ width: elementHeight, height: elementHeight }}
        className={cn(
          `absolute rounded-full bg-primary transform transition-all duration-300`,
          isDark ? '-translate-x-1/2' : 'translate-x-1/2',
        )}
      ></div>
      <Sun color="#df6402" />
      <Moon color="#b4becc" />
    </button>
  )
}

export default DarkThemeButton