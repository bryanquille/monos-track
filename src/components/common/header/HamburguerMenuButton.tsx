import { cn } from "../../../utils/cn"

interface HambuerguerMenuButtonProps {
  isHambMenuOpen: boolean
  handleClick: () => void
}

function HamburguerMenuButton({ isHambMenuOpen, handleClick }: HambuerguerMenuButtonProps) {
  return (
    <button
      type="button"
      className='flex flex-col justify-center ite gap-0.75'
      onClick={handleClick}
    >
      <span
        className={cn(
          'w-6 h-1 block rounded-xl bg-secondary-light transform transition-transform duration-300',
          {
            'translate-y-0.75 rotate-45': isHambMenuOpen
          }
        )}
      ></span>
      <span
        className={cn(
          'w-6 h-1 block rounded-xl bg-secondary-light transition-all duration-300',
          {
            'hidden': isHambMenuOpen,
          }
        )}
      ></span>
      <span
        className={cn(
          'w-6 h-1 block rounded-xl bg-secondary-light transform transition-transform duration-300',
          {
            '-translate-y-0.75 -rotate-45': isHambMenuOpen
          }
        )}
      ></span>
    </button>
  )
}

export default HamburguerMenuButton