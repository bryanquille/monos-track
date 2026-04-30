import { Sun, Moon } from "lucide-react"
import { useElementHeight } from "../../hooks/useElementWidthHeight"
import { cn } from "../../utils/cn"
import { useDarkMode } from "../../hooks/useDarkMode"

function DarkThemeButton() {
  const { elementHeight, elementRef } = useElementHeight()
  const { isDark, toggleTheme } = useDarkMode()

  return (
    <button
      type="button"
      ref={elementRef as React.Ref<HTMLButtonElement>}
      className="relative cursor-pointer p-0.5 flex justify-between items-center gap-1 border-2 border-primary rounded-4xl"
      onClick={toggleTheme}
    >
      <div
        style={{
          '--width-mobile': `${elementHeight - 8}px`,
          '--width-tablet': `${elementHeight - 14}px`,
        } as React.CSSProperties}
        className={cn(
          `absolute inset-0 w-(--width-mobile) h-full rounded-full bg-primary transform transition-all duration-300 md:w-(--width-tablet)`,
          isDark ? 'translate-x-0' : 'translate-x-full',
        )}
      ></div>
      <Sun color="#df6402" />
      <Moon color="#b4becc" />
    </button>
  )
}

export default DarkThemeButton