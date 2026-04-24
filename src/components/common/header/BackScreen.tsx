import { cn } from "../../../utils/cn"

interface BackScreenProps {
  isHambMenuOpen: boolean
}

function BackScreen({ isHambMenuOpen }: BackScreenProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-screen bg-secondary-light/70 transform transition-transform duration-300",
        {
          "translate-x-0": isHambMenuOpen,
          "translate-x-[300%]": isHambMenuOpen === false,
        }
      )}
    ></div>
  )
}

export default BackScreen