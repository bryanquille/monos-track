import { useHambMenu } from "../../../store/hambMenuStore"
import { cn } from "../../../utils/cn"

function BackScreen() {
  const isHambMenuOpen = useHambMenu((state) => state.isHambMenuOpen)

  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-screen bg-secondary-light/70 transform transition-transform duration-300 md:relative md:hidden dark:bg-neutral-light/50 backdrop-blur-sm",
        {
          "translate-x-0": isHambMenuOpen,
          "translate-x-[300%]": isHambMenuOpen === false,
        }
      )}
    ></div>
  )
}

export default BackScreen