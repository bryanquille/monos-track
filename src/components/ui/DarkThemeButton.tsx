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
      className="relative p-0.5 flex justify-between items-center gap-1 border-2 border-secondary-light rounded-4xl"
      onClick={toggleTheme}
    >
      <div
        style={{ '--width':`${elementHeight - 8}px` } as React.CSSProperties}
        className={cn(
          `absolute inset-0 w-(--width) h-full rounded-full bg-secondary-light transform transition-transform duration-300`,
          isDark ? 'translate-x-0' : 'translate-x-full',
        )}
      ></div>
      <Sun />
      <Moon />
    </button>
  )
}

export default DarkThemeButton